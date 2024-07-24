using extension graphql;

module default {
    scalar type EthAddress extending str {
        constraint regexp(r'^0x[0-9a-f]{40}$');
    }

    scalar type Hash extending str {
        constraint regexp(r'^0x[0-9a-f]{64}$');
    }

    type Chain {
        required name: str {
            constraint exclusive;
        };
        required chainId: bigint {
            constraint exclusive;
        };
        fullName: str;

        index on (.name);
        index on (.chainId);

        multi blocks := (.<chain[is Block]);
        multi events := (.<chain[is EthEvent]);

        latestEvent := (select .events order by .blockNumber desc limit 1);
    }

    type Block {
        required chain: Chain;
        required hash: Hash;
        required number: bigint;
        timestamp: int64;

        constraint exclusive on ( (.chain, .number) );

        index on ((.chain, .number));
        index on ((.chain, not exists .timestamp));
    }

    abstract type EthEvent {
        required chain: Chain;
        required blockNumber: bigint;
        required logIndex: int32;
        required blockHash: Hash;
        required txHash: Hash;
        required address: EthAddress;

        constraint exclusive on ( (.chain, .blockNumber, .logIndex) );
        index on ((.chain, .blockNumber, .logIndex));

        single block := (select Block filter .chain = EthEvent.chain and .number = EthEvent.blockNumber);

        trigger event_received after insert for each do (
            insert Block {
                chain := __new__.chain,
                hash := __new__.blockHash,
                number := __new__.blockNumber,
            } unless conflict
        );
    }

    type OwnershipTransferred extending EthEvent {
        required previousOwner: EthAddress;
        required newOwner: EthAddress;

        trigger ownership_transferred after insert for each do (
            update ProductFactory
            filter .chain = __new__.chain and .address = __new__.address
            set {
                owner := __new__.newOwner,
            }
        );
    }

    type ProductCreated extending EthEvent {
        required vendor: EthAddress;
        required productImpl: EthAddress;
        required product: EthAddress;

        trigger product_created after insert for each do (
            insert Product {
                factory := (select ProductFactory filter .chain = __new__.chain and .address = __new__.address),
                vendor := __new__.vendor,
                impl := __new__.productImpl,
                address := __new__.product,
                createEvent := __new__,
            }
        );
    }

    type DeviceCreated extending EthEvent {
        required product: EthAddress;
        required device: EthAddress;
        required tokenId: bigint;

        trigger device_created after insert for each do (
            insert Device {
                product := (select Product filter .factory = (select ProductFactory filter .chain = __new__.chain and .address = __new__.address) and .address = __new__.product),
                address := __new__.device,
                tokenId := __new__.tokenId,
                createEvent := __new__,
            }
        );
    }

    type DeviceActivated extending EthEvent {
        required product: EthAddress;
        required device: EthAddress;
        required receiver: EthAddress;

        trigger device_activated after insert for each do (
            with product := (
                select Product
                filter .factory = (
                    select ProductFactory
                    filter .chain = __new__.chain and .address = __new__.address
                ) and .address = __new__.product
            )
            update Device
            filter .product = product and .address = __new__.device
            set {
                owner := __new__.receiver,
                activateEvent := __new__,
            }
        );
    }

    type ProductFactory {
        required chain: Chain;
        required address: EthAddress;
        required createdAt: bigint;
        owner: EthAddress;

        constraint exclusive on ( (.chain, .address) );

        multi products := .<factory[is Product];

        index on ((.chain, .address));
    }

    type Product {
        required factory: ProductFactory;
        required vendor: EthAddress;
        required impl: EthAddress;
        required address: EthAddress;
        name: str;
        symbol: str;

        required createEvent: EthEvent;

        constraint exclusive on ( (.factory, .address) );

        multi devices := .<product[is Device];

        index on ((.factory, .address));
        index on (.vendor);
    }

    type Device {
        required product: Product;
        required address: EthAddress;
        required tokenId: bigint;
        owner: EthAddress;

        required createEvent: EthEvent;
        activateEvent: EthEvent;

        index on ((.product, .tokenId));
        index on ((.product, .address));
        index on (.owner);
    }
}
