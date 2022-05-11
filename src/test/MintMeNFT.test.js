const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MintMeNFT", function () {
	let mintMeNFT, deployer;

	beforeEach(async function () {
		// Get the ContractFactory and Signers here.
		const MintMeNFT = await ethers.getContractFactory("MintMeNFT");
		[deployer] = await ethers.getSigners();

		mintMeNFT = await MintMeNFT.deploy();
	});

	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			expect(await mintMeNFT.owner()).to.equal(deployer.address);
		});
	});
});
