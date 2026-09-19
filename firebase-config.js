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

const firebaseConfig = {
  apiKey: "AIzaSyAxiLpE8LA-VYdykAH4vUMTWK2Tx_GjdtE",
  authDomain: "oee-mmi.firebaseapp.com",
 databaseURL: "https://oee-mmi-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "oee-mmi",
  storageBucket: "oee-mmi.firebasestorage.app",
  messagingSenderId: "97915071019",
  appId: "1:97915071019:web:49a665a6a11d27b38f986e"
};
