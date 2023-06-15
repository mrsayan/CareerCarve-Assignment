import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minLength: [3, 'Your name must be at least 3 characters'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/.test(v);
        // description of regex
        // ^[\w-\.]+ - starts with one or more word characters, hyphen or dot
        // @ - followed by an @
        // ([\w-]+\.)+ - followed by one or more word characters or hyphen, and a dot
        // [\w-]{2,7} - ends with 2 to 7 word characters or hyphen
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be at least 6 characters'],
  },
  // phone number is optional
  phone_number: {
    type: String,
    validate: {
      validator: function (v) {
        // +91 followed by 6, 7, 8 or 9 and 9 digits
        return /^\+91[6-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

export default mongoose.model('User', userSchema);