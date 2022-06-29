# Kunci

Tools yang digunakan untuk membuka dan mengunci file-file di foldermu

## Persiapan

Siapkan file `kunci.txt` yang berisi teks yang akan membuka dan mengunci file-file. Misalnya, file `kunci.txt` berisi `kucing`.

## Tambahkan File yang Mau Dikunci

Jalankan `kunci namaFilenya`

## Cara Mengunci

Jalankan `kunci`

Supaya auto kunci, jalankan script berikut:

```bash
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
echo 'kunci' > .git/hooks/pre-commit
```

## Cara Membuka

Jalankan `buka`
