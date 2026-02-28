import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllChallenges, deleteChallenge } from "../api/serviceApi";
import toast from "react-hot-toast";

function Challenge() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  const fetchChallenges = async () => {
    try {
      const res = await getAllChallenges();

      setChallenges(res.filter((ch) => ch.isActive));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteChallenge = (challengeId) => {
    toast(
      (t) => (
        <div
          className="flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-semibold text-white">
            Are you sure you want to delete this challenge?
          </p>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast.dismiss(t.id);
                deleteChallenge(challengeId)
                  .then(() => {
                    setChallenges((prevChallenges) =>
                      prevChallenges.filter(
                        (challenge) => challenge._id !== challengeId,
                      ),
                    );
                    toast.success("Challenge deleted successfully", {
                      style: {
                        background: "#00a88f",
                        color: "#fff",
                      },
                    });
                  })
                  .catch((error) => {
                    console.error("Failed to delete challenge:", error);
                    toast.error("Failed to delete challenge");
                  });
              }}
              className="bg-[#00a88f] hover:bg-[#008f7a] text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast.dismiss(t.id);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "#1f2e2e",
          color: "#fff",
        },
      },
    );
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      <div>
        <div className="flex justify-between items-center mb-1">
          <div>
            <h2 className="text-xl font-semibold">Challenges</h2>
            <p className="text-sm text-gray-400 mt-2">
              View And Manage Your Challenges
            </p>
          </div>
          <button
            onClick={() => navigate("/challenges/create")}
            className="flex items-center gap-2 bg-[#00a88f] hover:bg-[#008f7a] text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Challenge
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-[#0a1618] to-[#050D0F] border border-[#2a3f3f] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#31BDD0]/20 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={challenge.sponsor?.imageUrl}
                  alt={challenge.brandName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-3 py-1.5 bg-black/70 backdrop-blur-sm text-[#0d9c44ff] border border-[#0d9c44ff] rounded-full font-semibold shadow-lg">
                    {challenge.brandName}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteChallenge(challenge._id)}
                  className="absolute top-3 left-3 p-2 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm rounded-full transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                 onClick={() => navigate(`/challenges/edit/${challenge._id}`, { state: { challenge } })} 
                  className="absolute top-3 left-14 p-2 bg-[#00a88f]/80 hover:bg-[#008f7a] backdrop-blur-sm rounded-full transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 bg-[#0a1618] px-3 py-2 rounded-lg border border-[#1f2e2e]">
                    <svg
                      className="w-4 h-4 text-[#31BDD0]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-300">
                      {challenge.stepGoal.toLocaleString()} steps
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0a1618] px-3 py-2 rounded-lg border border-[#1f2e2e]">
                    <svg
                      className="w-4 h-4 text-[#31BDD0]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-300">
                      {challenge.duration} days
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 bg-[#0a1618] px-3 py-2 rounded-lg border border-[#1f2e2e]">
                  <svg
                    className="w-4 h-4 text-[#31BDD0]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-300">
                    {challenge.membersJoined} members joined
                  </span>
                </div>

                <div className="pt-4 border-t border-[#2a3f3f]">
                  <div className="bg-gradient-to-r from-[#31BDD0]/10 to-[#0d9c44]/10 p-3 rounded-lg border border-[#31BDD0]/30">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#31BDD0] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-[#31BDD0] mb-1">
                          {challenge.reward.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {challenge.reward.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenge;
