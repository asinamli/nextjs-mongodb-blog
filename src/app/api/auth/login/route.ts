import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

   
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

   
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    
    const response = NextResponse.json(
      {
        message: "Giriş başarılı",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, 
      path: '/',
      sameSite: 'strict'
    });

    return response;

  } catch (error) {
    console.error("Login hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}