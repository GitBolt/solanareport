const main = async () => {
    // storing the address of the owner of the contract and a random account
    const [owner, randomPerson] = await hre.ethers.getSigners();

    // create a new contract instance
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    waveContract.deployed();

    /* get contact address */
    // logging the address of the contract and owner 
    console.log("Deployed WavePortal contract to: " + waveContract.address);
    console.log("Owner:", owner.address);

    /* Get Contract balance */
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    /* Get total wave */
    // get the total waves from the contract and setting the value to the variable waveCount
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("Retrieved total gm count...", waveCount.toNumber());

    /* send a wave */
    // execute a wave() transaction on the contract to test the messages
    const waveTxn = await waveContract.wave('test 1');
    await waveTxn.wait(); // Wait for the transaction to be mined

    /* Get Contract balance to see what happened!  */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    // log the messages from the contract
    let allWaveMsgs = await waveContract.getAllWaveMsgs();
    console.log(allWaveMsgs);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();