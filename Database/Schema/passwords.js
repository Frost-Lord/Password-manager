const mongoose = require("mongoose");

module.exports = mongoose.model("Passwords", new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    registeredAt: { type: Number, default: Date.now() },
 }));