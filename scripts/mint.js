const hre = require("hardhat"); // Corrected typo: "hardhart"
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

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
    const contractAddress = "0x43c2d63CeC6019DFcC4BBB087218c0e53310AAFa";
    const [signer] = await hre.ethers.getSigners();

    const contractFactory = await hre.ethers.getContractFactory("TestToken");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "mint100tokens";
    const mint100tokensTx = await sendShieldedTransaction(
        signer,
        contractAddress,
        contract.interface.encodeFunctionData(functionName), // Corrected "contarct" typo
        0
    );

    await mint100tokensTx.wait();
    console.log("Transaction Receipt:", mint100tokensTx.hash); // Corrected log format
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
