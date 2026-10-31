"use client";

import { useActionState, useState, useEffect } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { login } from "@/app/admin/actions";

export default function HalamanLogin() {
  const [state, formAction] = useActionState(login, null);
  const [urlError, setUrlError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      if (err) setUrlError(err);
    }
  }, []);

  const pesanError = state?.error || urlError;

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-12">
      <div>
        <h1 className="text-2xl font-extrabold">Masuk admin</h1>
        <p className="mt-1 text-sm text-teks-lembut">Khusus pemilik toko untuk mengelola produk.</p>
      </div>

      {pesanError && (
        <div className="rounded-xl border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {pesanError}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Tombol type="submit">Masuk</Tombol>
      </form>
    </div>
  );
}
