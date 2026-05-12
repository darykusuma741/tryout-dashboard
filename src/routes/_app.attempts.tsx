import Attempts from "@/pages/Attempts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/attempts")({
  component: Attempts,
});
