//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMeNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply; // Number of NFT's 
    uint256 public maxSupply;
    uint256 public maxPerWallet; // Max number of NFT a Wallet can mint
    bool public isPublicMintEnabled; // When users can mint. Owner can toggle this
    string internal baseTokenUri;  
    address payable public withdrawWallet;

    mapping(address => uint256) public walletMints; // Keep track of all the mints.

    constructor() payable ERC721 ("MintMe", "MME") {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    // Set witdraw wallet address
    }

    // I put this function into com just to try the contract and to be able to mint
    // using hardhat node network. 
    // The faucets on the rinkeby website didn't work.
    // Wasn't able to mint because I had no ETH.
    
    /*function setIsPublicMintEnabled (bool isPublicMintEnabled_) external onlyOwner { // Owner is the deployer
    isPublicMintEnabled = isPublicMintEnabled_;
    }*/

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), "Token doesn't exist !");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json")); // Take URL identified, grad the id and place it behind the URL
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}(""); // Grab the wallet and calling it and passing the address of the contract and the balance
        require(success, "withdraw failed");
    }


    // MINT function 
    function mint(uint256 quantity_) public payable {
    /*require (isPublicMintEnabled, "Minting not enabled");*/
    require (msg.value == quantity_ * mintPrice, "Wrong mint value"); // Make sure the user is inputting the correct value
    require(totalSupply + quantity_ <= maxSupply, "Sold Out");
    require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "Exceed max wallet");// Keep track of the count and quantity of the wallet

    for(uint256 i = 0; i < quantity_; i++) {
        uint256 newTokenId = totalSupply + 1;
        totalSupply++; // Before an interaction preventing Re-Entrancy attack
        _safeMint(msg.sender, newTokenId); 
    }
    }
}
