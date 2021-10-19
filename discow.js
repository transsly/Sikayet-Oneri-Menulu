//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const ayarlar = require('./ayarlar');

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

const chalk = require('chalk');
const fs = require('fs');

const moment = require('moment');
require('moment-duration-format')

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

require('./a-events/komut')(client);

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
fs.readdir("./a-komutlar/", (err, files) => {
        if (err) console.error(err);
    console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
    console.log(`${files.length} Adet Komut Yüklenicek.`);
files.forEach(f => {
let props = require(`./a-komutlar/${f}`);
    console.log(`Bir Komut Yüklendi. / Yüklenen Komut : ${props.help.name} / Yüklenen Kod : ${f} / Komutun Alias'ları : ${props.conf.aliases.map(x => `${x}`).join(", ")}`);
    client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.reload = command => {
    return new Promise((resolve, reject) => {
try {
    delete require.cache[require.resolve(`./a-komutlar/${command}`)];
let cmd = require(`./a-komutlar/${command}`);
    client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);});
    client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
});
    resolve();
} catch (e) {
    reject(e);
}
});
};

client.load = command => {
    return new Promise((resolve, reject) => {
try {
let cmd = require(`./a-komutlar/${command}`);
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
});
    resolve();
} catch (e) {
    reject(e);
}
});
};

client.unload = command => {
    return new Promise((resolve, reject) => {
try {
        delete require.cache[require.resolve(`./a-komutlar/${command}`)];
let cmd = require(`./a-komutlar/${command}`);
    client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
});
    resolve();
} catch (e) {
    reject(e);
}
});
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.login(ayarlar.bot.token).then(x => {
    console.log("")
    console.log("Bot Başarıyla Giriş Yaptı.")
}).catch(err => console.eror("Bot Giriş Yaparken Bir Hata Oluştu.\nHata : "+err))

client.on("ready", async () => {
client.user.setStatus(ayarlar.config.status)
    client.channels.cache.get(ayarlar.config.seslioda).join().then(x => {
    console.log("Bot Başarıyla Sese Giriş Yaptı.")
    console.log("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————")
}).catch(err => console.error("Bot Sese Girerken Bir Hata Oluştu.\nHata : "+err))

var durumlar = ["DiscowZombie ❤️ Transsly", "Transsly ❤️ DiscowZombie", "DiscowZombie ❤️ Transsly", "DiscowZombie Was Here", "Transsly Was Here", "İstek / Öneri / Şikayet"]
    setInterval(() => {
const oynuyor = durumlar;
const index = Math.floor(Math.random() * (oynuyor.length));
    client.user.setPresence({ activity: { name:`${oynuyor[index]}`, type: "WATCHING"}, status: "dnd" }).catch(err => { })
}, 5000);
})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.discow = {
    secenek: [
        { emoji: "❓", id: "discow_sikayet", label: "Şikayet Bildirim" },
        { emoji: "❓", id: "discow_reklam", label: "Reklam Bildirim" },
        { emoji: "❓", id: "discow_oneri", label: "Öneri Bildirim" },
    ],
}

const yarq = require("discord-buttons");
require('discord-buttons')(client)

client.on('message', async message => {
  
        if(message.content === "!!report") {
        if(message.author.id != "746066222310883339") return;
	  
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.config.footer}`, message.author.avatarURL({ dynamic: true })).setTimestamp().setTitle("DiscowZombie | Şikayet/Öneri/Reklam Sistemi")

//------------------------------------------------------------------------------------------------------------

let kutucuk = []
    
client.discow.secenek.forEach(x => {
    kutucuk.push(new yarq.MessageMenuOption().setLabel(x.label).setEmoji(x.emoji).setValue(x.id))
})

let discowmenu = new yarq.MessageMenu()
.setID('oyun_menu')
.setPlaceholder('Bildirmek İstediğiniz Mesajı Aşağıdaki Menülerden Seçebilirsiniz.')
.setMaxValues(1)
.setMinValues(1)
kutucuk.forEach(xs => {
    discowmenu.addOption(xs)
})

const discowmenucuk = new yarq.MessageActionRow()
.addComponent(discowmenu)

//------------------------------------------------------------------------------------------------------------

    await message.channel.send(discow.setDescription(`${ok} **Bildirmek İstediğiniz Mesajı Aşağıdaki Menülerden Seçebilirsiniz.** ${tik}`), { components: [discowmenucuk] })
    
}})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("clickMenu", async (button) => {
	
const uye = button.clicker.member	
	
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
const discow = new Discord.MessageEmbed().setColor('BLACK').setTimestamp().setAuthor(`${uye.user.tag} / ${uye.id}`, uye.user.avatarURL({ size: 2048, dynamic: true }) || client.user.avatarURL()).setFooter(`${ayarlar.config.footer}`, uye.user.avatarURL({ size: 2048, dynamic: true }) || client.user.avatarURL())

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

        if(button.values[0] === "discow_oneri") {

        if(db.get("Kanali_Var&"+button.clicker.member.id) === "Evet") return button.reply.send(discow.setDescription(`**\`>\` Zaten Daha Önce Bir Talep Oluşturmuşsun.**

**Not: \`Bir Talep Oluşturabilmek İçin Önceki Talebi Silmelisin.\` / \` ${ayarlar.config.prefix}talep iptal\`**`), true)

button.guild.channels.cache.get(ayarlar.talep.clonechannelid).clone().then(async kanal => {

    await kanal.send(discow.setDescription(`${ok} **Merhaba, ${uye}
${ok} Öncelikle \`Sunucumuzla İlgili Önerilerini\` Bizimle Paylaştığın İçin Teşekkür Ederim. ${tik}

${ok} Önerini <@&${ayarlar.talep.yetkilirol}> Rolündeki Yetkililerimiz İle Paylaşabilirsin. ${tik}
${ok} Eğer Destek Ekibindeki Yetkililerimiz Aktif Değil İse Önerini Herhangi Bir Üst Yetkilimiz İle Paylaşabilirsin. ${tik}

Not: \`Unutma, Bu Kanal 2 Saat İçinde Kendini İmha Edicek.\`**`))
    await kanal.send(`${uye} - <@&${ayarlar.talep.yetkilirol}>`)
    await kanal.createOverwrite(button.clicker.member.id, { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, CREATE_INSTANT_INVITE: true, VIEW_CHANNEL: true });
    await kanal.createOverwrite
    await kanal.setName(`oneri-${uye.id}`)
    button.reply.defer();
    db.set("Kanali_Var&"+button.clicker.member.id, "Evet")
    uye.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).catch(err => button.channel.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).then(x => x.delete({ timeout: 15000 })))

setTimeout(() => {
    if(!button.guild.channels.cache.get(kanal.id)) return;
    kanal.delete({ reason: "Talep Süresi Sona Erdi." })
}, 7200000)
})}

        if(button.values[0] === "discow_sikayet") {

        if(db.get("Kanali_Var&"+button.clicker.member.id) === "Evet") return button.reply.send(discow.setDescription(`**\`>\` Zaten Daha Önce Bir Talep Oluşturmuşsun.**

**Not: \`Bir Talep Oluşturabilmek İçin Önceki Talebi Silmelisin.\` / \` ${ayarlar.config.prefix}talep iptal\`**`), true)

button.guild.channels.cache.get(ayarlar.talep.clonechannelid).clone().then(async kanal => {

    await kanal.send(discow.setDescription(`${ok} **Merhaba, ${uye}
${ok} Öncelikle \`Sunucumuzla İlgili Şikayetlerini\` Bizimle Paylaştığın İçin Teşekkür Ederim. ${tik}

${ok} Şikayetini <@&${ayarlar.talep.yetkilirol}> Rolündeki Yetkililerimiz İle Paylaşabilirsin. ${tik}
${ok} Eğer Destek Ekibindeki Yetkililerimiz Aktif Değil İse Şikayetini Herhangi Bir Üst Yetkilimiz İle Paylaşabilirsin. ${tik}

Not: \`Unutma, Bu Kanal 2 Saat İçinde Kendini İmha Edicek.\`**`))
    await kanal.send(`${uye} - <@&${ayarlar.talep.yetkilirol}>`)
    await kanal.createOverwrite(button.clicker.member.id, { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, CREATE_INSTANT_INVITE: true, VIEW_CHANNEL: true });
    await kanal.setName(`sikayet-${uye.id}`)
    button.reply.defer();
    db.set("Kanali_Var&"+button.clicker.member.id, "Evet")
    uye.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).catch(err => button.channel.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).then(x => x.delete({ timeout: 15000 })))

setTimeout(() => {
    if(!button.guild.channels.cache.get(kanal.id)) return;
    kanal.delete({ reason: "Talep Süresi Sona Erdi." })
}, 7200000)
})}

        if(button.values[0] === "discow_reklam") {

        if(db.get("Kanali_Var&"+button.clicker.member.id) === "Evet") return button.reply.send(discow.setDescription(`**\`>\` Zaten Daha Önce Bir Talep Oluşturmuşsun.**

**Not: \`Bir Talep Oluşturabilmek İçin Önceki Talebi Silmelisin.\` / \` ${ayarlar.config.prefix}talep iptal\`**`), true)

button.guild.channels.cache.get(ayarlar.talep.clonechannelid).clone().then(async kanal => {

    await kanal.send(discow.setDescription(`${ok} **Merhaba, ${uye}
${ok} Öncelikle \`Sunucumuzda Reklam Yapanları\` Bizimle Paylaştığın İçin Teşekkür Ederim. ${tik}

${ok} Reklam Yapan Kişiyi <@&${ayarlar.talep.yetkilirol}> Rolündeki Yetkililerimiz İle Paylaşabilirsin. ${tik}
${ok} Eğer Destek Ekibindeki Yetkililerimiz Aktif Değil İse Reklam Yapan Kişiyi Herhangi Bir Üst Yetkilimiz İle Paylaşabilirsin. ${tik}

Not: \`Unutma, Bu Kanal 2 Saat İçinde Kendini İmha Edicek.\`**`))
    await kanal.send(`${uye} - <@&${ayarlar.talep.yetkilirol}>`)
    await kanal.createOverwrite(button.clicker.member.id, { READ_MESSAGES: true, READ_MESSAGE_HISTORY: true, CREATE_INSTANT_INVITE: true, VIEW_CHANNEL: true });
    await kanal.setName(`reklam-${uye.id}`)
    button.reply.defer();
    db.set("Kanali_Var&"+button.clicker.member.id, "Evet")
    uye.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).catch(err => button.channel.send(`**Kanalın Başarıyla Oluşturuldu. Talebi İptal Etmek İçin \`${ayarlar.config.prefix}talep iptal\` Komutunu Kullanabilirsin.**`).then(x => x.delete({ timeout: 15000 })))

setTimeout(() => {
    if(!button.guild.channels.cache.get(kanal.id)) return;
    kanal.delete({ reason: "Talep Süresi Sona Erdi." })
}, 7200000)
})}

//------------------------------------------------------------------------------------------------------------

})