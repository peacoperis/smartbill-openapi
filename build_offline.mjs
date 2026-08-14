#!/usr/bin/env node
// Generează varianta OFFLINE (self-contained) a aplicației de schiță:
// descarcă librăriile din CDN și le înglobează direct în HTML.
// Utilizare:  node build_offline.mjs
// Rezultat:   schita_acoperis_v1_offline.html  (~5 MB, merge fără internet)
import { readFileSync, writeFileSync } from 'fs';

const SRC = new URL('./schita_acoperis_v1.html', import.meta.url);
const OUT = new URL('./schita_acoperis_v1_offline.html', import.meta.url);

let html = readFileSync(SRC, 'utf8');
const tags = [...html.matchAll(/<script[^>]*src="(https:\/\/[^"]+)"[^>]*><\/script>/g)];
if (!tags.length) { console.error('Niciun tag CDN găsit în sursă.'); process.exit(1); }

for (const [tag, url] of tags) {
    process.stdout.write('descarc ' + url + ' … ');
    const res = await fetch(url);
    if (!res.ok) { console.error('EȘEC HTTP ' + res.status); process.exit(1); }
    let js = await res.text();
    if (js.includes('</script')) js = js.replaceAll('</script', '<\\/script');
    html = html.replace(tag, () => '<script>\n' + js + '\n</script>');
    console.log(Math.round(js.length / 1024) + ' KB');
}
writeFileSync(OUT, html);
console.log('scris', OUT.pathname, Math.round(html.length / 1024) + ' KB');
