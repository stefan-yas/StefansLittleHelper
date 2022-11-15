import { Bot, Context, Composer } from "grammy";
import { token } from "./token";
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

let result = r.getNew().map((post: { title: string; }) => post.title).then(function (result: any) {
  return result;
});

let forhire = r.getSubreddit('forhire').getNew({limit: 25}).then(function (forhire: any) {
  
  let result = JSON.stringify(forhire);

  const obj = JSON.parse(result);

  function getData() {

    let posts = [];

    for(let i = 0; i < obj.length; i++) {

      const title = JSON.stringify(obj[i].title);

      const url = JSON.stringify(obj[i].url);

      const post = `${title} \n <a href=${url}>Link to post</a>\n\n`

      posts.push(post);
    }

    posts.forEach(post => { });

    const message = posts.join("\n");

    return message;

  }

  console.log(getData());

  postMessage(getData());

});




function postMessage(message: any) {

  const bot = new Bot<ParseModeFlavor<Context>>(`${token}`);
  
  bot.use(hydrateReply);
  bot.api.config.use(parseMode("replyWithHTML"));
  
  console.log("line 91" + message);

  bot.on("message", (ctx) => ctx.replyWithHTML(message));

  bot.start();
}