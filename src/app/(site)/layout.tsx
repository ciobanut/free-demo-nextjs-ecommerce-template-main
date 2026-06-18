"use client";
import { useState, useEffect } from "react";
// @ts-ignore
import "../css/euclid-circular-a-font.css";
// @ts-ignore
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import DebugPanel from "@/debug/components/DebugPanel";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import { EnvironmentProvider, useEnvironment } from "../context/EnvironmentContext";

import Script from "next/script";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { getEnvironmentConfig } from "@/config/environments";

const BehavoraScript = () => {
  const { currentEnvironment } = useEnvironment();
  const envConfig = getEnvironmentConfig(currentEnvironment);

  return (
    <Script
      src={envConfig.scriptSrc}
      data-site-id={envConfig.siteId}
      data-api-url={envConfig.apiBaseUrl}
      data-ws-key={envConfig.wsKey}
      data-ws-host={envConfig.wsHost}
      data-ws-port={envConfig.wsPort}
      strategy="afterInteractive"
    />
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
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
                </PreviewSliderProvider>
              </ModalProvider>
            </CartModalProvider>
            <DebugPanel />
          </ReduxProvider>
          <ScrollToTop />
          <Footer />
        </>
      )}
      <BehavoraScript />
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
