"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const token_1 = require("./token");
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
let result = r.getNew().map((post) => post.title).then(function (result) {
    return result;
});
// let forhire = r.getSubreddit('redditdev').getHot().then((posts: any) => {
//   return forhire;
//  })
let forhire = r.getSubreddit('forhire').getNew({ limit: 25 }).then(function (forhire) {
    let result = JSON.stringify(forhire);
    const obj = JSON.parse(result);
    function getData() {
        let posts = [];
        for (let i = 0; i < obj.length; i++) {
            const title = JSON.stringify(obj[i].title);
            const url = JSON.stringify(obj[i].url);
            const post = [title, url];
            posts.push(post);
            // console.log(post);
            // return(JSON.stringify(obj[i].url));
        }
        //console.log(posts);
        const message = "random";
        posts.forEach(post => {
        });
        return message;
    }
    console.log(getData());
    // return getData();
    postMessage(getData());
});
function postMessage(message) {
    const bot = new grammy_1.Bot(`${token_1.token}`);
    console.log("line 91" + message);
    bot.on("message", (ctx) => ctx.reply(message));
    bot.start();
}
