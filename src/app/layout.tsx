import { Inria_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib/providers";
import NavBar from "@/components/NavBar";

const inria = Inria_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inria.className}>
        <Providers>
          <NavBar />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
