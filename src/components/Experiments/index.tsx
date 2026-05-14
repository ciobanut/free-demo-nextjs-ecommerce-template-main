'use client'
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useEnvironment } from "@/app/context/EnvironmentContext";
import { getEnvironmentConfig } from "@/config/environments";

const PAGE_URL = 'http://localhost:3000/blogs/blog-grid'

const Experiments = () => {
  const { currentEnvironment, setEnvironment } = useEnvironment();
  const envConfig = getEnvironmentConfig(currentEnvironment);
  const TRACK_ENDPOINT = `${envConfig.apiBaseUrl}/api/v1/track`;

  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [trackRequests, setTrackRequests] = useState(0)
  const [visitorCount, setVisitorCount] = useState<number>(1)
  const [isSimulating, setIsSimulating] = useState(false)
  const [totalSimulated, setTotalSimulated] = useState(0)
  const [simulationError, setSimulationError] = useState<string | null>(null)
  const intervalRef = useRef<number | null>(null)

  const getRandomArrayItem = (items: string[]) => items[Math.floor(Math.random() * items.length)]

  const buildRandomPayload = () => {
    const now = Date.now()
    const visitorSuffix = Math.random().toString(36).slice(2, 10)
    const sessionSuffix = Math.random().toString(36).slice(2, 10)

    return {
      visitor_id: `user_${now}_${visitorSuffix}`,
      page_url: PAGE_URL,
      time_spent: Math.floor(Math.random() * 4000) + 100,
      device: getRandomArrayItem(['desktop', 'mobile', 'tablet']),
      traffic_source: getRandomArrayItem(['internal', 'organic', 'referral', 'paid']),
      is_returning_user: Math.random() < 0.5,
      max_scroll_percent: Math.floor(Math.random() * 81) + 20,
      geo: {
        country: getRandomArrayItem(['RO', 'US', 'DE', 'FR', 'IT']),
      },
      action: 'heartbeat',
      session_id: `session_${now}_${sessionSuffix}`,
    }
  }

  const sendTrackRequests = async (count: number) => {
    setSimulationError(null)
    const payloads = Array.from({ length: count }, () => buildRandomPayload())

    const responses = await Promise.allSettled(
      payloads.map((payload) =>
        fetch(TRACK_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Site-Id': envConfig.siteId,
           },
          body: JSON.stringify(payload),
        })
      )
    )

    const failed = responses.filter((result) => result.status === 'rejected').length
    setTotalSimulated((prev) => prev + count)

    if (failed > 0) {
      setSimulationError(`${failed} request(s) failed during this cycle.`)
    }
  }

  const startSimulation = () => {
    if (visitorCount < 1) {
      setSimulationError('Enter a valid visitor count of 1 or more.')
      return
    }

    if (isSimulating) {
      return
    }

    setSimulationError(null)
    setIsSimulating(true)
    setTotalSimulated(0)

    sendTrackRequests(visitorCount)

    intervalRef.current = window.setInterval(() => {
      void sendTrackRequests(visitorCount)
    }, 10000)
  }

  const stopSimulation = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsSimulating(false)
  }

  useEffect(() => {
    const id = localStorage.getItem('jp_user_id')
    setVisitorId(id)

    const originalFetch = window.fetch

    window.fetch = async (...args) => {
      const [resource] = args

      if (
        typeof resource === 'string' &&
        resource.includes(TRACK_ENDPOINT)
      ) {
        setTrackRequests(prev => prev + 1)
      }

      return originalFetch(...args)
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [])
  return (
    <>
      <Breadcrumb title={"Experiments"} pages={["experiments"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                <p className="font-medium text-xl text-dark">
                  Experiments Information
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
                    </div>
                  </div>

                  <p className="flex items-center gap-4">
                    <small>visitor_id: </small>
                    {visitorId}
                  </p>

                  <p className="flex items-center gap-4">
                    <small>Track requests: </small>
                    {trackRequests}
                  </p>

                  <p className="flex items-center gap-4">
                    <small>Status:</small>
                    <span>{isSimulating ? 'Running' : 'Stopped'}</span>
                  </p>

                  <p className="flex items-center gap-4">
                    <small>Total simulated:</small>
                    {totalSimulated}
                  </p>

                  <div className="space-y-3 pt-3">
                    <div>
                      <label htmlFor="visitorCount" className="block mb-2.5 text-sm font-medium text-dark">
                        Visitors to simulate
                      </label>
                      <input
                        type="number"
                        id="visitorCount"
                        min={1}
                        value={visitorCount}
                        disabled={isSimulating}
                        onChange={(event) => setVisitorCount(Math.max(1, Number(event.target.value) || 1))}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={startSimulation}
                        disabled={isSimulating || visitorCount < 1}
                        className="inline-flex items-center justify-center font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50"
                      >
                        Simulate {visitorCount} visitors
                      </button>

                      <button
                        type="button"
                        onClick={stopSimulation}
                        disabled={!isSimulating}
                        className="inline-flex items-center justify-center font-medium text-dark bg-gray-1 py-3 px-7 rounded-md ease-out duration-200 hover:bg-gray-200 disabled:opacity-50"
                      >
                        Stop simulation
                      </button>
                    </div>

                    {simulationError && (
                      <p className="text-sm text-red mt-2">{simulationError}</p>
                    )}
                  </div>

                </div>
              </div>
            </div>

            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <form>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block mb-2.5">
                      First Name <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Jhon"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="lastName" className="block mb-2.5">
                      Last Name <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Deo"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="subject" className="block mb-2.5">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Type your subject"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className="block mb-2.5">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>

                <div className="mb-7.5">
                  <label htmlFor="message" className="block mb-2.5">
                    Message
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experiments;
