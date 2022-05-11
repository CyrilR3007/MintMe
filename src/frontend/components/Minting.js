import { useState, React } from "react";
import { ethers, BigNumber } from "ethers";
import mintMeNFT from "../../MintMeNFT.json";

const mintMeNFTAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Minting = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConneceted = Boolean(accounts[0]);

	async function handleMint() {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				mintMeNFTAddress,
				mintMeNFT.abi,
				signer
			);
			try {
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
				});
				console.log("response", response);
			} catch (error) {
				console.log("error", error);
			}
		}
	}

	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};

	const handleIncrement = () => {
		if (mintAmount >= 3) return;
		setMintAmount(mintAmount + 1);
	};
	return (
		<div className="relative flex flex-col justify-center  items-center overflow-hidden bg-transparent py-6 sm:py-60 ">
			<div className="relative dark:bg-slate-800 transition-opacity duration-500 ease-out opacity-80 hover:opacity-100 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
				<div className="mx-auto max-w-md">
					<div className="space-y-6 pt-4 leading-7 text-white">
						<h1 className="title text-white">MintMe.</h1>
						<p>You can Mint by clicking the button down below !</p>
						<div className=" flex justify-center items-center pb-3 ">
							<svg className="animate-bounce h-10 w-10  ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="#490979"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
									/>
								</svg>
							</svg>
						</div>
					</div>
					{isConneceted ? (
						<div className="flex justify-center pt-4 gap-4 border-t-2 border-white">
							<button
								onClick={handleDecrement}
								className="bg-purple-400 rounded"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="white"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
							<span className="text-white">{mintAmount}</span>
							<button
								onClick={handleIncrement}
								className="bg-purple-400 rounded"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="white"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>

							<button onClick={handleMint} className=" bg-white rounded w-50">
								MintMe.
							</button>
						</div>
					) : (
						<p className="text-white">You must be connected to Mint.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Minting;
