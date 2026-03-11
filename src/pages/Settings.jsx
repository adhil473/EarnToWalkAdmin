import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAdsSettings, updateAdsSettings } from "../api/serviceApi";

function Settings() {
  const [formData, setFormData] = useState({
    stepRate: "",
    minWithdrawal: "",
    autoLimit: ""
  });

  const [adsData, setAdsData] = useState({
    maxDailyAds: "",
    minAdIntervalMinutes: "",
    enabled: false
  });

  const [loading, setLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);
  const [adsFetching, setAdsFetching] = useState(true);
  const [preview, setPreview] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // const data = await getSettings();
        // setFormData({
        //   stepRate: data.stepRate,
        //   minWithdrawal: data.minWithdrawal,
        //   autoLimit: data.autoLimit
        // });
      } catch {
        toast.error("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  // Fetch ads settings on mount
  useEffect(() => {
    const fetchAdsSettings = async () => {
      try {
        setAdsFetching(true);
        const data = await getAdsSettings();
        setAdsData({
          maxDailyAds: data.maxDailyAds ?? "",
          minAdIntervalMinutes: data.minAdIntervalMinutes ?? "",
          enabled: data.enabled ?? false
        });
      } catch {
        toast.error("Failed to load ads settings");
      } finally {
        setAdsFetching(false);
      }
    };
    fetchAdsSettings();
  }, []);

  useEffect(() => {
    if (formData.stepRate) {
      const value = Number(formData.stepRate);
      setPreview(value);
    }
  }, [formData.stepRate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stepRate || formData.stepRate <= 0) {
      toast.error("Step rate must be greater than 0");
      return;
    }
    if (!formData.minWithdrawal || formData.minWithdrawal <= 0) {
      toast.error("Minimum withdrawal must be greater than 0");
      return;
    }
    if (!formData.autoLimit || formData.autoLimit <= 0) {
      toast.error("Auto withdrawal limit must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      // API call will go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully", {
        style: {
          background: "#00a88f",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAdsSubmit = async (e) => {
    e.preventDefault();

    if (!adsData.maxDailyAds || Number(adsData.maxDailyAds) <= 0) {
      toast.error("Max daily ads must be greater than 0");
      return;
    }
    if (!adsData.minAdIntervalMinutes || Number(adsData.minAdIntervalMinutes) <= 0) {
      toast.error("Minimum ad interval must be greater than 0");
      return;
    }

    try {
      setAdsLoading(true);
      await updateAdsSettings({
        maxDailyAds: Number(adsData.maxDailyAds),
        minAdIntervalMinutes: Number(adsData.minAdIntervalMinutes),
        enabled: adsData.enabled
      });
      toast.success("Ads settings saved successfully", {
        style: {
          background: "#00a88f",
          color: "#fff",
        },
      });
    } catch {
      toast.error("Failed to save ads settings");
    } finally {
      setAdsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-8 md:py-12 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Global Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure system earning rate & withdrawal limits
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-br from-[#0a1618] to-[#050D0F] border border-[#2a3f3f] rounded-2xl p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Step Rate (₹ per 1000 steps)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.stepRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stepRate: e.target.value
                      })
                    }
                    className="w-full bg-black border border-[#1f2e2e] rounded-lg pl-7 pr-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                    placeholder="0.10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Amount user earns per 1000 steps
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Minimum Withdrawal (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minWithdrawal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minWithdrawal: e.target.value
                      })
                    }
                    className="w-full bg-black border border-[#1f2e2e] rounded-lg pl-7 pr-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                    placeholder="100"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum amount required to withdraw
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Auto Withdrawal Limit (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.autoLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        autoLimit: e.target.value
                      })
                    }
                    className="w-full bg-black border border-[#1f2e2e] rounded-lg pl-7 pr-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                    placeholder="10000"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum amount for auto withdrawal
                </p>
              </div>

              <div className="bg-[#0a1618] border border-[#1f2e2e] rounded-lg p-4 md:col-span-1">
                <p className="text-sm text-gray-400 mb-3">Preview</p>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-[#31BDD0]">
                    1000 steps = ₹{(Number(preview) || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-300">
                    5000 steps = ₹{(Number(preview) * 5 || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-300">
                    10000 steps = ₹{(Number(preview) * 10 || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a88f] hover:bg-[#008f7a] py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>

        {/* Ads Settings */}
        <form onSubmit={handleAdsSubmit}>
          <div className="bg-gradient-to-br from-[#0a1618] to-[#050D0F] border border-[#2a3f3f] rounded-2xl p-6 md:p-8 space-y-6 mt-10">

            <div>
              <h2 className="text-xl font-semibold">Ads Settings</h2>
              <p className="text-gray-400 text-sm mt-1">
                Control advertisement limits and intervals
              </p>
            </div>

            {adsFetching ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-8 h-8 border-2 border-[#00a88f] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Max Daily Ads */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Max Daily Ads
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={adsData.maxDailyAds}
                      onChange={(e) =>
                        setAdsData({ ...adsData, maxDailyAds: e.target.value })
                      }
                      className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] transition-colors"
                      placeholder="10"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum ads a user can watch per day
                    </p>
                  </div>

                  {/* Min Interval */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Minimum Ad Interval (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={adsData.minAdIntervalMinutes}
                      onChange={(e) =>
                        setAdsData({ ...adsData, minAdIntervalMinutes: e.target.value })
                      }
                      className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] transition-colors"
                      placeholder="3"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Time required between two ads
                    </p>
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center justify-between md:col-span-2 bg-[#0a1618] border border-[#1f2e2e] rounded-lg p-4">
                    <div>
                      <p className="text-sm font-medium">Ads Enabled</p>
                      <p className="text-xs text-gray-400">
                        Enable or disable ads globally
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setAdsData({ ...adsData, enabled: !adsData.enabled })
                      }
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                        adsData.enabled ? "bg-[#00a88f]" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all duration-300 ${
                          adsData.enabled ? "left-7" : "left-1"
                        }`}
                      ></div>
                    </button>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={adsLoading}
                  className="w-full bg-[#00a88f] hover:bg-[#008f7a] py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adsLoading ? "Saving..." : "Save Ads Settings"}
                </button>
              </>
            )}

          </div>
        </form>

      </div>
    </div>
  );
}

export default Settings;
