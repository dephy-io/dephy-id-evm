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
    static readonly bytecode = "0x60a060405230608052348015601357600080fd5b5060805161265661003d600039600081816111450152818161116e01526112b401526126566000f3fe60806040526004361061011e5760003560e01c806384b0196e116100a0578063b063cb5411610064578063b063cb5414610418578063c4d66de81461042d578063ed24911d1461044d578063f2fde38b14610462578063f9d8ee941461048257600080fd5b806384b0196e146103295780638da5cb5b14610351578063904b55a51461038e5780639aade73a146103c7578063ad3cb1cc146103e757600080fd5b806352d1902d116100e757806352d1902d14610206578063565501b4146102295780635c975abb14610249578063715018a61461028b5780637741139f146102a057600080fd5b80622ca198146101235780631aaa192d146101605780633a7eece8146101b15780634be60db3146101d35780634f1ef286146101f3575b600080fd5b34801561012f57600080fd5b5061014361013e366004611dbd565b6104a2565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016c57600080fd5b506101a4604051806040016040528060188152602001772222a8242cafa4a22fa9a4a3a722a22fa6a2a9a9a0a3a29d60411b81525081565b6040516101579190611ee3565b3480156101bd57600080fd5b506101d16101cc366004611f7f565b61063b565b005b3480156101df57600080fd5b506101d16101ee366004611fff565b6106e7565b6101d16102013660046120aa565b610795565b34801561021257600080fd5b5061021b6107b4565b604051908152602001610157565b34801561023557600080fd5b5061021b6102443660046120f7565b6107d1565b34801561025557600080fd5b507fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f033005460ff166040519015158152602001610157565b34801561029757600080fd5b506101d1610850565b3480156102ac57600080fd5b506103056102bb366004612147565b604080518082018252600080825260209182018190526001600160a01b03938416815260018083529083902083518085019094528054909416835292909201549181019190915290565b6040805182516001600160a01b031681526020928301519281019290925201610157565b34801561033557600080fd5b5061033e610864565b6040516101579796959493929190612162565b34801561035d57600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b0316610143565b34801561039a57600080fd5b506101436103a9366004612147565b6001600160a01b039081166000908152602081905260409020541690565b3480156103d357600080fd5b506101d16103e23660046121fa565b610915565b3480156103f357600080fd5b506101a4604051806040016040528060058152602001640352e302e360dc1b81525081565b34801561042457600080fd5b5061021b610b6a565b34801561043957600080fd5b506101d1610448366004612147565b610b8d565b34801561045957600080fd5b5061021b610cfc565b34801561046e57600080fd5b506101d161047d366004612147565b610d0b565b34801561048e57600080fd5b506101d161049d3660046122f1565b610d46565b60006104ac610da4565b6104b4610ddc565b81516040516301ffc9a760e01b815263cc2a041160e01b60048201526001600160a01b03909116906301ffc9a790602401602060405180830381865afa158015610502573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105269190612330565b61054357604051630fb9181b60e11b815260040160405180910390fd5b60006105528360000151610e1f565b9050806001600160a01b031663a6487c538460200151856040015186606001516040518463ffffffff1660e01b815260040161059093929190612352565b600060405180830381600087803b1580156105aa57600080fd5b505af11580156105be573d6000803e3d6000fd5b5050506001600160a01b0380831660008181526020819052604080822080546001600160a01b0319163390811790915588519151939550931692917f0d516d8b14b989f8763b7f1b93e8e08f0f5ff06e0b833b8d080f0f1f33f9f3029190a49050610636600160008051602061260183398151915255565b919050565b610643610da4565b61064b610ddc565b80516001600160a01b0380821660009081526020819052604090205416331461068757604051630143454560e01b815260040160405180910390fd5b60005b8260200151518110156106cb576106c28360000151846020015183815181106106b5576106b561238b565b6020026020010151610ea0565b5060010161068a565b50506106e4600160008051602061260183398151915255565b50565b6106ef610da4565b6106f7610ddc565b80516001600160a01b0380821660009081526020819052604090205416331461073357604051630143454560e01b815260040160405180910390fd5b60005b8260200151518110156106cb5761078c8360000151846020015183815181106107615761076161238b565b60200260200101518560400151848151811061077f5761077f61238b565b6020026020010151610fc9565b50600101610736565b61079d61113a565b6107a6826111df565b6107b082826111e7565b5050565b60006107be6112a9565b506000805160206125e183398151915290565b60006107db610da4565b6107e3610ddc565b81516001600160a01b0380821660009081526020819052604090205416331461081f57604051630143454560e01b815260040160405180910390fd5b610836836000015184602001518560400151610fc9565b915050610636600160008051602061260183398151915255565b6108586112f2565b610862600061134d565b565b600060608082808083816000805160206125c1833981519152805490915015801561089157506001810154155b6108da5760405162461bcd60e51b81526020600482015260156024820152741152540dcc4c8e88155b9a5b9a5d1a585b1a5e9959605a1b60448201526064015b60405180910390fd5b6108e26113be565b6108ea611481565b60408051600080825260208201909252600f60f81b9c939b5091995046985030975095509350915050565b61091d610da4565b610925610ddc565b60006109bc6109b66040518060a00160405280606c8152602001612555606c913980516020918201208651878301518051908401206040808a015160808a0151915161099b96919291019485526001600160a01b0393909316602085015260408401919091526060830152608082015260a00190565b604051602081830303815290604052805190602001206114c0565b836114f3565b9050806001600160a01b031682600001516001600160a01b0316146109f45760405163680a7f5760e11b815260040160405180910390fd5b6000610a3d610a2e8560400151604051602001610a1391815260200190565b6040516020818303038152906040528051906020012061158b565b856020015186604001516115ed565b9050806001600160a01b031684600001516001600160a01b031614610a7557604051639918f91160e01b815260040160405180910390fd5b83516001600160a01b039081166000908152600160208181526040928390208351808501855281548616808252919093015491830182905292516323b872dd60e01b815230600482015293861660248501526044840152916323b872dd90606401600060405180830381600087803b158015610af057600080fd5b505af1158015610b04573d6000803e3d6000fd5b5050865183516040516001600160a01b0388811682529283169450911691507fa9aa76dc8d402b3621cd270e623dcae6acc94ab94199a5f20c4758aae86175db9060200160405180910390a35050506107b0600160008051602061260183398151915255565b6040518060a00160405280606c8152602001612555606c91398051906020012081565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff1615906001600160401b0316600081158015610bd25750825b90506000826001600160401b03166001148015610bee5750303b155b905081158015610bfc575080155b15610c1a5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610c4457845460ff60401b1916600160401b1785555b610c4d86611624565b610c966040518060400160405280600e81526020016d50726f64756374466163746f727960901b815250604051806040016040528060018152602001603160f81b815250611635565b610c9e611647565b610ca6611657565b610cae611667565b8315610cf457845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b6000610d0661166f565b905090565b610d136112f2565b6001600160a01b038116610d3d57604051631e4fbdf760e01b8152600060048201526024016108d1565b6106e48161134d565b610d4e610da4565b610d56610ddc565b80516001600160a01b03808216600090815260208190526040902054163314610d9257604051630143454560e01b815260040160405180910390fd5b6106cb82600001518360200151610ea0565b600080516020612601833981519152805460011901610dd657604051633ee5aeb560e01b815260040160405180910390fd5b60029055565b7fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f033005460ff16156108625760405163d93c066560e01b815260040160405180910390fd5b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f090506001600160a01b038116610636576040516330be1a3d60e21b815260040160405180910390fd5b600160008051602061260183398151915255565b6001600160a01b0381811660009081526001602052604081205490911615610edb576040516353eadbf760e11b815260040160405180910390fd5b6040516335313c2160e11b81523060048201526001600160a01b03841690636a627842906024016020604051808303816000875af1158015610f21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4591906123a1565b6040805180820182526001600160a01b0386811680835260208084018681528884166000818152600193849052878120965187546001600160a01b031916961695909517865590519490910193909355925193945084939192917f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c79190a492915050565b6001600160a01b0382811660009081526001602052604081205490911615611004576040516353eadbf760e11b815260040160405180910390fd5b6040516335313c2160e11b81526001600160a01b038381166004830152851690636a627842906024016020604051808303816000875af115801561104c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107091906123a1565b6040805180820182526001600160a01b0387811680835260208084018681528984166000818152600193849052878120965187546001600160a01b031916961695909517865590519490910193909355925193945084939192917f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c79190a46040516001600160a01b03838116825280851691908616907fa9aa76dc8d402b3621cd270e623dcae6acc94ab94199a5f20c4758aae86175db9060200160405180910390a39392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806111c157507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166111b56000805160206125e1833981519152546001600160a01b031690565b6001600160a01b031614155b156108625760405163703e46dd60e11b815260040160405180910390fd5b6106e46112f2565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611241575060408051601f3d908101601f1916820190925261123e918101906123a1565b60015b61126957604051634c9c8ce360e01b81526001600160a01b03831660048201526024016108d1565b6000805160206125e1833981519152811461129a57604051632a87526960e21b8152600481018290526024016108d1565b6112a48383611679565b505050565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108625760405163703e46dd60e11b815260040160405180910390fd5b336113247f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146108625760405163118cdaa760e01b81523360048201526024016108d1565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d10280546060916000805160206125c1833981519152916113fd906123ba565b80601f0160208091040260200160405190810160405280929190818152602001828054611429906123ba565b80156114765780601f1061144b57610100808354040283529160200191611476565b820191906000526020600020905b81548152906001019060200180831161145957829003601f168201915b505050505091505090565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d10380546060916000805160206125c1833981519152916113fd906123ba565b60006114ed6114cd61166f565b8360405161190160f01b8152600281019290925260228201526042902090565b92915050565b6000428260800151101561151a5760405163f6d5e7cb60e01b815260040160405180910390fd5b602080830151604080850151606080870151835160008082529681018086528a905260ff90951693850193909352830152608082015260019060a0016020604051602081039080840390855afa158015611578573d6000803e3d6000fd5b5050604051601f19015195945050505050565b6000604051806040016040528060188152602001772222a8242cafa4a22fa9a4a3a722a22fa6a2a9a9a0a3a29d60411b815250826040516020016115d09291906123f4565b604051602081830303815290604052805190602001209050919050565b60004282101561161057604051636932286960e11b815260040160405180910390fd5b61161a84846116cf565b90505b9392505050565b61162c6116f9565b6106e481611742565b61163d6116f9565b6107b0828261174a565b61164f6116f9565b6108626117ab565b61165f6116f9565b6108626117b3565b6108626116f9565b6000610d066117e6565b6116828261185a565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156116c7576112a482826118bf565b6107b0611935565b6000806000806116df8686611954565b9250925092506116ef82826119a1565b5090949350505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661086257604051631afcd79f60e31b815260040160405180910390fd5b610d136116f9565b6117526116f9565b6000805160206125c18339815191527fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d10261178c8482612464565b506003810161179b8382612464565b5060008082556001909101555050565b610e8c6116f9565b6117bb6116f9565b7fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300805460ff19169055565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f611811611a5a565b611819611ac4565b60408051602081019490945283019190915260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b806001600160a01b03163b60000361189057604051634c9c8ce360e01b81526001600160a01b03821660048201526024016108d1565b6000805160206125e183398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b0316846040516118dc9190612522565b600060405180830381855af49150503d8060008114611917576040519150601f19603f3d011682016040523d82523d6000602084013e61191c565b606091505b509150915061192c858383611b08565b95945050505050565b34156108625760405163b398979f60e01b815260040160405180910390fd5b6000806000835160410361198e5760208401516040850151606086015160001a61198088828585611b64565b95509550955050505061199a565b50508151600091506002905b9250925092565b60008260038111156119b5576119b561253e565b036119be575050565b60018260038111156119d2576119d261253e565b036119f05760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115611a0457611a0461253e565b03611a255760405163fce698f760e01b8152600481018290526024016108d1565b6003826003811115611a3957611a3961253e565b036107b0576040516335e2f38360e21b8152600481018290526024016108d1565b60006000805160206125c183398151915281611a746113be565b805190915015611a8c57805160209091012092915050565b81548015611a9b579392505050565b7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470935050505090565b60006000805160206125c183398151915281611ade611481565b805190915015611af657805160209091012092915050565b60018201548015611a9b579392505050565b606082611b1d57611b1882611c33565b61161d565b8151158015611b3457506001600160a01b0384163b155b15611b5d57604051639996b31560e01b81526001600160a01b03851660048201526024016108d1565b508061161d565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115611b9f5750600091506003905082611c29565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015611bf3573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611c1f57506000925060019150829050611c29565b9250600091508190505b9450945094915050565b805115611c435780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b634e487b7160e01b600052604160045260246000fd5b604051608081016001600160401b0381118282101715611c9457611c94611c5c565b60405290565b604080519081016001600160401b0381118282101715611c9457611c94611c5c565b604051606081016001600160401b0381118282101715611c9457611c94611c5c565b60405160a081016001600160401b0381118282101715611c9457611c94611c5c565b604051601f8201601f191681016001600160401b0381118282101715611d2857611d28611c5c565b604052919050565b80356001600160a01b038116811461063657600080fd5b600082601f830112611d5857600080fd5b8135602083016000806001600160401b03841115611d7857611d78611c5c565b50601f8301601f1916602001611d8d81611d00565b915050828152858383011115611da257600080fd5b82826020830137600092810160200192909252509392505050565b600060208284031215611dcf57600080fd5b81356001600160401b03811115611de557600080fd5b820160808185031215611df757600080fd5b611dff611c72565b611e0882611d30565b815260208201356001600160401b03811115611e2357600080fd5b611e2f86828501611d47565b60208301525060408201356001600160401b03811115611e4e57600080fd5b611e5a86828501611d47565b60408301525060608201356001600160401b03811115611e7957600080fd5b611e8586828501611d47565b606083015250949350505050565b60005b83811015611eae578181015183820152602001611e96565b50506000910152565b60008151808452611ecf816020860160208601611e93565b601f01601f19169290920160200192915050565b60208152600061161d6020830184611eb7565b600082601f830112611f0757600080fd5b81356001600160401b03811115611f2057611f20611c5c565b8060051b611f3060208201611d00565b91825260208185018101929081019086841115611f4c57600080fd5b6020860192505b83831015611f7557611f6483611d30565b825260209283019290910190611f53565b9695505050505050565b600060208284031215611f9157600080fd5b81356001600160401b03811115611fa757600080fd5b820160408185031215611fb957600080fd5b611fc1611c9a565b611fca82611d30565b815260208201356001600160401b03811115611fe557600080fd5b611ff186828501611ef6565b602083015250949350505050565b60006020828403121561201157600080fd5b81356001600160401b0381111561202757600080fd5b82016060818503121561203957600080fd5b612041611cbc565b61204a82611d30565b815260208201356001600160401b0381111561206557600080fd5b61207186828501611ef6565b60208301525060408201356001600160401b0381111561209057600080fd5b61209c86828501611ef6565b604083015250949350505050565b600080604083850312156120bd57600080fd5b6120c683611d30565b915060208301356001600160401b038111156120e157600080fd5b6120ed85828601611d47565b9150509250929050565b6000606082840312801561210a57600080fd5b50612113611cbc565b61211c83611d30565b815261212a60208401611d30565b602082015261213b60408401611d30565b60408201529392505050565b60006020828403121561215957600080fd5b61161d82611d30565b60ff60f81b8816815260e06020820152600061218160e0830189611eb7565b82810360408401526121938189611eb7565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b818110156121e95783518352602093840193909201916001016121cb565b50909b9a5050505050505050505050565b60008082840360c081121561220e57600080fd5b83356001600160401b0381111561222457600080fd5b84016060818703121561223657600080fd5b61223e611cbc565b61224782611d30565b815260208201356001600160401b0381111561226257600080fd5b61226e88828501611d47565b60208301525060409182013591810191909152925060a0601f198201121561229557600080fd5b5061229e611cde565b6122aa60208501611d30565b8152604084013560ff811681146122c057600080fd5b602082015260608481013560408301526080808601359183019190915260a090940135938101939093525092909150565b6000604082840312801561230457600080fd5b5061230d611c9a565b61231683611d30565b815261232460208401611d30565b60208201529392505050565b60006020828403121561234257600080fd5b8151801515811461161d57600080fd5b6060815260006123656060830186611eb7565b82810360208401526123778186611eb7565b90508281036040840152611f758185611eb7565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156123b357600080fd5b5051919050565b600181811c908216806123ce57607f821691505b6020821081036123ee57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351612406818460208801611e93565b9190910191825250602001919050565b601f8211156112a457806000526020600020601f840160051c8101602085101561243d5750805b601f840160051c820191505b8181101561245d5760008155600101612449565b5050505050565b81516001600160401b0381111561247d5761247d611c5c565b6124918161248b84546123ba565b84612416565b6020601f8211600181146124c557600083156124ad5750848201515b600019600385901b1c1916600184901b17845561245d565b600084815260208120601f198516915b828110156124f557878501518255602094850194600190920191016124d5565b50848210156125135786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60008251612534818460208701611e93565b9190910192915050565b634e487b7160e01b600052602160045260246000fdfe416374697661746544657669636528616464726573732070726f647563742c61646472657373206465766963652c6279746573206465766963655369676e61747572652c75696e7432353620646576696365446561646c696e652c75696e7432353620646561646c696e6529a16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d100360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a26469706673582212204bd07a120d55f9b42e39af5b92c17f31547102d30b1b9f7a7ce978b97278570f64736f6c634300081a0033";
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
        readonly name: "getDeviceBinding";
        readonly inputs: readonly [{
            readonly name: "device";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.DeviceBinding";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "tokenId";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
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
