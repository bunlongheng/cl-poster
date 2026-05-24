"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subcategory: string;
  email: string;
  images: string;
}

interface PostLog {
  id: number;
  title_used: string;
  posted_at: string;
  status: string;
}

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const [post, setPost] = useState<Post | null>(null);
  const [form, setForm] = useState<Post | null>(null);
  const [logs, setLogs] = useState<PostLog[]>([]);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`).then((r) => r.json()).then((d) => {
      setPost(d.post); setForm(d.post); setLogs(d.logs || []);
    });
  }, [params.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    await fetch(`/api/posts/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    router.push(`/posts/${params.id}`);
  }

  async function handleCopy() {
    if (!post) return;
    await navigator.clipboard.writeText(`${post.title}\n\n${post.description}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  async function handlePostNow() {
    if (!post) return;
    const res = await fetch("/api/post-now", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId: post.id }) });
    const data = await res.json();
    if (res.ok) alert(`Queued! Run:\n\n${data.command}`);
    else alert(data.error);
  }

  function getImage(): string | null {
    if (!post) return null;
    try { const imgs = JSON.parse(post.images); return imgs.length > 0 ? imgs[0] : null; } catch { return null; }
  }

  if (!post || !form) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30 focus:border-[var(--accent)]";
  const inputStyle = { background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" };
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider mb-1.5";
  const labelStyle = { color: "var(--muted)" };

  // PREVIEW
  if (!isEditMode) {
    const img = getImage();
    return (
      <div className="min-h-screen" style={{ background: "var(--background)" }}>
        {/* Nav */}
        <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-3xl mx-auto px-8 py-3 flex items-center justify-between">
            <Link href="/" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: "var(--accent)" }}>&larr; Dashboard</Link>
            <div className="flex gap-2">
              <button onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: copied ? "var(--success-light)" : "var(--muted-light)", color: copied ? "var(--success)" : "var(--muted)" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handlePostNow}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: "var(--success-light)", color: "var(--success)" }}>
                Post to CL
              </button>
              <Link href={`/posts/${params.id}?edit=true`}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: "var(--accent)", color: "white" }}>
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-8 py-8">
          {img && (
            <div className="rounded-xl overflow-hidden mb-8 animate-fade-up" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <img src={img} alt={post.title} className="w-full h-48 object-cover" />
            </div>
          )}

          <div className="animate-fade-up" style={{ animationDelay: "50ms" }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{post.category}</span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ background: "var(--muted-light)", color: "var(--muted)" }}>{post.subcategory}</span>
              {post.location && <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ background: "var(--muted-light)", color: "var(--muted)" }}>{post.location}</span>}
              {post.price > 0 && <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ background: "var(--success-light)", color: "var(--success)" }}>${post.price}</span>}
            </div>

            <h1 className="text-2xl font-bold leading-tight mb-6" style={{ color: "var(--foreground)" }}>{post.title}</h1>
          </div>

          <div className="rounded-xl p-7 animate-fade-up" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", animationDelay: "100ms" }}>
            <pre className="whitespace-pre-wrap text-[13.5px] leading-[1.75]" style={{ fontFamily: "'DM Sans', sans-serif", color: "#444" }}>{post.description}</pre>
          </div>

          {logs.length > 0 && (
            <div className="mt-8 rounded-xl overflow-hidden animate-fade-up" style={{ background: "var(--card)", border: "1px solid var(--border)", animationDelay: "150ms" }}>
              <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <h3 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Post History</h3>
              </div>
              {logs.map((log, i) => (
                <div key={log.id} className="flex items-center gap-2.5 px-5 py-2.5 text-[12px]"
                  style={{ borderBottom: i < logs.length - 1 ? "1px solid var(--muted-light)" : "none" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{
                    background: log.status === "posted" ? "var(--success)" : log.status === "pending" ? "#F59F00" : "#E03131"
                  }} />
                  <span className="flex-1 truncate" style={{ color: "var(--foreground)" }}>{log.title_used}</span>
                  <span style={{ color: "var(--muted)" }}>{new Date(log.posted_at + "Z").toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // EDIT MODE
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto px-8 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>Editing Post #{post.id}</h1>
          <Link href={`/posts/${params.id}`} className="text-xs font-medium" style={{ color: "var(--muted)" }}>Cancel</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-8">
        <form onSubmit={handleSave} className="rounded-xl p-7 space-y-5 animate-fade-up"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div>
            <label className={labelClass} style={labelStyle}>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass} style={inputStyle} required />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} min-h-[320px] resize-y`} style={inputStyle} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass} style={inputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass} style={inputStyle}>
                <option value="services">Services</option>
                <option value="gigs">Gigs</option>
                <option value="jobs">Jobs</option>
                <option value="forsale">For Sale</option>
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Subcategory</label>
              <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className={inputClass} style={inputStyle}>
                <option value="computer">Computer</option>
                <option value="creative">Creative</option>
                <option value="web">Web/Info Design</option>
                <option value="small-biz">Small Biz Ads</option>
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Price</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className={inputClass} style={inputStyle} />
            </div>
          </div>
          <div className="flex gap-2 pt-3">
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ background: "var(--accent)" }}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={() => router.push(`/posts/${params.id}`)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{ background: "var(--muted-light)", color: "var(--muted)" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
