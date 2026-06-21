/* =========================================================
   script.js — Interatividade do portfolio
   ---------------------------------------------------------
   Este ficheiro está dividido em pequenas funções, cada uma
   com uma única responsabilidade. Lê os comentários: cada
   bloco explica o que faz e porquê, para te ajudar a
   aprender JavaScript à medida que avanças.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileNav();
  initLanguageToggle();
  initScrollReveal();
  initActiveNavLink();
  initCopyEmail();
  initContactForm();
});

/* ---------------------------------------------------------
   1) Ano automático no footer
   --------------------------------------------------------- */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------
   2) Menu mobile (hamburger)
   ---------------------------------------------------------
   getElementById procura um único elemento pelo seu "id".
   addEventListener "ouve" um evento (ex: "click") e executa
   uma função quando esse evento acontece.
   --------------------------------------------------------- */
function initMobileNav() {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  if (!burger || !links) return;

  burger.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fecha o menu automaticamente quando se clica num link
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   3) Seletor de idioma PT / EN
   ---------------------------------------------------------
   - "translations" vem do ficheiro i18n.js (tem de ser
     carregado ANTES deste script no HTML).
   - localStorage guarda a escolha do utilizador no
     navegador, para que ele não tenha de escolher de novo
     cada vez que visita o site.
   --------------------------------------------------------- */
function initLanguageToggle() {
  const toggleBtn = document.getElementById("langToggle");
  const currentLabel = toggleBtn ? toggleBtn.querySelector("[data-lang-current]") : null;

  // Lê o idioma guardado, ou usa "pt" como padrão
  let currentLang = localStorage.getItem("portfolio-lang") || "pt";
  applyLanguage(currentLang);

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    localStorage.setItem("portfolio-lang", currentLang);
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    const dictionary = translations[lang];
    if (!dictionary) return;

    // Percorre todos os elementos que têm o atributo data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dictionary[key]) {
        el.textContent = dictionary[key];
      }
    });

    document.documentElement.setAttribute("lang", lang);
    if (currentLabel) currentLabel.textContent = lang.toUpperCase();
  }
}

/* ---------------------------------------------------------
   4) Animação ao aparecer no scroll
   ---------------------------------------------------------
   IntersectionObserver é uma API do browser que "observa"
   elementos e avisa quando eles entram na zona visível da
   página — sem teres de calcular posições de scroll à mão.
   --------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  // Se o utilizador não suportar IntersectionObserver, mostra tudo já
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // só precisa de acontecer uma vez
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   5) Destaca o link do menu correspondente à secção visível
   --------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__links a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-50% 0px -45% 0px" } // considera "ativa" quando a secção passa pelo meio do ecrã
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   6) Copiar email com um clique
   --------------------------------------------------------- */
function initCopyEmail() {
  const btn = document.getElementById("copyEmail");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.getAttribute("data-value");
    try {
      await navigator.clipboard.writeText(email);
      const hint = btn.querySelector(".contact__copy-hint");
      const original = hint.textContent;
      btn.classList.add("is-copied");
      hint.textContent = "copiado ✓";

      // Volta ao texto original depois de 2 segundos
      setTimeout(() => {
        btn.classList.remove("is-copied");
        hint.textContent = original;
      }, 2000);
    } catch (err) {
      // Se a cópia falhar (ex: navegador sem permissão), abre o email normalmente
      window.location.href = `mailto:${email}`;
    }
  });
}

/* ---------------------------------------------------------
   7) Formulário de contacto → abre o email com mailto:
   ---------------------------------------------------------
   Como o site é estático (sem servidor próprio), a forma
   mais simples e fiável de "enviar" o formulário é montar
   um link "mailto:" com os dados preenchidos e abrir o
   programa de email do utilizador.
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede o envio "tradicional" do formulário

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Contacto via portfolio — ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);

    window.location.href = `mailto:zazadacruz@azacruz.com?subject=${subject}&body=${body}`;
  });
}
