const rp = require("request-promise");
const CMC_TOKEN = process.env.CMC_TOKEN;
const { embedMsg } = require("./config");

module.exports = {
  name: "!price",
  description: "Gets the price of a cryptocurrency",
  execute(msg, args) {
    const requestOptionsMap = {
      method: "GET",
      uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
      qs: {
        symbol: args[0].toUpperCase()
      },
      headers: {
        "X-CMC_PRO_API_KEY": CMC_TOKEN
      },
      json: true,
      gzip: true
    };

    async function getId() {
      try {
        const response = await rp(requestOptionsMap);
        let id = response.data[0].id;
        return id;
      } catch (error) {
        return;
      }
    }

    async function getPrice() {
      try {
        const id = await getId();

        const requestOptions = {
          method: "GET",
          qs: {
            id: id
          },
          headers: {
            "X-CMC_PRO_API_KEY": CMC_TOKEN
          },
          json: true,
          gzip: true
        };

        const metadata = await rp(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
          requestOptions
        );
        const response = await rp(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
          requestOptions
        );

        embedMsg.thumbnail.url = metadata.data[id].logo;
        embedMsg.title = "Information about " + response.data[id].name;
        embedMsg.fields[0].value =
          "$" + Math.round(response.data[id].quote.USD.price * 100) / 100;
        embedMsg.fields[1].value =
          Math.round(response.data[id].quote.USD.percent_change_1h * 100) / 100;
        embedMsg.fields[2].value =
          Math.round(response.data[id].quote.USD.percent_change_24h * 100) /
          100;
        embedMsg.fields[3].value =
          Math.round(response.data[id].quote.USD.percent_change_7d * 100) / 100;

        msg.channel.send({ embed: embedMsg });
      } catch (error) {
        msg.channel.send(
          "I'm sorry mate, I can't get you this ticker. Try a valid one!"
        );
      }
    }

    getPrice();
  }
};
