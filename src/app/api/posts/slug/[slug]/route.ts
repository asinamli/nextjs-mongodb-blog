import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Posts";

export async function GET(request: Request, { params }: { params: Promise<{slug: string}> }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    console.log("Aranan slug:", slug);

    const post = await Post.findOne({ slug, published: true });

    if (!post) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }

    console.log("Slug ile yazı bulundu:", post.title);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Slug ile yazı getirilirken hata:", error);
    return NextResponse.json({ error: "Yazı getirilirken hata oluştu" }, { status: 500 });
  }
}
