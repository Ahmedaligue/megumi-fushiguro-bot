import yts from 'yt-search'
import { spawn } from 'child_process'
import fs from 'fs'
import fetch from 'node-fetch'

const yt = {
  static: Object.freeze({
    baseUrl: 'https://cnv.cx',
    headers: {
      'accept-encoding': 'gzip, deflate, br, zstd',
      origin: 'https://frame.y2meta-uk.com',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
    }
  }),
  resolveConverterPayload(link, f = '128k') {
    const formatos = ['128k', '320k', '144p', '240p', '360p', '720p', '1080p']
    if (!formatos.includes(f)) throw Error('Formato inválido')
    const tipo = f.endsWith('k') ? 'mp3' : 'mp4'
    return {
      link,
      format: tipo,
      audioBitrate: tipo === 'mp3' ? f.replace('k', '') : '128',
      videoQuality: tipo === 'mp4' ? f.replace('p', '') : '720',
      filenameStyle: 'pretty',
      vCodec: 'h264'
    }
  },
  sanitizeFileName(n) {
    const ext = n.match(/\.[^.]+$/)[0]
    const name = n
      .replace(ext, '')
      .replace(/[^A-Za-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase()
    return name + ext
  },
  async getBuffer(u) {
    const r = await fetch(u)
    const ab = await r.arrayBuffer()
    return Buffer.from(ab)
  },
  async getKey() {
    const r = await fetch(this.static.baseUrl + '/v2/sanity/key', {
      headers: this.static.headers
    })
    return r.json()
  },
  async convert(u, f) {
    const { key } = await this.getKey()
    const p = this.resolveConverterPayload(u, f)
    const r = await fetch(this.static.baseUrl + '/v2/converter', {
      method: 'POST',
      headers: { key, ...this.static.headers },
      body: new URLSearchParams(p)
    })
    return r.json()
  },
  async download(u, f) {
    const { url, filename } = await this.convert(u, f)
    const buffer = await this.getBuffer(url)
    return { buffer, fileName: this.sanitizeFileName(filename) }
  }
}

let handler = async (m, { conn, args }) => {
  if (!args.length) {
    return m.reply('🎵 *استخدم:* .play اسم الأغنية')
  }

  try {
    await m.react('🔎')

    const query = args.join(' ')
    const search = await yts(query)

    if (!search.videos.length) {
      return m.reply('❌ لم يتم العثور على نتائج')
    }

    const video = search.videos[0]

    await conn.sendMessage(
      m.chat,
      {
        image: { url: video.thumbnail },
        caption: `*°${video.title}*
القناة : ${video.author.name}
المدة : ${video.timestamp}
المشاهدات : ${video.views.toLocaleString()}

> جاري تجهيز التحميل...`
      },
      { quoted: m }
    )

    await m.react('🕓')

    const { buffer, fileName } = await yt.download(video.url, '128k')

    await conn.sendMessage(
      m.chat,
      {
        audio: buffer,
        mimetype: 'audio/mpeg',
        fileName
      },
      { quoted: m }
    )

    await m.react('✅')

  } catch (e) {
    console.error(e)
    return m.reply('❌ لم يتم العثور على نتائج')
  }
}

handler.help = ['play <texto>']
handler.tags = ['music']
handler.command = ['play', 'شغل']

export default handler
