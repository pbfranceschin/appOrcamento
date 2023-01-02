const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Testing OrcamentoUniao contract", function () {

  let contractFactory;
  let contract;
  let owner;
  let org1;
  let org2;
  let org3;
  let ownerAddress;
  let org1Address;
  let org2Address;
  let org3Address;
  const OUTROS = 0;
  const EDUCACAO = 1;
  const INFRA = 2;
  const SAUDE = 3;
  const verba = 10**12;
  const edu = 5;
  const infra = 10;
  const saude = 5;
  const data = '0x00';


  beforeEach(async () => {
    [owner, org1, org2, org3] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    org1Address = await org1.getAddress();
    org2Address = await org2.getAddress();
    org3Address = await org3.getAddress();
    contractFactory = await ethers.getContractFactory("OrcamentoUniao2023");
    contract = await contractFactory.deploy();
    await contract.addOrg(org1Address, EDUCACAO);
    await contract.addOrg(org2Address, OUTROS);
  });

  it("tests budget partitioning", async function () {
    expect(await contract.balanceOf(ownerAddress, EDUCACAO)).to.equal((verba*edu)/100);
    expect(await contract.balanceOf(ownerAddress, INFRA)).to.equal((verba*infra)/100);
    expect(await contract.balanceOf(ownerAddress, SAUDE)).to.equal((verba*saude)/100);
    let outros = 100 - edu - infra - saude;
    expect(await contract.balanceOf(ownerAddress, OUTROS)).to.equal((verba*outros)/100);
  });

  it("tests area allocation", async function () {
    let areas1 = await contract.getAreas(org1Address);
    let areas2 = await contract.getAreas(org2Address);
    // areas1 should be [0,1,0,0]
    // areas2 should be [0,0,0,0]
    expect(areas1[0]).to.equal(0);
    expect(areas1[1]).to.equal(1);
    expect(areas1[2]).to.equal(0);
    expect(areas1[3]).to.equal(0);
    for(i = 0; i < areas2.length; i++){
      expect(areas2[i]).to.equal(0);
    }
    
    await expect(
      contract.addOrg(org1Address, OUTROS)
    ).to.be.revertedWith("address already added");

    await expect(
      contract.addArea(org1Address, EDUCACAO)
    ).to.be.revertedWith("area already set for this organization");

    await contract.addArea(org1Address, INFRA);
    await contract.addArea(org1Address, SAUDE);
    areas1 = await contract.getAreas(org1Address);
    // areas1 should be [0,1,2,3,4]
    for(i = 0; i < areas1.length; i++){
      expect(areas1[i]).to.eq(i);
    }

    await contract.addArea(org2Address, SAUDE);
    areas2 = await contract.getAreas(org2Address);
    // areas2 should be [0,3,0,0]
    expect(areas2[0]).to.eq(0);
    expect(areas2[1]).to.eq(3);
    expect(areas2[2]).to.eq(0);
    expect(areas2[3]).to.eq(0);

    // TODO expect addArea(org3Address, area) to revert
  });

  it("tests transfers", async function () {
    await expect(
      contract.connect(org1).safeTransferFrom(org1Address, org2Address, OUTROS, 1, data)
    ).to.be.revertedWith("ERC1155: insufficient balance for transfer");

    await contract.safeBatchTransferFrom(
      ownerAddress, org1Address, [OUTROS, EDUCACAO], [20*10**6, 10**6], data
    );
    
    await contract.connect(org1).safeTransferFrom(
      org1Address, org2Address, OUTROS, 5*10**6, data
    );

    expect(
      await contract.balanceOf(org1Address, OUTROS)
    ).to.equal(15*10**6);

    expect(
      await contract.balanceOf(org1Address, EDUCACAO)
    ).to.equal(10**6);
    
    expect(
      await contract.balanceOf(org2Address, OUTROS)
    ).to.equal(5*10**6);
  });

  it("tests blocking transfers", async function () {
    await expect(
      contract.safeBatchTransferFrom(
        ownerAddress, org1Address, [EDUCACAO, SAUDE], [1, 1], data
      )
    ).to.be.revertedWith("this organization does not have permission to receive part of the batch");

    await expect(
      contract.safeTransferFrom(
        ownerAddress, org2Address, EDUCACAO, 1, data
      )
    ).to.be.revertedWith("this organization does not have permission to receive this budget");
    
    await expect(
      contract.safeTransferFrom(
        ownerAddress, org3Address, OUTROS, 1, data
      )
    ).to.be.revertedWith("this organization does not have permission to receive this budget");

  });
})