import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("GPX Proxy attivo!");
});

app.get("/mappa", async (req, res) => {
  const url = 'https://gpx.studio/embed?options=%7B%22token%22%3A%22pk.eyJ1IjoiZGlzY292ZXJ5Z3ViYmlvIiwiYSI6ImNtZWd3dHgwcjAxbGgyanNiajgyanRicjkifQ.O2EgyFT1unjHzLAkzMVrQw%22%2C%22files%22%3A%5B%22https%3A%2F%2Fcdn.discoverygubbio.com%2Fpublic%2Fgpx%2Ffrancescano.gpx%22%5D%2C%22elevation%22%3A%7B%22show%22%3Afalse%2C%22controls%22%3Afalse%7D%2C%22directionMarkers%22%3Atrue%7D';
  
  const response = await fetch(url);
  if (!response.ok) {
    res.status(500).send("Errore nel caricamento della mappa");
    return;
  }

  let html = await response.text();

  // Rimuove il pulsante "Open in GPX Studio"
  html = html.replace(/<a[^>]+href="\/app\?files=[^"]+"[^>]*>.*?<\/a>/is, "");

  // Risolve eventuali risorse relative (logo ecc.)
  html = html.replace(/src="\/([^"]+)"/g, 'src="https://gpx.studio/$1"');
  html = html.replace(/href="\/([^"]+)"/g, 'href="https://gpx.studio/$1"');

  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server avviato su http://localhost:${port}`));
