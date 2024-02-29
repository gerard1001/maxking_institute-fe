import type { Metadata } from "next";
import Home from "./home/page";

export default function IndexPage() {
  return (
    <div className="">
      <Home />
    </div>
  );
}

export const metadata: Metadata = {
  title: "MaxKing Institute",
};
