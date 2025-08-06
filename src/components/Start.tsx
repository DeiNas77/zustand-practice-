import { useQuestionStore } from "../store/Question";

const MAX_QUESTIONS = 5;

export const Start = () => {
	const fetchQuestions = useQuestionStore((state) => state.fetchQuestion);
	const handleClick = async () => {
		await fetchQuestions(MAX_QUESTIONS);
	};

	return (
		<button
			className="p-[.5rem] bg-amber-700 transition duration-500 ease-in-out hover:bg-amber-400  flex justify-center mt-2 rounded-2xl cursor-pointer m-auto"
			onClick={handleClick}>
			¡Empezar!
		</button>
	);
};
