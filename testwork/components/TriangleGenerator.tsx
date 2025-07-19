"use client";

import React, { useState } from "react";

export default function TriangleGenerator() {
  const [rows, setRows] = useState("");
  const [triangle, setTriangle] = useState("");

  const generateTriangle = () => {
    const numRows = parseInt(rows, 10);

    if (isNaN(numRows) || numRows <= 0) {
      setTriangle("กรุณาป้อนตัวเลขจำนวนเต็มบวก");
      return;
    }

    const result = [];
    for (let i = numRows; i >= 1; i--) {
      // ปรับ spacing เล็กน้อยเพื่อให้ดูดีขึ้น
      const leadingSpaces = "  ".repeat(numRows - i); // ใช้ space 2 ครั้ง
      const numStars = 2 * i - 1;
      const starsString = "* ".repeat(numStars).trim(); // trim เพื่อลบ space ที่เกินมาท้ายสุด

      result.push(leadingSpaces + starsString);
    }
    setTriangle(result.join("\n"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">สร้างสามเหลี่ยมกลับหัว</h1>

      <div className="mb-8">
        <label htmlFor="rowsInput" className="text-lg mr-4">
          ป้อนจำนวนแถว:{" "}
        </label>
        <input
          type="number"
          id="rowsInput"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              generateTriangle();
            }
          }}
          className="mr-4 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateTriangle}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          สร้างสามเหลี่ยม
        </button>
      </div>

      {triangle && (
        <pre className="mt-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg font-mono text-xl whitespace-pre">
          {triangle}
        </pre>
      )}
    </div>
  );
}
