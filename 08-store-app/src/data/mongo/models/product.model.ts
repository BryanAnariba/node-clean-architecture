import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is reuqired']
    },
    avaliable: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ProductModel = mongoose.model('Product', productSchema);