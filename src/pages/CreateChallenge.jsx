import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChallenge, uploadChallengeImage } from "../api/serviceApi";
import toast from "react-hot-toast";

function CreateChallenge() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    sponsorImageUrl: "",
  });
  const [imageUploading, setimageUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.brandName.trim()) {
      toast.error("Brand name is required");
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Challenge title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.brandLocation.trim()) {
      toast.error("Brand location is required");
      return;
    }
    if (!formData.redeemCardExpiryDays || formData.redeemCardExpiryDays <= 0) {
      toast.error("Redeem expiry days must be greater than 0");
      return;
    }
    if (!formData.stepGoal || formData.stepGoal <= 0) {
      toast.error("Step goal must be greater than 0");
      return;
    }
    if (!formData.duration || formData.duration <= 0) {
      toast.error("Duration must be greater than 0");
      return;
    }
    if (!formData.rewardTitle.trim()) {
      toast.error("Reward title is required");
      return;
    }
    if (!formData.rewardDescription.trim()) {
      toast.error("Reward description is required");
      return;
    }
    if (!formData.sponsorAbout.trim()) {
      toast.error("Sponsor about is required");
      return;
    }
    if (!formData.sponsorImageUrl.trim()) {
      toast.error("Sponsor image URL is required");
      return;
    }

    // image upload fucntion seprate api formdata and endpoint for image upload and then set the returned url to formData.sponsorImageUrl before submitting the challenge creation request
    const handleImageUpload = async (file) => {
      if (!file) return;

      try {
        setImageUploading(true);

        const res = await uploadChallengeImage(file);

        console.log("Upload response:", res);

        setFormData((prev) => ({
          ...prev,
          sponsorImageUrl: res.imageUrl, // adjust if backend uses different key
        }));

        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error(error);

        toast.error("Image upload failed");
      } finally {
        setImageUploading(false);
      }
    };

    try {
      setLoading(true);
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
          description: formData.rewardDescription,
        },
        sponsor: {
          about: formData.sponsorAbout,
          imageUrl: formData.sponsorImageUrl,
        },
      };
      console.log("Sending payload:", payload);
      const response = await createChallenge(payload);
      console.log("Challenge created successfully:", response);
      toast.success("Challenge created successfully");
      setFormData({
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
        sponsorImageUrl: "",
      });
      navigate("/challenges");
    } catch (error) {
      console.error("Failed to create challenge:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create challenge",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 mt-16">
      <div className="max-w-3xl lg:max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/challenges")}
            className="p-2 hover:bg-[#1f2e2e] rounded-lg transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-semibold">Create New Challenge</h2>
            <p className="text-sm text-gray-400 mt-1">
              Fill in the details to create a challenge
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#0a1618] to-[#050D0F] border border-[#2a3f3f] rounded-2xl p-6 md:p-8 space-y-6"
        >
          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) =>
                  setFormData({ ...formData, brandName: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Challenge Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Brand Location
              </label>
              <input
                type="text"
                value={formData.brandLocation}
                onChange={(e) =>
                  setFormData({ ...formData, brandLocation: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Redeem Expiry Days
              </label>
              <input
                type="number"
                value={formData.redeemCardExpiryDays}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    redeemCardExpiryDays: e.target.value,
                  })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] h-24"
              required
            />
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">
            Challenge Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Step Goal
              </label>
              <input
                type="number"
                value={formData.stepGoal}
                onChange={(e) =>
                  setFormData({ ...formData, stepGoal: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Duration (days)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">
            Reward Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Reward Title
              </label>
              <input
                type="text"
                value={formData.rewardTitle}
                onChange={(e) =>
                  setFormData({ ...formData, rewardTitle: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Reward Description
              </label>
              <input
                type="text"
                value={formData.rewardDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rewardDescription: e.target.value,
                  })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f]"
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#31BDD0] border-b border-[#1f2e2e] pb-2">
            Sponsor Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Sponsor About
              </label>
              <textarea
                value={formData.sponsorAbout}
                onChange={(e) =>
                  setFormData({ ...formData, sponsorAbout: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00a88f] h-24"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Sponsor Image URL
              </label>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Sponsor Image
                </label>

                <label className="cursor-pointer bg-[#00a88f] hover:bg-[#008f7a] px-4 py-2 rounded-lg inline-block font-semibold">
                  {imageUploading ? "Uploading..." : "Upload Image"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    hidden
                  />
                </label>

                {formData.sponsorImageUrl && (
                  <img
                    src={formData.sponsorImageUrl}
                    alt="Preview"
                    className="mt-4 w-full max-w-xs h-40 rounded-lg border border-[#1f2e2e] object-cover"
                  />
                )}
              </div>
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
              disabled={loading}
              className="flex-1 bg-[#00a88f] hover:bg-[#008f7a] text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Challenge"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/challenges")}
              disabled={loading}
              className="px-5 py-2.5 border border-[#1f2e2e] rounded-lg hover:bg-[#1f2e2e] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChallenge;
