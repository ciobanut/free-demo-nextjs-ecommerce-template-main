import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "This is Forgot Password Page for NextCommerce Template",
};

const ForgotPassword = () => {
  return (
    <main>
      <Breadcrumb title="Forgot Password" pages={["Forgot Password"]} />

      <section className="py-20 lg:py-25">
        <div className="max-w-[470px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="rounded-md border border-gray-3 p-7.5 sm:p-12.5">
            <h2 className="font-semibold text-xl text-dark mb-4">
              Reset Your Password
            </h2>
            <p className="text-custom-sm mb-7.5">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            <form>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block font-medium text-custom-sm mb-2.5"
                >
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-3 py-3 px-5 outline-none focus:border-blue ease-out duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full font-medium text-custom-sm text-white bg-blue py-3 px-5 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                Send Reset Link
              </button>
            </form>

            <p className="text-center text-custom-sm mt-5">
              Remember your password?{" "}
              <a href="/signin" className="text-blue hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
