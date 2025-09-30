import mongoose from 'mongoose';

const AdminLocationSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
    },
    geoLocation: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    pin: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminLocation = mongoose.models.AdminLocation || mongoose.model('AdminLocation', AdminLocationSchema);

export default AdminLocation;
