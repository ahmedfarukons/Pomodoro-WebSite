import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      email: {
        type: Boolean,
        default: false
      },
      desktop: {
        type: Boolean,
        default: true
      }
    },
    pomodoroSettings: {
      workDuration: {
        type: Number,
        default: 25
      },
      shortBreakDuration: {
        type: Number,
        default: 5
      },
      longBreakDuration: {
        type: Number,
        default: 15
      },
      longBreakInterval: {
        type: Number,
        default: 4
      }
    },
    spotifyAccessToken: {
      type: String,
      default: null
    },
    spotifyRefreshToken: {
      type: String,
      default: null
    }
  },
  stats: {
    totalPomodoros: {
      type: Number,
      default: 0
    },
    totalFocusTime: {
      type: Number,
      default: 0
    },
    totalBreakTime: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 