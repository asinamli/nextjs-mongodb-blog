
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  console.log("Register API tetiklendi");

  const { username, email, password, role } = await request.json();
    console.log("Gelen veri:", { username, email, role });

  if (!username || !email || !password) {
    return NextResponse.json({ error: "username , Email ve şifre gerekli" }, { status: 400 });
  }

  const existingUser = await User.findOne({ $or : [{email}, {username}] });
  if (existingUser) {
    return NextResponse.json({ error: "Bu email veya username zaten kayıtlı" }, { status: 400 });
  }

  const newUser = new User({
      username,
      email,
      password, 
      role: role || 'user' 
    });

   await newUser.save();
    console.log("Kullanıcı MongoDB'ye kaydedildi!", {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    });

  return NextResponse.json({ message: "Kayıt başarılı" }, { status: 201 });
}