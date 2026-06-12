import Environment from "@/components/Environment";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Account | NextCommerce Nextjs E-commerce template",
  description: "This is My Account page for NextCommerce Template",
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
