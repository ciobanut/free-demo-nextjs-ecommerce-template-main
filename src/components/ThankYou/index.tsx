"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

type OrderSummary = {
  orderNumber: string;
  total: number;
  itemCount: number;
};

const ThankYou = () => {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("last_order");
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  return (
    <>
      <Breadcrumb title={"Thank You"} pages={["thank you"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
            <div className="text-center">
              <div className="mx-auto mb-7.5 flex items-center justify-center w-20 h-20 rounded-full bg-green-light-6">
                <svg
                  className="fill-current text-green"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill=""
                  />
                </svg>
              </div>

              <h2 className="font-bold text-blue text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                Thank You!
              </h2>

              <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                Your order has been placed successfully
              </h3>

              <p className="max-w-[491px] w-full mx-auto mb-7.5">
                We&apos;ve received your order and we&apos;re getting it
                ready. You&apos;ll receive a confirmation email shortly with
                your order details.
              </p>

              {order && (
                <div className="max-w-[400px] w-full mx-auto mb-7.5 bg-gray-1 rounded-md p-5 text-left">
                  <div className="flex items-center justify-between py-2 border-b border-gray-3">
                    <span className="text-dark-4">Order Number</span>
                    <span className="font-medium text-dark">
                      {order.orderNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-3">
                    <span className="text-dark-4">Items</span>
                    <span className="font-medium text-dark">
                      {order.itemCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-dark-4">Total</span>
                    <span className="font-medium text-dark">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <Link
                href="/"
                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                    fill=""
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
