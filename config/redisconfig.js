const { createClient } = require('redis');

const client = createClient();

const redisconnect = async () =>{
    try {
        await client.connect();
            console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    client,
    redisconnect
}
