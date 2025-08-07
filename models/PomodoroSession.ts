import mongoose from 'mongoose';

const pomodoroSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  type: {
    type: String,
    enum: ['work', 'shortBreak', 'longBreak'],
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    default: null
  },
  actualDuration: {
    type: Number,
    default: 0
  },
  interruptions: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
pomodoroSessionSchema.index({ userId: 1, startTime: -1 });
pomodoroSessionSchema.index({ userId: 1, type: 1 });
pomodoroSessionSchema.index({ taskId: 1 });

export default mongoose.models.PomodoroSession || mongoose.model('PomodoroSession', pomodoroSessionSchema); 