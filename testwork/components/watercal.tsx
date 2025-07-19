"use client";
import React, { useState } from "react";

/**
 *
 *
 * @param {number} days
 * @returns {number}
 */
function calculateRemainingWater(days: number) {
  const initialWater = 5832;
  const remainingFractionPerDay = 2 / 3;

  const remainingWater = initialWater * Math.pow(remainingFractionPerDay, days);

  return remainingWater;
}

export default function WaterCalculator() {
  const [inputDays, setInputDays] = useState(0);
  const [result, setResult] = useState(calculateRemainingWater(0));

  const handleInputChange = (event: { target: { value: string } }) => {
    const days = parseInt(event.target.value);
    if (!isNaN(days) && days >= 0) {
      setInputDays(days);
      setResult(calculateRemainingWater(days));
    } else if (event.target.value === "") {
      setInputDays(0);
      setResult(calculateRemainingWater(0));
    }
  };

  return (
    <div className="min-h-screen mx-auto bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white mx-80 p-5 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          เครื่องคำนวณปริมาณน้ำที่เหลือ
        </h1>
        <p className="text-gray-700 mb-2">ถังน้ำใบหนึ่งบรรจุ **5,832 ลิตร**</p>
        <p className="text-gray-700 mb-4">
          มีการนำน้ำไปใช้ทุกวัน **วันละหนึ่งในสาม** ของปริมาณน้ำในถัง
        </p>

        <div className="mb-6">
          <label
            htmlFor="daysInput"
            className="block text-gray-800 text-lg font-medium mb-2"
          >
            จำนวนวันที่ผ่านไป (X วัน):
          </label>
          <input
            type="text"
            id="daysInput"
            value={inputDays}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
            placeholder="ป้อนจำนวนวัน..."
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            เมื่อครบ {inputDays} วัน จะมีน้ำเหลืออยู่:
          </h2>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">
            {result.toFixed(2)} ลิตร
          </p>
        </div>

        <hr className="my-6 border-t-2 border-gray-200" />

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          รายละเอียดการคำนวณ:
        </h3>
        <p className="text-gray-600">ปริมาณน้ำเริ่มต้น: **5,832 ลิตร**</p>
        <p className="text-gray-600">
          ในแต่ละวันใช้น้ำไป **1/3** ของปริมาณที่มีอยู่
        </p>
        <p className="text-gray-600">
          ดังนั้นในแต่ละวันจะเหลือน้ำ **2/3** ของปริมาณเดิม
        </p>
        <p className="text-gray-600 text-sm mt-2">
          สูตร: $Y = 5832 \times (2/3)^X$
        </p>
      </div>
    </div>
  );
}
