import 'dotenv/config'

import { Bot } from "grammy";

import { token } from './config';
import { getBotRights } from './utils';

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Добавь меня в чат, выдай мне права на удаление сообщений, и я буду тереть всё кроме медиа и кастомных эмодзи!"));

bot.on(["msg:text", "edit:text", ":media"], async (ctx) => {
  const myRights = await getBotRights(ctx);

  if(!myRights){
    return;
  }

  const message = ctx.message || ctx.update.message || ctx.update.edited_message;

  if(!message){
    return;
  }

  const text = message.text || message.caption;

  if(!text){
    return;
  }

  const length = text.length;

  const entities = message.entities || message.caption_entities || [];

  const summaryLength = entities.reduce((acc, x) => acc + x.length, 0);

  if(length !== summaryLength){
    await ctx.deleteMessage()
  }
});

bot.on(":new_chat_members:me", (ctx) => {
  console.log(`Added to chat ${ctx.chat.id} ${'title' in ctx.chat ? ctx.chat.title : ''}`);
  
  ctx.reply("Выдай мне права на удаление сообщений, и я буду тереть всё кроме медиа и кастомных эмодзи!");
});

bot.catch((err) => console.error(err));

bot.start();

console.log("Bot started");

