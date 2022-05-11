import {
	Navbar,
	Container,
	Nav,
	NavbarBrand,
	Button,
	Overlay,
} from "react-bootstrap";
import { useState, useRef, React } from "react";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const Navigation = ({ accounts, setAccounts }) => {
	const isConneceted = Boolean(accounts[0]);

	async function connectAccount() {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccounts(accounts);
		}
	}

	//OVERLAY
	const [show, setShow] = useState(false);
	const target = useRef(null);
	return (
		<div className="nav-text">
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="light"
				style={{ opacity: "0.9" }}
			>
				<Container>
					<NavbarBrand href="#home" className="title" style={{ padding: "0" }}>
						MintMe.
					</NavbarBrand>
					<NavbarToggle aria-controls="responsive-navbar-nav" />
					<NavbarCollapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Button
								style={{
									background: "transparent",
									border: "0",
									color: "#490979",
								}}
								ref={target}
								onClick={() => setShow(!show)}
							>
								Important
							</Button>
							<Overlay target={target.current} show={show} placement="bottom">
								{({ placement, arrowProps, show: _show, popper, ...props }) => (
									<div
										{...props}
										style={{
											position: "absolute",
											backgroundColor: "#490979",
											padding: "2px 10px",
											color: "white",
											borderRadius: 3,
											...props.style,
										}}
									>
										Hey <span> 🤗 </span>! Re-connect your wallet if you reload
										the page <span> 🤙 </span>
									</div>
								)}
							</Overlay>
						</Nav>
						{isConneceted ? (
							<Nav.Link
								href={`https://etherscan.io/address/${accounts}`}
								target="_blank"
								rel="noopener noreferrer"
								className="button nav-button btn-sm mx-4"
							>
								<Button variant="outline-dark">Etherscan</Button>
							</Nav.Link>
						) : (
							<Button onClick={connectAccount} variant="outline-dark">
								Connect
							</Button>
						)}
					</NavbarCollapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Navigation;
