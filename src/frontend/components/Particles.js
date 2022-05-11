import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../Styles/App.css";

const ParticleBackground = () => {
	const particlesInit = async (main) => {
		console.log(main);

		await loadFull(main);
	};

	const particlesLoaded = (container) => {
		console.log(container);
	};
	return (
		<div id="particles">
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					fullScreen: {
						zIndex: 0,
					},
					fpsLimit: 120,
					interactivity: {
						events: {
							onClick: {
								enable: false,
								mode: "push",
							},
							onHover: {
								enable: true,
								mode: "connect",
								parallax: {
									force: 60,
								},
							},
						},
						modes: {
							bubble: {
								distance: 400,
								duration: 2,
								opacity: 0.8,
								size: 40,
								divs: {
									distance: 200,
									duration: 0.4,
									mix: false,
									selectors: [],
								},
							},
							grab: {
								distance: 400,
							},
							repulse: {
								divs: {
									distance: 200,
									duration: 0.4,
									factor: 100,
									speed: 1,
									maxSpeed: 50,
									easing: "ease-out-quad",
									selectors: [],
								},
							},
						},
					},
					particles: {
						color: {
							value: "#fff",
						},
						links: {
							color: {
								value: "#fff",
							},
							distance: 150,
							enable: true,
							opacity: 0.3,
							shadow: {
								color: {
									value: "#000000",
								},
								enable: true,
							},
						},

						move: {
							attract: {
								rotate: {
									x: 1200,
									y: 1200,
								},
							},
							enable: true,
							outModes: {
								bottom: "out",
								left: "out",
								right: "out",
								top: "out",
							},
						},
						number: {
							density: {
								enable: true,
							},
							value: 80,
						},
						opacity: {
							value: 0.5,
							animation: {
								speed: 1,
								minimumValue: 0.1,
							},
						},
						shadow: {
							blur: 5,
							color: {
								value: "#f0d1d4",
							},
							enable: true,
							offset: {
								x: 0,
								y: 0,
							},
						},
						size: {
							random: {
								enable: true,
							},
							value: {
								min: 5,
								max: 10,
							},
							animation: {
								speed: 40,
								minimumValue: 0.1,
							},
						},
					},
				}}
			/>
		</div>
	);
};

export default ParticleBackground;
