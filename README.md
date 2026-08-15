# INSTA CHANNEL ARCHIVE

Samodzielne archiwum GitHub Pages mediów THE BOYZ z Instagram Channels. Motyw, kolorystyka, fonty, kafelki i galerie są zgodne z `INSTA POSTS ARCHIVE` oraz `WEIBO MEDIA ARCHIVE`.

## Funkcje

- osobne kafelki profili zgodne z głównymi folderami Google Drive,
- automatyczne tworzenie nowych kafelków po dodaniu kolejnych folderów głównych,
- kolejność znanych członków zgodna z pozostałymi archiwami,
- filtrowanie każdego profilu według roku, a następnie miesiąca,
- automatyczne otwieranie najnowszego dostępnego miesiąca,
- sortowanie od najnowszej daty zapisanej jako `YYMMDD`,
- obsługa zdjęć, filmów i wiadomości głosowych MP4; filmy mają miniaturę prowadzącą do odtwarzacza Google Drive,
- przyciski `View` oraz `Download`,
- automatyczna synchronizacja dwa razy dziennie.

## Uruchomienie lokalne

```bash
pnpm install
pnpm dev
```

Test i kompilacja:

```bash
pnpm test
```

## Publikacja na GitHub Pages

1. Utwórz puste repozytorium GitHub, np. `insta-channel-archive`.
2. Rozpakuj ZIP i w jego folderze wykonaj:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TWOJ_LOGIN/insta-channel-archive.git
   git push -u origin main
   ```

3. W `Settings → Pages` wybierz `Source → GitHub Actions`.

## Automatyczna synchronizacja

1. Udostępnij folder Google Drive jako `Każda osoba mająca link → Wyświetlający`.
2. W Google Cloud włącz `Google Drive API` i utwórz klucz API.
3. W GitHub dodaj w `Settings → Secrets and variables → Actions` sekret:

   ```text
   GOOGLE_DRIVE_API_KEY
   ```

4. Uruchom `Actions → Sync Instagram Channel Media → Run workflow`.

Synchronizacja działa codziennie o `05:17` i `17:17` UTC oraz skanuje całe drzewo folderów rekurencyjnie.

## Źródło

- [Folder Google Drive](https://drive.google.com/drive/folders/18JdFqta4h4QgNFicew97P_OCL3qv3vbT)
