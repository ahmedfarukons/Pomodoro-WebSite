# Spotify Entegrasyonu Kurulumu

Bu dosya, Spotify entegrasyonunu projenize nasıl ekleyeceğinizi açıklar.

## 1. Spotify Developer Dashboard'da Uygulama Oluşturma

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)'a gidin
2. "Create App" butonuna tıklayın
3. Uygulama adını ve açıklamasını girin
4. "Create" butonuna tıklayın

## 2. Environment Variables

`.env.local` dosyanıza aşağıdaki değişkenleri ekleyin:

```env
# Spotify API
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback

# Public Spotify variables (for client-side)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-spotify-client-id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
```

## 3. Spotify App Ayarları

Spotify Developer Dashboard'da uygulamanızın ayarlarına gidin:

1. **Redirect URIs** bölümüne şunu ekleyin:
   ```
   http://localhost:3000/api/auth/spotify/callback
   ```

2. **Scopes** bölümünde aşağıdaki izinleri etkinleştirin:
   - `user-read-private`
   - `user-read-email`
   - `user-read-playback-state`
   - `user-modify-playback-state`
   - `user-read-currently-playing`
   - `streaming`
   - `playlist-read-private`
   - `playlist-read-collaborative`
   - `user-library-read`
   - `user-top-read`

## 4. Kullanım

Artık kullanıcılar:

1. Ayarlar sayfasına gidebilir
2. "Görünüm" sekmesinde Spotify bağlantısını görebilir
3. "Spotify'a Bağlan" butonuna tıklayarak Spotify hesaplarını bağlayabilir
4. Bağlantı kurulduktan sonra müzik çaları kullanabilir

## 5. Özellikler

- ✅ Spotify OAuth entegrasyonu
- ✅ Token yönetimi
- ✅ Kullanıcı tercihlerinde saklama
- ✅ Bağlantı durumu kontrolü
- ✅ Bağlantıyı kesme özelliği

## 6. Güvenlik

- Spotify tokenları kullanıcı tercihlerinde şifrelenmiş olarak saklanır
- OAuth flow güvenli bir şekilde yapılır
- Token yenileme işlemi otomatik olarak yapılır
