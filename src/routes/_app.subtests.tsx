import SubTests from "@/pages/SubTests";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subtests")({
  component: SubTests,
});
