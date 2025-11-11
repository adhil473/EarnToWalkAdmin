import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { RiArrowGoBackLine } from "react-icons/ri";
import { adminTree, treeByUserid } from '../api/serviceApi';


const TreeStructure = () => {
  const { userId } = useParams()
  const [TreeData, setTreeData] = useState()
  const [loading, setLoading] = useState(true)
  const [hoveredNode, setHoveredNode] = useState(null);
  const [treeHistory, setTreeHistory] = useState([]);

  const SkeletonNode = ({ depth = 0 }) => (
    <div className="flex flex-col items-center relative">
      <div className="bg-gray-800/50 border-2 border-gray-700/50 rounded-xl p-4 min-w-[140px] animate-pulse">
        <div className="flex items-center gap-3">
          <div className="bg-gray-600 p-2 rounded-full w-8 h-8"></div>
          <div className="bg-gray-600 h-4 w-16 rounded"></div>
        </div>
      </div>
      {depth < 2 && (
        <div className="flex justify-between w-full mt-[90px] gap-8">
          <div className="w-1/2 flex justify-center">
            <div className="bg-gray-800/30 border-2 border-gray-700/30 rounded-xl p-4 w-[140px] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 p-2 rounded-full w-8 h-8"></div>
                <div className="bg-gray-700 h-4 w-12 rounded"></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="bg-gray-800/30 border-2 border-gray-700/30 rounded-xl p-4 w-[140px] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 p-2 rounded-full w-8 h-8"></div>
                <div className="bg-gray-700 h-4 w-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handlegetUserTree = async () => {
    try {
      setLoading(true)
      const res = await adminTree(userId);
      console.log('dddddd', res)
      if (res.success) {
        setTreeData(res?.data)
        const rootId = res?.data?.id || res?.data?._id;
        setTreeHistory([rootId]);
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handlegetUserTree()
  }, [])

  const handlegetTreeByUserid = async (id) => {
    try {
      setLoading(true)
      const res = await treeByUserid(id)
      if (res.success) {
        setTreeData(res?.data)
        const nodeId = id || res?.data?._id;
        setTreeHistory((prev) => prev.includes(nodeId) ? prev : [...prev, nodeId]);
      }
    } catch (error) {
      console.error('Error fetching tree:', error)
    } finally {
      setLoading(false)
    }
  }
  const handleGoBack = async () => {
    if (treeHistory.length <= 1) return; // no previous
    const newHistory = [...treeHistory];
    newHistory.pop(); // remove current
    const prevId = newHistory[newHistory.length - 1]; // get previous
    setTreeHistory(newHistory);

    try {
      setLoading(true);
      const res = await treeByUserid(prevId);
      if (res.success) {
        setTreeData(res?.data);
      }
    } catch (error) {
      console.error("Error going back:", error);
    } finally {
      setLoading(false);
    }
  };


  const renderTree = (node, depth = 0) => {
    if (!node || depth > 3) return null;

    const nodeVariants = {
      hidden: {
        opacity: 0,
        y: -30,
        scale: 0.8
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: depth * 0.3,
          ease: "easeOut"
        }
      }
    };

    const lineVariants = {
      hidden: {
        pathLength: 0,
        opacity: 0
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: depth * 0.3 + 0.4,
          ease: "easeInOut"
        }
      }
    };

    const hasChildren = node.left || node.right;
    const showEmptySlots = depth < 3;

    return (
      <div className="flex flex-col items-center relative z-auto">


        {/* Node Card */}
        <motion.div
          className="relative group"
          style={{ zIndex: hoveredNode === node.id ? 9999 : 10 }}
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHoveredNode(node.id)}
          onHoverEnd={() => setHoveredNode(null)}
          onClick={() => handlegetTreeByUserid(node.id || node._id)}
        >
          <div className="bg-gradient-to-br from-teal-900/40 to-teal-950/40 border-2 border-teal-500/50 rounded-xl p-4 min-w-[140px] cursor-pointer hover:border-teal-400/70 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-full">
                <FaUser className="text-white" size={16} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{node.name}</p>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none">
            <div className="bg-gray-900/95 border border-teal-500/50 rounded-lg p-3 min-w-[200px] shadow-xl backdrop-blur-sm">
              <div className="space-y-1.5 text-xs">
                {/* <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white font-medium">{node.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sponsor:</span>
              <span className="text-white font-medium">{node.sponsorId || 'N/A'}</span>
            </div> */}
                {/* <div className="flex justify-between">
              <span className="text-gray-400">Joined:</span>
              <span className="text-white font-medium">{node.createdAt ? new Date(node.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div> */}
                {/* <div className="border-t border-gray-700 my-1.5"></div> */}
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Left Amount:</span>
                  <span className="text-teal-400 font-medium">{node?.leftTotalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Right Amount:</span>
                  <span className="text-teal-400 font-medium">{node.rightTotalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Left Carry:</span>
                  <span className="text-orange-400 font-medium">{node.leftCarry || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Right Carry:</span>
                  <span className="text-orange-400 font-medium">{node.rightCarry || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connector Lines */}
        {(hasChildren || showEmptySlots) && depth < 3 && (
          <motion.div
            className="relative w-full"
            initial="hidden"
            animate="visible"
          >
            {/* Vertical line down from node center */}
            <svg className="absolute left-1/2 transform -translate-x-1/2 top-0" width="2" height="50" style={{ overflow: 'visible' }}>
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="50"
                stroke="rgb(45, 212, 191)"
                strokeWidth="2"
                variants={lineVariants}
              />
            </svg>

            {/* Horizontal line connecting to children */}
            <svg className="absolute top-[50px] left-0 w-full h-2" style={{ overflow: 'visible' }}>
              <motion.line
                x1="25%"
                y1="1"
                x2="75%"
                y2="1"
                stroke="rgb(45, 212, 191)"
                strokeWidth="2"
                variants={lineVariants}
              />
            </svg>

            {/* Left vertical line to child center */}
            <svg className="absolute left-1/4 transform -translate-x-1/2 top-[50px]" width="2" height="40" style={{ overflow: 'visible' }}>
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="40"
                stroke="rgb(45, 212, 191)"
                strokeWidth="2"
                variants={lineVariants}
              />
            </svg>

            {/* Right vertical line to child center */}
            <svg className="absolute left-3/4 transform -translate-x-1/2 top-[50px]" width="2" height="40" style={{ overflow: 'visible' }}>
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="40"
                stroke="rgb(45, 212, 191)"
                strokeWidth="2"
                variants={lineVariants}
              />
            </svg>

            {/* Connection points */}
            <svg className="absolute left-1/4 transform -translate-x-1/2 top-[48px]" width="6" height="6" style={{ overflow: 'visible' }}>
              <motion.circle cx="3" cy="3" r="2" fill="rgb(45, 212, 191)" variants={lineVariants} />
            </svg>
            <svg className="absolute left-3/4 transform -translate-x-1/2 top-[48px]" width="6" height="6" style={{ overflow: 'visible' }}>
              <motion.circle cx="3" cy="3" r="2" fill="rgb(45, 212, 191)" variants={lineVariants} />
            </svg>
          </motion.div>
        )}

        {/* Children Container */}
        {(hasChildren || showEmptySlots) && depth < 3 && (
          <div className="flex justify-between w-full mt-[90px] gap-8">
            {/* Left Child */}
            <div className="w-1/2 flex justify-center items-start">
              {node.left ? (
                renderTree(node.left, depth + 1)
              ) : showEmptySlots ? (
                <motion.div
                  className="bg-black/40 border-2 border-gray-700/50 rounded-xl p-4 w-[140px] cursor-pointer hover:border-gray-600 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: depth * 0.3 + 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaUser className="text-gray-600" size={20} />
                    <span className="text-gray-500 font-medium">No User</span>
                  </div>
                </motion.div>
              ) : null}
            </div>

            {/* Right Child */}
            <div className="w-1/2 flex justify-center items-start">
              {node.right ? (
                renderTree(node.right, depth + 1)
              ) : showEmptySlots ? (
                <motion.div
                  className="bg-black/40 border-2 border-gray-700/50 rounded-xl p-4 w-[140px] cursor-pointer hover:border-gray-600 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: depth * 0.3 + 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaUser className="text-gray-600" size={20} />
                    <span className="text-gray-500 font-medium">No User</span>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 md:p-8 sm:pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex   mb-6">
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
        </motion.div>

        <div className="w-full overflow-x-auto">
          <div className="flex justify-center min-w-max py-8">
            {loading ? <SkeletonNode /> : renderTree(TreeData)}
          </div>
        </div>

        {treeHistory.length > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all">
              <RiArrowGoBackLine size={22} /> Previous
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default TreeStructure;