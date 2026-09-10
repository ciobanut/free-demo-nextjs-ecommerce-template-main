import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns",
  description: "This is Returns Page for NextCommerce Template",
};

const Returns = () => {
  return (
    <main>
      <Breadcrumb title="Returns" pages={["Returns"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[770px] mx-auto px-4 sm:px-8 xl:px-0">
          <h2 className="font-semibold text-xl text-dark mb-6">
            Return Policy
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            We want you to be completely satisfied with your purchase. If for
            any reason you are not happy with your order, you may return it
            within 30 days of delivery. Items must be unused, in their original
            packaging, and in the same condition as received. Certain products
            may be excluded from our return policy due to hygiene or custom
            order restrictions.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            How to Return an Item
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            To initiate a return, log in to your account and navigate to the
            order history section. Select the order containing the item you
            wish to return and follow the on-screen instructions. You will
            receive a return shipping label to print and attach to your package.
            Once we receive the item, our team will inspect it and process
            your return accordingly.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Refund Process
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            After your return has been received and inspected, we will notify
            you of the approval or rejection of your refund. Approved refunds
            are processed within 5 to 10 business days and credited to the
            original payment method. Shipping costs for returns are the
            responsibility of the customer unless the item was defective or
            incorrectly shipped.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Exchanges
          </h2>
          <p className="text-custom-sm leading-relaxed">
            If you would like to exchange an item for a different size, color,
            or product, please initiate a return and place a new order. We do
            not process direct exchanges, but our customer support team can
            assist you with finding the right product. If you have any questions
            about exchanges, please reach out to us at support@example.com or
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

export default Returns;