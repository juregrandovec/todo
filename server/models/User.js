const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, requred: true },
    password: { type: String, requred: true }
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified) return next();

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;