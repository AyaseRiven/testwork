"use client";

import { useState } from "react";
import Image from "next/image"; // ตรวจสอบว่าคุณใช้ Image component จริงๆ ถ้าไม่ใช้ก็ลบออกได้
import Link from "next/link";

// Type Interfaces
// เพิ่ม ' | null' สำหรับ field ที่อาจจะถูก set เป็น null เมื่อ clear form
interface FormDataState {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  citizenId?: string;
  institutionName?: string;
  studentId?: string;
  studentIdCard?: File | null; // สำหรับไฟล์
  cardExpiryDate?: string;
  ownerName?: string;
  shopName?: string;
  legalEntityId?: string;
  legalDocument?: File | null; // สำหรับไฟล์
}

interface FormErrorsState {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  citizenId?: string;
  institutionName?: string;
  studentId?: string;
  studentIdCard?: string; // error message จะเป็น string
  cardExpiryDate?: string;
  ownerName?: string;
  shopName?: string;
  legalEntityId?: string;
  legalDocument?: string; // error message จะเป็น string
}

type UserType = "general" | "student" | "shop";

// กำหนด Initial State ที่ชัดเจนเพื่อหลีกเลี่ยง undefined ใน JSX
const initialFormData: FormDataState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  citizenId: "",
  institutionName: "",
  studentId: "",
  studentIdCard: null,
  cardExpiryDate: "",
  ownerName: "",
  shopName: "",
  legalEntityId: "",
  legalDocument: null,
};

const initialFormErrors: FormErrorsState = {}; // Initial errors should be an empty object

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>("general");
  // ใช้ initialFormData เพื่อให้ค่าเริ่มต้นเป็น string ว่าง หรือ null สำหรับไฟล์
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [errors, setErrors] = useState<FormErrorsState>(initialFormErrors); // ใช้ initialFormErrors

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as UserType);
    // เมื่อเปลี่ยน user type ให้ reset formData และ errors กลับไปที่ initial state ที่ถูกต้อง
    setFormData(initialFormData);
    setErrors(initialFormErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prevData) => {
      // ใช้ functional update เพื่อให้แน่ใจว่าได้ prevData ที่ถูกต้อง
      if (name === "studentIdCard" || name === "legalDocument") {
        return { ...prevData, [name]: files ? files[0] : null };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const validateForm = () => {
    const newErrors: FormErrorsState = {}; // ใช้ FormErrorsState แทน Record<string, string> เพื่อ Type safety

    // Basic validation for common fields
    // ใช้ !formData.fieldName เพื่อตรวจสอบว่าไม่มีค่า (undefined, null, "")
    if (!formData.fullName) newErrors.fullName = "กรุณากรอกชื่อ-นามสกุล";
    if (!formData.email) newErrors.email = "กรุณากรอกอีเมล์";
    // ตรวจสอบ email โดยใช้ optional chaining หรือให้ค่าเริ่มต้นเป็น string ว่างก่อนใช้ .test
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมล์ไม่ถูกต้อง";
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (10 หลัก)";
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "กรุณาเลือกวันเกิด";

    if (userType === "general") {
      if (!formData.citizenId) newErrors.citizenId = "กรุณากรอกรหัสบัตรประชาชน";
      if (formData.citizenId && !/^\d{13}$/.test(formData.citizenId)) {
        newErrors.citizenId = "รหัสบัตรประชาชนไม่ถูกต้อง (13 หลัก)";
      }
    } else if (userType === "student") {
      if (!formData.institutionName)
        newErrors.institutionName = "กรุณากรอกชื่อสถานศึกษา";
      if (!formData.studentId)
        newErrors.studentId = "กรุณากรอกรหัสประจำตัวนักเรียน/นักศึกษา";
      if (!formData.studentIdCard)
        newErrors.studentIdCard = "กรุณาแนบรูปภาพบัตรนักศึกษา";
      if (!formData.cardExpiryDate)
        newErrors.cardExpiryDate = "กรุณาเลือกวันหมดอายุของบัตร";
    } else if (userType === "shop") {
      if (!formData.ownerName)
        newErrors.ownerName = "กรุณากรอกชื่อผู้ประกอบการ";
      if (!formData.shopName) newErrors.shopName = "กรุณากรอกชื่อสถานประกอบการ";
      if (!formData.legalEntityId)
        newErrors.legalEntityId = "กรุณากรอกเลขทะเบียนนิติบุคคล";
      if (!formData.legalDocument)
        newErrors.legalDocument = "กรุณาแนบเอกสารนิติบุคคล";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form has errors", errors);
      return;
    }

    const dataToSend = new FormData();
    // Loop through formData to append values, handling undefined and File types
    for (const key in formData) {
      const value = formData[key as keyof FormDataState]; // Cast key to ensure correct type access
      if (value !== undefined && value !== null) {
        // Only append if value is not undefined or null
        if (value instanceof File) {
          dataToSend.append(key, value);
        } else {
          // Ensure value is converted to string for append
          dataToSend.append(key, String(value));
        }
      }
    }
    dataToSend.append("userType", userType);

    try {
      const response = await fetch("/api/register", {
        // Your API endpoint
        method: "POST",
        body: dataToSend, // Use FormData for file uploads
      });

      if (response.ok) {
        alert("ลงทะเบียนสำเร็จ!");
        // Optional: Reset form after successful submission
        setFormData(initialFormData);
        setErrors(initialFormErrors);
      } else {
        const errorData = await response.json();
        alert(
          `ลงทะเบียนไม่สำเร็จ: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  const renderFormFields = () => {
    return (
      <>
        {/* Common fields for all user types */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ชื่อ-นามสกุล:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName || ""} // เพิ่ม || ""
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.fullName ? "border-red-500" : ""
            }`}
            required
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            อีเมล์:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""} // เพิ่ม || ""
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            วันเกิด:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""} // เพิ่ม || ""
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.dateOfBirth ? "border-red-500" : ""
            }`}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            หมายเลขโทรศัพท์:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ""} // เพิ่ม || ""
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
          )}
        </div>

        {userType === "general" && (
          <div className="mb-4">
            <label
              htmlFor="citizenId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              รหัสบัตรประชาชน:
            </label>
            <input
              type="text"
              id="citizenId"
              name="citizenId"
              value={formData.citizenId || ""} // เพิ่ม || ""
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.citizenId ? "border-red-500" : ""
              }`}
              required
            />
            {errors.citizenId && (
              <p className="text-red-500 text-xs italic">{errors.citizenId}</p>
            )}
          </div>
        )}

        {userType === "student" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="institutionName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ชื่อสถานศึกษา:
              </label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={formData.institutionName || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.institutionName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.institutionName && (
                <p className="text-red-500 text-xs italic">
                  {errors.institutionName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="studentId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                รหัสประจำตัวนักเรียน/นักศึกษา:
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.studentId ? "border-red-500" : ""
                }`}
                required
              />
              {errors.studentId && (
                <p className="text-red-500 text-xs italic">
                  {errors.studentId}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="studentIdCard"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                แนบรูปภาพบัตรนักศึกษา:
              </label>
              <input
                type="file"
                id="studentIdCard"
                name="studentIdCard"
                onChange={handleChange}
                accept="image/*"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.studentIdCard ? "border-red-500" : ""
                }`}
                required
              />
              {errors.studentIdCard && (
                <p className="text-red-500 text-xs italic">
                  {errors.studentIdCard}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardExpiryDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                วันหมดอายุของบัตร:
              </label>
              <input
                type="date"
                id="cardExpiryDate"
                name="cardExpiryDate"
                value={formData.cardExpiryDate || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.cardExpiryDate ? "border-red-500" : ""
                }`}
                required
              />
              {errors.cardExpiryDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.cardExpiryDate}
                </p>
              )}
            </div>
          </>
        )}

        {userType === "shop" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="ownerName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ชื่อผู้ประกอบการ:
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.ownerName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.ownerName && (
                <p className="text-red-500 text-xs italic">
                  {errors.ownerName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="shopName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ชื่อสถานประกอบการ:
              </label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.shopName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.shopName && (
                <p className="text-red-500 text-xs italic">{errors.shopName}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="legalEntityId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                เลขทะเบียนนิติบุคคล:
              </label>
              <input
                type="text"
                id="legalEntityId"
                name="legalEntityId"
                value={formData.legalEntityId || ""} // เพิ่ม || ""
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.legalEntityId ? "border-red-500" : ""
                }`}
                required
              />
              {errors.legalEntityId && (
                <p className="text-red-500 text-xs italic">
                  {errors.legalEntityId}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="legalDocument"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                แนบเอกสารนิติบุคคล:
              </label>
              <input
                type="file"
                id="legalDocument"
                name="legalDocument"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.legalDocument ? "border-red-500" : ""
                }`}
                required
              />
              {errors.legalDocument && (
                <p className="text-red-500 text-xs italic">
                  {errors.legalDocument}
                </p>
              )}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: "url('/bookbg.jpg')",
          filter: "brightness(0.7)",
        }}
      />

      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg bg-opacity-90">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ลงทะเบียนผู้ใช้งานสำหรับร้านขายหนังสือ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            หรือ{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="userType"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ประเภทผู้ใช้งาน:
              </label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="general">บุคคลทั่วไป</option>
                <option value="student">นักเรียน/นักศึกษา</option>
                <option value="shop">ร้านค้า</option>
              </select>
            </div>

            {renderFormFields()}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ลงทะเบียน
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
