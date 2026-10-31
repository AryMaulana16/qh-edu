# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Dibuat koneksi Supabase server di `lib/supabase/server.js` dan `lib/supabase/index.js` menggunakan `createClient` dari `@supabase/supabase-js` dengan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`.
- `app/page.jsx` diubah menjadi Server Component (`async function HalamanKatalog`) yang membaca data dari tabel `produk` di Supabase.
- Produk ditampilkan menggunakan komponen `KartuProduk` tanpa mengubah komponen tersebut.
- Jika query gagal, error ditangkap dan ditampilkan di halaman dengan pesan yang jelas.
- Jika tabel kosong (0 produk), ditampilkan tulisan "Belum ada produk".
- Komponen `CatatanBelumAktif` dan importnya telah dihapus dari `app/page.jsx`.

**Perbaikan:**
- Menambahkan sanitasi/normalisasi URL pada `createServerClient` agar aman jika `SUPABASE_URL` menyertakan `/rest/v1` atau trailing slash.
- Memperbaiki `SUPABASE_URL` pada `.env.local` menjadi URL root proyek (`https://cttgieiaubqtjlrfvqbp.supabase.co`).

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
- Mengubah `app/produk/[id]/page.jsx` agar mengambil detail satu produk dari tabel `produk` di Supabase secara server-side berdasarkan parameter `id`.
- Menggunakan `createServerClient` dari `@/lib/supabase/server`.
- Memanggil `notFound()` jika data produk tidak ditemukan atau terjadi error pada query.
- Menjaga tampilan asli halaman (`article`, tata letak, format rupiah, link kembali ke katalog, dan tombol WhatsApp).
- Menghapus komponen `CatatanBelumAktif` dan membiarkan komponen `TombolWhatsApp`.

**Perbaikan:**
- Menggunakan query `.eq("id", id).maybeSingle()` untuk mendeteksi ketiadaan baris data secara aman sebelum memanggil `notFound()`.

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
