import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { getSettings, updateSettings } from "../api/serviceApi";

function Settings() {
  const [formData, setFormData] = useState({
    stepRate: "",
    minWithdrawal: "",
    autoLimit: ""
  });

  const [loading, setLoading] = useState(false);
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
      </div>
    </div>
  );
}

export default Settings;
