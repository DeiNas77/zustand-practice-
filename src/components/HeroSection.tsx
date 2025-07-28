import { useCounterStore } from "../store/counterStore";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";
const textInfo = "text-white text-2xl";

export const HeroSection = () => {
	const [increaseAmount, setIncreaseAmount] = useState(2);

	const { count, title } = useCounterStore(
		useShallow((state) => ({
			count: state.count,
			title: state.title,
		}))
	);

	const {
		increaseCount,
		decreaseCount,
		getPost,
		posts,
		multiply,
		increaseByAmount,
		reset,
	} = useCounterStore();

	useEffect(() => {
		getPost("https://jsonplaceholder.typicode.com/posts");
	}, [getPost]);

	const postSection = posts.slice(0, 20);

	console.log(getPost);
	return (
		<>
			<div className="p-[2rem]">
				<p className="text-white pb-3 text-2xl">List of placeHolderJson</p>
				{postSection.map((item) => (
					<div key={item.id}>
						<p className="text-white">{item.title}</p>
					</div>
				))}
			</div>
			<div className=" items-center justify-center flex flex-col my-[2rem]">
				<div className="flex items-center justify-center">
					<button
						className="bg-cyan-600 py-[.5rem] px-[1rem] rounded-[.5rem] mr-3  cursor-pointer"
						onClick={() => {
							increaseCount(2);
						}}>
						+
					</button>
					<p className={`${textInfo}`}>
						{title}: {count}
					</p>
					<button
						className="bg-cyan-600 py-[.5rem] px-[1rem]  rounded-[.5rem] ml-3  cursor-pointer"
						onClick={() => {
							decreaseCount(2);
						}}>
						-
					</button>
				</div>
				<button
					className="bg-cyan-600 p-2 rounded-[.5rem] mt-[2rem] cursor-pointer"
					onClick={() => multiply(2)}>
					Multiply by 2{" "}
				</button>
				<div className="flex items-center my-[1rem]">
					<input
						value={increaseAmount}
						type="number"
						onChange={(e) => setIncreaseAmount(Number(e.target.value))}
						className="bg-white inline-flex mr-2 p-2"
						size={increaseAmount.toString().length || 0}
					/>
					<button
						className="bg-cyan-600 p-2 rounded-[.5rem]  cursor-pointer"
						onClick={() => increaseByAmount(increaseAmount)}>
						Add increase ByDefault
					</button>
				</div>
				<button
					className="bg-cyan-600 p-2 rounded-[.5rem] mt-2  cursor-pointer"
					onClick={() => reset()}>
					Reset
				</button>
			</div>
		</>
	);
};
