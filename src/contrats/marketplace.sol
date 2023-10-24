// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import  "@openzeppelin/contracts/token/ERC721/IERC721.sol";  // Routing of NFTs


/* 
 * @author MEHMET KELNEBIOGLU
 * @title NFT_MARKETPLACE
 * @dev Implements voting process along with vote delegation
 */

contract NFTMarketplace {

    
    uint public IdForSale;  //id's of nfts to be sold
    address public owner;   // owner of the contract
    uint idForAuction;      //nft id to be sold at auction

    struct ItemForSale {
        // *@dev nft information to sell
        address contractAddress;
        address seller;
        address buyer;
        uint price;
        uint tokenId;
        bool state;


    }

    struct ItemForAuction{
        address contractAddress;
        address seller;
        address buyer;
        uint startingPrice;
        uint highestBid;
        uint tokenId;
        uint deadline;
        bool state;
    }

    //nft list available for sale
    mapping (uint => ItemForSale ) public idToItemForSale;
    mapping(uint => ItemForAuction) public idToItemForAuction;


    constructor () {
            owner = msg.sender; 
    }
    /*
     * @param  address of the nft to be sold  _contractAddress 
     * @param  price of the nft to be sold   _price
     * @param  id of the nft to be sold      _tokenId
     * @dev    I find the nft to be sold
     * @dev    only the owner of nft can sell
     * @dev 1
     * 
     
    */
    function starNFTSale(address _contractAddress, uint _price,  uint _tokenId) public {
        IERC721 NFT= IERC721(_contractAddress); 
        require(NFT.ownerOf(_tokenId) == msg.sender,"you are not owner of this NFT");
        NFT.transferFrom(msg.sender, address(this), _tokenId); 
        //require(NFT.ownerOf(_tokenId == address(this)));
        idToItemForSale[IdForSale] = ItemForSale(_contractAddress, msg.sender, msg.sender,_price,_tokenId,false);
        IdForSale +=1;
    }


    /*
     * @param nft address whose sale is to be canceled  Id
     * @dev  get token id from idToItemForSale mapping  info
     * @dev  I find the nft to be sold
     * @dev  nft owner control
     * @dev nft current sales status check
     * @dev nft return to owner

    */     

    function cancelNFTSale (uint Id) public {
       ItemForSale memory info = idToItemForSale[Id];
        IERC721 NFT = IERC721(info.contractAddress);
        require(Id < IdForSale);
        require(info.seller == msg.sender, "You aren't owner of this NFT!");
        require(info.state == false, "This NFT aldreay sold!");
        NFT.transferFrom(address(this), msg.sender, info.tokenId);
        idToItemForSale[Id] = ItemForSale(address(0), address(0), address(0),0,0,true);
    }



    /* 
     * @param nft id to be purchased  Id
     * @dev get token id from idToItemForSale mapping  info
     * @dev nft owner can't buy own nft
     * @dev nft is sold at the price requested by the seller
     * @dev 3% commission is taken from sales

    */

    function buyNFT(uint Id) public payable {
        ItemForSale storage info = idToItemForSale[Id];
        require(Id < IdForSale);
        require(msg.sender != info.seller, "You are the seller");
        require(msg.value == info.price, "Wrong Price!");
        require(info.state == false, "Cannot buy!");
        IERC721 NFT = IERC721(info.contractAddress);
        NFT.transferFrom(address(this), msg.sender, info.tokenId);
        uint price = msg.value * 97 / 100;
        payable(info.seller).transfer(price);
        payable(owner).transfer(msg.value - price);
        info.buyer = msg.sender;
        info.state = true;

    }


   
    
    function changeOwner(address _newOwner)public {
        require (owner == msg.sender);
        owner = _newOwner;
    }

}