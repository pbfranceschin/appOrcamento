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
  

// const [contractAddress, contractABI] = utils.getContractData();
    const chainId = 31337;
    const contractAddress = contracts[chainId][0].contracts.OrcamentoUniao2023.address;
    const contractABI = contracts[chainId][0].contracts.OrcamentoUniao2023.abi;

const private_key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const from = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const to = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

const url = hardhatChain.rpcUrls.default



async function main () {
    
    const provider = new ethers.providers.JsonRpcProvider(url) 

    const signer = new ethers.Wallet(private_key, provider)
    
    const Contract = new ethers.Contract(contractAddress, contractABI, signer)
    
    const add = await Contract.addOrg(to, 1)

    const addReceipt = await add.wait()

    console.log(addReceipt)

    let i
    for(i=0; i<25; i++){
        const tx = await Contract.safeTransferFrom(from, to, 0, i, '0x00')
        const txReceipt = await tx.wait()
        console.log(txReceipt)
    }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
