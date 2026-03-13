import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
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
    name: "OnboardingPage",
    component: OnboardingPage,
    path: "/onboarding",
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
];
