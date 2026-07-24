
import mongoose, { Schema, models, model } from "mongoose";

const LeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"],
      default: "New",
    },

    source: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Cold Call", "Other"],
      default: "Website",
    },

    notes: {
      type: String,
      default: "",
    },

    assignedTo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = models.Lead || model("Lead", LeadSchema);

export default Lead;