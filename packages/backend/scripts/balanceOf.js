const ethers = require('ethers');
const contract = require('../deployments/localhost/OrcamentoUniao2023.json');


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

const url = hardhatChain.rpcUrls.default;
const contractAddress = contract.address;
const contractAbi = contract.abi;

const account = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const area = 0;

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(url);
    const Contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const bal = await Contract.balanceOf(account, area);
    const balance = bal.toNumber();
    console.log(balance);
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });