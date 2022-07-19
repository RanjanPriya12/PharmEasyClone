const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
  
      },
  
      phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
  
      role :{
       type : String,
       enum:["ADMIN","USER"],
       default:"USER",
      },
  
  
     phoneOtp:String
},{
    timestamps : true,
    versionKey : false,
});

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User =new mongoose.model("register", userSchema);

module.exports = User;

