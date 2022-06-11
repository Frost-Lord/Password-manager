const mongoose = require("mongoose");

module.exports = mongoose.model("Passwords", new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    registeredAt: { type: Number, default: Date.now() },
 }));