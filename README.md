# Innovatory Consulting website

Plain static site: HTML, one CSS file, one small JS file. No build step, no dependencies.

```
index.html            Home
services/index.html   Services (each service has an anchor, e.g. /services/#ai)
work/index.html       AI projects and the Salty Yak Apps portfolio
about/index.html      About and mission
contact/index.html    Contact form
404.html              Not-found page
assets/               CSS, JS, images
_redirects, _headers  Old WordPress URLs and security headers (Cloudflare Pages and Netlify both read these)
```

Each page repeats the header and footer, so a nav or footer change must be made in every `*.html` file.

## Preview locally

```sh
python3 -m http.server 8080
```

## Deploy (free)

**Cloudflare Pages:** Workers & Pages → Create → Pages → connect the Git repo. Framework preset: None. Build command: empty. Output directory: `/`.

**Netlify:** Add new site → Import from Git. Build command: empty. Publish directory: `.`.

## Domain (stays at Namecheap)

In the host's dashboard add the custom domains `innovatory.consulting` and `www.innovatory.consulting`, then in Namecheap → Domain List → Manage → Advanced DNS:

- Cloudflare Pages without moving DNS: `CNAME www → <project>.pages.dev`. The bare domain needs DNS on Cloudflare (change nameservers to Cloudflare's, free) or a Namecheap URL redirect from `@` to `https://www.innovatory.consulting`.
- Netlify: `A @ → 75.2.60.5` and `CNAME www → <site>.netlify.app`.

HTTPS certificates are issued automatically. Remove the old WordPress host's records first.

## Contact form

The form posts to [Formspree](https://formspree.io) (free tier: 50 submissions/month), which emails each message. Create a form there, then replace `YOUR_FORM_ID` in `contact/index.html` with its ID. Until then the form shows a message pointing visitors to the email address. Spam protection: honeypot field `_gotcha`; enable reCAPTCHA in Formspree if needed.

On Netlify you can use Netlify Forms instead: remove the `action` attribute, add `data-netlify="true" name="contact"` and a hidden `form-name` input, and change the `fetch` in `assets/js/site.js` to post URL-encoded data to `/`.

## Testimonials

A hidden testimonials section is commented out near the end of `index.html`. Add real, approved quotes and remove the comment markers to show it.
