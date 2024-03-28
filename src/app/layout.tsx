import { Inria_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib/providers";
import NavBar from "@/components/NavBar";
import { Suspense } from "react";
import { SuspenseLoading } from "@/components/SuspenseLoading";

const inria = Inria_Sans({ weight: "400", subsets: ["latin"] });
const source = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {" "}
        <link rel="icon" href="/pagelogo.png" type="image/png" sizes="any" />
      </head>
      <body className={source.className}>
        <Suspense fallback={<SuspenseLoading />}>
          <Providers>
            <NavBar />
            {props.children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
