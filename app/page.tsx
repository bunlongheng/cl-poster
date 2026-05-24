"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  email: string;
  images: string;
  created_at: string;
}

function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function getWeeklyPosts(posts: Post[], weekOffset: number): Post[] {
  if (posts.length === 0) return [];
  const week = getWeekNumber() + weekOffset;
  const totalWeeks = Math.ceil(posts.length / 10);
  const start = (week % totalWeeks) * 10;
  return posts.slice(start, start + 10);
}

export default function Dashboard() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/posts").then((r) => r.json()).then((d) => {
      setAllPosts(d.posts || []);
      setLoading(false);
    });
  }, []);

  const displayPosts = showAll ? allPosts : getWeeklyPosts(allPosts, weekOffset);
  const totalWeeks = Math.ceil(allPosts.length / 10);
  const currentWeek = (getWeekNumber() + weekOffset) % totalWeeks;

  async function handlePostNow(postId: number) {
    const res = await fetch("/api/post-now", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId }) });
    const data = await res.json();
    if (res.ok) {
      alert(`Queued! Run:\n\n${data.command}`);
    } else alert(data.error);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this template?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setAllPosts(allPosts.filter((p) => p.id !== id));
  }

  async function handleCopy(post: Post) {
    await navigator.clipboard.writeText(`${post.title}\n\n${post.description}`);
    setCopied(post.id);
    setTimeout(() => setCopied(null), 1500);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        <p style={{ color: "var(--muted)" }} className="text-sm">Loading posts...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top bar */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "var(--accent)" }}>CL</div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>CL Poster</h1>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{allPosts.length} templates &middot; 10/week rotation</p>
            </div>
          </div>
          <Link href="/posts/new"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--accent)" }}>
            + New Post
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-6">
        {/* Week navigation */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <div className="flex items-center gap-2">
            <button onClick={() => { setShowAll(false); setWeekOffset(w => w - 1); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              &larr;
            </button>
            <div className="px-4 py-1.5 rounded-lg text-sm font-medium" style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
              {showAll ? `All ${allPosts.length} posts` : `Week ${currentWeek + 1} / ${totalWeeks}`}
            </div>
            <button onClick={() => { setShowAll(false); setWeekOffset(w => w + 1); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
              &rarr;
            </button>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => { setShowAll(false); setWeekOffset(0); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={!showAll ? { background: "var(--accent)", color: "white" } : { background: "var(--muted-light)", color: "var(--muted)" }}>
              This Week
            </button>
            <button onClick={() => setShowAll(!showAll)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={showAll ? { background: "var(--accent)", color: "white" } : { background: "var(--muted-light)", color: "var(--muted)" }}>
              All
            </button>
          </div>
        </div>

        {/* Posts list */}
        <div className="rounded-xl overflow-hidden animate-fade-up" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {displayPosts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base mb-2" style={{ color: "var(--muted)" }}>No templates yet</p>
              <Link href="/posts/new" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>Create your first post &rarr;</Link>
            </div>
          ) : (
            <div className="stagger">
              {displayPosts.map((post, i) => {
                let img: string | null = null;
                try { const imgs = JSON.parse(post.images); if (imgs.length > 0) img = imgs[0]; } catch {}
                return (
                  <div key={post.id} className="animate-slide-in flex items-center group transition-colors"
                    style={{ borderBottom: i < displayPosts.length - 1 ? "1px solid var(--border)" : "none" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--muted-light)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <Link href={`/posts/${post.id}`} className="flex items-center flex-1 min-w-0 py-3 px-4">
                      <span className="text-[11px] font-mono w-6 flex-shrink-0" style={{ color: "var(--muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {img ? (
                        <img src={img} alt="" className="w-9 h-9 rounded-md object-cover flex-shrink-0 mr-3 shadow-sm" />
                      ) : (
                        <div className="w-9 h-9 rounded-md flex-shrink-0 mr-3" style={{ background: "var(--muted-light)" }} />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold truncate" style={{ color: "var(--foreground)" }}>{post.title}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{post.category} &middot; {post.location || "no location"}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-1 pr-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleCopy(post)}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md transition-all hover:scale-105 active:scale-95"
                        style={{ background: copied === post.id ? "var(--success-light)" : "var(--muted-light)", color: copied === post.id ? "var(--success)" : "var(--muted)" }}>
                        {copied === post.id ? "Copied!" : "Copy"}
                      </button>
                      <button onClick={() => handlePostNow(post.id)}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md transition-all hover:scale-105 active:scale-95"
                        style={{ background: "var(--success-light)", color: "var(--success)" }}>
                        Post
                      </button>
                      <Link href={`/posts/${post.id}?edit=true`}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md transition-all hover:scale-105 active:scale-95"
                        style={{ background: "var(--muted-light)", color: "var(--muted)" }}>
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(post.id)}
                        className="px-2 py-1 text-[11px] font-medium rounded-md transition-all hover:scale-105 active:scale-95 hover:bg-red-50 hover:text-red-600"
                        style={{ color: "#ccc" }}>
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
