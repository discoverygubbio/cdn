# 🚀 cdn discoverygubbio cf worker

un semplice cloudflare worker che usa supabase storage come backend cdn, con supporto completo per lo streaming video (byte-range requests) e cache aggressiva sull'edge di cloudflare.

---

## ✨ features

- ⚡ streaming video con supporto `range` requests (zero stuttering)
- 🌍 cache globale sull'edge cloudflare (`cf.cacheEverything`)
- 🔁 passthrough trasparente degli header
- 🔒 bucket supabase pubblico, nessuna chiave api esposta
- 🪶 ~15 righe di codice

---

## 📋 requisiti

- account [cloudflare](https://cloudflare.com) (gratuito)
- progetto [supabase](https://supabase.com) con storage bucket **pubblico**
- dominio su cloudflare (anche gratuito)

---

## 🛠️ setup

### 1. crea il worker

vai su **cloudflare dashboard → workers & pages → create worker**, incolla il codice e fai deploy.

### 2. codice `worker.js`

```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = `https://<PROJECT_ID>.supabase.co/storage/v1/object/public/<BUCKET>${url.pathname}`;

    const response = await fetch(target, {
      headers: request.headers, // passa Range, ecc.
      cf: {
        cacheEverything: true,
        cacheTtl: 31536000,
      },
    });

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000");
    headers.set("Accept-Ranges", "bytes");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
```

sostituisci:
- `<PROJECT_ID>` → il tuo project id supabase
- `<BUCKET>` → il nome del tuo bucket (es. `cdn`)

### 3. aggiungi il dominio custom

in **cloudflare → workers → settings → triggers → custom domains**, aggiungi il tuo sottodominio, es:

```
assets.tuodominio.com
```

cloudflare gestisce automaticamente il certificato ssl. ✅

---

## 📦 utilizzo

dopo il deploy, i tuoi file sono accessibili così:

```
# prima (url supabase)
https://<PROJECT_ID>.supabase.co/storage/v1/object/public/cdn/video.mp4

# dopo (dominio custom + cdn)
https://assets.tuodominio.com/video.mp4
```

---

## ⚠️ limitazioni

| cosa | limite |
|---|---|
| cloudflare workers (free) | 100.000 richieste/giorno |
| supabase storage (free) | 1 gb totale |
| video streaming | funziona, ma supabase non è ottimizzato per video pesanti |

> 💡 per video di grandi dimensioni o traffico alto, considera [bunny.net](https://bunny.net) o [cloudflare stream](https://www.cloudflare.com/products/cloudflare-stream/).

---

## 📄 licenza

gpl. vedi [LICENSE](LICENSE.md)
