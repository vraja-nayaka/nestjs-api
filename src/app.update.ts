import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  Sender,
  Message,
  Command,
} from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';

type Context = Scenes.SceneContext;

let currentChar = '😎';

const MENU_MAP = '🌏 Карта';
const MENU_MAP_CONTINUE = '🛵 Продолжить путешествие';
const MENU_CHARACTER = ' Персонаж';
const getMenuCharacter = () => `${currentChar}${MENU_CHARACTER}`;
const MENU_TASKS = '📢 Задания';
const MENU_THANKS = '⭐️ Поблагодарить';
const CHARS = ['🤵‍♂️', '🧑‍🚀', '🧙', '🧝‍♀️', '🧟‍♀️', '🧛'];

const getMainMenu = (additionalMenu: string[] = []) =>
  Markup.keyboard([
    additionalMenu,
    [MENU_MAP, getMenuCharacter(), MENU_TASKS],
    [MENU_THANKS],
  ]);
// .oneTime()
// .resize();

@Update()
export class AppUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      'Привет, давай посмотрим, что я тут наковырял за сегодня',
      getMainMenu(),
    );
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Можешь написать привет или что еще');
  }

  // MENU
  @Hears(MENU_MAP)
  async menuMap(@Ctx() ctx: Context) {
    await ctx.replyWithPhoto(
      {
        url: 'https://images.noob-club.ru/news/2020/03/615/56xo834zvg.jpg',
        filename: 'карта_мира.jpg',
      },
      getMainMenu([MENU_MAP_CONTINUE]),
    );
  }

  @Hears(MENU_MAP_CONTINUE)
  async menuMapContinue(@Ctx() ctx: Context) {
    await ctx.reply(
      `Поехал бы дальше, но дороги пока замело ☃️`,
      getMainMenu(),
    );
  }

  @Hears(new RegExp(`.+${MENU_CHARACTER}`))
  async menuCharacter(@Ctx() ctx: Context) {
    await ctx.reply(`Выберите вашего персонажа`, getMainMenu(CHARS));
  }
  @Hears(CHARS)
  async menuSetCurrentCharacter(
    @Ctx() ctx: Context,
    @Message('text') newChar: string,
  ) {
    currentChar = newChar;
    await ctx.reply(`Персонаж выбран`, getMainMenu());
  }

  @Hears(MENU_TASKS)
  async menuTasks(@Ctx() ctx: Context) {
    await ctx.reply(`Заданий пока нет, но скоро появятся`, getMainMenu());
  }

  @Hears(MENU_THANKS)
  async menuThanks(@Ctx() ctx: Context) {
    await ctx.reply(`Ой, спасибо, ты такой классный!`, getMainMenu());
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears(['hi', /.ривет.*/])
  async hears(
    @Ctx() ctx: Context,
    @Sender('first_name') first_name: string,
    @Message('text') message: string,
  ) {
    await ctx.reply(
      `Привет, ${first_name}!
Вот ты говоришь: ${message}
И это здорово`,
      getMainMenu(),
    );
  }

  @Command('photo')
  async show(@Ctx() ctx: Context) {
    await ctx.replyWithPhoto(
      {
        url: 'https://picsum.photos/200/300/?random',
        filename: 'kitten.jpg',
      },
      getMainMenu(),
    );
  }

  @Hears(/.*/)
  async anyHears(
    @Ctx() ctx: Context,
    @Sender('first_name') first_name: string,
  ) {
    await ctx.reply(
      `Слушай, ${first_name}, я пока не знаю что ответить на это. Давай лучше фотку тебе отправлю. /photo - кликай!`,
      getMainMenu(),
    );
  }
}
