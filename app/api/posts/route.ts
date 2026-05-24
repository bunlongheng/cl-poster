import { NextResponse } from "next/server";
import { getAllPosts, createPost, getPostLogs } from "@/lib/db";

export async function GET() {
  const posts = getAllPosts();
  const logs = getPostLogs();
  return NextResponse.json({ posts, logs });
}

export async function POST(req: Request) {
  const body = await req.json();
  const post = createPost({
    title: body.title || "",
    description: body.description || "",
    price: body.price || 0,
    location: body.location || "",
    category: body.category || "services",
    subcategory: body.subcategory || "computer",
    email: body.email || "",
    images: JSON.stringify(body.images || []),
  });
  return NextResponse.json(post, { status: 201 });
}
