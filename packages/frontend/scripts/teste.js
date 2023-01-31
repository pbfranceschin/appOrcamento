const ethers = require('ethers');
const contracts = require('../contracts/hardhat_contracts.json')

const hardhatChain = {
    id: 31337,
    name: 'Hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Hardhat',
      symbol: 'HARD',
    },
    network: 'hardhat',
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
    testnet: true,
  };


  const chainId = 31337;
  const contractAddress = contracts[chainId][0].contracts.OrcamentoUniao2023.address;
  const contractABI = contracts[chainId][0].contracts.OrcamentoUniao2023.abi;
  const url = hardhatChain.rpcUrls.default

  
  async function _fetchName(contract, account) {
    const name_ = await contract.getName(account)
    return name_
  }
  
  async function main () {

    const provider = new ethers.providers.JsonRpcProvider(url) 

    const Contract = new ethers.Contract(contractAddress, contractABI, provider)

    const filter = Contract.filters.Registry()

    let logs = await Contract.queryFilter(filter)

    const events = logs.map(log => Contract.interface.parseLog(log).args)

    const data = [...events].reverse()

    // console.log(data[0][0])

    let nameMap = new Map()

    // for(let i=0; i<data.length; i++){
    //     if(!nameMap.has(data[i][0])){
    //         _fetchName(Contract, data[i][0]).then(response => {
    //             nameMap.set(data[i][0], response)
    //             console.log(response)
    //         })
    //     }
    // }

    name_ = await _fetchName(Contract, data[0][0])

    // _fetchName(Contract, data[0][0]).then(response => {
    //     nameMap.set(data[0][0], response)
    //     console.log(response)
    // })

    nameMap.set(data[0][0], name_)
    console.log(nameMap)

  }

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




// const array_ = [['ee', 'mono'], 'jojoij', 10101, 'owowow', '000300', '090876', 383838]
// const _arr = array_.slice(0, -3)

// console.log(_arr)

// const x = 10
// const y = -x
// console.log(y+2)


// console.log(array_[0][0])