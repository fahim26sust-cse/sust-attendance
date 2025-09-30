import mongoose from 'mongoose';

const EnrolledCourseSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

EnrolledCourseSchema.index({ studentId: 1, courseCode: 1 }, { unique: true });
const EnrolledCourse = mongoose.models.EnrolledCourse || mongoose.model('EnrolledCourse', EnrolledCourseSchema);

export default EnrolledCourse;
