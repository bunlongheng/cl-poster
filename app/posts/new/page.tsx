"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPost() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", description: "", price: 0, location: "springfield",
    category: "services", subcategory: "computer", email: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/");
    setSaving(false);
  }

  function handleGenerate() {
    setForm({
      ...form,
      title: "Full-Stack Web Developer - Fast, Secure, Scalable",
      description: `Looking for a developer who actually delivers? You found one.\n\nWhat I build:\n- Custom websites & web apps\n- React / Next.js frontends\n- Node.js / Python backends\n- REST & GraphQL APIs\n- Database design & optimization\n\nWhy work with me:\n- 10+ years professional experience\n- Clean, maintainable code\n- Security-first development\n- Fast communication & delivery\n\nContact me today for a free estimate.\n\n---\n"Your online presence is your reputation. The businesses that show up are the businesses that win."`,
    });
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30 focus:border-[var(--accent)]";
  const inputStyle = { background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" };
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider mb-1.5";
  const labelStyle = { color: "var(--muted)" };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium" style={{ color: "var(--accent)" }}>&larr;</Link>
            <h1 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>New Post Template</h1>
          </div>
          <button onClick={handleGenerate}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
            Auto-Generate
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="rounded-xl p-7 space-y-5 animate-fade-up"
          style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div>
            <label className={labelClass} style={labelStyle}>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass} style={inputStyle} placeholder="Your CL post title" required />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} min-h-[260px] resize-y`} style={inputStyle} placeholder="Your CL post body" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Location (CL city slug)</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass} style={inputStyle} placeholder="springfield" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass} style={inputStyle} placeholder="your@email.com" />
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
              {saving ? "Saving..." : "Save Template"}
            </button>
            <button type="button" onClick={() => router.push("/")}
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
