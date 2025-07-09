import { ethers } from 'hardhat';

async function main() {
  const FraudInference = await ethers.getContractFactory('FraudInference');
  const contract = await FraudInference.deploy();
  await contract.deployed();
  console.log('FraudInference deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});