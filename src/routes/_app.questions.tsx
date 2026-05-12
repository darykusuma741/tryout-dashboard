import Questions from "@/pages/Questions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/questions")({
  component: Questions,
});
