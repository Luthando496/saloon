import mongoose from "mongoose";

// ─────────────────────────────────────────
// USER
// ─────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role:         { type: String, enum: ["client", "stylist", "admin"], default: "client" },
    phone:        { type: String, default: "" },
    avatarUrl:    { type: String, default: "" },
  },
  { timestamps: true }
);

// ─────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────
const serviceSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true, trim: true },
    description:     { type: String, default: "" },
    price:           { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, required: true, min: 1 },
    category:        { type: String, required: true, trim: true },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─────────────────────────────────────────
// STAFF
// ─────────────────────────────────────────
const staffSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialities: { type: [String], default: [] },
    rating:       { type: Number, default: 0, min: 0, max: 5 },
    totalClients: { type: Number, default: 0 },
    joinedAt:     { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ─────────────────────────────────────────
// APPOINTMENT
// ─────────────────────────────────────────
const appointmentSchema = new mongoose.Schema(
  {
    clientId:    { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    staffId:     { type: mongoose.Schema.Types.ObjectId, ref: "Staff",   required: true },
    serviceId:   { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    scheduledAt: { type: Date, required: true },
    status:      {
      type:    String,
      enum:    ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes:       { type: String, default: "" },
    amountPaid:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─────────────────────────────────────────
// AVAILABILITY
// ─────────────────────────────────────────
const availabilitySchema = new mongoose.Schema(
  {
    staffId:     { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    dayOfWeek:   {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    startTime:   { type: String, default: null }, // "09:00"
    endTime:     { type: String, default: null }, // "17:00"
    isAvailable: { type: Boolean, default: true },
    blockedDate: { type: Date, default: null },   // one-off blocked day
  },
  { timestamps: true }
);

// Prevent duplicate day entries per staff member
availabilitySchema.index({ staffId: 1, dayOfWeek: 1 }, { unique: true });

// ─────────────────────────────────────────
// REVIEW
// ─────────────────────────────────────────
const reviewSchema = new mongoose.Schema(
  {
    clientId:      { type: mongoose.Schema.Types.ObjectId, ref: "User",        required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
    staffId:       { type: mongoose.Schema.Types.ObjectId, ref: "Staff",       required: true },
    rating:        { type: Number, required: true, min: 1, max: 5 },
    comment:       { type: String, default: "" },
  },
  { timestamps: true }
);

// ─────────────────────────────────────────
// Export — guard against model re-registration
// during Next.js hot reloads
// ─────────────────────────────────────────
export const User         = mongoose.models.User         || mongoose.model("User",         userSchema);
export const Service      = mongoose.models.Service      || mongoose.model("Service",      serviceSchema);
export const Staff        = mongoose.models.Staff        || mongoose.model("Staff",        staffSchema);
export const Appointment  = mongoose.models.Appointment  || mongoose.model("Appointment",  appointmentSchema);
export const Availability = mongoose.models.Availability || mongoose.model("Availability", availabilitySchema);
export const Review       = mongoose.models.Review       || mongoose.model("Review",       reviewSchema);