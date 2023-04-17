const TelegramApi = require('node-telegram-bot-api')

const token = '6109038609:AAHFcOti1oJODFtg-KoNWeR5ErAlY55SFis'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/film', description: 'Рандомный выбор фильма'},
])

const genres = ['комедия', 'драма', 'боевик', 'фантастика', 'ужасы'];

// Объект с фильмами для каждого жанра
const filmsByGenre = {
  комедия: ['Фильм 1', 'Фильм 2', 'Фильм 3'],
  драма: ['Фильм 4', 'Фильм 5', 'Фильм 6'],
  боевик: ['Фильм 7', 'Фильм 8', 'Фильм 9'],
  фантастика: ['Фильм 10', 'Фильм 11', 'Фильм 12'],
  ужасы: ['Фильм 13', 'Фильм 14', 'Фильм 15'],
};

bot.on('message', msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  try {

      if (text === '/start') {
          UserModel.create({chatId})
          bot.sendSticker(chatId, 'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/anime_tyan_stickers/35678.512.webp');
          return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот ${msg.from.first_name}`);
      }
      if (text === '/film') {
        (ctx) => {
          // Создаем массив кнопок для выбора жанра фильма
          const buttons = genres.map((genre) => {
            return { text: genre };
          });
        
          // Отправляем сообщение с кнопками пользователю
          ctx.reply('Выберите жанр:', {
            reply_markup: {
              keyboard: buttons,
              one_time_keyboard: true,
            },
          });
        
          // Устанавливаем обработчик на выбор жанра фильма
          bot.on('text', (ctx) => {
            const selectedGenre = ctx.text.text;
        
            // Если жанр выбран и есть фильмы для этого жанра
            if (genres.includes(selectedGenre) && filmsByGenre[selectedGenre]) {
              // Получаем случайный фильм для выбранного жанра
              const films = filmsByGenre[selectedGenre];
              const randomFilm = films[Math.floor(Math.random() * films.length)];
        
              // Отправляем сообщение с выбранным фильмом
              ctx.reply(`Ваш случайный фильм: ${randomFilm}`);
            }
          });
        };
      };
    
    }

  }
  )

