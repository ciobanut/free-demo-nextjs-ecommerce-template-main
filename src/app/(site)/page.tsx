import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Home E-commerce",
  description: "This is Home for Demo home page",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
