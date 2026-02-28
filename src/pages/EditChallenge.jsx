import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateChallenge } from "../api/serviceApi";
import toast from "react-hot-toast";

function EditChallenge() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const location = useLocation();
  const challengeData = location.state?.challenge;

  const [formData, setFormData] = useState({
    brandName: "",
    title: "",
    description: "",
    brandLocation: "",
    redeemCardExpiryDays: "",
    stepGoal: "",
    duration: "",
    rewardTitle: "",
    rewardDescription: "",
    sponsorAbout: "",
    sponsorImageUrl: ""
  });

  useEffect(() => {
    if (challengeData) {
      setFormData({
        brandName: challengeData.brandName,
        title: challengeData.title,
        description: challengeData.description,
        brandLocation: challengeData.brandLocation,
        redeemCardExpiryDays: challengeData.redeemCardExpiryDays,
        stepGoal: challengeData.stepGoal,
        duration: challengeData.duration,
        rewardTitle: challengeData.reward?.title || "",
        rewardDescription: challengeData.reward?.description || "",
        sponsorAbout: challengeData.sponsor?.about || "",
        sponsorImageUrl: challengeData.sponsor?.imageUrl || ""
      });
    } else {
      toast.error("Challenge data not found");
      navigate("/challenges");
    }
  }, [challengeData, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        brandName: formData.brandName,
        title: formData.title,
        description: formData.description,
        brandLocation: formData.brandLocation,

        redeemCardExpiryDays: Number(formData.redeemCardExpiryDays),

        stepGoal: Number(formData.stepGoal),

        duration: Number(formData.duration),

        reward: {
          title: formData.rewardTitle,
          description: formData.rewardDescription
        },

        sponsor: {
          about: formData.sponsorAbout,
          imageUrl: formData.sponsorImageUrl
        }

      };

      await updateChallenge(challengeId, payload);

      toast.success("Challenge updated successfully");

      navigate("/challenges");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to update challenge"
      );

    }

  };



  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 mt-16">
      <div className="max-w-3xl lg:max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/challenges')} className="p-2 hover:bg-[#1f2e2e] rounded-lg transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-semibold">Edit Challenge</h2>
            <p className="text-sm text-gray-400 mt-1">Update challenge details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#0a1618] to-[#050D0F] border border-[#2a3f3f] rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Brand Name</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Challenge Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Brand Location</label>
              <input
                type="text"
                value={formData.brandLocation}
                onChange={(e) => setFormData({ ...formData, brandLocation: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Redeem Expiry Days</label>
              <input
                type="number"
                value={formData.redeemCardExpiryDays}
                onChange={(e) => setFormData({ ...formData, redeemCardExpiryDays: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] h-24"
              required
            />
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">Challenge Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Step Goal</label>
              <input
                type="number"
                value={formData.stepGoal}
                onChange={(e) => setFormData({ ...formData, stepGoal: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Duration (days)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">Reward Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Reward Title</label>
              <input
                type="text"
                value={formData.rewardTitle}
                onChange={(e) => setFormData({ ...formData, rewardTitle: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Reward Description</label>
              <input
                type="text"
                value={formData.rewardDescription}
                onChange={(e) => setFormData({ ...formData, rewardDescription: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">Sponsor Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Sponsor About</label>
              <textarea
                value={formData.sponsorAbout}
                onChange={(e) => setFormData({ ...formData, sponsorAbout: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] h-24"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Sponsor Image URL</label>
              <input
                type="url"
                value={formData.sponsorImageUrl}
                onChange={(e) => setFormData({ ...formData, sponsorImageUrl: e.target.value })}
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          {formData.sponsorImageUrl && (
            <div className="mt-4">
              <img
                src={formData.sponsorImageUrl}
                alt="Preview"
                className="w-full max-w-xs h-40 rounded-lg border border-[#1f2e2e] object-cover"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#00a88f] hover:bg-[#008f7a] text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300"
            >
              Update Challenge
            </button>
            <button
              type="button"
              onClick={() => navigate('/challenges')}
              className="px-5 py-2.5 border border-[#1f2e2e] rounded-lg hover:bg-[#1f2e2e] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default EditChallenge;