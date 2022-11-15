import { Bot, Context, Composer } from "grammy";
import { userID, token } from "./token";
import { hydrateReply, parseMode, link } from "@grammyjs/parse-mode";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";

const snoowrap = require('snoowrap');

require('dotenv').config();

declare var process: {     env: {         [key: string]: string;     } }; 

const config = {
  username: process.env.username,
  password: process.env.password,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  userAgent: process.env.userAgent,
  refreshToken: process.env.refreshToken,
  accessToken: process.env.accessToken
}

const r = new snoowrap({
  username: process.env.username,
  password: process.env.password,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  userAgent: process.env.userAgent,
  refreshToken: process.env.refreshToken,
  accessToken: process.env.accessToken
});

const subreddits = ["forhire", "hiring", "jobbit", "jobpostings", "jobs", "jobs4bitcoin", "jobs4crypto", "jobsearch", "jobsfornano", "pythonjobs", "remotejobs", "remotejs", "remotework", "slavelabour", "techjobs"];

r.getSubreddit('forhire').getNew({limit: 25}).then(function (forhire: any) {
  
  let result = JSON.stringify(forhire);
  const obj = JSON.parse(result);

  function getData() {
    let posts = [];
    for(let i = 0; i < obj.length; i++) {

      const title = JSON.stringify(obj[i].title);
      const url = JSON.stringify(obj[i].url);
      const flairID = JSON.stringify(obj[i].link_flair_template_id);
      const post = `<pre>👉 ${title}</pre> \n 🔗 <b><a href=${url}>Link to post</a></b>\n_______________________\n\n`;

      if (flairID == `"9df7b61e-6597-11e2-92de-12313d051e91"` || flairID ==`"4eaecd0a-6582-11e2-bbfb-12313b088941"`) {
        posts.push(post);
      }
    }

    const message = posts.join("\n");
    return message;
  }

  postMessage(getData());
});

async function postMessage(message: any) {

  const bot = new Bot<ParseModeFlavor<Context>>(`${token}`);
  
  bot.use(hydrateReply);
  bot.api.config.use(parseMode("replyWithHTML"));
  await bot.api.sendMessage(`${userID}`, `${message}`, { parse_mode: "HTML", disable_web_page_preview: true }, );
  bot.on("message", (ctx) => ctx.replyWithHTML(message));
  bot.start();
}