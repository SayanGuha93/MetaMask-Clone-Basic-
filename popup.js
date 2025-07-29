document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("form").addEventListener("click", sendTransactionHandler);
    document.getElementById("check_balance").addEventListener("click", checkBalanceHandler);
});

// 🔹 Send Transaction
async function sendTransactionHandler() {
    const privateKey = document.getElementById("private_key").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const toAddress = document.getElementById("address").value.trim();

    if (!privateKey || !amount || !toAddress) {
        alert("⚠️ Please fill all fields");
        return;
    }

    try {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://sepolia.infura.io/v3/4c324555557a4a86bcf3d9b971ada168"
        );

        const wallet = new ethers.Wallet(privateKey, provider);

        const tx = {
            to: toAddress,
            value: ethers.utils.parseEther(amount),
        };

        const txObj = await wallet.sendTransaction(tx);
        console.log("txHash:", txObj.hash);

        document.getElementById("center").style.display = "none";
        const a = document.getElementById("link");
        a.href = `https://sepolia.etherscan.io/tx/${txObj.hash}`;
        a.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("❌ Transaction failed: " + error.message);
    }
}

// 🔹 Check Balance
async function checkBalanceHandler() {
    document.getElementById("center").style.display = "block";

    try {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://sepolia.infura.io/v3/4c324555557a4a86bcf3d9b971ada168"
        );

        const address = document.getElementById("address").value.trim();

        if (!address) {
            alert("⚠️ Enter an address");
            return;
        }

        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);

        document.getElementById("balance_display").innerText = 
            `Your Balance: ${balanceInEth} ETH`;
        console.log(`Balance: ${balanceInEth} ETH`);

        document.getElementById("center").style.display = "none";

    } catch (error) {
        console.error(error);
        alert("❌ Failed to fetch balance: " + error.message);
    }
}
