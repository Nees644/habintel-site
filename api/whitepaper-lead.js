// /api/whitepaper-lead.js — Vercel serverless function
// Vereist env var RESEND_API_KEY (zelfde als bij scan.happly.nl-stack).
// Doet twee dingen: (1) lead-notificatie naar start@habintel.com,
// (2) downloadmail naar de aanvrager (mail 1 van de opvolgreeks).

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const { name, company, email, lang } = req.body || {};
  const en = lang === 'en';
  if (!name || !company || !email || !email.includes('@')) {
    return res.status(400).json({ ok: false });
  }

  const BASE = 'https://habintel.com';
  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  try {
    // 1. Lead-notificatie naar Maarten
    await send({
      from: 'Habintel <noreply@habintel.com>',
      to: ['start@habintel.com'],
      subject: `Whitepaper-lead (${en ? 'EN' : 'NL'}): ${company} (${name})`,
      text: `Naam: ${name}\nBedrijf: ${company}\nE-mail: ${email}\n\nActie: toevoegen aan doelklantenlijst, status "whitepaper gedownload". Mail 2 (pilotvoorstel) op dag 5.`,
    });

    // 2. Downloadmail naar aanvrager = mail 1 van de reeks
    await send({
      from: 'Maarten van Habintel <maarten@habintel.com>',
      to: [email],
      reply_to: 'start@habintel.com',
      subject: en ? 'Your copy: The Intake Is the Touchpoint' : 'Jouw exemplaar: De inname is het contactmoment',
      text: en
        ? `Hi ${name.split(' ')[0]},

Thanks for your interest. Here is the whitepaper:

English: ${BASE}/whitepaper-the-intake-is-the-touchpoint.pdf
Dutch: ${BASE}/whitepaper-de-inname-is-het-contactmoment.pdf

One question, out of genuine curiosity: which of the six design principles hits hardest at ${company}? Just reply to this email, I read every answer.

Small nudge. Big shift.

Maarten
Habintel · behavior intelligence inside
habintel.com`
        : `Ha ${name.split(' ')[0]},

Dank voor je interesse. Hier is de whitepaper:

Nederlands: ${BASE}/whitepaper-de-inname-is-het-contactmoment.pdf
English: ${BASE}/whitepaper-the-intake-is-the-touchpoint.pdf

Eén vraag, uit oprechte nieuwsgierigheid: welk van de zes ontwerpprincipes raakt bij ${company} het hardst? Ik lees je antwoord graag, gewoon door te reageren op deze mail.

Klein zetje. Grote beweging.

Maarten
Habintel · behavior intelligence inside
habintel.com`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false }); // stil falen; download op de pagina blijft werken
  }
}
