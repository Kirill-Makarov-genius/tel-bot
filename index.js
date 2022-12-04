
const TelegreamApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require("./options");
const token = "5789438844:AAFoxy1L2EaoQL6QLgNvctaPV7UkpNkGGns";

const bot = new TelegreamApi(token, {polling: true})

let chats = []

const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Начальное приветствие"},
        {command: "/info", description: "Получить инфу о юзере"},
        {command: "/game", description: "Сыграть в игру"}
    ])
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Загадал цифру от 0 до 9, ты отгадай")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Отгадывай", gameOptions)
}

bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (text === "/info"){
        return bot.sendMessage(chatId, `firstName- ${msg.from.first_name} and username - ${msg.from.username}`)
    }
    else if (text === "/start"){
        return bot.sendMessage(chatId, "Бот стартует")
    }
    else if (text === "/game"){
        console.log(msg);
        return startGame(chatId)
    }
})

bot.on("callback_query", async msg => {
    const chatId = msg.message.chat.id;
    const data = msg.data

    
    if (data == "/again"){
        return await startGame(chatId)
    }
    else if (data == chats[chatId]){
        return await bot.sendMessage(chatId, "Победаа!!!", againOptions)
    } else {
        return await bot.sendMessage(chatId, `Ты проиграл, бот загадал ${chats[chatId]}`, againOptions)
    }
})

start();