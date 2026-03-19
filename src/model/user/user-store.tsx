import type { MyProfileData, QuizLevel } from "@/api/user/api.type";
import { create } from "zustand";

interface UserState {
  profile: MyProfileData | null;
  name: string;
  interest: number;
  quizLevel: QuizLevel;
  setProfile: (profile: MyProfileData | null) => void;
  setName: (name: string) => void;
  setInterest: (interest: number) => void;
  setQuizLevel: (quizLevel: QuizLevel) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  name: "",
  interest: 0,
  quizLevel: "JUNIOR",
  setProfile: (profile) => set({ profile }),
  setName: (name) => set({ name }),
  setInterest: (interest) => set({ interest }),
  setQuizLevel: (quizLevel) => set({ quizLevel }),
}));
