// scripts/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/Admin');

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Missing MONGO_URI in .env");
  }

  const username = process.env.ADMIN_USERNAME || "admin";
  const email = process.env.ADMIN_EMAIL || "admin@henei.com";
  const plainPassword = process.env.ADMIN_PASSWORD || "ChangeMe@123";

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB successfully');

  // Kiểm tra admin đã tồn tại chưa
  const exists = await Admin.findOne({ 
    $or: [{ username }, { email }] 
  });

  if (exists) {
    console.log('Admin already exists:', {
      id: exists._id.toString(),
      username: exists.username,
      email: exists.email,
      role: exists.role
    });
    await mongoose.disconnect();
    return;
  }

  // Hash password với bcrypt
  console.log('Hashing password...');
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

  // Tạo admin mới
  console.log('Creating admin...');
  const admin = await Admin.create({
    username,
    email,
    passwordHash,
    role: "admin",
    isActive: true
  });

  console.log('✅ Created admin successfully:', {
    id: admin._id.toString(),
    username: admin.username,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive
  });

  console.log('\n🔐 Login credentials:');
  console.log(`   Username: ${username}`);
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${plainPassword}`);
  console.log('\n⚠️  Please change password after first login!');

  await mongoose.disconnect();
  console.log('\nDisconnected from MongoDB');
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
