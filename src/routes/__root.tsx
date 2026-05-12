import ErrorComponent from "@/components/dashboard/ErrorComponent";
import NotFound from "@/components/dashboard/NotFound";
import RootComponent from "@/components/dashboard/RootComponent";
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import RootShell from "../components/dashboard/RootShell";
import appCss from "../index.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tryout Studio — Admin" },
      {
        name: "description",
        content: "Premium admin dashboard for tryout / exam systems.",
      },
      { property: "og:title", content: "Tryout Studio — Admin" },
      { name: "twitter:title", content: "Tryout Studio — Admin" },
      {
        property: "og:description",
        content: "Premium admin dashboard for tryout / exam systems.",
      },
      {
        name: "twitter:description",
        content: "Premium admin dashboard for tryout / exam systems.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2cd082e7-f894-400e-8a23-312e1c4d97b1/id-preview-1b2fc4c1--054bc0b1-fc19-4edc-8546-17f487119dd4.lovable.app-1778494758209.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2cd082e7-f894-400e-8a23-312e1c4d97b1/id-preview-1b2fc4c1--054bc0b1-fc19-4edc-8546-17f487119dd4.lovable.app-1778494758209.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootShell,
  errorComponent: ErrorComponent,
  component: RootComponent,
});
