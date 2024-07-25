import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib/providers/redux.provider";
import NavBar from "@/components/NavBar";
import { Suspense, useContext } from "react";
import { SuspenseLoading } from "@/components/SuspenseLoading";
import CustomThemeProvider from "@/lib/theme/mui.theme";
import SnackProvider from "@/lib/providers/snack.provider";
import LoginContextProvider from "@/lib/context/LoginContext";
import TimeLocalProvider from "@/lib/providers/localization.provider";
import QuillContextProvider from "@/lib/context/QuillContext";
import "@/styles/home/slick.style.scss";
import "@/styles/home/slick-theme.style.scss";
import "@/styles/articles/slick.style.scss";
import "@/styles/articles/slick-theme.style.scss";

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
          <TimeLocalProvider>
            <Providers>
              <LoginContextProvider>
                <QuillContextProvider>
                  <CustomThemeProvider>
                    <SnackProvider>
                      <NavBar />
                      {props.children}
                    </SnackProvider>
                  </CustomThemeProvider>
                </QuillContextProvider>
              </LoginContextProvider>
            </Providers>
          </TimeLocalProvider>
        </Suspense>
      </body>
    </html>
  );
}
