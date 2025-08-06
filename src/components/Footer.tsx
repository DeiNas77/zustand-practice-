import { useQuestionStore } from "../store/Question";

export const Footer = () => {
	const questions = useQuestionStore((state) => state.questions);
	const reset = useQuestionStore((state) => state.reset);
	let correct = 0;
	let incorrect = 0;
	let unanswered = 0;

	questions.forEach((question) => {
		const { userSelectedAnswer, correctAnswer } = question;
		if (userSelectedAnswer == null) unanswered++;
		else if (userSelectedAnswer == correctAnswer) correct++;
		else incorrect++;
	});

	return (
		<footer className="flex justify-center flex-col mt-5">
			{" "}
			<p className="text-2xl text-white text-center">
				{`Correctas: ${correct} - Incorrectas ${incorrect} - Sin responder ${unanswered} `}
			</p>
			<div className="flex justify-center">
				<button
					className="p-2 mt-10  bg-orange-400 text-white rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-amber-600"
					onClick={() => reset()}>
					Reiniciar juego
				</button>
			</div>
		</footer>
	);
};
