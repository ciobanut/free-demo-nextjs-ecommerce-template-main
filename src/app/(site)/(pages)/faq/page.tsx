import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "This is FAQ Page for NextCommerce Template",
};

const FAQ = () => {
  return (
    <main>
      <Breadcrumb title="FAQ" pages={["FAQ"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[770px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="mb-10">
            <h2 className="font-semibold text-xl text-dark mb-6">
              How do I place an order?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-semibold text-xl text-dark mb-6">
              What payment methods do you accept?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-semibold text-xl text-dark mb-6">
              How long does shipping take?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-semibold text-xl text-dark mb-6">
              Can I return or exchange an item?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-semibold text-xl text-dark mb-6">
              How do I track my order?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl text-dark mb-6">
              How can I contact customer support?
            </h2>
            <p className="text-custom-sm leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam. You can
              reach us at{" "}
              <a href="/contact" className="text-blue hover:underline">
                our contact page
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
