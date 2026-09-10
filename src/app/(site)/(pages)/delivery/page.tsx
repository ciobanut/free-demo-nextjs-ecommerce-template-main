import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery",
  description: "This is Delivery Page for NextCommerce Template",
};

const Delivery = () => {
  return (
    <main>
      <Breadcrumb title="Delivery" pages={["Delivery"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[770px] mx-auto px-4 sm:px-8 xl:px-0">
          <h2 className="font-semibold text-xl text-dark mb-6">
            Delivery Options
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            We offer a variety of delivery options to suit your needs. Standard
            shipping is available for all orders and is handled by our trusted
            logistics partners. Express delivery is also available for those who
            need their items quickly. You can select your preferred delivery
            method during the checkout process.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Shipping Times
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Standard delivery typically takes between 3 to 7 business days
            depending on your location. Express delivery ensures your order
            arrives within 1 to 3 business days. International shipments may
            take longer due to customs processing. All estimated delivery times
            are calculated from the date of dispatch, not the date of order.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Delivery Costs
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Delivery costs vary depending on the shipping method selected and
            the destination address. Standard shipping is free for orders above
            a certain threshold. Express shipping incurs an additional fee that
            will be displayed at checkout. We strive to keep our delivery costs
            competitive and transparent at all times.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Tracking Your Order
          </h2>
          <p className="text-custom-sm leading-relaxed">
            Once your order has been dispatched, you will receive a confirmation
            email with a tracking number. You can use this number to monitor
            the status of your shipment through our delivery partner's website.
            If you experience any issues with tracking, please reach out to us
            at support@example.com or through our{" "}
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

export default Delivery;