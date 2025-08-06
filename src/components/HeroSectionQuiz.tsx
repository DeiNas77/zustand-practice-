import { useQuestionStore } from "../store/Question";
import { Game } from "./Game";
import { JavascriptLogo } from "./JavascriptLogo";
import { Start } from "./Start";

export const HeroSectionQuiz = () => {
	const questions = useQuestionStore((state) => state.questions);
	console.log(questions);

	return (
		<main>
			<div className="max-w-[700px] mx-auto p-4 ">
				<div className="flex items-center justify-center gap-2 mt-[2rem]">
					<JavascriptLogo />
					<h1 className="text-4xl text-white font-sans text-center">
						Javascript Quiz
					</h1>
				</div>
				{questions.length === 0 && <Start />}
				{questions.length > 0 && <Game />}
			</div>
		</main>
	);
};
