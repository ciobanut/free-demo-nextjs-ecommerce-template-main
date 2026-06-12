import Environment from "@/components/Environment";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Environment Page",
  description: "This is Environment page for customization and testing",
  // other metadata
};

const EnvironmentPage = () => {
  return (
    <main>
      <Environment />
    </main>
  );
};

export default EnvironmentPage;
