# Environment Variables Kurulumu

Bu dosya, Spotify entegrasyonu için gerekli environment variables'ları nasıl ayarlayacağınızı açıklar.

## 1. .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/pomodoro-app

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Spotify API (Server-side)
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback

# Spotify API (Client-side)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-spotify-client-id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
```

## 2. Spotify Developer Dashboard'dan Bilgileri Alma

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)'a gidin
2. Uygulamanızı seçin
3. **Settings** sekmesine gidin
4. **Client ID** ve **Client Secret** değerlerini kopyalayın

## 3. Redirect URI Ayarları

Spotify Developer Dashboard'da:
1. **Redirect URIs** bölümüne şunu ekleyin:
   ```
   http://localhost:3000/api/auth/spotify/callback
   ```

## 4. Environment Variables Kontrolü

Ayarlar sayfasında **Debug** sekmesine giderek environment variables'ların doğru yüklenip yüklenmediğini kontrol edebilirsiniz.

## 5. Sorun Giderme

### "Missing required parameter: redirect_uri" Hatası

Bu hata genellikle şu sebeplerden kaynaklanır:

1. **Environment variables yüklenmemiş**
   - `.env.local` dosyasının proje kök dizininde olduğundan emin olun
   - Uygulamayı yeniden başlatın: `npm run dev`

2. **Yanlış redirect URI**
   - Spotify Dashboard'da redirect URI'nın doğru olduğundan emin olun
   - Environment variable'daki URI ile Dashboard'daki URI'nın aynı olduğunu kontrol edin

3. **Client ID uyumsuzluğu**
   - Server-side ve client-side Client ID'lerin aynı olduğundan emin olun

### Debug Adımları

1. Ayarlar sayfasına gidin
2. **Debug** sekmesine tıklayın
3. Tüm environment variables'ların "Set" olduğunu kontrol edin
4. Eksik olanları `.env.local` dosyasına ekleyin
5. Uygulamayı yeniden başlatın

## 6. Örnek .env.local Dosyası

```env
# Database
MONGODB_URI=mongodb://localhost:27017/pomodoro-app

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Spotify API
SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
SPOTIFY_CLIENT_SECRET=abcdef1234567890abcdef1234567890
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback

# Public Spotify variables
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
```

## 7. Güvenlik Notları

- `.env.local` dosyasını asla git'e commit etmeyin
- Client secret'ı client-side kodda kullanmayın
- Production'da HTTPS kullanın
- Environment variables'ları güvenli bir şekilde saklayın
