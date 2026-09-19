# Panduan Pemasangan — OEE MMI dengan Backend Firebase

Aplikasi OEE MMI kini memakai **Firebase Realtime Database** (penyimpanan data) + **Firebase Authentication** (login), sehingga data tersimpan online, gratis di paket Spark, dan bisa diakses banyak pengguna dari PC, tablet, maupun HP secara bersamaan.

Berkas yang Anda terima:

| Berkas | Fungsi |
|---|---|
| `index.html` | Seluruh aplikasi (UI, logika OEE, dashboard, laporan) |
| `firebase-config.js` | Konfigurasi proyek Firebase Anda — **satu-satunya berkas yang wajib diedit** |
| `database.rules.json` | Aturan keamanan database berbasis role |
| `PANDUAN-FIREBASE.md` | Dokumen ini |

---

## Langkah 1 — Buat proyek Firebase

1. Buka https://console.firebase.google.com lalu klik **Add project**.
2. Beri nama, misalnya `oee-mmi`. Google Analytics boleh dimatikan.
3. Tunggu sampai proyek selesai dibuat, lalu klik **Continue**.

## Langkah 2 — Aktifkan Authentication (Email/Password)

1. Menu kiri: **Build → Authentication → Get started**.
2. Tab **Sign-in method** → pilih **Email/Password** → aktifkan tombol **Enable** → **Save**.

> Metode lain (Google, dsb.) tidak perlu diaktifkan.

## Langkah 3 — Buat Realtime Database

1. Menu kiri: **Build → Realtime Database → Create Database**.
2. Pilih lokasi **Singapore (asia-southeast1)** — paling dekat dengan Indonesia.
3. Pilih **Start in locked mode** (aturan aman akan kita pasang di Langkah 5).
4. Catat **URL database** yang muncul di atas tabel data, bentuknya seperti:
   `https://oee-mmi-default-rtdb.asia-southeast1.firebasedatabase.app`

## Langkah 4 — Daftarkan Web App & isi `firebase-config.js`

1. Klik ikon gerigi ⚙ di kiri atas → **Project settings**.
2. Gulir ke **Your apps** → klik ikon **</>** (Web).
3. Beri nama app, misalnya `OEE Web`. **Jangan** centang Firebase Hosting. Klik **Register app**.
4. Firebase menampilkan objek `firebaseConfig`. Salin nilainya ke berkas **`firebase-config.js`**:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza....",
  authDomain: "oee-mmi.firebaseapp.com",
  databaseURL: "https://oee-mmi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oee-mmi",
  storageBucket: "oee-mmi.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
```

> **Penting:** pastikan `databaseURL` ikut terisi. Kalau Firebase tidak menampilkannya di cuplikan config, salin manual dari halaman Realtime Database (Langkah 3).
>
> Nilai `apiKey` memang terlihat publik di browser dan itu normal — keamanan data ditentukan oleh Rules, bukan oleh kerahasiaan apiKey.

## Langkah 5 — Pasang Rules keamanan

1. Menu **Realtime Database** → tab **Rules**.
2. Hapus isinya, lalu tempel seluruh isi berkas `database.rules.json`.
3. Klik **Publish**.

Ringkasan aturan yang berlaku:

| Node | Siapa yang boleh menulis |
|---|---|
| `data/oeeInput`, `data/downtime` | Staff, Supervisor, Manager |
| `data/operator` | Supervisor, Manager |
| `data/produk`, `mesin`, `kapasitas`, `shiftMaster`, `settings` | Manager saja |
| `users/{uid}` (profil & role) | Manager saja — kecuali pendaftaran admin pertama |
| Semua node `data/*` | Dibaca oleh semua pengguna yang sudah punya profil (termasuk Direksi, yang hanya membaca) |

## Langkah 6 — Unggah ke GitHub Pages

Sama seperti aplikasi WMS Bahan Kemas Anda:

1. Buat repo baru, misalnya `oee-mmi`.
2. Unggah `index.html`, `firebase-config.js`, dan `database.rules.json` ke root repo.
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
4. Tunggu 1–2 menit, aplikasi tersedia di `https://<username>.github.io/oee-mmi/`

Lalu **daftarkan domain GitHub Pages di Firebase** agar login tidak ditolak:

- Firebase Console → **Authentication → Settings → Authorized domains → Add domain**
- Masukkan `<username>.github.io`

> Selama pengujian di komputer sendiri, jangan buka `index.html` lewat klik ganda (`file://`) — Firebase Auth akan menolak. Jalankan server lokal, misalnya `python -m http.server 8000` di folder aplikasi, lalu buka `http://localhost:8000`. Domain `localhost` sudah diizinkan Firebase secara bawaan.

## Langkah 7 — Buat akun admin pertama

1. Buka aplikasi, Anda akan melihat halaman login (tanpa tombol demo — login kini benar-benar ke Firebase).
2. Buat akun pertama lewat Firebase Console: **Authentication → Users → Add user**, isi email & password (min. 6 karakter).
3. Login memakai akun itu di aplikasi.
4. Karena node `users` masih kosong, akun pertama ini **otomatis diberi role Manager** dan profilnya tersimpan di `users/{uid}`. Data contoh (produk, mesin, shift, dsb.) juga otomatis dibuat pertama kali.

## Langkah 8 — Tambahkan pengguna lain dari dalam aplikasi

Login sebagai Manager, lalu buka menu **Pengguna → + Buat Akun**. Isi email, password, nama, role, dan area. Akun Firebase Auth dan profil rolenya dibuat sekaligus, dan sesi login Anda tidak terputus.

Empat level yang tersedia: **Staff → Supervisor → Manager → Direksi**.

Untuk **menghapus** pengguna sepenuhnya, hapus profilnya di menu Pengguna, lalu hapus akunnya di Firebase Console → Authentication → Users (Firebase tidak mengizinkan penghapusan akun orang lain dari sisi browser).

---

## Yang berubah dari versi sebelumnya

- **Login** kini memakai **email + password** Firebase Authentication (bukan username lokal), lengkap dengan fitur **Lupa password** yang mengirim tautan reset ke email.
- **Data** tersimpan di Realtime Database pada node `data/`, dan **tersinkron realtime** — bila Supervisor menambah input OEE, layar Manager ikut diperbarui otomatis.
- **Penyimpanan per bagian**: hanya koleksi yang benar-benar berubah yang dikirim ke server (mis. hanya `oeeInput`), bukan seluruh pohon data — lebih hemat kuota dan aman untuk kerja paralel.
- **Cache lokal**: data terakhir disimpan di browser, jadi aplikasi tetap menampilkan informasi saat koneksi terputus. Indikator **Online / Offline** ada di pojok kanan atas.
- Menu **Pengaturan → Cadangan Data** tetap bisa dipakai untuk ekspor/impor JSON.

## Bila terjadi masalah

| Gejala | Penyebab & solusi |
|---|---|
| Pesan "Firebase belum terkonfigurasi" | `firebase-config.js` belum diisi, atau berkasnya tidak ikut terunggah ke repo |
| Login gagal: `auth/operation-not-allowed` | Metode Email/Password belum diaktifkan (Langkah 2) |
| Login gagal: `auth/unauthorized-domain` | Domain GitHub Pages belum didaftarkan di Authorized domains (Langkah 6) |
| Badge tetap "Offline", data tidak muncul | `databaseURL` salah/kosong, atau Rules belum di-publish |
| "Gagal menyimpan ke server: PERMISSION_DENIED" | Role Anda memang tidak berhak menulis node tersebut — cek tabel di Langkah 5 |
| Muncul "Akun Anda belum memiliki profil/role" | Akun dibuat langsung di Console tetapi belum didaftarkan Manager lewat menu Pengguna |

> Bila tombol/menu terasa "diam saja", buka DevTools (F12) → tab **Console** dan pastikan setelan **Pause on caught exceptions** dalam keadaan mati sebelum menyimpulkan ada bug — persis seperti kasus di aplikasi WMS dulu.
