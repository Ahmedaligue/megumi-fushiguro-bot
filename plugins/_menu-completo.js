let handler = async (m, { conn, usedPrefix }) => {

  const who = m.sender
  const taguser = `@${who.split('@')[0]}`
  const botname = 'Nagi Bot'

  const file = 'https://raw.githubusercontent.com/El-brayan502/img/upload/uploads/ca4a01-1770600773657.jpg'

  const productMessage = {
    product: {
      productImage: { url: file },
      productId: '24529689176623820',
      title: global.botname,
      description: '',
      currencyCode: 'USD',
      priceAmount1000: '0',
      retailerId: 1677,
      url: 'https://wa.me/0',
      productImageCount: 1
    },

    businessOwnerJid: who || '0@s.whatsapp.net',

    caption: `
👤 المستخدم: ${taguser}

*+ قائمة التحميل*
> ${usedPrefix}play (اسم الأغنية)
> ${usedPrefix}ig (رابط)
> ${usedPrefix}instagram (رابط)
> ${usedPrefix}fb (رابط)
> ${usedPrefix}facebook (رابط)
> ${usedPrefix}soundcloud (نص)

*+ قائمة المطوّر*
> ${usedPrefix}update 
> ${usedPrefix}cleartmp 
> ${usedPrefix}detectar

*+ قائمة الإنشاء*
> ${usedPrefix}s
> ${usedPrefix}sticker

*+ قائمة المجموعة*
> ${usedPrefix}kick (@منشن)
> ${usedPrefix}link
`.trim(),

    title: '',
    subtitle: '',
    footer: `© أحمد · القائمة`,

    interactiveButtons: [
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'channel',
          url: 'https://whatsapp.com/channel/0029Vb6YJqq0lwgzYNWVN21u'
        })
      }
    ],

    mentions: [who]
  }

  await conn.sendMessage(m.chat, productMessage)
}

handler.command = ['menu', 'allmenu', 'help']
export default handler
