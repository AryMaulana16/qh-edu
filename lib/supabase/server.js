import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase untuk server memakai SUPABASE_URL dan SUPABASE_SECRET_KEY.
 * Sesuai docs/rancangan-teknis.md, koneksi ini dipakai di server untuk membaca
 * data katalog & detail produk publik.
 */
export function createServerClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !secretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  // Normalisasi URL jika ada akhiran /rest/v1 atau trailing slash
  const url = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Proxy agar pemanggil bisa memakai import { supabase } langsung
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = createServerClient();
      const value = client[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

export default createServerClient;

