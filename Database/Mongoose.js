UserSchema = require("./Schema/User.js"),

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