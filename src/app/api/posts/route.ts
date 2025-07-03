

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Posts";
import slugify from "slugify";

export async function GET() {
  try{
    await dbConnect();

    const posts = await Post.find({})
    .populate('author', 'username email') 
    .sort({ createdAt: -1 }); 
    return NextResponse.json(posts);

  }catch(error){
    console.error("Yazılar getirilemedi:", error);
    return NextResponse.json(
      { error: "Yazılar getirilemedi" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try{
    await dbConnect();



    const {title, content, published}=await request.json();

    if(!title || !content){
      return NextResponse.json(
        { error: "Başlık ve içerik gerekli" },
        { status: 400 }
      );
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'tr',
      replacement: '-'
    });


      const newPost =new Post ({
        title,
        content,
        slug,
        published:published || false,

      });

      await newPost.save();
      console.log("yeni yazı mongoya kayddedildi",newPost.title);

      return NextResponse.json(
        { message: "Yazı başarıyla oluşturuldu", post: newPost },
        { status: 201 }
      );  
  } catch(error) {
    console.error("Yazı oluşturulamadı", error);
    return NextResponse.json(
      { error: "Yazı oluşturulamadı" },
      { status: 500 }
    );
  }

}