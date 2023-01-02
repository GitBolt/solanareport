const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log(`Deploying contracts with account: ${deployer.address}`);
    console.log(`Account balance: ${accountBalance.toString()}`);

    // calling the contact
    const Token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy({
        value: hre.ethers.utils.parseEther('0.3'),
    });
    await portal.deployed();

    console.log(`Deployed WavePortal contract to: ${portal.address}`);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();