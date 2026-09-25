"use client";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY) === null) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (value: boolean) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, String(value));
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-[430px] z-99999 bg-white rounded-xl shadow-3 border border-gray-3 p-6"
    >
      <h3 className="font-semibold text-lg text-dark mb-2">
        We use cookies
      </h3>
      <p className="text-custom-sm text-dark-4 mb-5">
        We use cookies to improve your browsing experience, analyze site
        traffic and personalize content. You can accept or decline their use.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => saveConsent(true)}
          className="inline-flex justify-center font-medium text-custom-sm text-white bg-blue py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => saveConsent(false)}
          className="inline-flex justify-center font-medium text-custom-sm text-dark bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
