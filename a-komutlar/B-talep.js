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

    //if(!botconfig.sahipler.includes(msahip.id)) return mkanal.send(discow.setDescription(`${dikkat} **Bu Komutu Sadece \`Sahibim\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
    //if(!muye.roles.cache.get(roller.register) && !muye.hasPermission("ADMINISTRATOR") && !botconfig.sahipler.includes(msahip.id)) return mkanal.send(discow.setDescription(`${dikkat} **Bu Komutu Sadece \`Yetkililer\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
    //if(!muye.hasPermission("ADMINISTRATOR") && !botconfig.sahipler.includes(msahip.id)) return mkanal.send(roller.famidiscow.setDescription(`${dikkat} **Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

        if(!args[0]) return mkanal.send(discow.setDescription(`${dikkat} **Lütfen Yapmak İstediğin İşlemi Belirt.** ${dikkat}

${ok} **Talep İptal :** **\`${ayarlar.config.prefix}talep iptal\`**
${ok} **Talep Sil :** **\`${ayarlar.config.prefix}talep sil @discow/discowid\` (\`Sadece Yetkili\`)**`))

        if(args[0].toLowerCase() === "iptal") {

        if(!db.get("Kanali_Var&"+msahip.id) === "Evet") return mkanal.send(discow.setDescription(`${dikkat} **Destek Talebi Bulunamadı.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

msunucu.channels.cache.filter(x => x.name.endsWith(msahip.id)).forEach(x => {
    x.delete({ reason: `${msahip.tag} | Talep İptal` })
})

    mkanal.send(discow.setDescription(`${ok} **Talebin Başarıyla İptal Edildi.** ${tik}`))
    db.delete("Kanali_Var&"+msahip.id)

}

        if(args[0].toLowerCase() === "sil") {

        if(!muye.roles.cache.get(ayarlar.talep.yetkilirol) && !muye.hasPermission("ADMINISTRATOR") && !botconfig.sahipler.includes(msahip.id)) return mkanal.send(discow.setDescription(`${dikkat} **Bu Komutu Sadece \`Yetkililer\` Kullanabilir.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

const kul = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if(!kul) return mkanal.send(discow.setDescription(`${dikkat} **Lütfen Bir Kullanıcı Belirt.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

        if(!db.get("Kanali_Var&"+kul.id) === "Evet") return mkanal.send(discow.setDescription(`${dikkat} **Destek Talebi Bulunamadı.** ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))

msunucu.channels.cache.filter(x => x.name.endsWith(kul.id)).forEach(x => {
    x.delete({ reason: `${kul.user.tag} | Talep Sil | ${msahip.tag}` })
})

    mkanal.send(discow.setDescription(`${ok} **Talep Başarıyla Silindi.** ${tik}`))
    db.delete("Kanali_Var&"+kul.id)

}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ["talep", "destek", "destektalebi", "destek-talebi", "destektalepi", "destek-talepi"],
};
 exports.help = {
  name: 'Talep Komutu'
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------