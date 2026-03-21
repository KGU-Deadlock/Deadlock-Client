import HomePage from "@/pages/home/HomePage";
import InterviewPage from "@/pages/interview/InterviewPage";
import LoginPage from "@/pages/login/LoginPage";
import OnboardingCompletePage from "@/pages/onboarding/OnboardingCompletePage";
import OnboardingInterestPage from "@/pages/onboarding/OnboardingInterestPage";
import OnboardingNamePage from "@/pages/onboarding/OnboardingNamePage";
import OnboardingQuizLevelPage from "@/pages/onboarding/OnboardingQuizLevelPage";
import QuizCompletePage from "@/pages/quiz/QuizCompletePage";
import QuizHomePage from "@/pages/quiz/QuizHomePage";
import QuizOXPage from "@/pages/quiz/QuizOXPage";
import QuizSelectPage from "@/pages/quiz/QuizSelectPage";
import QuizSubjectPage from "@/pages/quiz/QuizSubjectPage";
import QuizTextPage from "@/pages/quiz/QuizTextPage";
import QuizVoicePage from "@/pages/quiz/QuizVoicePage";
import RankingPage from "@/pages/ranking/RankingPage";
import StreakPage from "@/pages/streak/StreakPage";
import UserPage from "@/pages/user/UserPage";

import type { ActivityEntry } from "./stackflow-util";

export const Route: ActivityEntry[] = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
  {
    name: "LoginPage",
    component: LoginPage,
    path: "/login",
  },
  {
    name: "OnboardingNamePage",
    component: OnboardingNamePage,
    path: "/onboarding/name",
  },
  {
    name: "OnboardingInterestPage",
    component: OnboardingInterestPage,
    path: "/onboarding/interest",
  },
  {
    name: "OnboardingQuizLevelPage",
    component: OnboardingQuizLevelPage,
    path: "/onboarding/quiz-level",
  },
  {
    name: "OnboardingCompletePage",
    component: OnboardingCompletePage,
    path: "/onboarding/complete",
  },
  {
    name: "RankingPage",
    component: RankingPage,
    path: "/ranking",
  },
  {
    name: "StreakPage",
    component: StreakPage,
    path: "/streak",
  },
  {
    name: "UserPage",
    component: UserPage,
    path: "/user",
  },
  {
    name: "QuizHomePage",
    component: QuizHomePage,
    path: "/quiz/home",
  },
  {
    name: "QuizSubjectPage",
    component: QuizSubjectPage,
    path: "/quiz/subject",
  },
  {
    name: "QuizOXPage",
    component: QuizOXPage,
    path: "/quiz/ox",
  },
  {
    name: "QuizVoicePage",
    component: QuizVoicePage,
    path: "/quiz/voice",
  },
  {
    name: "QuizSelectPage",
    component: QuizSelectPage,
    path: "/quiz/select",
  },
  {
    name: "QuizTextPage",
    component: QuizTextPage,
    path: "/quiz/text",
  },
  {
    name: "QuizCompletePage",
    component: QuizCompletePage,
    path: "/quiz/complete",
  },
  {
    name: "InterviewPage",
    component: InterviewPage,
    path: "/interview",
  },
];
