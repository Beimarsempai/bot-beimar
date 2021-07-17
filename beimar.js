// © Copyright Felixcrack 409 | FX-BOT
// Bot By Felixcrack
// Si modificas deja créditos

//Modulos NPM
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const speed = require('performance-now')
const request = require('request');
const { spawn, exec, execSync } = require("child_process")
const fs = require("fs")
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const fetch = require('node-fetch');	
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const { error } = require("qrcode-terminal")
const util = require('util')
const { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { yta, ytv, igdl, upload } = require('./lib/ytdl')
const { webp2mp4File} = require('./lib/webp2mp4')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

//Archivos JSON
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const afk = JSON.parse(fs.readFileSync('./database/off.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
const image = JSON.parse(fs.readFileSync('./database/img.json'))
const setting = JSON.parse(fs.readFileSync('./database/setting.json'))
//Configuraciones
const { help } = require('./src/help')
const { toinmenu } = require('./src/toinmenu')
const { menuadmin } = require('./src/menuadmin')
const { nsfwmenu } = require('./src/nsfwmenu')
const { desmenu } = require('./src/desmenu')
const { version } = require('./src/version')
const { idioma } = require('./src/idioma')
const { welmenu } = require('./src/welmenu')
const { addMetadata } = require('./lib/exif.js')
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Felix😎🤙🏻\n' 
            + 'ORG:Creador De FX-BOT-V72\n' 
            + 'TEL;type=CELL;type=VOICE;waid=12603763944:+1 (260) 376-3944\n' 
            + 'END:VCARD'
//WhatsApp Conexión
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		ChatModification,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
//=================================================//
prefix = '.'
blocked = []
cmdnf = []
ind = []
banChats = false
promote = setting.promote
numbernye = '0'
demote = setting.demote
leave = setting.leave
//=================================================//
async function starts() {
	const FxBot = new WAConnection()
	FxBot.version = [2, 2119, 6]
	FxBot.logger.level = 'warn'
	console.log(banner.string)
	console.log(color('[ BOT]','aqua'), color("BOT BY FELIXCRACK 409", "yellow"))
	console.log('>', '[',color('INFO','blue'),']','Suscribete A Felixcrack 409...')
	FxBot.on('qr', () => {
	console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea El Código QR De Arriba'))
	})

	fs.existsSync('./session.json') && FxBot.loadAuthInfo('./session.json')
	FxBot.on('connecting', () => {
	console.log(color('> [ INFO ]', 'white'), color('Conectando...'))
	})
	FxBot.on('open', () => {
	console.log(color('> [ INFO ]', 'white'), color('Ya me conecte 👌🏻'))
	})
		await FxBot.connect({timeoutMs: 30*1000})
  fs.writeFileSync('./session.json', JSON.stringify(FxBot.base64EncodedAuthInfo(), null, '\t'))
//Banned Call
FxBot.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("call dari "+ callerId)
        FxBot.sendMessage(callerId, "Sistema De Bloqueo Automático, NO LLAMES POR FAVOR", MessageType.text)
        await sleep(4000)
        await FxBot.blockUser(callerId, "add")
})
//Welkom
FxBot.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await FxBot.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await FxBot.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks  = `┏━━━━━━━━━━━━━━━━━
┃          「 *𝗛𝗢𝗟𝗔* 」
┃@${num.split('@')[0]}👋
┃BIENVENIDO AL GRUPO 
┃*${mdata.subject}*
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃   「 *_BIENVENIDO_* 」
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┠⊷️ *Grupo Oficial*:
┠⊷️ *Habla con Beimar haver si te acepta
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
  ${mdata.desc}*
┗━━━━━━━━━━━━━━━━━`
				let buff = await getBuffer(ppimg)
				FxBot.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await FxBot.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*@${num.split('@')[0]}*
${leave}	`
				let buff = await getBuffer(ppimg)
				FxBot.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
			const mdata = await FxBot.groupMetadata(anu.jid)
			num = anu.participants[0]
			try {
					ppimg = await FxBot.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			
			teks = `𝙉𝙐𝙀𝙑𝙊 𝘼𝙆𝙈𝙄𝙉
			
\`\`\`Nombre :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Usuario :\`\`\` @${num.split('@')[0]}

\`\`\`Date : NOW\`\`\` 

\`\`\`Grupo :\`\`\` ${mdata.subject}

${promote}`
			FxBot.sendMessage(mdata.id, buff, MessageType.image, {caption : teks, contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Kntl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `PROMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		} else if (anu.action == 'demote') {
			num = anu.participants[0]
			const mdata = await FxBot.groupMetadata(anu.jid)
			num = anu.participants[0]
			try {
					ppimg = await FxBot.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			let buff = await getBuffer(ppimg)
			teks = `𝙎𝙀 𝙈𝘼𝙏𝙊 𝘼 𝙐𝙉 𝘼𝙆𝙈𝙄𝙉
			
\`\`\`Nombre :\`\`\` ${num.replace('@s.whatsapp.net', '')}

\`\`\`Usuario :\`\`\` @${num.split('@')[0]}

\`\`\`Dato : Reciente\`\`\`

\`\`\`Grupo :\`\`\` ${mdata.subject}

${demote}`
			FxBot.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {mentionedJid: [num]}, quoted: { "key": { "participant": `${numbernye}`, "remoteJid": `Ktl`, "fromMe": false, "id": "B391837A58338BA8186C47E51FFDFD4A" }, "message": { "documentMessage": { "jpegThumbnail": buff, "mimetype": "application/octet-stream", "title": `DEMOTE`, "fileLength": "36", "pageCount": 0, "fileName": `_Welcome_` }}, "messageTimestamp": "1614069378", "status": "PENDING"}})
		}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
})
	//Actualización De Chat.
FxBot.on('chat-update', async (mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        const type = Object.keys(mek.message)[0]
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
        var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const arg = budy.slice(command.length + 1, budy.length)
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const meNumber = FxBot.user.jid.split("@")[0]
		const botNumber = FxBot.user.jid
//SETTING
		const isGroup = from.endsWith('@g.us')
		const sender = isGroup ? mek.participant : mek.key.remoteJid
		const senderme = mek.participant
		const isMe = botNumber.includes(senderme)
		const isBanned = ban.includes(sender)
        const isNsfw = isGroup ? nsfw.includes(from) : false
        const isImage = isGroup ? nsfw.includes(from) : false
		const totalchat = await FxBot.chats.all()
		const groupMetadata = isGroup ? await FxBot.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isWelkom = isGroup ? welkom.includes(from) : false		
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const conts = mek.key.fromMe ? FxBot.user.jid : FxBot.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? FxBot.user.name : conts.notify || conts.vname || conts.name || '-'
       //SETTINGS FUNCIONES
       const apakah = ['Si','No']
   	const gay = ['Eres 15% Gay','Eres 0% Gay 😱','Eres 20% Gay','Eres 78% Gay','Eres 62% Gay','Eres 0.1% Gay','Eres 100% Gay 😬','Eres 6% Gay','Eres 96% Gay','Eres 21% Gay','Eres 50% Gay','Eres 99.99% Gay','Eres 12% Gay','Eres 88% Gay','ERES INFINITAMENTE GAY 🤯','Eres 75% Gay','Eres 19% Gay','Eres Fan De Cuties 🤬','Eres 44% Gay','Eres 84% Gay']
       const kapankah = ['Otro día','Otra semana','Otro mes','Otro año']
        //MESS
        
		mess = {
			wait: '「 ❗ 」 En Proceso, Aguarda!',
			success: '「 ❗ 」 Uff Comando Con Exito',
			nsfwoff: '「 ❗ 」La Funcion De Nsfw No Está Activa!',
			wrongFormat: '「 ❗ 」 Wey No Seas Pendejo Escribe Bien El Formato',
			waitmusic: '「 ❗ 」 Espera! Estoy buscando tu musica\nEn cuánto la encuentre la envío!!',
			waitimg: '「 ❗ 」 Espera! Estoy creando tu imagen!',
			nsfwoff: '「 ❗ 」La Funcion De Nsfw No Está Activa!',
					musica: 'Espera un momento, estoy buscando tu canción, recuerda suscribirte a mi canal de YouTube😎🤙🏻',
			imageoff: '「 ❗ 」No Puedo Enviar Fotos Mientras No Esta Activa La Función!',
			error: {
				stick: '「 ❗ 」F no se pudo convertir:/',
				errostick: '❌Error al crear el sticker❌',
				Iv: '「 ❗ 」Link Invalido Weon'
			},
			only: {
				group: '「 ❗ 」Este Comando Solo Puede Ser Usado En Grupos',
				admin: '「 ❗ 」No Eres Admin 💩',
				Badmin: '「 ❗ 」 Necesito Ser Admin Para Este Comando'
			}
		}
		const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }

        const reply = (teks) => {
            FxBot.sendMessage(from, teks, text, {quoted:mek})
        }

        const sendMess = (hehe, teks) => {
            FxBot.sendMessage(hehe, teks, text, {sendEphemeral: true})
        }

        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? FxBot.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : FxBot.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }
        const costum = (pesan, tipe, target, target2) => {
                 FxBot.sendMessage(from, pesan, tipe, {quoted: {key: {fromMe: false, participant: `${target}`, ...(from ? {remoteJid: from}: {})}, message: {conversation: `${target2}` }}})
        }
        //FAKEH
const fakekontak = (teks) => {
FxBot.sendMessage(from, teks, MessageType.text, {
quoted: {
key: {
fromMe: false,
 participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {})
 },
message: {
 'contactMessage': {
 'displayName': `Hola ${pushname}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${ucapanWaktu},;;;\nFN:${ucapanWaktu},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
 'jpegThumbnail': fs.readFileSync('./stik/thumb.jpeg')
}
}
                }
            })
        }


			

        const fakethumb = (teks, yes) => {
            FxBot.sendMessage(from, teks, image, {thumbnail:fs.readFileSync('./stik/fake.jpeg'),quoted:mek,caption:yes})
        }
        const fakestatus = (teks) => {
            FxBot.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": `Hola ${pushname}`,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    },
                    contextInfo: {
                      "forwardingScore": 999, "isForwarded": true
                    }
                }
            })
        }
        const fakegroup = (teks) => {
            FxBot.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid : `17792492278@g.us` } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": `Hola ${pushname}`,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
 const faketoko = (teks) => {
 FxBot.sendMessage(from, teks, text, {
quoted: {
 key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: 'status@broadcast' } : {}) 
}, message: {
'productMessage': {
'product': {
 'productImage':{
'mimetype': 'image/jpeg',
 'jpegThumbnail': fs.readFileSync('./stik/thumb.jpeg')
},
'title': `Hola UwU ${pushname}`,
'productImageCount': 9999
},
'businessOwnerJid': `0@s.whatsapp.net`
}
}
                }
            })
        }
        const producto = (teks) => {
 FxBot.sendMessage(from, teks, text, {
quoted: {
 key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: 'status@broadcast' } : {}) 
}, message: {
'productMessage': {
'product': {
 'productImage':{
'mimetype': 'image/jpeg',
 'jpegThumbnail': fs.readFileSync('./stik/thumb.jpeg')
},
'title': `𝗙𝗫-𝗕𝗢𝗧`,
'productImageCount': 0
},
'businessOwnerJid': `0@s.whatsapp.net`
}
}
                }
            })
        }
const faketokoforwaded = (teks) => {
	anu = {
	  key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": fs.readFileSync(`./stik/thumb.jpeg`)
					},
					"title": `Hola ${pushname}, ${ucapanWaktu}`,
					"retailerId": "Self Bot",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		}
	}
}
	FxBot.sendMessage(from, teks, text, {
	  quoted: anu,
	  contextInfo:{
	    "forwardingScore": 999, "isForwarded": true
	  }
	})
}
        const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './stik' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './stik' + names + '.png'
                    let asw = './stik' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        FxBot.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
                }
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    FxBot.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }   
    //> Nivel <
const getLevelingXp = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const jadiUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            user.push(obj)
            fs.writeFileSync('./database/user.json', JSON.stringify(user))
        }
        const bikinSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }

        const getLevelingLevel = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addLevelingXp = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (sender) => {
            const obj = {id: sender, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/level.json', JSON.stringify(_level))
        }
			//[-- Barra De Nivel --]
			var per = '*[▒▒▒▒▒▒▒▒▒▒] 0%*'
			const peri = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
			const perl = peri-getLevelingXp(sender) 
			const resl = Math.round(100-((perl/getLevelingXp(sender))*100))
			if (resl <= 10) {
				per = `*[█▒▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 20) {
				per = `*[██▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 30) {
				per = `*[███▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 40) {
				per = `*[████▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 50) {
				per = `*[█████▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 60) {
				per = `*[██████▒▒▒▒] ${resl}%*`
			} else if (resl <= 70) {
				per = `*[███████▒▒▒] ${resl}%*`
			} else if (resl <= 80) {
				per = `*[████████▒▒] ${resl}%*`
			} else if (resl <= 90) {
				per = `*[█████████▒] ${resl}%*`
			} else if (resl <= 100) {
				per = `*[██████████] ${resl}%*`
			} 
			/*[-- RANGOS --]*/
			const levelRole = getLevelingLevel(sender)
   	     var role = 'Bronze l'
   	     if (levelRole <= 3) {
   	         role = 'Bronze ll'
   	     } else if (levelRole <= 5) {
   	         role = 'Bronze lll'
   	     } else if (levelRole <= 7) {
   	         role = 'Oro l'
   	     } else if (levelRole <= 8) {
   	         role = 'Oro ll'
   	     } else if (levelRole <= 9) {
   	         role = 'Oro lll'
   	     } else if (levelRole <= 10) {
   	         role = 'Platino l'
   	     } else if (levelRole <= 11) {
   	         role = 'Platino ll'
   	     } else if (levelRole <= 12) {
   	         role = 'Platino lll'
   	     } else if (levelRole <= 13) {
   	         role = 'Diamante l'
   	     } else if (levelRole <= 14) {
   	         role = 'Diamante ll'
   	     } else if (levelRole <= 14) {
   	         role = 'Diamante lll'
   	     } else if (levelRole <= 15) {
   	         role = 'Diamante llll'
   	     } else if (levelRole <= 16) {
   	         role = 'Heroico l'
   	     } else if (levelRole <= 17) {
   	         role = 'Heroico ll'
   	     } else if (levelRole <= 18) {
   	         role = 'Heroico lll'
   	     } else if (levelRole <= 19) {
   	         role = 'Gran Maestro l'
   	     } else if (levelRole <= 20) {
   	         role = 'Gran Maestro ll'
   	     } else if (levelRole <= 21) {
   	         role = 'Gran Maestro lll'
   	     } else if (levelRole <= 22) {
   	         role = 'Lider Supremo'
   	     } else if (levelRole <= 23) {
   	         role = 'Titan😈'
   	     }
   //Function Level Up
const levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role) => {
	fakekontak(`\n*「 FELICIDADES 」*\n┌ *Nombre* : ${pushname}\n├ *Número* : wa.me/${sender.split("@")[0]}\n├  *XP* : ${getLevelingXp(sender)}\n├ *Rango*: ${role}\n└  *Nivel* : ${getLevel} ⊱ ${getLevelingLevel(sender)}`)
}
//Function Level
            if (isGroup) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await fakestatus(levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role))
                }
            } catch (err) {
                console.error(err)
            }
        }
//=====================//      
         // Tiempo horario
        const hour_now = moment().format('HH')
        var ucapanWaktu = 'Buenos Dias 🌝👋'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = 'Buenos Dias 🌝👋'
        } else if (hour_now >= '10' && hour_now <= '14') {
          ucapanWaktu = 'Buenas Tardes 🌆'
        } else if (hour_now >= '14' && hour_now <= '17') {
          ucapanWaktu = 'Buenas Tardes 🌆'
        } else if (hour_now >= '17' && hour_now <= '18') {
          ucapanWaktu = 'Buenas Tardes 🌆'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = 'Buenas Noches 🌚'
        } else {
          ucapanWaktu = 'Buenas Noches 🌚'
        }
//========================================================================================================================//
		colors = ['blue']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
		if (isCmd && isBanned) {
        return console.log(color('[ USUÁRIO BANEADO ] Ignorando comando', 'blue'), color(moment.tz('America/México').format('HH:mm:ss'), 'yellow'), color(`${command}`),'DE:', color(pushname))}
    	if (!isGroup && isCmd) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]))
        if (isCmd && isGroup) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]), 'En', color(groupName))

			switch(command) {
				case prefix+ 'menu':
  case prefix+ 'help':
  case prefix+ '?':
  wew = fs.readFileSync('./src/foto.png')
					FxBot.sendMessage(from, wew, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "Felixcrack BOT Ya esta verificado.", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/botlogo.webp')} } }, caption: help(prefix) })
				  break
case prefix+ 'idioma':
FxBot.sendMessage(from, idioma(prefix, sender), text, {quoted: mek})
break
case prefix+ 'yomenu':
FxBot.sendMessage(from, toinmenu(prefix, sender), text, {quoted: mek})
break
case prefix+ 'menuadmin':
FxBot.sendMessage(from, menuadmin(prefix, sender), text, {quoted: mek})
break
case prefix+ 'nsfwmenu':
if (!isNsfw) return reply(mess.nsfwoff)
FxBot.sendMessage(from, nsfwmenu(prefix, sender), text, {quoted: mek})
break
case prefix+ 'desmenu':
FxBot.sendMessage(from, desmenu(prefix, sender), text, {quoted: mek})
break
case prefix+ 'versión':
case prefix+ 'version':
FxBot.sendMessage(from, version(prefix, sender), text, {quoted: mek})
break
case prefix+ 'welmenu':
FxBot.sendMessage(from, welmenu(prefix, sender), text, {quoted: mek})
break




//TEXTO A VOZ GOOGLE
case prefix+ 'tts':
case prefix+ 'gtts':
case 'tts':
if (args.length < 1) return FxBot.sendMessage(from, `Debes usar el comando correctamente:\n${prefix}tts (lengua) (texto)\nEjemplo: ${prefix}tts Buen dia abortos\n\nUse: ${prefix}ts para enumerar todos los idiomas`, text, {quoted: mek})
const gtts = require('./lib/gtts')(args[0])
if (args.length < 2) return FxBot.sendMessage(from, 'Y El Texto?', text, {quoted: mek})
dtt = body.slice(8)
ranm = getRandom('.mp3')
dtt.length > 800
? reply('¿Quieres Escribir La Biblia?')
: gtts.save(ranm, dtt, function() {
FxBot.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
fs.unlinkSync(ranm)
})
break

//HIDETAG
case prefix+ 'hidetag':
			if (!mek.key.fromMe) return fakestatus('SELF-BOT')
			if (!isGroup) return reply(mess.only.group)
			var value = args.join(' ')
			var group = await FxBot.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
			text: value,
			contextInfo: { mentionedJid: mem },
			quoted: mek
			}
			FxBot.sendMessage(from, optionshidetag, text)
			break
    case prefix+ 'sticktag':
            if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
            encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await FxBot.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await FxBot.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            FxBot.sendMessage(from, ini_buffer, MessageType.sticker, options)
            fs.unlinkSync(file)
            } else {
            reply(`*Responde a un sticker*`)
            }
            break
		    case prefix+ 'giftag':
                if (!isQuotedVideo) return reply(`Uso: ${prefix + command}`)
                quoted = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await FxBot.downloadMediaMessage(quoted)
                await fs.writeFileSync(`giftag.gif`, download)
                var group = await FxBot.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                thumb = fs.readFileSync(`giftag.gif`)
                FxBot.sendMessage(from, thumb, video, { contextInfo: {mentionedJid: mem }, quoted: mek, mimetype: 'video/gif', thumbnail: thumb })
			    await fs.unlinkSync(`giftag.gif`)
			    break
			case prefix+ 'doctag':
			  //by Dehanjing
		        if (!isQuotedDocument) return amek.reply(from, `Reply Document dengan caption *${prefix + command}*`, mek)
                quoted = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await FxBot.downloadMediaMessage(quoted)
                await fs.writeFileSync(`doc.txt`, download)
                var group = await FxBot.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                FxBot.sendMessage(from, fs.readFileSync(`doc.txt`), document, { contextInfo: {mentionedJid: mem }, quoted: mek, mimetype: 'text/plain' })
			    await fs.unlinkSync(`doc.txt`)
			    break
    case prefix+ 'contag':
            if (!mek.key.fromMe) return reply('SELF-BOT')
            pe = args.join('')
            entah = pe.split('|')[0]
            nah = pe.split('|')[1]
            if (isNaN(entah)) return reply('Numero de telefono invalido');
            members_ids = []
            for (let mem of groupMembers) {
            members_ids.push(mem.jid)
            }
            vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `FN:${nah}\n`
            + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
            + 'END:VCARD'.trim()
            FxBot.sendMessage(from, {displayName: `${nah}`, vcard: vcard}, contact, {contextInfo: {"mentionedJid": members_ids}})
            break
    case prefix+ 'totag':
            if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
            encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await FxBot.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await FxBot.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            FxBot.sendMessage(from, ini_buffer, MessageType.sticker, options)
            fs.unlinkSync(file)
            } else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await FxBot.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await FxBot.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            FxBot.sendMessage(from, ini_buffer, image, options)
            fs.unlinkSync(file)
        } else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
            encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await FxBot.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await FxBot.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
            	mimetype : 'audio/mp4',
            	ptt : true,
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            FxBot.sendMessage(from, ini_buffer, audio, options)
            fs.unlinkSync(file)
        }  else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
            encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await FxBot.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await FxBot.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
            	mimetype : 'video/mp4',
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            FxBot.sendMessage(from, ini_buffer, video, options)
            fs.unlinkSync(file)
        } else{
          reply(`Responde a un sticker/audio/video Con ${prefix}totag`)
        }
        break
//PARA EL GRUPO
case prefix+ 'closegc':
case 'closegp':
FxBot.updatePresence(from, Presence.composing)
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var nomor = mek.participant
const close = {
text: `Grupo Cerrado Por: @${nomor.split("@s.whatsapp.net")[0]}`,
contextInfo: {
mentionedJid: [nomor]
}
}
FxBot.groupSettingChange (from, GroupSettingChange.messageSend, true);
reply(close)
break
case prefix+ 'opengc':
case 'opengp':
FxBot.updatePresence(from, Presence.composing)
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var nomor = mek.participant
const open = {
text: `Grupo Abierto Por: @${nomor.split("@s.whatsapp.net")[0]}`,
contextInfo: {
mentionedJid: [nomor]
}
}
FxBot.groupSettingChange (from, GroupSettingChange.messageSend, false);
reply(open)
break
case prefix+ 'kick':
case prefix+ 'pafuera':
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(`「❗」ESTE COMANDO SOLO SE PUEDE USAR CUANDO EL BOT ES ADMIN`)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta al que quieres eliminar!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
					teks = ''
					for (let _ of mentioned) {
					teks += `Adioos...🏃 :\n`
					teks += `@_.split('@')[0]`
					}
					mentions(teks, mentioned, true)
					FxBot.groupRemove(from, mentioned)
					} else {
					mentions(`Adios Pedazo De Aborto Fallido 🥺👍🏿 @${mentioned[0].split('@')[0]} 🥵`, mentioned, true)
					FxBot.groupRemove(from, mentioned)
					}					
					break 
					case prefix+ 'promote':
                 case prefix+ 'dar':
                 case prefix+ 'pm':
					FxBot.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('¡La etiqueta de destino que desea promocionar!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Pedido recibido✅\n\nAgregando cargo como administrador :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						FxBot.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Pedido recibido✅\n\nAgregando cargo como administrador : @${mentioned[0].split('@')[0]}`, mentioned, true)
						FxBot.groupMakeAdmin(from, mentioned)
					}
					break
					case prefix+ 'linkgroup':
					if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(`「❗」ESTE COMANDO SOLO SE PUEDE USAR CUANDO EL BOT ES ADMIN`)
				    linkgc = await FxBot.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nLink Del Grupo *${groupName}*`
				    FxBot.sendMessage(from, yeh, text, {quoted: mek1})			       
					break
case prefix+ 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                     setTimeout( () => {
					FxBot.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					FxBot.updatePresence(from, Presence.composing) 
					FxBot.sendMessage(from, 'Adios jotos👋', text) // ur cods
					}, 0)
                     break
       case prefix+ 'ownergrup':
               FxBot.updatePresence(from, Presence.composing) 
              options = {
          text: `El Creador De Este Grupo Es :@${from.split("-")[0]}`, 
          contextInfo: { mentionedJid: [from] }
           }
           FxBot.sendMessage(from, options, text, { quoted: mek } )
				break



//TAGALL
case prefix+ 'tagall':
if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isGroup) return reply(mess.only.group)
					var nom = mek.participant
					members_id = []
					teks = '\n'
					for (let mem of groupMembers) {
						teks += `├╼ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(`*▢ Mensaje:* ${body.slice(8)}\n*▢ Grupo:*  ${groupName}\n*▢ Miembros:* ${groupMembers.length} \n*▢ Total De Admins:* ${groupAdmins.length}\n┌───⊷ *MENCIONES* ⊶`+teks+'└─────✪ FX ┃ ᴮᴼᵀ ✪───────* ', members_id, true)
					break
case prefix+ 'tagall2':
                case prefix+ 'marcar2':
				FxBot.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `༆ ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					FxBot.sendMessage(from, '𝙈𝙚𝙣𝙘𝙞𝙤𝙣 𝘿𝙚 𝙏𝙤𝙙𝙤𝙨'+teks+'✪ FX ┃ ᴮᴼᵀ ✪', text, {quoted: mek})
					break
                case prefix+ 'tagall3':
                case prefix+ 'marcar3':
				FxBot.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += ` https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					FxBot.sendMessage(from, '𝙼𝙴𝙽𝙲𝙸𝙾𝙽 𝙳𝙴 𝚃𝙾𝙳𝙾𝚂'+teks+'', text, {detectLinks: false, quoted: mek})
					break
                        case prefix+ 'tagall4':
                        case prefix+ 'marcar4':
				FxBot.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `༄ ${mem.jid.split('@')[0]}@c.us\n`
						members_id.push(mem.jid)
					}
					FxBot.sendMessage(from, '𝙈𝙚𝙣𝙘𝙞𝙤𝙣 𝘿𝙚 𝙏𝙤𝙙𝙤𝙨'+teks+'✔︎', text, {quoted: mek})
					break
                case prefix+ 'tagall5':
                case prefix+ 'marcar5':
				FxBot.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += ` ${mem.jid.split('@')[0]}@s.whatsapp.net\n`
						members_id.push(mem.jid)
					}
					reply('𝑴𝑬𝑵𝑪𝑰𝑶𝑵 𝑫𝑬 𝑻𝑶𝑫𝑶𝑺'+teks+'')
					break



//ACTIVACIÓN
case prefix+ 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Para activar está funcion coloca *welcome 1')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Ya esta activada!!!')
						welkom.push(from)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('「 ❗ 」La funcion de bienvenida esta habilitada en este grupo')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('「 ❗ 」La funcion de bienvenida esta deshabilitada en este grupo')
					} else {
						reply('Escribe el comando 1 para activarlo y 0 para desactivarlo Ejemplo: *welcome 1')
					}
					break
case prefix+ 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Digita 1 para activar los NSFW')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Recursos Activados ✅')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('「 ❗ 」  La funcion NSFW esta habilitado en este grupo')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('「 ❗ 」La funcion NSFW esta deshabilitado en este grupo')
					} else {
						reply('Digite 1 para activarlo, 0 para desactivarlo')
					}
					break	
					
//CONVERSIÓN
case prefix+ 'tovid':
    case prefix+ 'tovideo':
            if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
            ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            owgi = await FxBot.downloadAndSaveMediaMessage(ger)
            webp2mp4File(owgi).then(res=>{
            sendMediaURL(from,res.result,'Done')
            })
            }else {
            reply('Responder A Un Stiker')
            }
            fs.unlinkSync(owgi)
            break
    case prefix+ 'tomp3':
            if (!isQuotedVideo) return fakegroup('Responder a un video!')
            fakegroup(mess.wait)
            encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
            media = await FxBot.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.mp4')
            exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media)
            if (err) return fakegroup(`Err: ${err}`)
            buffer453 = fs.readFileSync(ran)
            FxBot.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
            fs.unlinkSync(ran)
            })
            break
    case prefix+ 'toimg':
			if (!isQuotedSticker) return reply('Responde A Un 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			media = await FxBot.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.png')
			exec(`ffmpeg -i ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return reply('Bueno, falló, inténtalo de nuevo ^_^')
			buffer = fs.readFileSync(ran)
			fakethumb(buffer,'ℱℯ𝓁𝒾𝓍𝒸𝓇𝒶𝒸𝓀 ℬ𝒪𝒯')
			fs.unlinkSync(ran)
			})
			break
case prefix+ 'tourl':
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
reply('En Proceso ⌛')
owgi = await FxBot.downloadAndSaveMediaMessage(ger)
anu = await imgbb("0c419be2e8bfc27eff00147b0c763418", owgi)
imurl = `${anu.display_url}`
reply(imurl)
}
break





//NSFW MENU
case prefix+ 'pussy':
if (!isNsfw) return reply(mess.nsfwoff)
      ranp = getRandom('.gif')
      rano = getRandom('.webp')
			anu = await axios.get('https://nekos.life/api/v2/img/pussy')
			exec(`wget ${anu.data.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
			  fs.unlinkSync(ranp)
				if (err) return reply('error')
				buffer = fs.readFileSync(rano)
				FxBot.sendMessage(from, buffer, MessageType.sticker, {quoted: mek})
				fs.unlinkSync(rano)
			})
			break
case prefix+ 'pussyimage':
if (!isNsfw) return reply(mess.nsfwoff)
  pusiimg = await axios.get('https://nekos.life/api/v2/img/pussy_jpg')
			bufpusy = await getBuffer(pusiimg.data.url)
				FxBot.sendMessage(from, bufpusy, MessageType.image, {quoted: mek})
			.catch(err => {
			return('Error 😔..')
			})
			break
case prefix+ 'solog':
      ranp = getRandom('.gif')
      rano = getRandom('.webp')
			anu = await axios.get('https://nekos.life/api/v2/img/solog')
			exec(`wget ${anu.data.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
			  fs.unlinkSync(ranp)
				if (err) return reply('error')
				buffer = fs.readFileSync(rano)
				FxBot.sendMessage(from, buffer, MessageType.sticker, {quoted: mek})
				fs.unlinkSync(rano)
			})
			break
case prefix+ 'yuri':
if (!isNsfw) return reply(mess.nsfwoff)
			yuriz = await axios.get('https://nekos.life/api/v2/img/tits')
			bupyuri = await getBuffer(yuriz.data.url)
			FxBot.sendMessage(from, bupyuri, image, { quoted: mek })
			.catch(err => {
			return('Error 😔..')
			})
			break
	case prefix+ 'anal':
	if (!isNsfw) return reply(mess.nsfwoff)
      ranp = getRandom('.gif')
      rano = getRandom('.webp')
			anu = await axios.get('https://nekos.life/api/v2/img/anal')
			exec(`wget ${anu.data.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
			  fs.unlinkSync(ranp)
				if (err) return reply('error')
				buffer = fs.readFileSync(rano)
				FxBot.sendMessage(from, buffer, MessageType.sticker, {quoted: mek})
				fs.unlinkSync(rano)
			})
			break		
case prefix+ 'pwankg':
if (!isNsfw) return reply(mess.nsfwoff)
      ranp = getRandom('.gif')
      rano = getRandom('.webp')
			anu = await axios.get('https://nekos.life/api/v2/img/pwankg')
			exec(`wget ${anu.data.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
			  fs.unlinkSync(ranp)
				if (err) return reply('error')
				buffer = fs.readFileSync(rano)
				FxBot.sendMessage(from, buffer, MessageType.sticker, {quoted: mek})
				fs.unlinkSync(rano)
			})
			break
case prefix+ 'eron':
if (!isNsfw) return reply(mess.nsfwoff)
			eronz = await axios.get('https://nekos.life/api/v2/img/eron')
			buferon = await getBuffer(eronz.data.url)
			FxBot.sendMessage(from, buferon, image, { quoted: mek })
			.catch(err => {
			return('Error 😔..')
			})
			break

case prefix+ 'ero':
if (!isNsfw) return reply(mess.nsfwoff)
			eroz = await axios.get('https://nekos.life/api/v2/img/ero')
			bufero = await getBuffer(eroz.data.url)
			FxBot.sendMessage(from, bufero, image, { quoted: mek })
			.catch(err => {
			return('El anuncio que cometió el error vuelve a intentarlo..')
			})
			break
case prefix+ 'erok':
if (!isNsfw) return reply(mess.nsfwoff)
			eroz = await axios.get('https://nekos.life/api/v2/img/erok')
			bufero = await getBuffer(eroz.data.url)
			FxBot.sendMessage(from, bufero, image, { quoted: mek })
			.catch(err => {
			return('El anuncio que cometió el error vuelve a intentarlo..')
			})
			break

	case prefix+ 'hentai':
	if (!isNsfw) return reply(mess.nsfwoff)
			hentaiz = await axios.get('https://nekos.life/api/v2/img/hentai')
			bufhtz = await getBuffer(hentaiz.data.url)
			FxBot.sendMessage(from, bufhtz, image, {quoted: mek})
			.catch(err => {
			return('Error 😔..')
			})
			break
	
	
	
	
	
    
//CREACIÓN DE STICKERS
case prefix+ 'sticker': 
case prefix+ 'stickergif': 
    case prefix+ 'stiker':
    case prefix+ 'sg':
    case prefix+ 's':
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            F = body.slice(6)				  
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await FxBot.downloadAndSaveMediaMessage(encmedia)
                ran = '666.webp'
                await ffmpeg(`./${media}`)
                .input(media)
                .on('start', function (cmd) {
                     console.log(`Started : ${cmd}`)
                })
                .on('error', function (err) {
                 console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                reply('error')
                })
                .on('end', function () {
                console.log('Finish')
                FxBot.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, {quoted: mek})
                 fs.unlinkSync(media)
                fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
                } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const media = await FxBot.downloadAndSaveMediaMessage(encmedia)
            ran = '999.webp'
            reply(mess.wait)
            await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
            console.log(`Error : ${err}`)
            fs.unlinkSync(media)
            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
            reply(`Falló, al convertiri ${tipe} a stiker`)
            })
            .on('end', function () {
            console.log('Finish')
            FxBot.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, {quoted: mek})
            fs.unlinkSync(media)
            fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
            } else {
                reply(`Envía una imagen con una leyenda ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
            }
            break

case prefix+ 'attp':
						if (args.length < 1) return reply(`Y El Texto??\n> *Ejemplo* : *${prefix}attp* Felixcrack`)
						 var itsme = `0@s.whatsapp.net`
			   	 var split = `Texto De Colores UwU`
		     	   var selepbot =         {
					contextInfo:   { participant: itsme, quotedMessage: { extendedTextMessage: { text: split,	}}}}
attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
FxBot.sendMessage(from, attp2, MessageType.sticker, selepbot, {quoted: mek })
						break

//BAN Y UNBAN
case prefix+ 'ban':
if (!isGroup) return reply(mess.only.group)
if (!mek.key.fromMe) return fakestatus('「 ❗ 」ESTE COMANDO SOLO PUEDE SER USADO POR MI')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `🚫@${mentioned[0].split('@')[0]} ha sido prohibido y ya no podrá usar comandos de bot🚫`
mentions(`${susp}`, mentioned, true)   
break


case prefix+ 'unban':
if (!isGroup) return reply(mess.only.group)
if (!mek.key.fromMe) return fakestatus('「 ❗ 」ESTE COMANDO SOLO PUEDE SER USADO POR MI')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = `❎@${mentioned[0].split('@')[0]} se ha desbloqueado y puede volver a utilizar los comandos del bot❎`
mentions(`${susp}`, mentioned, true)   
break
       
       
       
       //OWNER BOT
            case prefix+ 'leertodo':
            if (!mek.key.fromMe) return fakestatus('「 ❗ 」ESTE COMANDO SOLO PUEDE SER USADO POR MI')
            var chats = await FxBot.chats.all()
            chats.map( async ({ jid }) => {
            await FxBot.chatRead(jid)
            })
		    var teks = `\`\`\`Fueron Leídos ${chats.length} Chats !\`\`\``
	        await FxBot.sendMessage(from, teks, text, {quoted: mek})
		    console.log('Fueron Leídos: ${chats.length} chats')
            break
            case prefix+ 'speed':
            case prefix+ 'velocidad':
	        case prefix+ 'ping':
			const timestamp = speed();
			const latensi = speed() - timestamp
			exec(`neofetch --stdout`, (error, stdout, stderr) => {
			const child = stdout.toString('utf-8')
			const teks = child.replace(/Memory:/, "Ram:")
			const pingnya = `*${teks}Velocidad: ${latensi.toFixed(4)} Milisegundos*`
			fakegroup(pingnya)
			})
			break  
            case prefix+ 'status':
            fakestatus(`*STATUS*\n${banChats ? '> SELF-MODE' : '> PUBLIC-MODE'}`)
            break
	        case prefix+ 'self':
        	if (!mek.key.fromMe) return fakestatus('「 ❗ 」ESTE COMANDO SOLO PUEDE SER USADO POR MI')
        	if (banChats === true) return
       	uptime = process.uptime()
         	 // var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
       	banChats = true
       	fakestatus(`「 *SELF-MODE* 」`)
       	break
           case prefix+ 'public':
       	if (!mek.key.fromMe) return fakestatus('「 ❗ 」ESTE COMANDO SOLO PUEDE SER USADO POR MI')
       	if (banChats === false) return
       	// var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
       	banChats = false
      	fakestatus(`「 *PUBLIC-MODE* 」`)
      	break

//DESCARGAS BY FELIXCRACK
case prefix+ 'ytmp3':
if (args.length === 0) return reply(`Ejemplo: *${prefix}video* _El link del video para descargar`)
       let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
    if (!isLinks) return reply(mess.error.Iv)
     try {
          reply(mess.musica)
      yta(args[0])
   .then((res) => {
const { dl_link, thumb, title, filesizeF, filesize } = res
axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then((a) => {
if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*DESCARGADOR DE AUDIO BY FELIXCRACK*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP3\n*⚖️Tamaño*:${filesizeF}\n*Link* : ${a.data}\n\n_Para la duración de más del límite se presenta en forma de enlace_`)
const captions = `*DESCARGADOR DE AUDIO BY FELIXCRACK*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP3\n*⚖️Tamaño*:${filesizeF}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`
sendMediaURL(from, thumb, captions)
sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
})
})
} catch (err) {
reply(mess.error.api)
}
break
case prefix+ 'ytmp4':
if (args.length === 0) return reply(`Enviar  comando *${prefix}ytmp4 [linkYt]*`)
let isLinks2 = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
if (!isLinks2) return reply(mess.error.Iv)
try {
reply(mess.mpv)
				ytv(args[0])
				.then((res) => {
				const { dl_link, thumb, title, filesizeF, filesize } = res
				axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
				.then((a) => {
				if (Number(filesize) >= 40000) return sendMediaURL(from, thumb, `*DESCARGADOR DE VIDEO BY FELIXCRACK*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP3\n*File⚖️Tamaño*:${filesizeF}\n*Link* : ${a.data}\n\n_Para la duración de más del límite se presenta en forma de enlace_`)
						const captionsYtmp4 = `*Video Encontrado!*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP4\n*⚖️Tamaño*:${filesizeF}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`
				sendMediaURL(from, thumb, captionsYtmp4)
				sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
				})		
				})
				} catch (err) {
			    reply(mess.error.api)
				}
				break
	case prefix+ 'ytsearch':
			if (args.length < 1) return reply('Que quieres buscar pedazo de gil?')
			var srch = args.join('');
			try {
        	var aramas = await yts(srch);
   			} catch {
        	return await FxBot.sendMessage(from, 'Error!', MessageType.text, dload)
    		}
    		aramat = aramas.all 
    		var tbuff = await getBuffer(aramat[0].image)
    		var ytresult = '';
    		ytresult += '「 *YOUTUBE SEARCH* 」'
		    		ytresult += '\n________________________\n\n'
		   			aramas.all.map((video) => {
		        	ytresult += '❏ Título: ' + video.title + '\n'
		            ytresult += '❏ Link: ' + video.url + '\n'
		            ytresult += '❏ Duración: ' + video.timestamp + '\n'
		            ytresult += '❏ Subida: ' + video.ago + '\n________________________\n\n'
		    		});
		    		ytresult += '◩ *SELF-BOT*'
    		await fakethumb(tbuff,ytresult)
			break
case prefix+ 'play':
			if (args.length === 0) return reply(`Ejemplo: *${prefix}play* _El título de la musica para buscar_`)
			reply(mess.musica)
            var srch = args.join('')
    		aramas = await yts(srch);
    		aramat = aramas.all 
   			var mulaikah = aramat[0].url							
                  try {
                    yta(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*DESCARGADOR DE MUSICA BY FELIXCRACK*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*: MP3\n*⚖️Tamaño*: ${filesizeF}\n*📎Link* : ${a.data}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`)
		                        const captions = `*DESCARGADOR DE MUSICA BY FELIXCRACK*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*: MP3\n*⚖️Tamaño*: ${filesizeF}\n*📎Link*: ${a.data}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break  
                   case prefix+ 'video':
            if (args.length === 0) return reply(`Ejemplo: *${prefix}video* _El título del video para buscar_`)
            var srch = args.join('')
            aramas = await yts(srch);
            aramat = aramas.all 
            var mulaikah = aramat[0].url                            
                  try {
                    ytv(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY VIDEO*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP3\n*File⚖️Tamaño*:${filesizeF}\n*Link* : ${a.data}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`)
		                        const captions = `*PLAY VIDEO*\n\n*🤓Titulo*: ${title}\n*⏭️Extensión*:MP4\n*⚖️Tamaño*:${filesizeF}\n*Link* : ${a.data}\n\n_ESPERE ENVIANDO ARCHIVO, NO SPAMES LA CONCHA DE TU MADRE_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break
         //------FUNCIONES PARA EL USUÁRIO-------
                   case prefix+ 'wame':
                   FxBot.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *LINK WHATSAPP* 」\n\n_Solicitado por_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nSu link de Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*O ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    FxBot.sendMessage(from, options, text, { quoted: mek } )
				break
case prefix+ 'creador':
await FxBot.sendMessage(from, {displayname: "Félix🧙‍♂️", vcard: vcard}, MessageType.contact)
break
				
     default:
		if (isGroup && !isCmd && budy != undefined) {
						console.log(budy)
					} else {
						console.log(color('[ BOT ]','blue'), 'Comando No Registrado De', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	}
starts() 
	//ACABO 😊
