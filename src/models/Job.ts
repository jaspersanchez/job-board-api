import mongoose, { Document, Schema } from 'mongoose';

// Interface for TypeScript
export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  remote: boolean;
  createdAt: Date;
}

// Mongoose Schema (database structure)
const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    salary: {
      type: String,
      required: true,
    },
    salaryMin: {
      type: Number,
      required: true,
    },
    salaryMax: {
      type: Number,
      required: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export default mongoose.model<IJob>('Job', JobSchema);
