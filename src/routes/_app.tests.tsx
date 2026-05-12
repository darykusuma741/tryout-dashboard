import Tests from "@/pages/Tests";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tests")({
  component: Tests,
});
