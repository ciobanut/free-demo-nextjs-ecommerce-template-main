import { DEFAULT_ENVIRONMENT, ENVIRONMENTS, LOCAL_CONFIG_KEY, type Environment } from "@/config/environments";

const ENV_NAMES: Environment[] = ["dev", "prod", "local"];

/**
 * Inline script for the first slot in <head>. It picks the same environment
 * as EnvironmentContext (query `env`, then localStorage) and inserts the
 * Consent Loader synchronously, before the widget script is added.
 */
export function consentLoaderBootstrapScript(): string {
  const configs = Object.fromEntries(
    ENV_NAMES.map((name) => [
      name,
      {
        apiBaseUrl: ENVIRONMENTS[name].apiBaseUrl,
        siteId: ENVIRONMENTS[name].siteId ?? "",
      },
    ])
  );

  const payload = JSON.stringify({
    configs,
    localConfigKey: LOCAL_CONFIG_KEY,
    defaultEnv: DEFAULT_ENVIRONMENT,
  }).replace(/</g, "\\u003c");

  return `(function () {
  var settings = ${payload};
  var env = settings.defaultEnv;
  try {
    var queryEnv = new URLSearchParams(location.search).get("env");
    if (queryEnv === "dev" || queryEnv === "prod" || queryEnv === "local") {
      env = queryEnv;
    } else {
      var savedEnv = localStorage.getItem("behavora_env");
      if (savedEnv === "dev" || savedEnv === "prod" || savedEnv === "local") env = savedEnv;
    }
  } catch (e) {}

  var config = settings.configs[env] || {};
  if (env === "local") {
    try {
      var savedLocal = JSON.parse(localStorage.getItem(settings.localConfigKey) || "null");
      if (savedLocal && typeof savedLocal === "object") {
        config = {
          apiBaseUrl: savedLocal.apiBaseUrl || config.apiBaseUrl,
          siteId: savedLocal.siteId || config.siteId
        };
      }
    } catch (e) {}
  }

  function loaderSrc(apiBaseUrl, siteId) {
    if (typeof apiBaseUrl !== "string" || typeof siteId !== "string") return "";
    if (!/^https?:\\/\\/[^\\s"'<>]+$/.test(apiBaseUrl)) return "";
    if (!/^[A-Za-z0-9_-]+$/.test(siteId)) return "";
    return apiBaseUrl.replace(/\\/$/, "") + "/api/v1/consent-loader/" + siteId + ".js";
  }

  var src = loaderSrc(config.apiBaseUrl, config.siteId);
  if (!src) {
    window.__behavoraConsentLoaderReady = true;
    return;
  }

  if (document.readyState === "loading") {
    document.write('<script src="' + src + '"><\\/script>');
    window.__behavoraConsentLoaderReady = true;
    return;
  }

  var script = document.createElement("script");
  script.src = src;
  script.onload = script.onerror = function () {
    window.__behavoraConsentLoaderReady = true;
  };
  document.head.appendChild(script);
})();`;
}
