import Tryouts from "@/pages/Tryouts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tryouts")({
  component: Tryouts,
});
