"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import { EnvironmentProvider, useEnvironment } from "../context/EnvironmentContext";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import DebugPanel from "@/debug/components/DebugPanel";
import { getEnvironmentConfig } from "@/config/environments";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { currentEnvironment } = useEnvironment();
  const envConfig = getEnvironmentConfig(currentEnvironment);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <ReduxProvider>
            <CartModalProvider>
              <ModalProvider>
                <PreviewSliderProvider>
                  <Header />
                  {children}

                  <QuickViewModal />
                  <CartSidebarModal />
                  <PreviewSliderModal />
                  <DebugPanel />
                </PreviewSliderProvider>
              </ModalProvider>
            </CartModalProvider>
          </ReduxProvider>
          <ScrollToTop />
          <Footer />
        </>
      )}
      <script 
        src={envConfig.scriptSrc} 
        data-site-id={envConfig.siteId}
        data-api-url={envConfig.apiBaseUrl}
      ></script>
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <EnvironmentProvider>
          <LayoutContent>{children}</LayoutContent>
        </EnvironmentProvider>
      </body>
    </html>
  );
}
