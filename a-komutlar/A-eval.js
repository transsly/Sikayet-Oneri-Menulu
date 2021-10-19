//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

  exports.run = async (client, message, args) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = botconfig.prefix

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel


//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    if(!botconfig.sahipler.includes(msahip.id)) return mkanal.send(discow.setDescription(`${dikkat} **Bu Komutu Sadece \`Sahibim\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
    //if(!muye.roles.cache.get(roller.register) && !muye.hasPermission("ADMINISTRATOR") && !botconfig.sahipler.includes(msahip.id)) return mkanal.send(discow.setDescription(`${dikkat} **Bu Komutu Sadece \`Yetkililer\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
    //if(!muye.hasPermission("ADMINISTRATOR") && !botconfig.sahipler.includes(msahip.id)) return mkanal.send(roller.famidiscow.setDescription(`${dikkat} **Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(!args[0]) return mkanal.send(discow.setDescription(`${dikkat} **Lütfen Yapmak İstediğin İşlemi Belirt.** ${dikkat}

${ok} **Normal Eval :** **\`${ayarlar.config.prefix}eval normal <kod>\`**
${ok} **Text Eval :** **\`${ayarlar.config.prefix}eval text <kod>\`**`))

if(args[0].toLowerCase() === "normal") {

const kod = args.slice(1).join(" ");
    if(!kod) return mkanal.send(discow.setDescription(`${dikkat} **Lütfen Bir Kod Belirt.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

try {
    if (kod.includes(client.token)) return mkanal.send(discow.setDescription(`${dikkat} **Sen Bir Orospu Çocuğusun.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
  eval(kod)
} catch(err) {
  mkanal.send(discow.setDescription(`${dikkat} **Denediğin Kodda Bir Hata Oluştu. ${dikkat}\n\n${ok} Hata :\n\`\`\`js\n${err}\`\`\`**`))
}

}

if(args[0].toLowerCase() === "text") {

const code = args.slice(1).join(" ");
    if(!code) return  mkanal.send(discow.setDescription(`${dikkat} **Lütfen Bir Kod Belirt.**`)).then(x => x.delete({ timeout: 15000 }))

  try {
var result = clean(await eval(code));
    if (result.includes(client.token)) return message.channel.send(discow.setDescription(`${dikkat} **Sen Bir Orospu Çocuğusun.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
  message.channel.send(result, { code: "js", split: true });
} catch (err) {
  message.channel.send(err, { code: "js", split: true });
}

function clean(text) {
if (typeof text !== "string")
  text = require("util").inspect(text, { depth: 0 });
  text = text
.replace(/`/g, "`" + String.fromCharCode(8203))
.replace(/@/g, "@" + String.fromCharCode(8203));

  return text;

}

}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ["eval", "test", "deneme", "texteval", "yazieval", "yazi-eval", "eval-yazi", "evalyazi"],
};
 exports.help = {
  name: 'Eval Komutu'
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------