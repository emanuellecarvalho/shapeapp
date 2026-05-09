// download-gifs.js
// Roda na raiz do repo: node download-gifs.js
// Baixa todos os GIFs de exercício para public/exercises/

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = path.join(__dirname, 'public', 'exercises')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log('📁 Pasta public/exercises/ criada')
}

// URLs verificadas — páginas de cada exercício no fitnessprogramer
// O script acessa cada página, extrai a URL real do GIF via og:image, e baixa
const EXERCISES = [
  { file: 'leg-curl.gif',             page: 'https://fitnessprogramer.com/exercise/leg-curl/' },
  { file: 'glute-kickback.gif',       page: 'https://fitnessprogramer.com/exercise/cable-hip-extension/' },
  { file: 'abducao-cabo.gif',         page: 'https://fitnessprogramer.com/exercise/cable-hip-abduction/' },
  { file: 'panturrilha-maquina.gif',  page: 'https://fitnessprogramer.com/exercise/seated-calf-press-on-leg-press-machine/' },
  { file: 'leg-press.gif',            page: 'https://fitnessprogramer.com/exercise/leg-press/' },
  { file: 'hack-squat.gif',           page: 'https://fitnessprogramer.com/exercise/hack-squats-machine/' },
  { file: 'leg-extension.gif',        page: 'https://fitnessprogramer.com/exercise/leg-extension/' },
  { file: 'adutora.gif',              page: 'https://fitnessprogramer.com/exercise/hip-adduction-machine/' },
  { file: 'afundo-reverso.gif',       page: 'https://fitnessprogramer.com/exercise/dumbbell-reverse-lunge/' },
  { file: 'puxada-frontal.gif',       page: 'https://fitnessprogramer.com/exercise/lat-pulldown/' },
  { file: 'remada-sentada.gif',       page: 'https://fitnessprogramer.com/exercise/seated-cable-row/' },
  { file: 'remada-unilateral.gif',    page: 'https://fitnessprogramer.com/exercise/dumbbell-row/' },
  { file: 'face-pull.gif',            page: 'https://fitnessprogramer.com/exercise/face-pull/' },
  { file: 'rosca-direta.gif',         page: 'https://fitnessprogramer.com/exercise/dumbbell-curl/' },
  { file: 'rosca-martelo.gif',        page: 'https://fitnessprogramer.com/exercise/hammer-curl/' },
  { file: 'desenvolvimento-ombro.gif',page: 'https://fitnessprogramer.com/exercise/dumbbell-shoulder-press/' },
  { file: 'elevacao-lateral.gif',     page: 'https://fitnessprogramer.com/exercise/dumbbell-lateral-raise/' },
  { file: 'elevacao-frontal.gif',     page: 'https://fitnessprogramer.com/exercise/dumbbell-seated-alternate-front-raise/' },
  { file: 'triceps-polia.gif',        page: 'https://fitnessprogramer.com/exercise/rope-pushdown/' },
  { file: 'triceps-testa.gif',        page: 'https://fitnessprogramer.com/exercise/alternating-lying-dumbbell-triceps-extension/' },
  { file: 'dead-bug.gif',             page: 'https://fitnessprogramer.com/exercise/dead-bug/' },
]

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,*/*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'Referer': 'https://fitnessprogramer.com/',
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(get(res.headers.location))
      }
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Referer': 'https://fitnessprogramer.com/',
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(downloadFile(res.headers.location, dest))
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', reject)
  })
}

function extractGifUrl(html) {
  // Tenta og:image:secure_url primeiro, depois og:image
  const patterns = [
    /property="og:image:secure_url"\s+content="([^"]+\.gif)"/,
    /content="([^"]+\.gif)"\s+property="og:image:secure_url"/,
    /property="og:image"\s+content="([^"]+\.gif)"/,
    /content="([^"]+\.gif)"\s+property="og:image"/,
    /og:image[^>]+content="([^"]+\.gif)"/,
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m) return m[1]
  }
  return null
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  console.log(`\n🏋️  Baixando ${EXERCISES.length} GIFs de exercício...\n`)
  
  const ok = []
  const fail = []

  for (const ex of EXERCISES) {
    const dest = path.join(OUTPUT_DIR, ex.file)
    
    // Pula se já existe
    if (fs.existsSync(dest)) {
      console.log(`⏭  ${ex.file} já existe, pulando`)
      ok.push(ex.file)
      continue
    }

    try {
      // 1. Busca a página do exercício
      const html = await get(ex.page)
      
      // 2. Extrai URL do GIF
      const gifUrl = extractGifUrl(html)
      if (!gifUrl) {
        console.log(`✗  ${ex.file} — GIF não encontrado na página`)
        fail.push({ file: ex.file, reason: 'GIF URL não encontrada' })
        continue
      }

      // 3. Baixa o GIF
      await downloadFile(gifUrl, dest)
      const size = (fs.statSync(dest).size / 1024).toFixed(0)
      console.log(`✓  ${ex.file} (${size}kb) — ${gifUrl}`)
      ok.push(ex.file)

    } catch (err) {
      console.log(`✗  ${ex.file} — ${err.message}`)
      fail.push({ file: ex.file, reason: err.message })
      // Remove arquivo parcial se existir
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
    }

    await sleep(400) // respeita o rate limit do servidor
  }

  console.log(`\n✅ ${ok.length} baixados com sucesso`)
  
  if (fail.length > 0) {
    console.log(`\n⚠️  ${fail.length} falharam:`)
    fail.forEach(f => console.log(`   ${f.file}: ${f.reason}`))
    console.log('\nPara os que falharam, baixe manualmente:')
    console.log('1. Abre a página do exercício no browser')
    console.log('2. Clica no GIF com botão direito → Salvar imagem')
    console.log('3. Salva em public/exercises/ com o nome indicado')
    
    // Gera lista de páginas para download manual
    const manualList = fail.map(f => {
      const ex = EXERCISES.find(e => e.file === f.file)
      return `${f.file}: ${ex.page}`
    })
    fs.writeFileSync('gifs-manual.txt', manualList.join('\n'))
    console.log('\n📄 Lista salva em gifs-manual.txt')
  }

  console.log('\n🚀 Pronto! Sobe o repo e o Netlify vai deployar com as imagens.\n')
}

main().catch(console.error)