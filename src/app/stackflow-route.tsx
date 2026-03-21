/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

import type { ActivityEntry } from "./stackflow-util";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const InterviewPage = lazy(() => import("@/pages/interview/InterviewPage"));
const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
const OnboardingCompletePage = lazy(
  () => import("@/pages/onboarding/OnboardingCompletePage"),
);
const OnboardingInterestPage = lazy(
  () => import("@/pages/onboarding/OnboardingInterestPage"),
);
const OnboardingNamePage = lazy(
  () => import("@/pages/onboarding/OnboardingNamePage"),
);
const OnboardingQuizLevelPage = lazy(
  () => import("@/pages/onboarding/OnboardingQuizLevelPage"),
);
const QuizCompletePage = lazy(() => import("@/pages/quiz/QuizCompletePage"));
const QuizGradeLogDetailPage = lazy(
  () => import("@/pages/quiz/QuizGradeLogDetailPage"),
);
const QuizGradeLogPage = lazy(() => import("@/pages/quiz/QuizGradeLogPage"));
const QuizHomePage = lazy(() => import("@/pages/quiz/QuizHomePage"));
const QuizOXPage = lazy(() => import("@/pages/quiz/QuizOXPage"));
const QuizSelectPage = lazy(() => import("@/pages/quiz/QuizSelectPage"));
const QuizSubjectPage = lazy(() => import("@/pages/quiz/QuizSubjectPage"));
const QuizTextPage = lazy(() => import("@/pages/quiz/QuizTextPage"));
const QuizVoicePage = lazy(() => import("@/pages/quiz/QuizVoicePage"));
const RankingPage = lazy(() => import("@/pages/ranking/RankingPage"));
const StreakPage = lazy(() => import("@/pages/streak/StreakPage"));
const UserPage = lazy(() => import("@/pages/user/UserPage"));

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
    name: "QuizGradeLogPage",
    component: QuizGradeLogPage,
    path: "/quiz/grading",
  },
  {
    name: "QuizGradeLogDetailPage",
    component: QuizGradeLogDetailPage,
    path: "/quiz/grading/detail",
  },
  {
    name: "InterviewPage",
    component: InterviewPage,
    path: "/interview",
  },
];
