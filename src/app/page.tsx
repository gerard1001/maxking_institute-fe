import type { Metadata } from "next";
import HomePage from "./home/page";

export default function IndexPage() {
  return (
    <div className="">
      <HomePage />
    </div>
  );
}

export const metadata: Metadata = {
  title: "MaxKing Institute",
};
