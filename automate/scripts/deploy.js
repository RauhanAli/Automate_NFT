const hre = require("hardhat");
var Web3 = require('web3');
async function main() {
  try {
    const price = Web3.utils.toWei('25', 'ether');
    const Parent = await hre.ethers.getContractFactory("NFT");
    const parent = await Parent.deploy("Rauhan","RNFT",25,price,"jhfhfhskfkjfkh");
    await parent.deployed();
    console.log("NFT deployed to:", parent.address);
    // const NFT = await hre.ethers.getContractFactory("FactoryNFT");
    // const nft = await NFT.deploy();
    // await nft.deployed();
    // console.log("NFT Collection deployed to:", nft.address);
  } catch (error) {
    console.log(error);
  }  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });