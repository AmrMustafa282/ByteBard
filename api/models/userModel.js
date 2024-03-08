import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: [true, "name is required"],
  },
  email: {
   type: String,
   required: [true, "email is required"],
   unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length >= 6;
      },
      message: props => `${props.value} is shorter than the minimum allowed length (6) for the password field`
    }
  },
  profilePicture: {
   type: String,
   default:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default:false,
    }
 },
 {
  timestamps: true,
 }
);

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

const User = mongoose.model("User", userSchema);
export default User;
