// scripts/seedAdmin.ts
// Run once with:  npx tsx scripts/seedAdmin.ts
// (pnpm add -D tsx  if you don't have it)

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI!;

const userSchema = new mongoose.Schema({
  name:         String,
  email:        { type: String, unique: true },
  passwordHash: String,
  role:         String,
  phone:        String,
  avatarUrl:    String,
}, { timestamps: true });

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const User = mongoose.models.User ?? mongoose.model("User", userSchema);

  const email    = "amara@luxesalon.co.za";   // matches your seed data
  const password = "Admin@1234";               // change this to whatever you want

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await User.findOneAndUpdate(
    { email },
    { passwordHash },
    { new: true }
  );

  if (result) {
    console.log(`✅ Password updated for ${result.name} (${result.role})`);
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
  } else {
    console.log("⚠️  User not found — creating admin from scratch...");
    await User.create({
      name:         "Amara Moyo",
      email,
      passwordHash,
      role:         "admin",
      phone:        "+27 82 555 0101",
      avatarUrl:    "",
    });
    console.log("✅ Admin user created.");
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
  }

  await mongoose.disconnect();
  console.log("🔌 Disconnected.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});