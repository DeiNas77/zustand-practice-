import { useQuestionStore } from "../store/Question";
import type { Question as QuestionType } from "../types/questions";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info;

	if (userSelectedAnswer == null) return "transparent";

	if (index === correctAnswer) return "bg-green-700";

	if (index === userSelectedAnswer && userSelectedAnswer !== correctAnswer)
		return "bg-red-700";

	return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionStore((state) => state.userSelectedAnswer);

	const handleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex);
	};

	return (
		<div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg mt-[1rem]">
			<h1 className="text-2xl text-white">{info.question}</h1>
			<SyntaxHighlighter
				language="javascript"
				style={atomOneDark}
				className="w-full mt-5">
				{info.code}
			</SyntaxHighlighter>
			<div className="flex flex-col mt-2.5 bg-violet-950 w-full rounded-lg">
				{info.answer.map((item, index) => {
					return (
						<div key={index} className="p-2">
							<button
								className={`p-2 bg-gray-700 text-white rounded w-full cursor-pointer transition-all duration-100 ease-in-out  ${
									info.userSelectedAnswer == null
										? "hover:bg-gray-500"
										: getBackgroundColor(info, index)
								}`}
								disabled={info.userSelectedAnswer != null}
								onClick={handleClick(index)}>
								{item}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const Game = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
	const goPrevQuestion = useQuestionStore((state) => state.goPrevQuestion);

	const currentInfo = questions[currentQuestion];
	console.log("Current Question Info:", currentInfo);

	return (
		<>
			<div className="flex flex-row text-white text-2xl">
				<button
					className="bg-transparent text-white-700 dark:text-gray-200 font-semibold border border-gray-300 rounded-md pl-2 py-1 mr-3  focus:outline-none  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={goPrevQuestion}
					disabled={currentQuestion === 0}>
					<svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
						<path d="M10 18l-8-8 8-8 1.414 1.414L4.828 10l6.586 6.586L10 18z" />
					</svg>
				</button>
				{currentQuestion + 1} / {questions.length}
				<button
					className="bg-transparent text-white-700 font-semibold border border-gray-300 rounded-md pr-2 py-1 ml-3 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={goNextQuestion}
					disabled={currentQuestion >= questions.length - 1}>
					<svg className="h-6 w-6  fill-current" viewBox="0 0 20 20">
						<path d="M10 2l8 8-8 8-1.414-1.414L15.172 10l-6.586-6.586L10 2z" />
					</svg>
				</button>
			</div>
			<Question info={currentInfo} />
			<Footer />
		</>
	);
};
