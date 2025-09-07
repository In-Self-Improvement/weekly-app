import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AppRequest = {
  id: string;
  request_text: string;
  user_email?: string;
  status: "pending" | "in_review" | "in_progress" | "completed" | "rejected";
  votes: number;
  created_at: string;
  updated_at: string;
};

export type RequestVote = {
  id: string;
  request_id: string;
  user_identifier: string;
  created_at: string;
};
