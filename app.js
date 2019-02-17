require('dotenv').load()
const Telegraf = require('telegraf')
const answerer = new (require("./tools/getAnswer"));
const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('Starting ...')

bot.on('sticker', (ctx) => {
	ctx.reply(answerer.getAnswer(ctx.message))
})

bot.on('text', (ctx) => {
	ctx.reply(answerer.getAnswer(ctx.message.text))
})

bot.launch()

bot.catch((err) => {
	console.log("j'ai crashé XD\n", err)
  })