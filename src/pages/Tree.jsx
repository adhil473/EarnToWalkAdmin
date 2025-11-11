// import React from "react";

// const Tree = () => {
//   // 👇 Example tree data coming from API (you can replace this with real API data)
//   const data = [
//     { id: 1, name: "Daniel", apex: "APEX768456", parentId: null }, // root

//     { id: 2, name: "Daniel", apex: "APEX768458", parentId: 1 },
//     { id: 3, name: "Navi", apex: "APEX769876", parentId: 1 },

//     { id: 4, name: "Alexa", apex: "APEX768776", parentId: 2 },
//     { id: 5, name: "Nova", apex: "APEX769776", parentId: 2 },
//     { id: 6, name: "Alexa", apex: "APEX768776", parentId: 3 },
//     { id: 7, name: "Daniel", apex: "APEX768456", parentId: 3 },

//     { id: 8, name: "No User", apex: null, parentId: 4 },
//     { id: 9, name: "No User", apex: null, parentId: 4 },
//     { id: 10, name: "Snitch", apex: "APEX769776", parentId: 5 },
//     { id: 11, name: "Nova", apex: "APEX769776", parentId: 5 },
//     { id: 12, name: "No User", apex: null, parentId: 6 },
//     { id: 13, name: "No User", apex: null, parentId: 6 },
//     { id: 14, name: "Snitch", apex: "APEX769776", parentId: 7 },
//     { id: 15, name: "Alex", apex: "APEX784076", parentId: 7 },
//   ];

//   const NODE_WIDTH = 100;
//   const NODE_HEIGHT = 50;
//   const HORIZONTAL_GAP = 50;
//   const VERTICAL_GAP = 50;

//   // Build tree structure
//   const buildTree = (items, parentId = null) =>
//     items
//       .filter((item) => item.parentId === parentId)
//       .map((item) => ({
//         ...item,
//         children: buildTree(items, item.id),
//       }));

//   const tree = buildTree(data);

//   // Calculate positions recursively
//   let xCounter = 0;
//   const positions = {};

//   const assignPositions = (node, depth) => {
//     if (node.children.length === 0) {
//       positions[node.id] = { x: xCounter * (NODE_WIDTH + HORIZONTAL_GAP), y: depth * (NODE_HEIGHT + VERTICAL_GAP) };
//       xCounter++;
//     } else {
//       node.children.forEach((child) => assignPositions(child, depth + 1));
//       const childrenPos = node.children.map((c) => positions[c.id].x);
//       const avgX = (Math.min(...childrenPos) + Math.max(...childrenPos)) / 2;
//       positions[node.id] = { x: avgX, y: depth * (NODE_HEIGHT + VERTICAL_GAP) };
//     }
//   };

//   assignPositions(tree[0], 0);

//   const renderNode = (node) => {
//     const pos = positions[node.id];
//     const centerX = pos.x + NODE_WIDTH / 2;
//     const centerY = pos.y + NODE_HEIGHT / 2;

//     return (
//       <g key={node.id}>
//         {/* Line from parent to this node */}
//         {node.parentId && (
//           <line
//             x1={positions[node.parentId].x + NODE_WIDTH / 2}
//             y1={positions[node.parentId].y + NODE_HEIGHT}
//             x2={centerX}
//             y2={pos.y}
//             stroke="#050D0F"
//             strokeWidth="2"
//           />
//         )}

//         {/* Node Box */}
//         <rect
//           x={pos.x}
//           y={pos.y}
//           width={NODE_WIDTH}
//           height={NODE_HEIGHT}
//           rx="10"
//           ry="10"
//           fill="#0b1b2b"
//           stroke="#00ffff"
//           strokeWidth="2"
//         />

//         {/* Text */}
//         <text x={centerX} y={pos.y + 25} fill="#00ffff" fontSize="13" textAnchor="middle">
//           {node.name}
//         </text>
//         {node.apex && (
//           <text x={centerX} y={pos.y + 40} fill="#7f8c8d" fontSize="11" textAnchor="middle">
//             {node.apex}
//           </text>
//         )}

//         {/* Children */}
//         {node.children.map(renderNode)}
//       </g>
//     );
//   };

//   return (
//     <div style={{ }} className="mt-25 ml-15">
//       <svg
//         width="2000"
//         height="800"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ display: "block", margin: "0 auto" }}
//       >
//         {tree.map(renderNode)}
//       </svg>
//     </div>
//   );
// };

// export default Tree;

import React from 'react'

const Tree = () => {
  return (
    <div>
      
    </div>
  )
}

export default Tree

