const {Client} = require('discord.js')

const client = new Client()

// Stores the current count.
let count = 0
// Stores the timeout used to make the bot count if nobody else counts for a set period of
// time.
let timeout

client.once('ready', () => {
  console.log('Ready to watch people count!');
  client.user.setActivity('people count!', {type: "WATCHING"});

});


client.on('message', (message) => {
    let {channel, content, member} = message;
      // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.name === 'kyles-countbot') {
    // You can ignore all bot messages like this
    // If the message is the current count + 1...
    if (Number(content) === count + 1) {
      // ...increase the count
      count++
      var array = ["793964497505091594", "793962805791162377", "793964423139295242", "793963778097545298", "793963933978591272", "793963555422208020"]

        var randomResponse = array[Math.floor(Math.random() * array.length)];
      message.react(randomResponse);
      // Remove any existing timeout to count
      if (timeout) client.clearTimeout(timeout)
      // Add a new timeout
    // If the message wasn't sent by the bot...
} else if (member.id !== client.user.id) {
  if(isNaN(message.content)) return;
    // ...send a message because the person stuffed up the counting (and log all errors)
    channel.send(`${member} messed up at ` + count + `!`).catch(console.error)
    // Reset the count
    count = 0
    // Reset any existing timeout because the bot has counted so it doesn't need to
    // count again
    if (timeout) client.clearTimeout(timeout)
 
    }
  }
})

client.login(process.env.BOT_TOKEN);