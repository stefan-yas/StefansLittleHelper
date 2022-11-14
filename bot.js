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
// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new grammy_1.Bot(`${token_1.token}`);
//Store bot screaming status
let screaming = false;
//This function handles the /scream command
bot.command("scream", () => {
    screaming = true;
});
//This function handles /whisper command
bot.command("whisper", () => {
    screaming = false;
});
//Pre-assign menu text
const firstMenu = "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";
//Pre-assign button text
const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";
//Build keyboards
const firstMenuMarkup = new grammy_1.InlineKeyboard().text(nextButton, backButton);
const secondMenuMarkup = new grammy_1.InlineKeyboard().text(backButton, backButton).text(tutorialButton, "https://core.telegram.org/bots/tutorial");
//This handler sends a menu with the inline buttons we pre-assigned above
bot.command("menu", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(firstMenu, {
        parse_mode: "HTML",
        reply_markup: firstMenuMarkup,
    });
}));
//This handler processes back button on the menu
bot.callbackQuery(backButton, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    //Update message content with corresponding menu section
    yield ctx.editMessageText(firstMenu, {
        reply_markup: firstMenuMarkup,
        parse_mode: "HTML",
    });
}));
//This handler processes next button on the menu
bot.callbackQuery(nextButton, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    //Update message content with corresponding menu section
    yield ctx.editMessageText(secondMenu, {
        reply_markup: secondMenuMarkup,
        parse_mode: "HTML",
    });
}));
//This function would be added to the dispatcher as a handler for messages coming from the Bot API
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    //Print to console
    console.log(`${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""}`);
    if (screaming && ctx.message.text) {
        //Scream the message
        yield ctx.reply(ctx.message.text.toUpperCase(), {
            entities: ctx.message.entities,
        });
    }
    else {
        //This is equivalent to forwarding, without the sender's name
        yield ctx.copyMessage(ctx.message.chat.id);
    }
}));
//Start the Bot
bot.start();
