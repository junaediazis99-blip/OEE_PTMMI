/* =====================================================
   KONFIGURASI FIREBASE — OEE MMI
   -----------------------------------------------------
   Ganti nilai di bawah ini dengan konfigurasi proyek
   Firebase Anda sendiri.

   Cara mendapatkannya:
   Firebase Console > ikon gerigi (Project settings) >
   tab "General" > bagian "Your apps" > pilih Web app >
   "SDK setup and configuration" > pilih "Config".

   Catatan: nilai-nilai ini memang bersifat publik dan
   aman terlihat di browser. Keamanan data ditentukan
   oleh Realtime Database Rules (lihat database.rules.json),
   bukan oleh kerahasiaan apiKey.
===================================================== */

const FIREBASE_CONFIG = {
  apiKey: "GANTI_DENGAN_API_KEY_ANDA",
  authDomain: "GANTI-PROJECT-ID.firebaseapp.com",
  databaseURL: "https://GANTI-PROJECT-ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "GANTI-PROJECT-ID",
  storageBucket: "GANTI-PROJECT-ID.appspot.com",
  messagingSenderId: "GANTI_SENDER_ID",
  appId: "GANTI_APP_ID"
};
