import { useCounterStore } from "../store/counterStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
const textInfo = "text-white text-2xl";

export const HeroSection = () => {
	const { count, title } = useCounterStore(
		useShallow((state) => ({
			count: state.count,
			title: state.title,
		}))
	);

	const { increaseCount, getPost, posts, multiply } = useCounterStore();

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
				<p className={`${textInfo}`}>
					{title}: {count}
				</p>
				<button
					className="bg-cyan-600 p-2 rounded-[.5rem] mt-[2rem] cursor-pointer"
					onClick={() => {
						increaseCount(2);
					}}>
					count more
				</button>
				<button
					className="bg-cyan-600 p-2 rounded-[.5rem] mt-[2rem] cursor-pointer"
					onClick={() => multiply(2)}>
					Multiply by 2{" "}
				</button>
			</div>
		</>
	);
};
