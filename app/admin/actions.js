"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function login(prevStateOrFormData, maybeFormData) {
  const isFormState = maybeFormData instanceof FormData;
  const formData = isFormState ? maybeFormData : prevStateOrFormData;

  const email = formData?.get?.("email");
  const password = formData?.get?.("password");

  if (!email || !password) {
    const errorMsg = "Email dan password wajib diisi.";
    if (isFormState) return { error: errorMsg };
    redirect(`/admin/login?error=${encodeURIComponent(errorMsg)}`);
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    const errorMsg =
      error.message === "Invalid login credentials"
        ? "Email atau password salah."
        : error.message || "Gagal masuk. Periksa kembali email dan password.";

    if (isFormState) return { error: errorMsg };
    redirect(`/admin/login?error=${encodeURIComponent(errorMsg)}`);
  }

  redirect("/admin");
}

export async function keluar() {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const isFormState = maybeFormData instanceof FormData;
  const formData = isFormState ? maybeFormData : prevStateOrFormData;

  const passwordBaru = formData?.get?.("password_baru");
  const konfirmasiPassword = formData?.get?.("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  const supabase = await createAdminClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir atau Anda belum login. Silakan login kembali." };
  }

  const { error } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password." };
  }

  return { success: "Password berhasil diganti." };
}
