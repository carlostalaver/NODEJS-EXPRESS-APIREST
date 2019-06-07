
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true); // para evitar el error en consola DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes inste

const userSchema = new Schema ({
  name: { type: String, required: true,trim: true },
  email: { type: String, required: true,trim: true, unique: true },
  password: { type: String, required: true,trim: true },
}, {
  timestamps: true,
  }
)

module.exports = userSchema;