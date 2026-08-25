# habintel.com — complete site + whitepaper-funnel

Eén project, klaar voor Vercel. Bevat: de nieuwe site (/), de whitepaper-vangpagina (/whitepaper), de lead-function (/api/whitepaper-lead), de drie PDF's en de zetje-animatie (/zetje.html, intern gebruik).

## Structuur

```
index.html                                    → de site
whitepaper/index.html                         → vangpagina (habintel.com/whitepaper)
api/whitepaper-lead.js                        → serverless: lead-notificatie + mail 1 (NL/EN)
whitepaper-de-inname-is-het-contactmoment.pdf → NL whitepaper
whitepaper-the-intake-is-the-touchpoint.pdf   → EN whitepaper
habintel_pilotvoorstel_90dagen.pdf            → bijlage mail 2 / tafeldocument
zetje.html                                    → animatie (openingsslide, niet gelinkt vanaf de site)
```

## Deploy in vijf stappen (10 min, jouw bekende recept)

1. **GitHub:** nieuwe repo aanmaken (bijv. `Nees644/habintel-site`, private mag). Deze bestanden erin: via "Add file → Upload files" in de webinterface kan de hele inhoud in één sleep.
2. **Vercel:** New Project → Import de repo → Framework preset "Other" → Deploy. Geen build-instellingen nodig.
3. **Environment variable:** in Vercel project settings `RESEND_API_KEY` toevoegen (zelfde sleutel(beheer) als scan.happly.nl). Daarna redeploy.
4. **Resend:** check dat habintel.com als afzenderdomein geverifieerd is; zo niet, domein toevoegen en de DNS-records zetten.
5. **Test:** open de preview-URL, ga naar /whitepaper, vul het formulier in met je eigen adres (test NL én EN). Check: notificatie op start@habintel.com, downloadmail in je inbox, beide PDF-links werken.

## Domein (pas na geslaagde test)

habintel.com in Vercel aan het project koppelen en de DNS omzetten bij je registrar. Tip: doe dit pas nadat de preview-URL volledig getest is; tot die tijd draait de huidige site gewoon door en is er niets kapot te maken.

## Wat er bewust NIET in zit

Geen framework, geen build, geen dependencies. Alles is statisch plus één serverless function, dus er kan weinig stuk en alles is in de GitHub-webinterface te bewerken.
