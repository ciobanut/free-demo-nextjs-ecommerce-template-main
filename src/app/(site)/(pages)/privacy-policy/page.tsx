import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "This is Privacy Policy Page for NextCommerce Template",
};

const PrivacyPolicy = () => {
  return (
    <main>
      <Breadcrumb title="Privacy Policy" pages={["Privacy Policy"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[770px] mx-auto px-4 sm:px-8 xl:px-0">
          <h2 className="font-semibold text-xl text-dark mb-6">
            Information We Collect
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            How We Use Your Information
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
            omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">
            Data Protection
          </h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">Cookies</h2>
          <p className="text-custom-sm leading-relaxed mb-8">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>

          <h2 className="font-semibold text-xl text-dark mb-6">Contact Us</h2>
          <p className="text-custom-sm leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at support@example.com or through our{" "}
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

export default PrivacyPolicy;
