const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Khởi tạo bot với token bạn nhận từ BotFather
const bot = new TelegramBot("6704383738:AAEh8mlwi5rkGqRWPWJwl9RhBo0I1mjO3Kc", {
  polling: true,
});

// Định nghĩa endpoint và header cho API của OpenAI
const openaiEndpoint = "https://api.openai.com/v1/completions";
const openaiHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer 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",
};

// Xử lý tin nhắn từ người dùng
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  let data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
      Cookie:
        "__cf_bm=3xtSkp02BmXTXzq9u23EHBeRA.ASTyZnOl7jyW4fXGE-1711613424-1.0.1.1-4.EWUygtV_F.kOJ03NEyUqCDXhrqPMo9rC0kWjcqKWBKuSzTfF7QhglIvoVmeOEh7wi3ElWxYn.uoL.UKeR6kA; _cfuvid=eL2miwcgkv9szwbf0Y8g_mB2XwOlkWzkFp7of8n5cjc-1711613424073-0.0.1.1-604800000",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      bot.sendMessage(chatId, response.data.choices[0].message.content);
    })
    .catch((error) => {
      console.log(error);
      console.error("Error:", error);
      bot.sendMessage(chatId, "Con xíu lười vkl luôn đúng kh ae ");
    });
});
