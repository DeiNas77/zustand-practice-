import { create } from "zustand";
import { type Question } from "../types/questions";
import { persist } from "zustand/middleware";

interface QuestionStore {
	questions: Question[];
	currentQuestion: number;
	fetchQuestion: (limit: number) => Promise<void>;
	userSelectedAnswer: (questionId: number, answerIndex: number) => void;
	goNextQuestion: () => void;
	goPrevQuestion: () => void;
	reset: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
	persist(
		(set, get) => {
			return {
				questions: [],
				currentQuestion: 0,

				fetchQuestion: async (limit: number) => {
					try {
						const response = await fetch("http://localhost:5173/data.json");
						const data = await response.json();
						const questions = data
							.sort(() => Math.random() - 0.5)
							.slice(0 - limit);
						console.log(questions);
						set({ questions });
					} catch (error) {
						console.log("Error fetching questions:", error);
					}
				},

				userSelectedAnswer: (questionId, answerIndex) => {
					//Obtenemos las preguntas actuakes
					const { questions } = get();
					//Realizamos una copia de las preguntas a profundidad
					//para evitar mutaciones directas al estado
					const newQuestions = structuredClone(questions);
					//Encontramos el indice de la pregunta seleccionada
					const questionIndex = newQuestions.findIndex(
						(q) => q.id === questionId
					);
					//Obtenemos la informacion de la pregunta seleccionada
					const questionInfo = newQuestions[questionIndex];
					//Verificamos si la respuesta es correcta
					const isCorrectUserAnswer =
						questionInfo.correctAnswer === answerIndex;
					//Actualizamos la pregunta con la respuesta del usuario
					newQuestions[questionIndex] = {
						...questionInfo,
						isCorrectUserAnswer,
						userSelectedAnswer: answerIndex,
					};
					set({ questions: newQuestions });
				},

				goNextQuestion: () => {
					const { currentQuestion, questions } = get();
					const nextQuestion = currentQuestion + 1;

					if (nextQuestion < questions.length) {
						set({ currentQuestion: nextQuestion });
					}
				},

				goPrevQuestion: () => {
					const { currentQuestion } = get();
					const goPrevQuestion = currentQuestion - 1;

					if (goPrevQuestion >= 0) {
						set({ currentQuestion: goPrevQuestion });
					}
				},
				reset: () => {
					set({ questions: [], currentQuestion: 0 });
				},
			};
		},
		{
			name: "questions",
		}
	)
);
