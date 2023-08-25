import React, { useContext, useState } from 'react';
import GlobalContext from '../../context/globalcontext';
import 'bulma/css/bulma.css';
import { Network, Alchemy } from 'alchemy-sdk';

const Myprofil = () => {
    const { address } = useContext(GlobalContext);

    const [nfts, setNfts] = useState([]);

    const getAssets = async () => {
        const settings = {
            apiKey: "EmKwl1-viETOwC8QSBPU3cVLxSnULLQD",
            network: Network.ETH_SEPOLIA,
        };

        const alchemy = new Alchemy(settings);

        const nftsResponse = await alchemy.nft.getNftsForOwner(address);
        const nftsArray = Array.from(nftsResponse.ownedNfts);
        setNfts(nftsArray);
        console.log("nfts",nftsResponse)
    };

    const renderNfts = () => {
        if (nfts.length === 0) {
            return (
                <div>
                    <h2>You dont have any nft </h2>
                </div>
            );
        } else {
            return nfts.map((nft, index) => {
                return (
                    <div key={index} className="card">
                        <div className="card-image">
                            <img src={nft.media[0].raw} alt={nft.tokenId} />
                        </div>
                        <div className="card-content">
                            <p className="card-title">Token id: {nft.tokenId}</p>
                            <p className="card-subtitle">Contrat adress: {nft.contract.address}</p>
                            <p className="card-text">NFT Senbol: {nft.contract.symbol}</p>
                            <p className="card-text">NFT Name: {nft.title}</p>
                        </div>
                    </div>
                );
            });
        }
    };

    return (
        <div>
            <button className="button is-dark" onClick={getAssets}>
                Show my nfts
          </button>
            <br /> <br />
            <div>
                <h1>My NFTs</h1>
                <br />
                {renderNfts()}
            </div>
        </div>
    );
};

export default Myprofil;

