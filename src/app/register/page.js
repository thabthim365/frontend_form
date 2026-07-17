"use client";

import React, { useState } from "react";
import swal from "sweetalert2";

export default function Register() {
  // ประกาศ component ชื่อ Register
  const [form, setForm] = useState({
    // สร้าง state ชื่อ form ไว้เก็บค่าที่ผู้ใช้กรอก
    txt_firstname: "", // ค่าเริ่มต้นของชื่อ = ว่าง
    txt_lastname: "", // ค่าเริ่มต้นของนามสกุล = ว่าง
    txt_username: "", // ค่าเริ่มต้นของชื่อผู้ใช้ = ว่าง
    txt_password: "", // ค่าเริ่มต้นของรหัสผ่าน = ว่าง
  });

  const handleChange = (e) => {
    // ฟังก์ชันทำงานทุกครั้งที่ผู้ใช้พิมพ์ใน input
    setForm({
      // อัปเดต state form
      ...form, // คงค่าเดิมทั้งหมดไว้ก่อน
      [e.target.name]: e.target.value, // แล้วเปลี่ยนเฉพาะ field ที่ตรงกับ name ของ input นั้น
    });
  };

  const handleSubmit = async (e) => {
    // ฟังก์ชันทำงานตอนกด submit ฟอร์ม (เป็น async เพราะต้องรอ fetch)
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ reload เมื่อ submit ฟอร์ม (ค่า default ของ browser)
    console.log("Form Data :", form); // แสดงค่าฟอร์มปัจจุบันใน console เพื่อ debug
    try {
      const res = await fetch("https://api.itdev.cmtc.ac.th/users", {
        // ส่ง request ไปยัง API เพื่อสมัครสมาชิก
        method: "POST", // ใช้ method POST เพราะเป็นการสร้างข้อมูลใหม่
        headers: {
          "Content-Type": "application/json", // บอก server ว่าข้อมูลที่ส่งไปเป็นรูปแบบ JSON
        },
        body: JSON.stringify({
          // แปลง object เป็น JSON string เพื่อส่งไปกับ request
          firstname: form.txt_firstname, // ส่งค่าชื่อจาก state
          lastname: form.txt_lastname, // ส่งค่านามสกุลจาก state
          username: form.txt_username, // ส่งค่าชื่อผู้ใช้จาก state
          password: form.txt_password, // ส่งค่ารหัสผ่านจาก state
        }),
      });

      const result = await res.json(); // แปลง response ที่ได้กลับมาให้เป็น JS object

      if (res.ok) {
        // สำเร็จ status 201
        await swal.fire({
          icon: "success",
          title: `บันทึกข้อมูลสำเร็จ (status: ${res.status})`,
          text: "บันทึกข้อมูลผู้ใช้งานเรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#c23687",
        });
      } else if (res.status === 400) {
        // ถ้า status เป็น 400 (ข้อมูลที่ส่งไปไม่ถูกต้อง)

        await swal.fire({
          // validation error status 400
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${res.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#bb287e",
        });
      } else if (res.status === 500) {
        // ถ้า status เป็น 500 (server มีปัญหา)

        await swal.fire({
          // server error status 500
          icon: "error",
          title: `เกิดข้อผิดพลาด (status: ${res.status})`,
          text: result.message || "เซิร์ฟเวอร์มีปัญหา",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#f15b9a",
        });
      }
    } catch (error) {
      // ดักจับกรณี fetch ล้มเหลว เช่น เน็ตหลุด หรือเรียก API ไม่ได้เลย
      await swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเชิฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#f159a0",
      });
    }
  };

  return (
    // พื้นหลังจัดกึ่งกลางเต็มหน้าจอ - ธีมชมพู
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-6">
      {/* กล่องฟอร์ม */}
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-pink-200/60 border border-pink-100 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-300/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
              />
              <circle cx="8.5" cy="7" r="4" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 8v6M23 11h-6"
              />
            </svg>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            กรุณากรอกข้อมูลด้านล่างเพื่อสมัครสมาชิก
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* แถว: ชื่อ - นามสกุล (ปรับให้เรียงข้างกันแบบ Grid) */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              ชื่อ
            </label>
            <input
              type="text"
              name="txt_firstname"
              defaultValue={""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              นามสกุล
            </label>
            <input
              type="text"
              name="txt_lastname"
              defaultValue={""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="txt_username"
              defaultValue={""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="txt_password"
              defaultValue={""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 outline-none"
            />
          </div>

          {/* ปุ่ม Submit */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-105 active:scale-[0.98]"
          >
            บันทึกข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
}
