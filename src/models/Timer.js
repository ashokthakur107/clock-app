import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date
  },
  endDateTime: {
    type: Date
  },
  activeDuration: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.Timer || mongoose.model('Timer', TimerSchema);