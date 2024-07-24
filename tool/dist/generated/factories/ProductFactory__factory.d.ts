import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ProductFactory, ProductFactoryInterface } from "../ProductFactory";
type ProductFactoryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ProductFactory__factory extends ContractFactory {
    constructor(...args: ProductFactoryConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string;
    }): Promise<ProductFactory>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): ProductFactory;
    connect(signer: Signer): ProductFactory__factory;
    static readonly bytecode = "0x60a060405230608052348015601357600080fd5b506080516127b261003d600039600081816111520152818161117b01526112c101526127b26000f3fe60806040526004361061011e5760003560e01c806384b0196e116100a0578063bb189de111610064578063bb189de1146103ca578063c4d66de8146103ea578063ed24911d1461040a578063f2fde38b1461041f578063f9d8ee941461043f57600080fd5b806384b0196e146102e65780638da5cb5b1461030e578063904b55a51461034b578063ad3cb1cc14610384578063b063cb54146103b557600080fd5b806352d1902d116100e757806352d1902d14610206578063565501b4146102295780635c975abb146102495780635d25e6321461028b578063715018a6146102d157600080fd5b80622ca198146101235780631aaa192d146101605780633a7eece8146101b15780634be60db3146101d35780634f1ef286146101f3575b600080fd5b34801561012f57600080fd5b5061014361013e366004611eb4565b61045f565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016c57600080fd5b506101a4604051806040016040528060188152602001772222a8242cafa4a22fa9a4a3a722a22fa6a2a9a9a0a3a29d60411b81525081565b6040516101579190611fda565b3480156101bd57600080fd5b506101d16101cc366004612076565b6105f8565b005b3480156101df57600080fd5b506101d16101ee3660046120f6565b610835565b6101d16102013660046121a1565b6108e3565b34801561021257600080fd5b5061021b610902565b604051908152602001610157565b34801561023557600080fd5b5061021b6102443660046121ee565b61091f565b34801561025557600080fd5b507fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f033005460ff166040519015158152602001610157565b34801561029757600080fd5b5061021b6102a636600461223e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3480156102dd57600080fd5b506101d161099e565b3480156102f257600080fd5b506102fb6109b2565b6040516101579796959493929190612271565b34801561031a57600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b0316610143565b34801561035757600080fd5b50610143610366366004612309565b6001600160a01b039081166000908152602081905260409020541690565b34801561039057600080fd5b506101a4604051806040016040528060058152602001640352e302e360dc1b81525081565b3480156103c157600080fd5b5061021b610a63565b3480156103d657600080fd5b506101d16103e53660046123a7565b610a86565b3480156103f657600080fd5b506101d1610405366004612309565b610ce0565b34801561041657600080fd5b5061021b610e4f565b34801561042b57600080fd5b506101d161043a366004612309565b610e5e565b34801561044b57600080fd5b506101d161045a36600461244d565b610e99565b6000610469610ef7565b610471610f2f565b81516040516301ffc9a760e01b815263cc2a041160e01b60048201526001600160a01b03909116906301ffc9a790602401602060405180830381865afa1580156104bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e3919061248c565b61050057604051630fb9181b60e11b815260040160405180910390fd5b600061050f8360000151610f72565b9050806001600160a01b031663a6487c538460200151856040015186606001516040518463ffffffff1660e01b815260040161054d939291906124ae565b600060405180830381600087803b15801561056757600080fd5b505af115801561057b573d6000803e3d6000fd5b5050506001600160a01b0380831660008181526020819052604080822080546001600160a01b0319163390811790915588519151939550931692917f0d516d8b14b989f8763b7f1b93e8e08f0f5ff06e0b833b8d080f0f1f33f9f3029190a490506105f3600160008051602061275d83398151915255565b919050565b610600610ef7565b610608610f2f565b80516001600160a01b0380821660009081526020819052604090205416331461064457604051630143454560e01b815260040160405180910390fd5b60005b8260200151518110156108195782516001600160a01b03166000908152600160209081526040822090850151805183919085908110610688576106886124e7565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205411156106d0576040516353eadbf760e11b815260040160405180910390fd5b82516040516335313c2160e11b81523060048201526000916001600160a01b031690636a627842906024016020604051808303816000875af115801561071a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073e91906124fd565b9050806001600086600001516001600160a01b03166001600160a01b03168152602001908152602001600020600086602001518581518110610782576107826124e7565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000208190555080846020015183815181106107c5576107c56124e7565b60200260200101516001600160a01b031685600001516001600160a01b03167f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c760405160405180910390a450600101610647565b5050610832600160008051602061275d83398151915255565b50565b61083d610ef7565b610845610f2f565b80516001600160a01b0380821660009081526020819052604090205416331461088157604051630143454560e01b815260040160405180910390fd5b60005b826020015151811015610819576108da8360000151846020015183815181106108af576108af6124e7565b6020026020010151856040015184815181106108cd576108cd6124e7565b6020026020010151610ff3565b50600101610884565b6108eb611147565b6108f4826111ec565b6108fe82826111f4565b5050565b600061090c6112b6565b5060008051602061273d83398151915290565b6000610929610ef7565b610931610f2f565b81516001600160a01b0380821660009081526020819052604090205416331461096d57604051630143454560e01b815260040160405180910390fd5b610984836000015184602001518560400151610ff3565b9150506105f3600160008051602061275d83398151915255565b6109a66112ff565b6109b0600061135a565b565b6000606080828080838160008051602061271d83398151915280549091501580156109df57506001810154155b610a285760405162461bcd60e51b81526020600482015260156024820152741152540dcc4c8e88155b9a5b9a5d1a585b1a5e9959605a1b60448201526064015b60405180910390fd5b610a306113cb565b610a3861148e565b60408051600080825260208201909252600f60f81b9c939b5091995046985030975095509350915050565b6040518060a00160405280606c81526020016126b1606c91398051906020012081565b610a8e610ef7565b610a96610f2f565b6000610b3b610b356040518060a00160405280606c81526020016126b1606c913980516020918201208651878301516040808a015180519086012060608b015160808b01519251610b1a9792939192019586526001600160a01b0394851660208701529290931660408501526060840152608083019190915260a082015260c00190565b604051602081830303815290604052805190602001206114cd565b83611500565b9050806001600160a01b031682600001516001600160a01b031614610b735760405163680a7f5760e11b815260040160405180910390fd5b6000610bbc610bad8560600151604051602001610b9291815260200190565b60405160208183030381529060405280519060200120611598565b856040015186606001516115fa565b9050806001600160a01b031684602001516001600160a01b031614610bf457604051639918f91160e01b815260040160405180910390fd5b83516001600160a01b039081166000818152600160209081526040808320828a015186168452909152908190205490516323b872dd60e01b815230600482015292851660248401526044830152906323b872dd90606401600060405180830381600087803b158015610c6557600080fd5b505af1158015610c79573d6000803e3d6000fd5b50505060208086015186516040516001600160a01b03878116825292831694509116917fa9aa76dc8d402b3621cd270e623dcae6acc94ab94199a5f20c4758aae86175db910160405180910390a350506108fe600160008051602061275d83398151915255565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff1615906001600160401b0316600081158015610d255750825b90506000826001600160401b03166001148015610d415750303b155b905081158015610d4f575080155b15610d6d5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610d9757845460ff60401b1916600160401b1785555b610da086611631565b610de96040518060400160405280600e81526020016d50726f64756374466163746f727960901b815250604051806040016040528060018152602001603160f81b815250611642565b610df1611654565b610df9611664565b610e01611674565b8315610e4757845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b6000610e5961167c565b905090565b610e666112ff565b6001600160a01b038116610e9057604051631e4fbdf760e01b815260006004820152602401610a1f565b6108328161135a565b610ea1610ef7565b610ea9610f2f565b80516001600160a01b03808216600090815260208190526040902054163314610ee557604051630143454560e01b815260040160405180910390fd5b61081982600001518360200151611686565b60008051602061275d833981519152805460011901610f2957604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b7fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f033005460ff16156109b05760405163d93c066560e01b815260040160405180910390fd5b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f090506001600160a01b0381166105f3576040516330be1a3d60e21b815260040160405180910390fd5b600160008051602061275d83398151915255565b6001600160a01b03808416600090815260016020908152604080832093861683529290529081205415611039576040516353eadbf760e11b815260040160405180910390fd5b6040516335313c2160e11b81526001600160a01b038381166004830152851690636a627842906024016020604051808303816000875af1158015611081573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a591906124fd565b6001600160a01b038086166000818152600160209081526040808320948916808452949091528082208590555193945084937f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c79190a46040516001600160a01b03838116825280851691908616907fa9aa76dc8d402b3621cd270e623dcae6acc94ab94199a5f20c4758aae86175db9060200160405180910390a39392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806111ce57507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166111c260008051602061273d833981519152546001600160a01b031690565b6001600160a01b031614155b156109b05760405163703e46dd60e11b815260040160405180910390fd5b6108326112ff565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561124e575060408051601f3d908101601f1916820190925261124b918101906124fd565b60015b61127657604051634c9c8ce360e01b81526001600160a01b0383166004820152602401610a1f565b60008051602061273d83398151915281146112a757604051632a87526960e21b815260048101829052602401610a1f565b6112b18383611792565b505050565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109b05760405163703e46dd60e11b815260040160405180910390fd5b336113317f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146109b05760405163118cdaa760e01b8152336004820152602401610a1f565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d102805460609160008051602061271d8339815191529161140a90612516565b80601f016020809104026020016040519081016040528092919081815260200182805461143690612516565b80156114835780601f1061145857610100808354040283529160200191611483565b820191906000526020600020905b81548152906001019060200180831161146657829003601f168201915b505050505091505090565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d103805460609160008051602061271d8339815191529161140a90612516565b60006114fa6114da61167c565b8360405161190160f01b8152600281019290925260228201526042902090565b92915050565b600042826080015110156115275760405163f6d5e7cb60e01b815260040160405180910390fd5b602080830151604080850151606080870151835160008082529681018086528a905260ff90951693850193909352830152608082015260019060a0016020604051602081039080840390855afa158015611585573d6000803e3d6000fd5b5050604051601f19015195945050505050565b6000604051806040016040528060188152602001772222a8242cafa4a22fa9a4a3a722a22fa6a2a9a9a0a3a29d60411b815250826040516020016115dd929190612550565b604051602081830303815290604052805190602001209050919050565b60004282101561161d57604051636932286960e11b815260040160405180910390fd5b61162784846117e8565b90505b9392505050565b611639611812565b6108328161185b565b61164a611812565b6108fe8282611863565b61165c611812565b6109b06118c4565b61166c611812565b6109b06118cc565b6109b0611812565b6000610e596118ff565b6001600160a01b038083166000908152600160209081526040808320938516835292905290812054156116cc576040516353eadbf760e11b815260040160405180910390fd5b6040516335313c2160e11b81523060048201526001600160a01b03841690636a627842906024016020604051808303816000875af1158015611712573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061173691906124fd565b6001600160a01b038085166000818152600160209081526040808320948816808452949091528082208590555193945084937f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c79190a492915050565b61179b82611973565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156117e0576112b182826119d8565b6108fe611a4e565b6000806000806117f88686611a6d565b9250925092506118088282611aba565b5090949350505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166109b057604051631afcd79f60e31b815260040160405180910390fd5b610e66611812565b61186b611812565b60008051602061271d8339815191527fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d1026118a584826125c0565b50600381016118b483826125c0565b5060008082556001909101555050565b610fdf611812565b6118d4611812565b7fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300805460ff19169055565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61192a611b73565b611932611bdd565b60408051602081019490945283019190915260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b806001600160a01b03163b6000036119a957604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610a1f565b60008051602061273d83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516119f5919061267e565b600060405180830381855af49150503d8060008114611a30576040519150601f19603f3d011682016040523d82523d6000602084013e611a35565b606091505b5091509150611a45858383611c21565b95945050505050565b34156109b05760405163b398979f60e01b815260040160405180910390fd5b60008060008351604103611aa75760208401516040850151606086015160001a611a9988828585611c7d565b955095509550505050611ab3565b50508151600091506002905b9250925092565b6000826003811115611ace57611ace61269a565b03611ad7575050565b6001826003811115611aeb57611aeb61269a565b03611b095760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115611b1d57611b1d61269a565b03611b3e5760405163fce698f760e01b815260048101829052602401610a1f565b6003826003811115611b5257611b5261269a565b036108fe576040516335e2f38360e21b815260048101829052602401610a1f565b600060008051602061271d83398151915281611b8d6113cb565b805190915015611ba557805160209091012092915050565b81548015611bb4579392505050565b7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470935050505090565b600060008051602061271d83398151915281611bf761148e565b805190915015611c0f57805160209091012092915050565b60018201548015611bb4579392505050565b606082611c3657611c3182611d4c565b61162a565b8151158015611c4d57506001600160a01b0384163b155b15611c7657604051639996b31560e01b81526001600160a01b0385166004820152602401610a1f565b508061162a565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115611cb85750600091506003905082611d42565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015611d0c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611d3857506000925060019150829050611d42565b9250600091508190505b9450945094915050565b805115611d5c5780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b634e487b7160e01b600052604160045260246000fd5b604051608081016001600160401b0381118282101715611dad57611dad611d75565b60405290565b604080519081016001600160401b0381118282101715611dad57611dad611d75565b604051606081016001600160401b0381118282101715611dad57611dad611d75565b604051601f8201601f191681016001600160401b0381118282101715611e1f57611e1f611d75565b604052919050565b80356001600160a01b03811681146105f357600080fd5b600082601f830112611e4f57600080fd5b8135602083016000806001600160401b03841115611e6f57611e6f611d75565b50601f8301601f1916602001611e8481611df7565b915050828152858383011115611e9957600080fd5b82826020830137600092810160200192909252509392505050565b600060208284031215611ec657600080fd5b81356001600160401b03811115611edc57600080fd5b820160808185031215611eee57600080fd5b611ef6611d8b565b611eff82611e27565b815260208201356001600160401b03811115611f1a57600080fd5b611f2686828501611e3e565b60208301525060408201356001600160401b03811115611f4557600080fd5b611f5186828501611e3e565b60408301525060608201356001600160401b03811115611f7057600080fd5b611f7c86828501611e3e565b606083015250949350505050565b60005b83811015611fa5578181015183820152602001611f8d565b50506000910152565b60008151808452611fc6816020860160208601611f8a565b601f01601f19169290920160200192915050565b60208152600061162a6020830184611fae565b600082601f830112611ffe57600080fd5b81356001600160401b0381111561201757612017611d75565b8060051b61202760208201611df7565b9182526020818501810192908101908684111561204357600080fd5b6020860192505b8383101561206c5761205b83611e27565b82526020928301929091019061204a565b9695505050505050565b60006020828403121561208857600080fd5b81356001600160401b0381111561209e57600080fd5b8201604081850312156120b057600080fd5b6120b8611db3565b6120c182611e27565b815260208201356001600160401b038111156120dc57600080fd5b6120e886828501611fed565b602083015250949350505050565b60006020828403121561210857600080fd5b81356001600160401b0381111561211e57600080fd5b82016060818503121561213057600080fd5b612138611dd5565b61214182611e27565b815260208201356001600160401b0381111561215c57600080fd5b61216886828501611fed565b60208301525060408201356001600160401b0381111561218757600080fd5b61219386828501611fed565b604083015250949350505050565b600080604083850312156121b457600080fd5b6121bd83611e27565b915060208301356001600160401b038111156121d857600080fd5b6121e485828601611e3e565b9150509250929050565b6000606082840312801561220157600080fd5b5061220a611dd5565b61221383611e27565b815261222160208401611e27565b602082015261223260408401611e27565b60408201529392505050565b6000806040838503121561225157600080fd5b61225a83611e27565b915061226860208401611e27565b90509250929050565b60ff60f81b8816815260e06020820152600061229060e0830189611fae565b82810360408401526122a28189611fae565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b818110156122f85783518352602093840193909201916001016122da565b50909b9a5050505050505050505050565b60006020828403121561231b57600080fd5b61162a82611e27565b600060a0828403121561233657600080fd5b60405160a081016001600160401b038111828210171561235857612358611d75565b60405290508061236783611e27565b8152602083013560ff8116811461237d57600080fd5b60208201526040838101359082015260608084013590820152608092830135920191909152919050565b60008060c083850312156123ba57600080fd5b82356001600160401b038111156123d057600080fd5b8301608081860312156123e257600080fd5b6123ea611d8b565b6123f382611e27565b815261240160208301611e27565b602082015260408201356001600160401b0381111561241f57600080fd5b61242b87828501611e3e565b6040830152506060918201359181019190915291506122688460208501612324565b6000604082840312801561246057600080fd5b50612469611db3565b61247283611e27565b815261248060208401611e27565b60208201529392505050565b60006020828403121561249e57600080fd5b8151801515811461162a57600080fd5b6060815260006124c16060830186611fae565b82810360208401526124d38186611fae565b9050828103604084015261206c8185611fae565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561250f57600080fd5b5051919050565b600181811c9082168061252a57607f821691505b60208210810361254a57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351612562818460208801611f8a565b9190910191825250602001919050565b601f8211156112b157806000526020600020601f840160051c810160208510156125995750805b601f840160051c820191505b818110156125b957600081556001016125a5565b5050505050565b81516001600160401b038111156125d9576125d9611d75565b6125ed816125e78454612516565b84612572565b6020601f82116001811461262157600083156126095750848201515b600019600385901b1c1916600184901b1784556125b9565b600084815260208120601f198516915b828110156126515787850151825560209485019460019092019101612631565b508482101561266f5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60008251612690818460208701611f8a565b9190910192915050565b634e487b7160e01b600052602160045260246000fdfe416374697661746544657669636528616464726573732070726f647563742c61646472657373206465766963652c6279746573206465766963655369676e61747572652c75696e7432353620646576696365446561646c696e652c75696e7432353620646561646c696e6529a16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d100360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a264697066735822122088e3123e0fb6fa0954df9c6ab388e7ef9ffad0da9af00d6067643d9844033d1264736f6c634300081a0033";
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "ACTIVATE_DEVICE_TYPEHASH";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "DEPHY_PREFIX";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "UPGRADE_INTERFACE_VERSION";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "string";
            readonly internalType: "string";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "activateDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.ActivateDeviceArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "deviceSignature";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "deviceDeadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly name: "signature";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.EIP712Signature";
            readonly components: readonly [{
                readonly name: "signer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "v";
                readonly type: "uint8";
                readonly internalType: "uint8";
            }, {
                readonly name: "r";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "s";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "deadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createActivatedDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateActivatedDeviceArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "receiver";
                readonly type: "address";
                readonly internalType: "address";
            }];
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createActivatedDevices";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateActivatedDevicesArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "devices";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }, {
                readonly name: "receivers";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateDeviceArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createDevices";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateDevicesArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "devices";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createProduct";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateProductArgs";
            readonly components: readonly [{
                readonly name: "productImpl";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "name";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "symbol";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "baseTokenURI";
                readonly type: "string";
                readonly internalType: "string";
            }];
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "eip712Domain";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "fields";
            readonly type: "bytes1";
            readonly internalType: "bytes1";
        }, {
            readonly name: "name";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "version";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "chainId";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "verifyingContract";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "salt";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "extensions";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getDeviceTokenId";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getDomainSeparator";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getVendorByProduct";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "initialize";
        readonly inputs: readonly [{
            readonly name: "initialOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "owner";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "paused";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "proxiableUUID";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "renounceOwnership";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "transferOwnership";
        readonly inputs: readonly [{
            readonly name: "newOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "upgradeToAndCall";
        readonly inputs: readonly [{
            readonly name: "newImplementation";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }, {
        readonly type: "event";
        readonly name: "DeviceActivated";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "receiver";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DeviceCreated";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "tokenId";
            readonly type: "uint256";
            readonly indexed: true;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "EIP712DomainChanged";
        readonly inputs: readonly [];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Initialized";
        readonly inputs: readonly [{
            readonly name: "version";
            readonly type: "uint64";
            readonly indexed: false;
            readonly internalType: "uint64";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "OwnershipTransferred";
        readonly inputs: readonly [{
            readonly name: "previousOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "newOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Paused";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "ProductCreated";
        readonly inputs: readonly [{
            readonly name: "vendor";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "productImpl";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Unpaused";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly indexed: false;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "Upgraded";
        readonly inputs: readonly [{
            readonly name: "implementation";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "error";
        readonly name: "AddressEmptyCode";
        readonly inputs: readonly [{
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "DeviceAlreadyCreated";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "DeviceSignatureExpired";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "DeviceSignatureMismatch";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignature";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignatureLength";
        readonly inputs: readonly [{
            readonly name: "length";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly type: "error";
        readonly name: "ECDSAInvalidSignatureS";
        readonly inputs: readonly [{
            readonly name: "s";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly type: "error";
        readonly name: "EIP712SignatureExpired";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "EIP712SignatureMismatch";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ERC1167FailedCreateClone";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ERC1967InvalidImplementation";
        readonly inputs: readonly [{
            readonly name: "implementation";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "ERC1967NonPayable";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "EnforcedPause";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ExpectedPause";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "FailedInnerCall";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "InvalidInitialization";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotInitializing";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotProductTemplate";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotVendor";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "OwnableInvalidOwner";
        readonly inputs: readonly [{
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "OwnableUnauthorizedAccount";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "ReentrancyGuardReentrantCall";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "TokenIdMismatch";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "UUPSUnauthorizedCallContext";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "UUPSUnsupportedProxiableUUID";
        readonly inputs: readonly [{
            readonly name: "slot";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    static createInterface(): ProductFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ProductFactory;
}
export {};