import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import moment from 'moment-timezone'

global.botNumber = '' 
global.owner = [
  ['212625457341', 'ahmed aligue', true],
  ['⁦212724459421','Daru_sama',true]
]
global.mods = []
global.prems = []
global.suittag = ['212625457341']

global.botname = 'senku tst'
global.author = 'ahmed aligue'
global.sticker = 'sticker created by senku'

global.sessions = 'Sessions'
global.jadi = 'JadiBots'
global.moneda = 'dolar'
global.multiplier = 60
global.prefix = /^[./!#?]/

global.channel = 'https://whatsapp.com/channel/0029Vb6YJqq0lwgzYNWVN21u'
global.md = 'https://www.instagram.com/aa18.aligue'
global.ch = { id: '120363405848897016@newsletter' }

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.cyanBright(`✨ [CONFIG] Se han actualizado los ajustes del bot`))
  import(`${file}?update=${Date.now()}`)
})
