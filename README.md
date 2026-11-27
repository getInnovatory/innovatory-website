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
_redirects, _headers  Old WordPress URLs and security headers (read by Netlify)
```

Each page repeats the header and footer, so a nav or footer change must be made in every `*.html` file.

## Preview locally

```sh
python3 -m http.server 8080
```

## Deploy (Netlify, free)

Add new site → Import from Git → `getInnovatory/innovatory-website`. Build command: empty. Publish directory: `.`. Every push to `main` deploys automatically.

Netlify project: `innovatory-consulting` (https://app.netlify.com/projects/innovatory-consulting). The "Powered by Netlify" badge is controlled in Project configuration → General → Powered by Netlify badge. Netlify only builds pushes to this private repo from the GitHub account connected to the Netlify owner's account (`getInnovatory`); pushes from any other GitHub account are blocked as "Unrecognized Git contributor" on the free plan.

## Domain (stays at Namecheap)

In Netlify → Domain management, add `innovatory.consulting` (Netlify adds `www` too). Then in Namecheap → Domain List → Manage → Advanced DNS:

- `A Record`, host `@`, value `75.2.60.5`
- `CNAME Record`, host `www`, value `<site>.netlify.app`

HTTPS certificates are issued automatically. Remove the old WordPress host's records first.

## Contact form

The form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). Netlify finds the form named `contact` when it deploys the site, so nothing needs to be configured in the code. In the Netlify dashboard, under Forms → Form notifications, add an email notification to hello@innovatory.consulting. Submissions also appear under Forms. Spam protection: a hidden honeypot field (`bot-field`) plus Netlify's built-in spam filter.

Netlify Forms only works on Netlify. When previewing locally, submitting shows the "could not be sent" message.

## Testimonials

A hidden testimonials section is commented out near the end of `index.html`. Add real, approved quotes and remove the comment markers to show it.
