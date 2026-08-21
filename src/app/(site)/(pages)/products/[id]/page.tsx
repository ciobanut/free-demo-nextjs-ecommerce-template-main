import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
  description: "Product Details Page for NextCommerce Template",
};

const ProductDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  );
};

export default ProductDetailsPage;
