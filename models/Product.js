const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên sản phẩm là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Giá sản phẩm là bắt buộc'],
    min: [0, 'Giá sản phẩm không được âm']
  },
  description: {
    type: String,
    required: [true, 'Mô tả sản phẩm là bắt buộc'],
    maxlength: [500, 'Mô tả không được vượt quá 500 ký tự']
  },
  image: {
    type: String,
    required: [true, 'Hình ảnh sản phẩm là bắt buộc']
  },
  category: {
    type: String,
    required: [true, 'Danh mục sản phẩm là bắt buộc'],
    enum: ['Arduino', 'Module', 'Cảm biến', 'Màn hình', 'Linh kiện', 'Gaming']
  },
  stock: {
    type: Number,
    required: [true, 'Số lượng tồn kho là bắt buộc'],
    min: [0, 'Số lượng tồn kho không được âm'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
