import "@/styles/globals.css";
import "@/styles/bootstrap.min.css";
import "@/styles/font-awesome.min.css";
import "@/styles/Resturant.css";
import "@/styles/Login.css";
import "@/styles/Signup.css";
import "@/styles/AdminNav.css";
import "@/styles/Catadrop.css";
import "@/styles/Table.css";
import "@/styles/Comments.css";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
