// scripts/seedClient.ts
// Run with: npx tsx scripts/seedClient.ts

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

  // Patch ALL users that still have the fake placeholder hash
  const fakeUsers = await User.find({
    passwordHash: /^\$2b\$10\$examplehashedpassword/,
  });

  if (fakeUsers.length === 0) {
    console.log("ℹ️  No placeholder hashes found — all users already have real passwords.");
  } else {
    console.log(`\nFound ${fakeUsers.length} user(s) with placeholder hashes. Patching...\n`);

    // Default password per role — change these to whatever you want
    const defaultPasswords: Record<string, string> = {
      admin:   "Admin@1234",
      stylist: "Stylist@1234",
      client:  "Client@1234",
    };

    for (const user of fakeUsers) {
      const pwd  = defaultPasswords[user.role as string] ?? "LuxeSalon@1234";
      const hash = await bcrypt.hash(pwd, 12);

      await User.findByIdAndUpdate(user._id, { passwordHash: hash });

      console.log(`  ✅ ${user.name} (${user.role})`);
      console.log(`     Email:    ${user.email}`);
      console.log(`     Password: ${pwd}\n`);
    }
  }

  await mongoose.disconnect();
  console.log("🔌 Done.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});