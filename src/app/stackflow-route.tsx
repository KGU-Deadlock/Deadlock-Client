import HomePage from "../pages/home/HomePage";
import type { ActivityEntry } from "./stackflow-util";

export const Route: ActivityEntry[] = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
];
