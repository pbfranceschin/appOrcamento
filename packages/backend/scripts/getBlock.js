const ethers = require('ethers');
const { argv } = require('node:process');

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
const url = hardhatChain.rpcUrls.default

const main = async () => {

    const arg = process.argv.slice(2);
    console.log(arg);
    const provider = new ethers.providers.JsonRpcProvider(url);
    let block;
    if(arg[0] === 'tx') {
        block = await provider.getBlockWithTransactions('latest');
        const tx = block.transactions;
        console.log(tx);
        return
    }
    
    block = await provider.getBlock('latest');
    console.log(block);
}

main();