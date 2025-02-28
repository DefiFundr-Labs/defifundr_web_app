import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import logo from "../assets/logho.svg";
import rocket from "../assets/rocket.svg";
import cloud from "../assets/cloud.svg";
import onboardingBg from "../assets/onboarding_bg.png";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StarProps {
	size: number;
	position: { top: string; left: string };
	delay: number;
	duration: number;
}
const Star = ({ size, position, delay, duration }: StarProps) => {
	return (
		<motion.div
			className="absolute rounded-full bg-white/40"
			style={{
				width: size,
				height: size,
				top: position.top,
				left: position.left,
			}}
			initial={{ opacity: 0.2 }}
			animate={{
				opacity: [0.2, 0.7, 0.2],
				scale: [1, 1.2, 1],
			}}
			transition={{
				duration,
				delay,
				repeat: Infinity,
				repeatType: "loop",
			}}
		/>
	);
};

const Onboarding = () => {
	const [isFloating, setIsFloating] = useState(false);
	const [isLaunching, setIsLaunching] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const navigate = useNavigate();
	const rocketControls = useAnimation();
	const cloudControls = useAnimation();
	const whiteBackgroundControls = useAnimation();

	const generateStars = (count: number) => {
		const stars = [];
		for (let i = 0; i < count; i++) {
			const size = Math.random() * 11 + 3;
			const position = {
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
			};
			const delay = Math.random() * 5;
			const duration = Math.random() * 3 + 2;

			stars.push(
				<Star
					key={i}
					size={size}
					position={position}
					delay={delay}
					duration={duration}
				/>
			);
		}
		return stars;
	};

	// Create stars once on component mount
	const [stars] = useState(() => generateStars(40));

	useEffect(() => {
		const checkIfDesktop = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};

		checkIfDesktop();
		window.addEventListener("resize", checkIfDesktop);

		return () => window.removeEventListener("resize", checkIfDesktop);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsFloating(true);
		}, 800);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (isFloating && !isLaunching) {
			rocketControls.start("float");
			cloudControls.start("float");
		}
	}, [isFloating, isLaunching, rocketControls, cloudControls]);

	const handleGetStarted = async () => {
		if (isLaunching) return;
		setIsLaunching(true);

		// Stop floating animations
		rocketControls.stop();
		cloudControls.stop();

		// Start animations
		rocketControls.start("launch");
		cloudControls.start("launch");
		whiteBackgroundControls.start("expand");

		// Navigate to dashboard halfway through the animation
		setTimeout(() => {
			navigate("/");
			console.log("Redirecting to dashboard...");
		}, 800);
	};

	const rocketVariants = {
		initial: { y: 0 },
		float: {
			y: [-30, 0],
			transition: {
				y: {
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
					ease: "easeInOut",
				},
			},
		},
		launch: {
			y: -450,
			transition: { duration: 2, ease: [0.34, 1.56, 0.64, 1] },
		},
	};

	const cloudVariants = {
		initial: { y: 0 },
		float: {
			y: [-4, 4],
			transition: {
				y: {
					duration: 2.5,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
					ease: "easeInOut",
				},
			},
		},
		launch: (isDesktop: boolean) => ({
			y: isDesktop ? -500 : -440,
			transition: { duration: 2, ease: [0.34, 1.56, 0.64, 1] },
		}),
	};

	const whiteBackgroundVariants = {
		initial: { height: "65px" },
		expand: {
			height: "70%",
			transition: {
				duration: 2,
				ease: [0.34, 1.56, 0.64, 1],
			},
		},
	};

	// Desktop variant
	const desktopWhiteBackgroundVariants = {
		initial: { height: "15px" },
		expand: {
			height: "65%",
			transition: {
				duration: 2,
				ease: [0.34, 1.56, 0.64, 1],
			},
		},
	};

	return (
		<div className="flex min-h-screen flex-col lg:flex-row overflow-hidden">
			<div className="relative flex w-full lg:w-6/12 flex-col bg-gradient-to-b from-[#5a42de] to-[#4535b0] py-8 text-white h-screen">
				{/* Stars background */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">{stars}</div>

				<div className="flex w-full justify-between px-10">
					<img
						src={logo || "/placeholder.svg"}
						alt="logo"
					/>
					<button className="w-fit text-white hover:bg-white/10 flex items-center bg-[#0000001F] p-2 rounded-lg px-4">
						<ChevronLeft className="mr-2 h-4 w-4" />
						Back
					</button>
				</div>

				<div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center">
					<img
						src={logo || "/placeholder.svg"}
						alt="logo"
					/>
					<h1 className="mb-2 text-4xl font-bold md:text-5xl">You're all done!</h1>
					<p className="mb-12 text-lg text-white/90">Welcome To DefiFundr</p>

					<div className="relative mb-8 h-[294.8px] shrink-0 w-[170px] lg:w-[283.05px]">
						<motion.img
							src={rocket || "/placeholder.svg"}
							alt="Rocket illustration"
							className="h-full max-w-full object-contain absolute left-1/2 top-[50px] origin-bottom"
							style={{
								x: "-52%",
								zIndex: 9,
							}}
							animate={rocketControls}
							variants={rocketVariants}
							initial="initial"
						/>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center">
					<button
						className={`absolute bottom-4 z-20 text-white p-4 w-[327px] rounded-full mt-20 transition-all duration-300 ${isLaunching ? "bg-[#3b4270] cursor-not-allowed" : "bg-[#101323] hover:bg-[#1d2145] cursor-pointer"}`}
						onClick={handleGetStarted}
						disabled={isLaunching}>
						{isLaunching ? "Launching..." : "Get Started"}
					</button>

					<motion.img
						src={cloud || "/placeholder.svg"}
						alt="Cloud illustration"
						className="relative h-[350px] w-full object-contain"
						style={{ zIndex: 8 }}
						animate={cloudControls}
						variants={cloudVariants}
						custom={isDesktop}
						initial="initial"
					/>
				</div>

				<motion.div
					className="absolute bottom-0 left-0 w-full bg-white"
					style={{
						height: isDesktop ? "15px" : "65px",
						zIndex: 3,
					}}
					animate={whiteBackgroundControls}
					variants={isDesktop ? desktopWhiteBackgroundVariants : whiteBackgroundVariants}
					initial={false}
				/>
			</div>

			<div
				className="relative lg:flex hidden lg:w-9/12 flex-col justify-center bg-[#101323] p-8 text-white"
				style={{
					backgroundImage: `url(${onboardingBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
		</div>
	);
};

export default Onboarding;
