# Product Requirements Document (PRD)

## 1. Tujuan Produk
Membangun platform pencatatan biaya pembangunan rumah yang ringan, bisa diakses lewat HP, dan mampu memberikan gambaran sisa saldo dari budget awal secara akurat.

## 2. Fitur Utama (MVP)
*   **Dashboard Keuangan:** Menampilkan total budget (80jt), total pengeluaran, dan sisa saldo secara visual.
*   **Manajemen Material:**
    *   Input pembelian material baru.
    *   Daftar stok material yang sudah ada (Bata, Pasir, Split, Besi, Cakar Ayam, Semen).
    *   Pencatatan harga satuan dan total.
*   **Manajemen Tukang (Payroll):**
    *   Input harian/mingguan untuk 3 Tukang dan 2 Laden.
    *   Fitur "Presensi" sederhana untuk menghitung total bayaran otomatis.
*   **Kategori Biaya:** Memisahkan biaya material, biaya tenaga kerja, dan biaya tak terduga.
*   **Laporan Sederhana:** Riwayat pengeluaran berdasarkan tanggal.

## 3. Struktur Data (Entitas Utama)

| Entitas | Atribut Utama |
| :--- | :--- |
| **Budget** | Total Awal, Saldo Saat Ini |
| **Material** | Nama, Kuantitas, Satuan, Harga Satuan, Status (Sudah Ada/Beli Baru) |
| **Tenaga Kerja** | Nama, Peran (Tukang/Laden), Upah Per Hari |
| **Transaksi** | Tanggal, Kategori, Jumlah, Keterangan |

## Rekomendasi Tech Stack
Mengingat Anda sedang belajar JavaScript dan ingin aplikasi yang cepat jadi namun powerfull di mobile, saya menyarankan **T3 Stack (Simplified)** atau **MERN Stack**.

*   **Opsi A: Cepat & Modern (Rekomendasi Utama)**
    *   **Frontend:** Next.js (React) dengan Tailwind CSS. Tailwind sangat memudahkan pembuatan UI yang rapi di layar HP.
    *   **Backend/Database:** Supabase.
        *   *Kenapa?* Anda tidak perlu pusing membuat API dari nol. Supabase menyediakan database PostgreSQL dan autentikasi secara instan.
    *   **Deployment:** Vercel (Gratis dan terintegrasi sangat baik dengan Next.js).

## Rencana Alur Kerja (Roadmap)
*   **Fase 1 (Database):** Setup tabel di MariaDB atau Supabase untuk `log_material` dan `log_tukang`.
*   **Fase 2 (UI Dashboard):** Buat halaman utama yang menampilkan sisa dari 80 juta.
*   **Fase 3 (Form Input):** Buat form yang mudah ditekan di HP (input besar-besar) untuk memasukkan nota belanja material.
*   **Fase 4 (Perhitungan Otomatis):** Implementasikan logika:
    $$Sisa\ Saldo = Budget\ Awal - (\sum Material + \sum Upah)$$

**Catatan Tambahan:**
Pastikan aplikasi ini memiliki fitur "Rencana Belanja" vs "Realisasi" agar Anda tahu material apa yang belum terbeli sebelum uangnya habis untuk upah.
