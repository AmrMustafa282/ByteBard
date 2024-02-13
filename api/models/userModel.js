import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, "username is required"],
  unique: true,
 },
 email: {
  type: String,
  required: [true, "email is required"],
  unique: true,
  },
  password: {
    type: String,
    required:true,
 }
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) return next();
 this.password = await bcrypt.hash(this.password, 12);

 next();
});



userSchema.methods.correctPassword = async function (
 candidatePassword,
 userPassword
) {
 return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);
export default User;