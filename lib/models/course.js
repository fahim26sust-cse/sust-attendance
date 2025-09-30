import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    batch: {
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
    courseType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
