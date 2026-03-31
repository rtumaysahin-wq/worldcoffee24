"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "default" | "dark" | "inline";
}

export default function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Geçerli bir e-posta adresi girin.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Bültene başarıyla kaydoldunuz!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Bir hata oluştu.");
      }
    } catch {
      setStatus("error");
      setMessage("Bağlantı hatası, lütfen tekrar deneyin.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 ${variant === "dark" ? "text-tertiary-fixed" : "text-tertiary"}`}>
        <span className="material-symbols-outlined text-xl">check_circle</span>
        <p className="text-sm font-bold">{message}</p>
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            className="flex-1 border border-white/20 bg-white/10 px-3 py-2.5 text-sm outline-none focus:bg-white/20 placeholder:text-white/50 text-white"
            placeholder="email@adres.com"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-primary text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#32170d] disabled:opacity-50"
          >
            {status === "loading" ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : (
              "Abone"
            )}
          </button>
        </div>
        {status === "error" && (
          <p className="text-xs text-error mt-2">{message}</p>
        )}
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-md border-b-2 border-primary">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            className="flex-1 bg-transparent border-none py-3 px-0 focus:ring-0 text-primary text-sm placeholder:text-outline-variant outline-none"
            placeholder="professional@email.com"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-primary font-bold text-xs uppercase tracking-widest px-4 hover:opacity-70 disabled:opacity-50"
          >
            {status === "loading" ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : (
              "Abone Ol"
            )}
          </button>
        </div>
        {status === "error" && (
          <p className="text-xs text-error mt-2">{message}</p>
        )}
      </form>
    );
  }

  // default
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex max-w-md mx-auto gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          className="flex-1 border border-outline-variant px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none"
          placeholder="professional@email.com"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-container disabled:opacity-50"
        >
          {status === "loading" ? (
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
          ) : (
            "Abone Ol"
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-error mt-2 text-center">{message}</p>
      )}
    </form>
  );
}
