const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Tên công ty là bắt buộc'],
    default: 'Anong'
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },
  phone: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    match: [/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Địa chỉ đường là bắt buộc']
    },
    ward: {
      type: String,
      required: [true, 'Phường/xã là bắt buộc']
    },
    district: {
      type: String,
      required: [true, 'Quận/huyện là bắt buộc']
    },
    city: {
      type: String,
      required: [true, 'Thành phố là bắt buộc']
    },
    country: {
      type: String,
      default: 'Việt Nam'
    },
    postalCode: {
      type: String,
      required: [true, 'Mã bưu điện là bắt buộc']
    }
  },
  businessHours: {
    weekdays: {
      type: String,
      default: '8:00 - 22:00'
    },
    weekends: {
      type: String,
      default: '9:00 - 21:00'
    },
    timezone: {
      type: String,
      default: 'GMT+7'
    }
  },
  socialMedia: {
    facebook: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    },
    tiktok: {
      type: String,
      default: ''
    }
  },
  description: {
    type: String,
    required: [true, 'Mô tả công ty là bắt buộc']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
contactSchema.index({ isActive: 1 });

module.exports = mongoose.model('Contact', contactSchema);
