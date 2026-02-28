import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/serviceApi";
import { Filter, Eye } from "lucide-react";
import { useToast } from "../context/ToastContext";

const Member = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [status, setStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const getallmembers = async () => {
    try {
      setLoading(true);
      const res = await getUsers(page, limit, search, status);
      if (res.success) {
        setUsersData(res.data || []);
        setTotalUsers(res.total || 0);
        setTotalPages(Math.ceil((res.total || 0) / limit));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallmembers();
  }, [page, search, status]);

  const handleStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus);
    setPage(1);
    setShowFilter(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlesingleuser = (userid) => {
    navigate(`/user-details/${userid}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-2 space-y-10 ">
      <div className="md:p-8 space-y-4 mt-20">
        <div>
          <h3 className="text-white text-xl font-semibold pl-2">User List</h3>
          <p className="text-sm text-gray-400 pl-2 mt-1">
            Total Users: {totalUsers}
          </p>
        </div>
        <div className="flex w-full justify-end gap-2 items-center">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
            className="border border-[#1f2e2e] bg-black text-white py-2 px-4 w-full md:w-[30%] rounded focus:border-[#1de9a6] focus:outline-none"
          />
          <div className="relative">
            <Filter
              className="w-4 h-4 cursor-pointer hover:text-[#1de9a6] transition"
              onClick={() => setShowFilter(!showFilter)}
            />
            {showFilter && (
              <div className="absolute right-0 top-8 bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-2 min-w-[120px] z-10">
                <div
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm"
                  onClick={() => handleStatusFilter("")}
                >
                  All Users
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#0d9c44ff]"
                  onClick={() => handleStatusFilter("active")}
                >
                  Active
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#dc2626]"
                  onClick={() => handleStatusFilter("inactive")}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
              <p className="text-left">Name</p>
              <p className="text-center">User ID</p>
              <p className="text-center">Email</p>
              <p className="text-center">Phone</p>
              <p className="text-center">Total Earnings</p>
              <p className="text-center">Status</p>
              <p className="text-center">Joined</p>
              <p className="text-center">View</p>
            </div>

            {/* Table Rows */}
            <AnimatePresence>
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading users...</div>
              ) : usersData && usersData.length > 0 ? (
                usersData.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    onClick={() => handlesingleuser(user.userId)}
                    className="grid grid-cols-8 gap-4 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#1de9a6] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{user.name}</span>
                    </div>
                    <p
                      className="cursor-pointer hover:text-[#1de9a6] transition text-center truncate"
                      title={user.userId}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(user.userId);
                      }}
                    >
                      {user.userId?.length > 12 ? `${user.userId.substring(0, 12)}...` : user.userId}
                    </p>
                    <p className="text-center truncate" title={user.email}>
                      {user.email?.length > 20 ? `${user.email.substring(0, 20)}...` : user.email}
                    </p>
                    <p className="text-center">{user.countryCode} {user.whatsappNumber}</p>
                    <p className="text-[#0d9c44ff] text-center">
                      ₹{Number(user.totalEarnings).toFixed(2)}
                    </p>
                    <div className="flex justify-center">
                      <div className={`px-3 py-1 rounded text-xs font-medium ${
                        user.isActive
                          ? "bg-green-900 text-green-400 border border-green-400"
                          : "bg-red-900 text-red-400 border border-red-400"
                      }`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <p className="text-center">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-center">
                      <Eye
                        className="w-4 h-4 cursor-pointer hover:text-[#1de9a6] transition"
                        onClick={() => handlesingleuser(user.userId)}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No members found
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-2 border border-[#1f2e2e] rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1de9a6] transition"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 border rounded text-sm transition ${
                      page === pageNum
                        ? "bg-[#1de9a6] border-[#1de9a6] text-black"
                        : "border-[#1f2e2e] hover:border-[#1de9a6]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === page - 2 || pageNum === page + 2) {
                return (
                  <span key={pageNum} className="text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-2 border border-[#1f2e2e] rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1de9a6] transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Member;
