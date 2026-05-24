import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost, getPostLogs } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const logs = getPostLogs(post.id);
  return NextResponse.json({ post, logs });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const post = updatePost(Number(id), body);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  deletePost(Number(id));
  return NextResponse.json({ ok: true });
}
