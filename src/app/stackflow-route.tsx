import HomePage from "@/pages/home/HomePage";
import InterviewPage from "@/pages/interview/InterviewPage";
import LoginPage from "@/pages/login/LoginPage";
import OnboardingInterestPage from "@/pages/onboarding/OnboardingInterestPage";
import OnboardingNamePage from "@/pages/onboarding/OnboardingNamePage";
import QuizHomePage from "@/pages/quiz-home/QuizHomePage";
import RankingPage from "@/pages/ranking/RankingPage";
import StreakPage from "@/pages/streak/StreakPage";
import UserPage from "@/pages/user/UserPage";
import type { ActivityEntry } from "./stackflow-util";
import OnboardingCompletePage from "@/pages/onboarding/OnboardingCompletePage";

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
    path: "/quiz-home",
  },
  {
    name: "InterviewPage",
    component: InterviewPage,
    path: "/interview",
  },
];
