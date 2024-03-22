import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;

const contactSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add the contact name'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please add the contact email address'],
      match: [emailRegex, 'Please fill a valid email address'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact phone number'],
      match: [phoneRegex, 'Please fill a valid phone number'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.virtual('info').get(function () {
  return `${this.name} (${this.email}, ${this.phone})`;
});

// Pre-save hook for data sanitization
contactSchema.pre('save', function (next) {
  this.phone = standardizePhoneNumber(this.phone);
  next();
});

export default model('Contact', contactSchema);
