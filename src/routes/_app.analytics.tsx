import Analytics from "@/pages/Analytics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/analytics")({
  component: Analytics,
});
