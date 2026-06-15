'use client'
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useEnvironment } from "@/app/context/EnvironmentContext";
import { ENVIRONMENTS, getEnvironmentConfig, LOCAL_CONFIG_KEY } from "@/config/environments";

const Environment = () => {
  const { currentEnvironment, setEnvironment } = useEnvironment();
  const envConfig = getEnvironmentConfig(currentEnvironment);

  const [isLocalhost, setIsLocalhost] = useState(false)

  const [formSiteId, setFormSiteId] = useState(ENVIRONMENTS.local.siteId)
  const [formApiUrl, setFormApiUrl] = useState(ENVIRONMENTS.local.apiBaseUrl)
  const [formScriptSrc, setFormScriptSrc] = useState(ENVIRONMENTS.local.scriptSrc)
  const [formWsKey, setFormWsKey] = useState(ENVIRONMENTS.local.wsKey ?? '')
  const [formWsHost, setFormWsHost] = useState(ENVIRONMENTS.local.wsHost ?? '')
  const [formWsPort, setFormWsPort] = useState(ENVIRONMENTS.local.wsPort ?? '')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    setIsLocalhost(
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    )

    const saved = localStorage.getItem(LOCAL_CONFIG_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormSiteId(parsed.siteId || ENVIRONMENTS.local.siteId)
        setFormApiUrl(parsed.apiUrl || parsed.apiBaseUrl || ENVIRONMENTS.local.apiBaseUrl)
        setFormScriptSrc(parsed.scriptSrc || ENVIRONMENTS.local.scriptSrc)
        setFormWsKey(parsed.wsKey || ENVIRONMENTS.local.wsKey || '')
        setFormWsHost(parsed.wsHost || ENVIRONMENTS.local.wsHost || '')
        setFormWsPort(parsed.wsPort || ENVIRONMENTS.local.wsPort || '')
      } catch { }
    }
  }, [])

  const saveLocalConfig = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify({
      siteId: formSiteId,
      apiBaseUrl: formApiUrl,
      scriptSrc: formScriptSrc,
      wsKey: formWsKey,
      wsHost: formWsHost,
      wsPort: formWsPort,
    }))
    setSaveMessage('Saved! Switch to Local env and reload to apply.')
    setTimeout(() => setSaveMessage(null), 4000)
  }

  const handleApiUrlChange = (val: string) => {
    setFormApiUrl(val)
  }

  useEffect(() => {
    const id = localStorage.getItem('jp_user_id')

    const originalFetch = window.fetch

    window.fetch = async (...args) => {
      return originalFetch(...args)
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])
  return (
    <>
      <Breadcrumb title={"Environment"} pages={["Environment"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                <p className="font-medium text-xl text-dark">
                  Environment Information
                </p>
              </div>

              <div className="p-4 sm:p-7.5">
                <div className="flex flex-col gap-4">

                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-3">
                    <span className="text-sm font-medium text-dark">Environment:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEnvironment('dev')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentEnvironment === 'dev'
                          ? 'bg-blue text-white'
                          : 'bg-gray-1 text-dark hover:bg-gray-200'
                          }`}
                      >
                        Dev
                      </button>
                      <button
                        onClick={() => setEnvironment('prod')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentEnvironment === 'prod'
                          ? 'bg-blue text-white'
                          : 'bg-gray-1 text-dark hover:bg-gray-200'
                          }`}
                      >
                        Prod
                      </button>
                      {isLocalhost && (
                        <button
                          onClick={() => setEnvironment('local')}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentEnvironment === 'local'
                            ? 'bg-blue text-white'
                            : 'bg-gray-1 text-dark hover:bg-gray-200'
                            }`}
                        >
                          Local
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-dark-4 leading-relaxed">
                    Switching environments reloads the page with the corresponding widget script.
                    Use <strong>Dev</strong> for testing, <strong>Prod</strong> for production,
                    and <strong>Local</strong> for connecting to a local backend.
                  </p>

                  <div className="pt-2 pb-1 border-b border-gray-3">
                    <p className="text-xs font-medium text-dark mb-1">Active config</p>
                    <p className="text-xs text-dark-4 truncate">
                      API: <span className="font-mono">{envConfig.apiBaseUrl}</span>
                    </p>
                    <p className="text-xs text-dark-4 truncate">
                      Site ID: <span className="font-mono">{envConfig.siteId}</span>
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <p className="text-sm text-dark-4 mb-5">
                This page lets you switch between environments and configure the Behavora widget.
                All pages on this site use the currently selected environment's widget script.
              </p>

              {isLocalhost && currentEnvironment === 'local' ? (
                <form onSubmit={saveLocalConfig}>
                  <h3 className="text-lg font-semibold text-dark mb-5">
                    Script Configuration (Local)
                  </h3>

                  <div className="flex flex-col gap-5 mb-5">
                    <div className="w-full">
                      <label htmlFor="siteId" className="block mb-2.5">
                        Site ID
                      </label>
                      <input
                        type="text"
                        id="siteId"
                        value={formSiteId}
                        onChange={(e) => setFormSiteId(e.target.value)}
                        placeholder="site_..."
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="apiUrl" className="block mb-2.5">
                        API URL
                      </label>
                      <input
                        type="text"
                        id="apiUrl"
                        value={formApiUrl}
                        onChange={(e) => handleApiUrlChange(e.target.value)}
                        placeholder="http://localhost:8082"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="scriptSrc" className="block mb-2.5">
                        Widget script URL <small>(<a href="https://github.com/zordecmax/journey-predictor-client" target="_blank"
                          className="text-blue underline hover:text-blue-dark">journey-predictor-client</a> running locally, make sure to build it first with <code>npm run build:widget</code> and run it with <code>npm run dev</code>, and that port is correct.)</small>
                      </label>
                      <input
                        type="text"
                        id="scriptSrc"
                        value={formScriptSrc}
                        onChange={(e) => setFormScriptSrc(e.target.value)}
                        placeholder="http://localhost:8082/widget/loader.js"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>

                  <h4 className="text-md font-semibold text-dark mt-2 mb-3">
                    WebSocket
                  </h4>

                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="wsKey" className="block mb-2.5">
                        WS Key <small>(REVERB_APP_KEY)</small>
                      </label>
                      <input
                        type="text"
                        id="wsKey"
                        value={formWsKey}
                        onChange={(e) => setFormWsKey(e.target.value)}
                        placeholder="appkey"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="wsHost" className="block mb-2.5">
                        WS Host
                      </label>
                      <input
                        type="text"
                        id="wsHost"
                        value={formWsHost}
                        onChange={(e) => setFormWsHost(e.target.value)}
                        placeholder="localhost"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="wsPort" className="block mb-2.5">
                        WS Port <small>(REVERB_PORT)</small>
                      </label>
                      <input
                        type="text"
                        id="wsPort"
                        value={formWsPort}
                        onChange={(e) => setFormWsPort(e.target.value)}
                        placeholder="8080"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                    >
                      Save
                    </button>
                    {saveMessage && (
                      <span className="text-sm text-green">{saveMessage}</span>
                    )}
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-4">
                    {currentEnvironment === 'dev' ? 'dev.behavora.com' : 'app.behavora.com'}
                  </h3>
                  <p className="text-body mb-3">
                    This demo site is connected to{' '}
                    <a
                      href={`${envConfig.apiBaseUrl}/login?email=demo@demo.com&password=demodemo&utm_source=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue underline hover:text-blue-dark"
                    >
                      {currentEnvironment === 'dev' ? 'dev.behavora.com' : 'app.behavora.com'}
                    </a>.
                    You can log in to the dashboard with:
                  </p>
                  <div className="bg-gray-1 rounded-md p-4 border border-gray-3">
                    <p className="text-dark mb-1">
                      <span className="font-medium">Email:</span> demo@demo.com
                    </p>
                    <p className="text-dark">
                      <span className="font-medium">Password:</span> demodemo
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Environment;
