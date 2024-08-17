const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const replace_contractAddress = "0x43c2d63CeC6019DFcC4BBB087218c0e53310AAFa"; // Replace with your actual contract address
  const [signer] = await hre.ethers.getSigners();

  const replace_contractFactory = await hre.ethers.getContractFactory("TestToken");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  const replace_functionName = "transfer";
  const replace_functionArgs = [
    "0xa2345eeBD74396c885b074B2c9A7c3E1E9E73b8e", // Replace with the recipient address
    "1" // Amount of tokens to transfer
  ];

  const transaction = await sendShieldedTransaction(
    signer,
    replace_contractAddress,
    contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs),
    0
  );

  await transaction.wait();
  console.log("Transaction Response: https://explorer-evm.testnet.swisstronik.com/tx/" + transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





