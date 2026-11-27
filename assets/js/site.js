// Innovatory Consulting — small progressive enhancements. The site works without this file.
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

// Mark the current section in the main nav.
const here = location.pathname.replace(/index\.html$/, "");
document.querySelectorAll(".nav a:not(.btn)").forEach((a) => {
  if (here.startsWith(a.getAttribute("href"))) a.setAttribute("aria-current", "page");
});

// Contact form: submit with fetch so visitors stay on the page.
// Netlify Forms accepts URL-encoded posts to "/" with the form-name field (see README, "Contact form").
const form = document.querySelector("form[data-contact]");
if (form) {
  const status = form.querySelector(".form-status");
  const show = (cls, msg) => {
    status.hidden = false;
    status.className = "form-status " + cls;
    status.textContent = msg;
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show("ok", "Thank you. Your message was sent and we will reply within one business day.");
    } catch {
      show("err", "Sorry, the message could not be sent. Please email hello@innovatory.consulting.");
    } finally {
      button.disabled = false;
    }
  });
}
