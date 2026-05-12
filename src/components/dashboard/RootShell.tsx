import { HeadContent, Scripts } from "@tanstack/react-router";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeadContent />
      <div id="root-app">{children}</div>
      <Scripts />
    </>
    // <html lang="en" suppressHydrationWarning>
    //   <head>
    //     <HeadContent />
    //   </head>
    //   <body>
    //     <div id="root-app">{children}</div>
    //     <Scripts />
    //   </body>
    // </html>
  );
}

export default RootShell;
