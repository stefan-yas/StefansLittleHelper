"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const token_1 = require("./token");
const parse_mode_1 = require("@grammyjs/parse-mode");
const snoowrap = require('snoowrap');
require('dotenv').config();
const config = {
    username: process.env.username,
    password: process.env.password,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    userAgent: process.env.userAgent,
    refreshToken: process.env.refreshToken,
    accessToken: process.env.accessToken
};
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
r.getSubreddit('forhire').getNew({ limit: 25 }).then(function (forhire) {
    let result = JSON.stringify(forhire);
    const obj = JSON.parse(result);
    function getData() {
        let posts = [];
        for (let i = 0; i < obj.length; i++) {
            const title = JSON.stringify(obj[i].title);
            const url = JSON.stringify(obj[i].url);
            const flairID = JSON.stringify(obj[i].link_flair_template_id);
            const post = `<pre>👉 ${title}</pre> \n 🔗 <b><a href=${url}>Link to post</a></b>\n_______________________\n\n`;
            if (flairID == `"9df7b61e-6597-11e2-92de-12313d051e91"` || flairID == `"4eaecd0a-6582-11e2-bbfb-12313b088941"`) {
                posts.push(post);
            }
        }
        const message = posts.join("\n");
        return message;
    }
    postMessage(getData());
});
function postMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = new grammy_1.Bot(`${token_1.token}`);
        bot.use(parse_mode_1.hydrateReply);
        bot.api.config.use((0, parse_mode_1.parseMode)("replyWithHTML"));
        yield bot.api.sendMessage(`${token_1.userID}`, `${message}`, { parse_mode: "HTML", disable_web_page_preview: true });
        bot.on("message", (ctx) => ctx.replyWithHTML(message));
        bot.start();
    });
}
