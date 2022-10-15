const easyvk = require("easyvk");
const path = require("path");
const fs = require("fs");
const nthline = require("nthline");
const TelegramApi = require("node-telegram-bot-api");

fs.readFile(path.join(__dirname, "logdata"), "utf-8", async (err, data) => {
  if (!err) {
    const picsPath = "pics.txt";
    const logdata = data.split(" ");
    const token = logdata[2];
    const bot = new TelegramApi(token, { polling: true });
    const picsToSend = [];

    const lineCount = (filePath) => {
      return new Promise((resolve) => {
        let i;
        let count = 0;
        fs.createReadStream(filePath)
          .on("data", function (chunk) {
            for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
          })
          .on("end", function () {
            resolve(count);
          });
      });
    };

    const uniqueRandomNums = (quantity, max) => {
      const set = new Set();
      while (set.size < quantity) {
        set.add(Math.floor(Math.random() * max));
      }
      return Array.from(set);
    };

    const createPics = async () => {
      const lines = await lineCount(picsPath);
      const nums = uniqueRandomNums(10, lines);
      const pics = Array.from(nums, async (num) => ({
        type: "photo",
        media: await nthline(num, picsPath),
      }));
      return pics;
    };

    if (!fs.existsSync(picsPath)) {
      fs.writeFile(picsPath, "", () => {});
    }

    easyvk({
      username: logdata[0],
      password: logdata[1],
      sessionFile: path.join(__dirname, ".my-session"),
    }).then(async (vk) => {
      let anacontent = await vk.call("photos.get", {
        owner_id: -198071571,
        album_id: "wall",
        rev: 1,
        count: 10, //30000,
        random_id: easyvk.randomId(),
      });

      let justpic = await vk.call("photos.get", {
        owner_id: -189660113,
        album_id: "wall",
        rev: 1,
        count: 10, //000,
        random_id: easyvk.randomId(),
      });

      let godnotent = await vk.call("photos.get", {
        owner_id: -109125388,
        album_id: "wall",
        rev: 1,
        count: 10, //100000,
        random_id: easyvk.randomId(),
      });

      let trash50 = await vk.call("photos.get", {
        owner_id: -93082454,
        album_id: "wall",
        rev: 1,
        count: 10, //80000,
        random_id: easyvk.randomId(),
      });

      let cursed = await vk.call("photos.get", {
        owner_id: -159708114,
        album_id: "wall",
        rev: 1,
        count: 10, //12000,
        random_id: easyvk.randomId(),
      });

      let savepic = await vk.call("photos.get", {
        owner_id: -136259311,
        album_id: "wall",
        rev: 1,
        count: 10, //12000,
        random_id: easyvk.randomId(),
      });

      let aisaves = await vk.call("photos.get", {
        owner_id: 194577863,
        album_id: "saved",
        rev: 1,
        count: 10, //2500,
        random_id: easyvk.randomId(),
      });

      anacontent.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      godnotent.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      justpic.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      trash50.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      cursed.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      savepic.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      aisaves.items.forEach((element) => {
        fs.appendFile(
          picsPath,
          element.sizes[element.sizes.length - 1].url + "\n",
          () => {}
        );
        /* pic.push({
          type: "photo",
          media: element.sizes[element.sizes.length - 1].url,
        }); */
      });

      await createPics().then((pics) => {
        pics.forEach((pic) => pic.then((data) => picsToSend.push(data)));
      });

      let options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Yes", callback_data: "1" }],
            [{ text: "No", callback_data: "0" }],
          ],
        }),
      };

      bot.on("message", async (msg) => {
        const ownerChatId = msg.chat.id;
        picsToSend[0]["caption"] = "@ACUMPOT";
        if (msg.text === "s" && msg.chat.id === Number(logdata[3])) {
          console.log(ownerChatId);
          bot.sendMessage(ownerChatId, "Sending...");
          await bot.sendMediaGroup(ownerChatId, picsToSend);
          bot.sendMessage(ownerChatId, "Approved?", options);
          bot.on("callback_query", (callbackQuery) => {
            const action = callbackQuery.data;
            if (action === "0") {
              bot.sendMessage(ownerChatId, "You disliked cumpilation");
            } else {
              const channelChatId = -1001880050276;
              bot.sendMessage(channelChatId, "You liked cumpilation");
            }
          });
        }
      });
    });

    bot.on("polling_error", console.log);
  } else {
    console.log(err);
  }
});
