import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recently Viewed",
  description: "This is Recently Viewed Page for NextCommerce Template",
};

const RecentlyViewed = () => {
  return (
    <main>
      <Breadcrumb title="Recently Viewed" pages={["Recently Viewed"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <svg
              className="mx-auto mb-8 fill-current text-gray-4"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM12 20.25C7.455 20.25 3.75 16.545 3.75 12C3.75 7.455 7.455 3.75 12 3.75C16.545 3.75 20.25 7.455 20.25 12C20.25 16.545 16.545 20.25 12 20.25ZM12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5V11.6893L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V7.5C11.25 7.08579 11.5858 6.75 12 6.75Z"
                fill=""
              />
            </svg>
            <h2 className="font-semibold text-2xl text-dark mb-4">
              No Recently Viewed Items
            </h2>
            <p className="text-custom-sm text-dark-4 mb-8">
              You haven&apos;t viewed any products yet. Start shopping to see
              your recently viewed items here.
            </p>
            <a
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecentlyViewed;
