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
// The form's action is the form backend endpoint (see README, "Contact form").
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
    if (form.action.includes("YOUR_FORM_ID")) {
      show("err", "The contact form is not connected yet. Please email hello@innovatory.consulting.");
      return;
    }
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
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
