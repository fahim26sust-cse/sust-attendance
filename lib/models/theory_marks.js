// lib/models/theory_marks.js
import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    // max: { type: Number, default: 10, min: 1 },
  },
  { _id: false }
);

const TheoryMarksSchema = new mongoose.Schema(
  {
    // identity
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },

    // course
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },

    // marks
    TT1: { type: Number, min: 0, max: 10, default: null },
    TT2: { type: Number, min: 0, max: 10, default: null },
    attendance: { type: Number, min: 0, max: 10, default: null },
    finalMarks: { type: Number, min: 0, max: 100, default: null },

    // dynamic assignments (multiple)
    assignments: { type: [AssignmentSchema], default: [] },

    // optional helpers
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

// Ensure one row per student per course
TheoryMarksSchema.index({ studentId: 1, courseCode: 1 }, { unique: true });

const Theory_Marks =
  mongoose.models.Theory_Marks || mongoose.model('Theory_Marks', TheoryMarksSchema);

export default Theory_Marks;
