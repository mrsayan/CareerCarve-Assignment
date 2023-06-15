import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserResponseSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  testID: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const UserResponse = mongoose.model('UserResponse', UserResponseSchema);
export { UserResponse };
