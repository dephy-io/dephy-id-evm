CREATE MIGRATION m16fq5wuocc43brfit5b2e5p2aaq7d2pmrijgz6j5pji4zlgm7kq5q
    ONTO initial
{
  CREATE EXTENSION graphql VERSION '1.0';
  CREATE SCALAR TYPE default::Hash EXTENDING std::str {
      CREATE CONSTRAINT std::regexp('^0x[0-9a-f]{64}$');
  };
  CREATE TYPE default::Block {
      CREATE REQUIRED PROPERTY number: std::bigint;
      CREATE PROPERTY timestamp: std::int64;
      CREATE REQUIRED PROPERTY hash: default::Hash;
  };
  CREATE TYPE default::Chain {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.name);
      CREATE REQUIRED PROPERTY chainId: std::bigint {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.chainId);
      CREATE PROPERTY fullName: std::str;
  };
  ALTER TYPE default::Block {
      CREATE REQUIRED LINK chain: default::Chain;
      CREATE CONSTRAINT std::exclusive ON ((.chain, .number));
      CREATE INDEX ON ((.chain, .number));
      CREATE INDEX ON ((.chain, NOT (EXISTS (.timestamp))));
  };
  CREATE SCALAR TYPE default::EthAddress EXTENDING std::str {
      CREATE CONSTRAINT std::regexp('^0x[0-9a-f]{40}$');
  };
  CREATE ABSTRACT TYPE default::EthEvent {
      CREATE REQUIRED LINK chain: default::Chain;
      CREATE REQUIRED PROPERTY blockNumber: std::bigint;
      CREATE SINGLE LINK block := (SELECT
          default::Block
      FILTER
          ((.chain = default::EthEvent.chain) AND (.number = default::EthEvent.blockNumber))
      );
      CREATE REQUIRED PROPERTY address: default::EthAddress;
      CREATE REQUIRED PROPERTY blockHash: default::Hash;
      CREATE REQUIRED PROPERTY logIndex: std::int32;
      CREATE REQUIRED PROPERTY txHash: default::Hash;
      CREATE TRIGGER event_received
          AFTER INSERT 
          FOR EACH DO (INSERT
              default::Block
              {
                  chain := __new__.chain,
                  hash := __new__.blockHash,
                  number := __new__.blockNumber
              }UNLESS CONFLICT);
      CREATE CONSTRAINT std::exclusive ON ((.chain, .blockNumber, .logIndex));
      CREATE INDEX ON ((.chain, .blockNumber, .logIndex));
  };
  CREATE TYPE default::ProductCreated EXTENDING default::EthEvent {
      CREATE REQUIRED PROPERTY product: default::EthAddress;
      CREATE REQUIRED PROPERTY productImpl: default::EthAddress;
      CREATE REQUIRED PROPERTY vendor: default::EthAddress;
  };
  CREATE TYPE default::OwnershipTransferred EXTENDING default::EthEvent {
      CREATE REQUIRED PROPERTY newOwner: default::EthAddress;
      CREATE REQUIRED PROPERTY previousOwner: default::EthAddress;
  };
  CREATE TYPE default::DeviceActivated EXTENDING default::EthEvent {
      CREATE REQUIRED PROPERTY device: default::EthAddress;
      CREATE REQUIRED PROPERTY product: default::EthAddress;
      CREATE REQUIRED PROPERTY receiver: default::EthAddress;
  };
  CREATE TYPE default::DeviceCreated EXTENDING default::EthEvent {
      CREATE REQUIRED PROPERTY device: default::EthAddress;
      CREATE REQUIRED PROPERTY product: default::EthAddress;
      CREATE REQUIRED PROPERTY tokenId: std::bigint;
  };
  ALTER TYPE default::Chain {
      CREATE MULTI LINK blocks := (.<chain[IS default::Block]);
      CREATE MULTI LINK events := (.<chain[IS default::EthEvent]);
      CREATE LINK latestEvent := (SELECT
          .events ORDER BY
              .blockNumber DESC
      LIMIT
          1
      );
  };
  CREATE TYPE default::Device {
      CREATE LINK activateEvent: default::EthEvent;
      CREATE REQUIRED PROPERTY address: default::EthAddress;
      CREATE PROPERTY owner: default::EthAddress;
      CREATE REQUIRED LINK createEvent: default::EthEvent;
      CREATE REQUIRED PROPERTY tokenId: std::bigint;
      CREATE INDEX ON (.owner);
  };
  CREATE TYPE default::Product {
      CREATE REQUIRED PROPERTY address: default::EthAddress;
      CREATE REQUIRED LINK createEvent: default::EthEvent;
      CREATE REQUIRED PROPERTY impl: default::EthAddress;
      CREATE REQUIRED PROPERTY vendor: default::EthAddress;
      CREATE INDEX ON (.vendor);
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY symbol: std::str;
  };
  ALTER TYPE default::Device {
      CREATE REQUIRED LINK product: default::Product;
      CREATE INDEX ON ((.product, .address));
      CREATE INDEX ON ((.product, .tokenId));
  };
  CREATE TYPE default::ProductFactory {
      CREATE REQUIRED LINK chain: default::Chain;
      CREATE REQUIRED PROPERTY address: default::EthAddress;
      CREATE CONSTRAINT std::exclusive ON ((.chain, .address));
      CREATE PROPERTY owner: default::EthAddress;
      CREATE INDEX ON ((.chain, .address));
      CREATE REQUIRED PROPERTY createdAt: std::bigint;
  };
  ALTER TYPE default::Product {
      CREATE REQUIRED LINK factory: default::ProductFactory;
      CREATE CONSTRAINT std::exclusive ON ((.factory, .address));
      CREATE MULTI LINK devices := (.<product[IS default::Device]);
      CREATE INDEX ON ((.factory, .address));
  };
  ALTER TYPE default::DeviceActivated {
      CREATE TRIGGER device_activated
          AFTER INSERT 
          FOR EACH DO (WITH
              product := 
                  (SELECT
                      default::Product
                  FILTER
                      ((.factory = (SELECT
                          default::ProductFactory
                      FILTER
                          ((.chain = __new__.chain) AND (.address = __new__.address))
                      )) AND (.address = __new__.product))
                  )
          UPDATE
              default::Device
          FILTER
              ((.product = product) AND (.address = __new__.device))
          SET {
              owner := __new__.receiver,
              activateEvent := __new__
          });
  };
  ALTER TYPE default::DeviceCreated {
      CREATE TRIGGER device_created
          AFTER INSERT 
          FOR EACH DO (INSERT
              default::Device
              {
                  product := (SELECT
                      default::Product
                  FILTER
                      ((.factory = (SELECT
                          default::ProductFactory
                      FILTER
                          ((.chain = __new__.chain) AND (.address = __new__.address))
                      )) AND (.address = __new__.product))
                  ),
                  address := __new__.device,
                  tokenId := __new__.tokenId,
                  createEvent := __new__
              });
  };
  ALTER TYPE default::OwnershipTransferred {
      CREATE TRIGGER ownership_transferred
          AFTER INSERT 
          FOR EACH DO (UPDATE
              default::ProductFactory
          FILTER
              ((.chain = __new__.chain) AND (.address = __new__.address))
          SET {
              owner := __new__.newOwner
          });
  };
  ALTER TYPE default::ProductCreated {
      CREATE TRIGGER product_created
          AFTER INSERT 
          FOR EACH DO (INSERT
              default::Product
              {
                  factory := (SELECT
                      default::ProductFactory
                  FILTER
                      ((.chain = __new__.chain) AND (.address = __new__.address))
                  ),
                  vendor := __new__.vendor,
                  impl := __new__.productImpl,
                  address := __new__.product,
                  createEvent := __new__
              });
  };
  ALTER TYPE default::ProductFactory {
      CREATE MULTI LINK products := (.<factory[IS default::Product]);
  };
};
