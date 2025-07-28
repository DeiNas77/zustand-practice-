import { create } from "zustand";

interface POST {
	id: number;
	title: string;
	body: string;
}

interface countState {
	count: number;
	title: string;
	posts: POST[];
	increaseCount: (value: number) => void;
	getPost: (url: string) => Promise<void>;
	multiply: (value: number) => void;
}

export const useCounterStore = create<countState>((set, get) => ({
	count: 10,
	title: "Initial value Counter Zustand",
	posts: [],
	increaseCount: (value: number) =>
		set((state) => ({ count: state.count + value })),
	getPost: async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		try {
			if (!response.ok) {
				throw new Error("network no conecto con la Api");
			}
		} catch (error) {
			console.log("Error", error);
		}
		return set({ posts: data });
	},
	multiply: (value: number) => {
		const { count } = get();
		set({ count: count * value });
	},
}));
