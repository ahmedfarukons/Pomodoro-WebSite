# MongoDB Compass Bağlantı Kurulumu

Bu rehber, Pomodoro uygulamasını MongoDB Compass ile bağlamak için gerekli adımları içerir.

## 1. MongoDB Kurulumu

### Yerel MongoDB Kurulumu
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community)'ı indirin ve kurun
2. MongoDB servisini başlatın

### MongoDB Atlas (Bulut) Kullanımı
1. [MongoDB Atlas](https://www.mongodb.com/atlas)'a gidin
2. Ücretsiz cluster oluşturun
3. Database Access'ten kullanıcı oluşturun
4. Network Access'ten IP adresinizi ekleyin

## 2. MongoDB Compass Kurulumu

1. [MongoDB Compass](https://www.mongodb.com/try/download/compass)'ı indirin ve kurun
2. Compass'ı açın

## 3. Bağlantı Kurulumu

### Yerel MongoDB için:
```
mongodb://localhost:27017/pomodoro-app
```

### MongoDB Atlas için:
```
mongodb+srv://<username>:<password>@<cluster-url>/pomodoro-app?retryWrites=true&w=majority
```

## 4. Environment Variables

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/pomodoro-app

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Spotify Configuration (opsiyonel)
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
```

## 5. Veritabanı Yapısı

Uygulama aşağıdaki koleksiyonları oluşturacak:

### users
- `_id`: ObjectId
- `name`: String
- `email`: String (unique)
- `password`: String
- `image`: String (opsiyonel)
- `spotifyAccessToken`: String (opsiyonel)
- `spotifyRefreshToken`: String (opsiyonel)
- `preferences`: Object
  - `theme`: String (light/dark/system)
  - `notifications`: Object
    - `email`: Boolean
    - `desktop`: Boolean
  - `pomodoroSettings`: Object
    - `workDuration`: Number
    - `shortBreakDuration`: Number
    - `longBreakDuration`: Number
    - `longBreakInterval`: Number
- `stats`: Object
  - `totalPomodoros`: Number
  - `totalFocusTime`: Number
  - `totalBreakTime`: Number
  - `currentStreak`: Number
  - `longestStreak`: Number
- `createdAt`: Date
- `updatedAt`: Date

### tasks
- `_id`: ObjectId
- `userId`: ObjectId (ref: users)
- `title`: String
- `description`: String
- `completed`: Boolean
- `priority`: String (low/medium/high)
- `category`: String
- `estimatedPomodoros`: Number
- `completedPomodoros`: Number
- `dueDate`: Date (opsiyonel)
- `createdAt`: Date
- `updatedAt`: Date

### pomodorosessions
- `_id`: ObjectId
- `userId`: ObjectId (ref: users)
- `taskId`: ObjectId (ref: tasks, opsiyonel)
- `type`: String (work/shortBreak/longBreak)
- `duration`: Number
- `completed`: Boolean
- `startTime`: Date
- `endTime`: Date (opsiyonel)
- `actualDuration`: Number
- `interruptions`: Number
- `notes`: String
- `createdAt`: Date

## 6. Compass'ta Veritabanını Görüntüleme

1. Compass'ta bağlantıyı kurun
2. `pomodoro-app` veritabanını seçin
3. Koleksiyonları görüntüleyin:
   - `users`: Kullanıcı bilgileri
   - `tasks`: Görevler
   - `pomodorosessions`: Pomodoro oturumları

## 7. Test Etme

1. Uygulamayı başlatın: `npm run dev`
2. Kayıt olun veya giriş yapın
3. Compass'ta verilerin oluştuğunu kontrol edin

## 8. Güvenlik Notları

- Production'da güçlü bir `NEXTAUTH_SECRET` kullanın
- MongoDB Atlas kullanıyorsanız IP kısıtlamalarını ayarlayın
- Şifreleri hash'leyin (bcrypt önerilir)
- Environment variables'ları güvenli tutun

## 9. Sorun Giderme

### Bağlantı Hatası
- MongoDB servisinin çalıştığından emin olun
- Port 27017'nin açık olduğunu kontrol edin
- Firewall ayarlarını kontrol edin

### Authentication Hatası
- MongoDB Atlas kullanıyorsanız kullanıcı adı ve şifreyi kontrol edin
- Network Access'te IP adresinizin eklendiğinden emin olun

### Veritabanı Oluşturulmuyor
- İlk kullanıcı kaydından sonra veritabanı otomatik oluşacaktır
- Compass'ta manuel olarak `pomodoro-app` veritabanını oluşturabilirsiniz 