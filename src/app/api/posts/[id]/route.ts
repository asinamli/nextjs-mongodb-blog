import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Posts';
import slugify from 'slugify';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = context.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: "Post bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Post getirme hatası:', error);
    return NextResponse.json(
      { error: "Post getirilemedi" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = context.params;

    const { title, content, published } = await request.json();
    
    if (!title || !content) {
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
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { 
        title, 
        content, 
        published: Boolean(published), 
        slug,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: "Post bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Post güncelleme hatası:', error);
    return NextResponse.json(
      { error: "Post güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = context.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return NextResponse.json(
        { error: "Post bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: "Post başarıyla silindi",
      deletedPost 
    });
  } catch (error) {
    console.error('Post silme hatası:', error);
    return NextResponse.json(
      { error: "Post silinemedi" },
      { status: 500 }
    );
  }
}
