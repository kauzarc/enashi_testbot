const https = require("https");

module.exports = {
  name: "norris",
  run: (message) => {
    const req = https.get("https://api.chucknorris.io/jokes/random", (res) => {
      res.on("data", (d) => {
        const json = JSON.parse(d);
        message.channel.send(json.value);
      });
    });

    req.on("error", (error) => {
      console.error(error);
      message.channel.send("An error occured");
    });

    req.end();
  },
};
