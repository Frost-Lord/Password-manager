UserSchema = require("./Schema/User.js"),
PasswordSchema = require("./Schema/Passwords"),

module.exports.fetchGuild = async function(key){

    let guildDB = await guildSchema.findOne({ name: key });

    if(guildDB){
        return guildDB;
    }else{
        guildDB = new guildSchema({
            name: key,
            password: "false",
            email: "false",
            registeredAt: Date.now()
        })
        await guildDB.save().catch(err => console.log(err));
        return guildDB;
    }
};
module.export.fetchUser = async function(key){
    let userDB = await PasswordSchema.findOne({ name: key });
    if(userDB){
        return userDB;
    }
    else{
        userDB = new PasswordSchema({
            name: key,
            password: "false",
            registeredAt: Date.now()
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
}