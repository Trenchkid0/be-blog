const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let writerSchema = Schema(
  {
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    topic:{
      type: String,
      minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
      maxLength: [25, 'Panjang nama kategori maksimal 90 karakter'],
      required: [true, 'Nama kategori harus diisi'],
    },
    date: {
      type: Date,
      required: [true, 'Tanggal dan waktu harus diisi'],
    },
    title:{
      type: String,
      minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
      maxLength: [90, 'Panjang nama kategori maksimal 90 karakter'],
      required: [true, 'Nama kategori harus diisi'],
    },
    deskripsi:{
      type: String,
      minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
      maxLength: [500, 'Panjang nama kategori maksimal 500 karakter'],
      required: [true, 'Nama kategori harus diisi'],
    },
    content: {
      type: String,
      minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
      maxLength: [1200, 'Panjang nama kategori maksimal 1200 karakter'],
      required: [true, 'Nama kategori harus diisi'],
    },    
    participant:{
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model('Writer', writerSchema);
