import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "This is Reviews Page for NextCommerce Template",
};

const Reviews = () => {
  return (
    <main>
      <Breadcrumb title="Reviews" pages={["Reviews"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[770px] mx-auto px-4 sm:px-8 xl:px-0">
          <h2 className="font-semibold text-xl text-dark mb-6">
            Customer Reviews
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Our customers are the backbone of our community and their feedback
            matters greatly. Every review helps us improve our products and
            services. We encourage all customers to leave honest and detailed
            reviews after their purchase. Your experience helps other shoppers
            make informed decisions.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            How Reviews Work
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            After completing a purchase, you will receive an invitation to leave
            a review. Reviews can include a star rating, a written description,
            and optional photos of the product. Our moderation team reviews all
            submissions to ensure they meet our community guidelines. Approved
            reviews are published within 48 hours.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Verified Purchases
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Reviews from verified purchases are marked with a special badge to
            indicate authenticity. This badge helps other customers trust the
            feedback they read. We only display reviews from customers who have
            actually bought and received the product. This ensures a fair and
            transparent review system for everyone.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Review Guidelines
          </h2>
          <p className="text-custom-sm leading-relaxed">
            We ask that all reviewers remain respectful and constructive in
            their feedback. Please avoid using offensive language or making
            personal attacks. Reviews should focus on the product itself and
            the overall shopping experience. If you need help with a product
            or have a complaint, please contact us at support@example.com or
            through our{" "}
            <a href="/contact" className="text-blue hover:underline">
              contact page
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
};

export default Reviews;