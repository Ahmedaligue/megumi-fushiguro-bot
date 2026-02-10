import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  try {
    await m.react('🕒')

    const cmd = 'git pull' + (m.fromMe && text ? ' ' + text : '')
    const out = execSync(cmd, { encoding: 'utf-8' })

    await conn.reply(
      m.chat,
      `🛠️ *تحديث البوت*\n\n${out.trim() || '✅ تم التحديث بنجاح'}`,
      m,
      rcanal
    )

    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    await conn.reply(
      m.chat,
      `⚠️ *خطأ أثناء التحديثr*\n\n${e.message}`,
      m,
      rcanal
    )
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed']
handler.rowner = false

export default handler
