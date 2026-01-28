export interface RankingUser {
  id: string;
  rank: number;
  name: string;
  profileImageUrl?: string;
  university: string;
  position: string;
  score: number;
  isCurrentUser?: boolean;
}

export type RankingFilter = "all" | "backend" | "frontend" | "data";
