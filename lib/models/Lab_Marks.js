// lib/models/lab_marks.js
import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 10 },
  },
  { _id: false }
);

const LabMarksSchema = new mongoose.Schema(
  {
    // identity
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },

    // course
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },

    // marks
    attendance: { type: Number, min: 0, max: 20, default: null },
    assignments: { type: [AssignmentSchema], default: [] }, // dynamic multiple assignments
    labFinal: { type: Number, min: 0, max: 40, default: null },
    projectFinal: { type: Number, min: 0, max: 40, default: null },

    // optional helpers
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

// Ensure one row per student per course
LabMarksSchema.index({ studentId: 1, courseCode: 1 }, { unique: true });

const Lab_Marks =
  mongoose.models.Lab_Marks || mongoose.model('Lab_Marks', LabMarksSchema);

export default Lab_Marks;
