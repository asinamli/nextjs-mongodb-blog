import { NextResponse } from "next/server";

export async function POST() {
  try{
    const response = NextResponse.json(
      { message: "Çıkış başarılı" },
      { status: 200 }
    );

    response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",

  
    });


    return response;
  }catch(error){
    console.error("Çıkış yapılırken hata oluştu:", error);
    return NextResponse.json(
      { error: "Çıkış yapılırken hata oluştu" },
      { status: 500 }
    );
  }}