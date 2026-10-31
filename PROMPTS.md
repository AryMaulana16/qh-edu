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
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
- Mengubah `components/TombolWhatsApp.jsx` dari `<button>` menjadi elemen `<a>` (tautan) dengan tautan `https://wa.me/<nomor>?text=<pesan>`.
- Nomor tujuan diambil dari `lib/toko.js` dan dibersihkan dari karakter non-digit/awalan +.
- Pesan otomatis memuat nama dan harga produk dalam format rupiah serta di-encode dengan `encodeURIComponent`.
- Tautan dibuka di tab baru (`target="_blank" rel="noopener noreferrer"`).
- Tampilan kelas Tailwind tombol dipertahankan.
- Memastikan `CatatanBelumAktif` sudah bersih dari halaman detail produk.

**Perbaikan:**
- Menambahkan sanitasi nomor telepon untuk mengonversi nomor berawalan `+` atau `0` ke format internasional standar tanpa karakter `+`.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
- Membuat helper `createAdminClient` di `lib/supabase/admin.js` menggunakan `@supabase/ssr` dan cookie storage (`next/headers`), dengan `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY`.
- Membuat Server Action `login` dan `keluar` di `app/admin/actions.js`.
- Menghubungkan form login di `app/admin/login/page.jsx` ke Server Action `login`, menampilkan pesan error bila kredensial salah atau terjadi kegagalan autentikasi, serta mengarahkan ke `/admin` jika berhasil.
- Mengaktifkan tombol "Keluar" di `components/NavAdmin.jsx` dengan Server Action `keluar` untuk memanggil `signOut()` dan mengalihkan ke `/admin/login`.
- Menghapus komponen `CatatanBelumAktif` dari halaman login.
- Tampilan form, tombol, dan navigasi admin dipertahankan sesuai desain awal.

**Perbaikan:**
- Menerjemahkan pesan kegagalan autentikasi umum seperti "Invalid login credentials" menjadi pesan berbahasa Indonesia yang jelas ("Email atau password salah.") bagi admin.
- Menangani pemanggilan Server Action baik melalui `useActionState` maupun form action tradisional secara fleksibel.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Menambahkan Server Action `gantiPassword` di `app/admin/actions.js` yang memverifikasi login admin dengan `supabase.auth.getUser()`, memvalidasi panjang password minimal 8 karakter dan kesamaan dengan konfirmasi, lalu memperbarui password dengan `supabase.auth.updateUser()`.
- Menghubungkan form ganti password di `app/admin/password/page.jsx` menggunakan `useActionState`.
- Menampilkan pesan sukses ("Password berhasil diganti.") atau pesan error yang jelas di bawah judul halaman.
- Menghapus komponen `CatatanBelumAktif` dari halaman ganti password.
- Mempertahankan tampilan dan tata letak form tanpa mengubah komponen tampilan.

**Perbaikan:**
- Memastikan pengecekan sesi login di sisi server sebelum menjalankan pembaruan password untuk mencegah akses tanpa hak.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
- Membuat file `proxy.js` di root proyek yang menggunakan `@supabase/ssr` untuk memeriksa status autentikasi admin via `supabase.auth.getUser()`.
- Menerapkan proteksi rute pada matcher `/admin` dan `/admin/:path*`, sehingga setiap kunjungan ke halaman di bawah `/admin` (selain `/admin/login`) tanpa sesi login aktif otomatis dialihkan ke `/admin/login`.
- Memastikan setiap Server Action mutasi (`gantiPassword`) memeriksa login admin di sisi server sebelum menjalankan perubahan data.
- Menghapus komponen `CatatanBelumAktif` dari `app/admin/page.jsx`.

**Perbaikan:**
- Mengantisipasi variasi trailing slash pada URL (`/admin/login/`) agar tidak sengaja terkena redirect berulang (loop).

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
