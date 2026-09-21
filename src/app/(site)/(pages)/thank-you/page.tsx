import React from "react";
import ThankYou from "@/components/ThankYou";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thank You Page",
  description: "This is Thank You Page for NextCommerce Template",
  // other metadata
};

const ThankYouPage = () => {
  return (
    <main>
      <ThankYou />
    </main>
  );
};

export default ThankYouPage;
