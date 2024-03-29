const ethers = require('ethers');
const contracts = require('../contracts/hardhat_contracts.json');

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

const private_key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const from = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
const accounts = [
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
  '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
  '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
  '0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',
  '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec',
];

const names = [
  'Secretaria de Educação-RJ',
  'Governo do Estado do Rio de Janeiro',
  'Governo do Estado de São Paulo',
  'Governo do Estado da Bahia',
  'Secretaria de Transporte-BA',
  'Secretaria de Turismo-SP',
  'Prefeitura de São Gonçalo-RJ',
  'Prefeitura do Rio de Janeiro-RJ',
  'Prefeitura de São Paulo-SP',
  'Ministério do Esporte',
  'Secretaria da Saúde-SP',
  'ALERJ',
];

const url = hardhatChain.rpcUrls.default;



async function main () {
    
    if(names.length !== accounts.length){
      console.log('Erro: lista de nomes e contas têm tamanhos diferentes');
      return;
    }
  
    const provider = new ethers.providers.JsonRpcProvider(url);

    const signer = new ethers.Wallet(private_key, provider);
    
    const Contract = new ethers.Contract(contractAddress, contractABI, signer);
    

    let i
    for(i=0; i<accounts.length; i++){
        const add = await Contract.addOrg(accounts[i], 1, names[i]);
        const addReceipt = await add.wait();
        console.log(addReceipt);
    }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
