"use client";

import Link from "next/link";
import { useEnvironment } from "@/app/context/EnvironmentContext";

export default function EnvBadge() {
  const { currentEnvironment } = useEnvironment();

  if (!currentEnvironment) return null;

  const isProd = currentEnvironment === "prod";

  return (
    <div
      className={`fixed top-0 left-0 z-[999999] group transition-opacity duration-200 ease-in-out ${
        isProd ? "opacity-0 hover:opacity-100" : ""
      }`}
    >
      <Link
        href="/env"
        className="block relative w-0 h-0 env-badge-triangle"
        style={{
          borderRight: "80px solid transparent",
          borderTop: "80px solid rgba(220, 38, 38, 0.55)",
          transition: "border-top-color 0.2s ease-in-out",
        }}
        aria-label="Environment settings"
        title="Switch environment"
      >
        <span
          className="env-badge-link"
          style={{
            position: "absolute",
            top: "-50px",
            left: "10px",
            transform: "rotate(-45deg)",
            transformOrigin: "top left",
            color: "white",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            opacity: 0.85,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {currentEnvironment}
        </span>
      </Link>
    </div>
  );
}
