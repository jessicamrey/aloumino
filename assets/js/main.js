/* Aloumiño · lógica de la web (sin dependencias) */
(function () {
  "use strict";

  const CONFIG = window.ALOUMINO_CONFIG || {};
  const PRODUCTS = window.ALOUMINO_PRODUCTS || [];
  const CATEGORIES = window.ALOUMINO_CATEGORIES || [];
  const COLLECTIONS = window.ALOUMINO_COLLECTIONS || {};
  const CART_KEY = "aloumino-cart-v1";
  const LOGO = "assets/img/logo.jpg";

  document.documentElement.classList.remove("no-js");

  // ---------- Utilidades ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n);
  const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || "";
  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const params = new URLSearchParams(location.search);

  const ICONS = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.2 1.7 3.8 3.9 4v3a7.2 7.2 0 0 1-3.9-1.2v6.4A5.8 5.8 0 1 1 10.8 9.4v3.1a2.8 2.8 0 1 0 2 2.7V3h3.8Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z"/><path d="M9 9.5c.3 2 2.5 4.3 4.6 4.8l1-1.1 1.6.8c-.2 1.2-1.2 1.8-2.3 1.6C10.9 15 8.7 12.6 8.3 10c-.1-1 .6-2 1.7-2.1l.7 1.6-1 1"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>'
  };
  window.ALOUMINO_ICONS = ICONS;

  const NAV = [
    { page: "tienda", href: "tienda.html", label: "Tienda" },
    { page: "personalizados", href: "personalizados.html", label: "Personalizados y regalos" },
    { page: "talleres", href: "talleres.html", label: "Talleres" },
    { page: "eventos", href: "eventos.html", label: "Eventos y empresas" },
    { page: "colaboraciones", href: "colaboraciones.html", label: "Profesionales" },
    { page: "historia", href: "historia.html", label: "Nuestra historia" },
    { page: "diario", href: "diario.html", label: "Diario" },
    { page: "contacto", href: "contacto.html", label: "Contacto" }
  ];

  function socialLinks() {
    let html = "";
    if (CONFIG.instagram) html += `<a href="${esc(CONFIG.instagram)}" target="_blank" rel="noopener" aria-label="Instagram de Aloumiño">${ICONS.instagram}</a>`;
    if (CONFIG.tiktok) html += `<a href="${esc(CONFIG.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok de Aloumiño">${ICONS.tiktok}</a>`;
    if (CONFIG.email) html += `<a href="mailto:${esc(CONFIG.email)}" aria-label="Escríbenos un correo">${ICONS.mail}</a>`;
    return html;
  }

  // ---------- Cabecera y pie ----------
  function renderLayout() {
    const page = document.body.dataset.page || "";
    const header = $("#site-header");
    if (header) {
      header.innerHTML = `
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Aloumiño, ir a inicio">
            <img src="${LOGO}" alt="" width="46" height="46">
            <span>Aloumiño<small>de cera · Galicia</small></span>
          </a>
          <nav class="main-nav" id="main-nav" aria-label="Principal">
            <ul>${NAV.map((n) => `<li><a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}</ul>
          </nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" data-cart-open aria-label="Abrir tu pedido">${ICONS.bag}<span class="cart-count" hidden>0</span></button>
            <button class="icon-btn menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Abrir menú">${ICONS.menu}</button>
          </div>
        </div>`;

      const toggle = $(".menu-toggle", header);
      const nav = $("#main-nav", header);
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      });
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    const footer = $("#site-footer");
    if (footer) {
      footer.innerHTML = `
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <img src="${LOGO}" alt="Logotipo de Aloumiño" width="84" height="84" loading="lazy">
              <p>Velas artesanales y ecológicas hechas con luz, amor y el encanto de nuestra tierra, Galicia.</p>
              <div class="socials">${socialLinks()}</div>
            </div>
            <div>
              <h4>Tienda</h4>
              <ul>
                ${CATEGORIES.map((c) => `<li><a href="tienda.html?cat=${c.id}">${esc(c.name)}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>Aloumiño</h4>
              <ul>
                <li><a href="historia.html">Nuestra historia</a></li>
                <li><a href="personalizados.html">Personalizados y regalos</a></li>
                <li><a href="talleres.html">Talleres y experiencias</a></li>
                <li><a href="eventos.html">Eventos y empresas</a></li>
                <li><a href="colaboraciones.html">Tiendas y profesionales</a></li>
                <li><a href="diario.html">Diario de Aloumiño</a></li>
              </ul>
            </div>
            <div>
              <h4>Ayuda</h4>
              <ul>
                <li><a href="faq.html">Preguntas frecuentes</a></li>
                <li><a href="faq.html#envios">Envíos y plazos</a></li>
                <li><a href="faq.html#cuidado">Cuidado de las velas</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                ${CONFIG.email ? `<li><a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a></li>` : ""}
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Aloumiño · Hecho a mano en Galicia con aloumiño.</span>
            <span>Grazas por apoiar o artesanal 🤍</span>
          </div>
        </div>`;
    }

    // Datos de contacto en cualquier página
    $$("[data-config-email]").forEach((el) => {
      if (!CONFIG.email) return el.closest("[data-config-wrap]")?.remove();
      el.href = "mailto:" + CONFIG.email;
      if (!el.textContent.trim()) el.textContent = CONFIG.email;
    });
    ["instagram", "tiktok"].forEach((net) => {
      $$(`[data-config-${net}]`).forEach((el) => {
        if (!CONFIG[net]) return el.closest("[data-config-wrap]")?.remove();
        el.href = CONFIG[net];
        if (!el.textContent.trim()) el.textContent = "@" + CONFIG[net].replace(/\/$/, "").split("/").pop().replace("@", "");
      });
    });
    $$("[data-config-whatsapp]").forEach((el) => {
      if (!CONFIG.whatsapp) return el.closest("[data-config-wrap]")?.remove();
      el.href = "https://wa.me/" + CONFIG.whatsapp;
    });
    $$("[data-socials]").forEach((el) => (el.innerHTML = socialLinks()));
    $$("[data-icon]").forEach((el) => (el.innerHTML = ICONS[el.dataset.icon] || ""));
  }

  // ---------- Imágenes ----------
  function media(p, i = 0, eager = false) {
    const src = p.images && p.images[i];
    if (!src) return `<div class="placeholder"><img src="${LOGO}" alt="">${p.status === "soon" ? "Próximamente" : "Foto en camino"}</div>`;
    return `<img src="${esc(src)}" alt="${esc(p.name)}${p.aroma ? " · " + esc(p.aroma) : ""}" ${eager ? "" : 'loading="lazy"'} decoding="async">`;
  }

  function priceHTML(p) {
    if (p.status === "soon") return '<span class="price price--ask">Próximamente</span>';
    return p.price != null ? `<span class="price">${money(p.price)}</span>` : '<span class="price price--ask">Precio a consultar</span>';
  }

  function productCard(p) {
    const badge = p.status === "soon" ? "Próximamente" : p.badge || "";
    return `
      <button type="button" class="product-card reveal" data-product="${esc(p.id)}" aria-label="Ver ${esc(p.name)}">
        <div class="media">
          ${badge ? `<span class="badge">${esc(badge)}</span>` : ""}
          ${media(p)}
          <span class="quick" aria-hidden="true">Ver detalles</span>
        </div>
        <div class="info">
          <span class="cat">${esc(categoryName(p.category))}</span>
          <h3>${esc(p.name)}</h3>
          <p class="aroma">${esc(p.short)}</p>
          ${priceHTML(p)}
        </div>
      </button>`;
  }

  // ---------- Listados de productos ----------
  function selectProducts(spec) {
    const [type, value] = spec.split(":");
    if (type === "featured") return PRODUCTS.filter((p) => p.featured);
    if (type === "category") return PRODUCTS.filter((p) => p.category === value);
    if (type === "collection") return PRODUCTS.filter((p) => (p.collections || []).includes(value));
    if (type === "ids") return value.split(",").map(findProduct).filter(Boolean);
    return PRODUCTS;
  }

  function renderProductLists() {
    $$("[data-products]").forEach((el) => {
      const limit = parseInt(el.dataset.limit || "0", 10);
      let list = selectProducts(el.dataset.products);
      if (limit) list = list.slice(0, limit);
      el.innerHTML = list.map(productCard).join("");
    });
  }

  function renderShop() {
    const root = $("[data-shop]");
    if (!root) return;
    const filters = $("[data-shop-filters]", root);
    const results = $("[data-shop-results]", root);
    const valid = (id) => CATEGORIES.some((c) => c.id === id);
    let current = valid(params.get("cat")) ? params.get("cat") : "todo";

    filters.innerHTML =
      `<button type="button" class="chip" data-cat="todo">Todo</button>` +
      CATEGORIES.map((c) => `<button type="button" class="chip" data-cat="${c.id}">${esc(c.name)}</button>`).join("");

    const draw = () => {
      $$(".chip", filters).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === current)));
      const cats = current === "todo" ? CATEGORIES : CATEGORIES.filter((c) => c.id === current);
      results.innerHTML = cats
        .map((c) => {
          const items = PRODUCTS.filter((p) => p.category === c.id);
          if (!items.length) return "";
          return `
            <section class="category-block" id="cat-${c.id}" aria-labelledby="h-${c.id}">
              <div class="category-intro">
                <h2 id="h-${c.id}">${esc(c.name)}</h2>
                <p>${esc(c.intro)}</p>
              </div>
              <div class="product-grid">${items.map(productCard).join("")}</div>
            </section>`;
        })
        .join("");
      observeReveal(results);
    };

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      current = btn.dataset.cat;
      const url = new URL(location.href);
      if (current === "todo") url.searchParams.delete("cat");
      else url.searchParams.set("cat", current);
      url.searchParams.delete("p");
      history.replaceState(null, "", url);
      draw();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    draw();
  }

  // ---------- Ficha de producto (modal) ----------
  let modal, lastFocus;

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "modal-title");
    modal.innerHTML = `<div class="modal-dialog"><button type="button" class="icon-btn modal-close" aria-label="Cerrar">${ICONS.close}</button><div class="modal-gallery"></div><div class="modal-body"></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest(".modal-close")) closeModal();
    });
  }

  function optionField(o) {
    const id = "opt-" + o.id;
    const req = o.required ? " required" : "";
    const label = `<label for="${id}">${esc(o.label)}${o.required ? " *" : ""}</label>`;
    if (o.type === "select") {
      return `<div class="option-group">${label}<select id="${id}" name="${esc(o.id)}" data-label="${esc(o.label)}"${req}>
        ${o.required ? '<option value="">Elige una opción</option>' : ""}
        ${o.choices.map((c) => `<option>${esc(c)}</option>`).join("")}
      </select></div>`;
    }
    return `<div class="option-group">${label}<input type="text" id="${id}" name="${esc(o.id)}" data-label="${esc(o.label)}" maxlength="140" placeholder="${esc(o.placeholder || "")}"${req}></div>`;
  }

  function openProduct(id, pushUrl = true) {
    const p = findProduct(id);
    if (!p) return;
    if (!modal) buildModal();
    lastFocus = document.activeElement;
    const gallery = $(".modal-gallery", modal);
    const body = $(".modal-body", modal);
    const imgs = p.images || [];

    gallery.innerHTML = `<div class="main-img">${media(p, 0, true)}</div>` +
      (imgs.length > 1 ? `<div class="thumbs">${imgs.map((src, i) => `<button type="button" data-i="${i}" aria-label="Ver foto ${i + 1}" aria-current="${i === 0}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : "");
    $$(".thumbs button", gallery).forEach((b) => b.addEventListener("click", () => {
      $(".main-img", gallery).innerHTML = media(p, +b.dataset.i, true);
      $$(".thumbs button", gallery).forEach((x) => x.setAttribute("aria-current", String(x === b)));
    }));

    const specs = Object.assign({ Aroma: p.aroma }, p.details || {});
    const soon = p.status === "soon";
    const collections = (p.collections || []).map((c) => COLLECTIONS[c]).filter(Boolean);

    body.innerHTML = `
      <span class="eyebrow">${esc(categoryName(p.category))}${collections.length ? " · " + esc(collections.join(", ")) : ""}</span>
      <h2 id="modal-title">${esc(p.name)}</h2>
      ${priceHTML(p)}
      <p class="desc">${esc(p.description)}</p>
      <ul class="spec-list">${Object.entries(specs).filter(([, v]) => v).map(([k, v]) => `<li><span>${esc(k)}</span><span>${esc(v)}</span></li>`).join("")}</ul>
      ${soon ? `
        <a class="btn btn--block" href="contacto.html?motivo=informacion&producto=${encodeURIComponent(p.name)}#formulario">Avísame cuando esté disponible</a>
      ` : `
        <form class="product-form" novalidate>
          ${(p.options || []).map(optionField).join("")}
          <div class="add-row">
            <div class="qty" aria-label="Cantidad">
              <button type="button" data-step="-1" aria-label="Quitar una unidad">−</button>
              <input type="number" name="qty" value="1" min="1" max="99" aria-label="Cantidad">
              <button type="button" data-step="1" aria-label="Añadir una unidad">+</button>
            </div>
            <button type="submit" class="btn">Añadir al pedido</button>
          </div>
          <p class="form-status err" role="alert" hidden></p>
        </form>
        <p class="note">${p.price == null
          ? "Este producto se hace por encargo: al enviar tu pedido te confirmaremos precio, disponibilidad y plazo."
          : "Al enviar tu pedido te confirmaremos disponibilidad, gastos de envío y forma de pago antes de cobrarte nada."}</p>
      `}`;

    const form = $(".product-form", body);
    if (form) {
      const qty = $("input[name=qty]", form);
      $$("[data-step]", form).forEach((b) => b.addEventListener("click", () => {
        qty.value = Math.min(99, Math.max(1, (parseInt(qty.value, 10) || 1) + +b.dataset.step));
      }));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = $(".form-status", form);
        const missing = $$("[required]", form).find((f) => !f.value.trim());
        if (missing) {
          status.textContent = "Por favor, completa: " + missing.dataset.label;
          status.hidden = false;
          missing.focus();
          return;
        }
        const options = {};
        $$("[data-label]", form).forEach((f) => { if (f.value.trim()) options[f.dataset.label] = f.value.trim(); });
        Cart.add(p, options, Math.min(99, Math.max(1, parseInt(qty.value, 10) || 1)));
        closeModal(false);
        openCart();
      });
    }

    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    $(".modal-close", modal).focus();
    modal.querySelector(".modal-dialog").scrollTop = 0;
    if (pushUrl) {
      const url = new URL(location.href);
      url.searchParams.set("p", p.id);
      history.replaceState(null, "", url);
    }
  }

  function closeModal(restoreFocus = true) {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    const url = new URL(location.href);
    if (url.searchParams.has("p")) {
      url.searchParams.delete("p");
      history.replaceState(null, "", url);
    }
    if (restoreFocus && lastFocus) lastFocus.focus();
  }

  // ---------- Cesta / pedido ----------
  const Cart = {
    items: [],
    load() {
      try { this.items = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { this.items = []; }
      this.items = this.items.filter((i) => findProduct(i.id));
    },
    save() {
      try { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); } catch (e) { /* almacenamiento no disponible */ }
      renderCart();
    },
    add(p, options, qty) {
      const key = p.id + "|" + JSON.stringify(options);
      const existing = this.items.find((i) => i.key === key);
      if (existing) existing.qty = Math.min(99, existing.qty + qty);
      else this.items.push({ key, id: p.id, qty, options });
      this.save();
      toast(`«${p.name}» se ha añadido a tu pedido`);
    },
    setQty(key, qty) {
      const it = this.items.find((i) => i.key === key);
      if (!it) return;
      if (qty < 1) return this.remove(key);
      it.qty = Math.min(99, qty);
      this.save();
    },
    remove(key) {
      this.items = this.items.filter((i) => i.key !== key);
      this.save();
    },
    clear() {
      this.items = [];
      this.save();
    },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    total() {
      return this.items.reduce((s, i) => {
        const p = findProduct(i.id);
        return s + (p.price != null ? p.price * i.qty : 0);
      }, 0);
    },
    hasQuote() { return this.items.some((i) => findProduct(i.id).price == null); },
    summary() {
      if (!this.items.length) return "";
      const lines = this.items.map((i) => {
        const p = findProduct(i.id);
        const price = p.price != null ? `${money(p.price)}/ud` : "precio a consultar";
        const opts = Object.entries(i.options).map(([k, v]) => `   · ${k}: ${v}`).join("\n");
        return `- ${i.qty} × ${p.name} (${price})${opts ? "\n" + opts : ""}`;
      });
      let txt = "MI PEDIDO\n" + lines.join("\n");
      const t = this.total();
      if (t) txt += `\n\nSubtotal orientativo: ${money(t)}${this.hasQuote() ? " + productos a consultar" : ""} (sin envío)`;
      return txt;
    }
  };

  let drawer, backdrop;
  function buildDrawer() {
    backdrop = document.createElement("div");
    backdrop.className = "drawer-backdrop";
    drawer = document.createElement("aside");
    drawer.className = "drawer";
    drawer.setAttribute("aria-label", "Tu pedido");
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="drawer-head"><h3>Tu pedido</h3><button type="button" class="icon-btn" data-cart-close aria-label="Cerrar pedido">${ICONS.close}</button></div>
      <div class="drawer-body"></div>
      <div class="drawer-foot" hidden>
        <div class="cart-total"><span>Subtotal</span><strong data-cart-total></strong></div>
        <p class="note" data-cart-note style="margin:0 0 1rem"></p>
        <a class="btn btn--block" href="contacto.html?motivo=pedido#formulario">Enviar solicitud de pedido</a>
        ${CONFIG.whatsapp ? `<a class="btn btn--ghost btn--block" style="margin-top:.6rem" data-cart-whatsapp target="_blank" rel="noopener">Pedir por WhatsApp</a>` : ""}
      </div>`;
    document.body.append(backdrop, drawer);
    backdrop.addEventListener("click", closeCart);
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("[data-cart-close]")) return closeCart();
      const item = e.target.closest("[data-key]");
      if (!item) return;
      const key = item.dataset.key;
      const it = Cart.items.find((i) => i.key === key);
      if (e.target.closest("[data-remove]")) Cart.remove(key);
      else if (e.target.closest("[data-step]")) Cart.setQty(key, it.qty + +e.target.closest("[data-step]").dataset.step);
    });
  }

  function renderCart() {
    const n = Cart.count();
    $$(".cart-count").forEach((el) => { el.textContent = n; el.hidden = n === 0; });
    if (!drawer) return;
    const body = $(".drawer-body", drawer);
    const foot = $(".drawer-foot", drawer);
    if (!Cart.items.length) {
      body.innerHTML = `<div class="cart-empty"><span class="script">Tu pedido está vacío</span>Descubre nuestras velas y elige las que más te gusten.<br><br><a class="btn btn--small" href="tienda.html">Ir a la tienda</a></div>`;
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    body.innerHTML = Cart.items.map((i) => {
      const p = findProduct(i.id);
      const opts = Object.entries(i.options).map(([k, v]) => `${esc(k)}: ${esc(v)}`).join("<br>");
      return `
        <div class="cart-item" data-key="${esc(i.key)}">
          ${media(p)}
          <div>
            <h4>${esc(p.name)}</h4>
            ${opts ? `<p class="opts">${opts}</p>` : ""}
            <div class="qty"><button type="button" data-step="-1" aria-label="Quitar una unidad">−</button><input type="number" value="${i.qty}" readonly aria-label="Cantidad"><button type="button" data-step="1" aria-label="Añadir una unidad">+</button></div>
            <button type="button" class="remove" data-remove>Eliminar</button>
          </div>
          <span class="line-price">${p.price != null ? money(p.price * i.qty) : "A consultar"}</span>
        </div>`;
    }).join("");
    $("[data-cart-total]", drawer).textContent = money(Cart.total()) + (Cart.hasQuote() ? " + a consultar" : "");
    $("[data-cart-note]", drawer).textContent = "Envío no incluido. Revisaremos tu pedido y te confirmaremos disponibilidad, plazo y forma de pago antes de cobrarte nada.";
    const wa = $("[data-cart-whatsapp]", drawer);
    if (wa) wa.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("¡Hola, Aloumiño! Me gustaría hacer este pedido:\n\n" + Cart.summary())}`;
  }

  function openCart() {
    if (!drawer) buildDrawer();
    renderCart();
    requestAnimationFrame(() => {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      $("[data-cart-close]", drawer).focus();
    });
  }
  function closeCart() {
    if (!drawer || !drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  // ---------- Avisos ----------
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
  }

  // ---------- Formularios ----------
  function formToText(form) {
    const lines = [];
    $$("input, select, textarea", form).forEach((f) => {
      if (!f.name || f.name.startsWith("_") || f.type === "submit" || f.classList.contains("hp-input")) return;
      if ((f.type === "checkbox" || f.type === "radio") && !f.checked) return;
      const value = f.type === "checkbox" ? "Sí" : f.value.trim();
      if (!value) return;
      const label = (form.querySelector(`label[for="${f.id}"]`) || {}).textContent || f.name;
      lines.push(`${label.replace(/\s*\*$/, "").trim()}: ${value}`);
    });
    return lines.join("\n");
  }

  function initForms() {
    $$("form[data-form]").forEach((form) => {
      const motivo = params.get("motivo");
      const select = $("select[name=motivo]", form);
      if (select && motivo && $(`option[value="${CSS.escape(motivo)}"]`, select)) select.value = motivo;

      const msg = $("textarea[name=mensaje]", form);
      const producto = params.get("producto");
      if (msg && producto && !msg.value) msg.value = `Me interesa: ${producto}\n\n`;
      if (msg && motivo === "pedido" && Cart.items.length && !msg.value) {
        msg.value = Cart.summary() + "\n\nComentarios: ";
        form.dataset.order = "true";
      }

      const taller = params.get("taller");
      const tallerSel = $("select[name=taller]", form);
      if (tallerSel && taller && $(`option[value="${CSS.escape(taller)}"]`, tallerSel)) tallerSel.value = taller;

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = $(".form-status", form);
        const btn = $("[type=submit]", form);
        const show = (text, ok) => { status.textContent = text; status.className = "form-status " + (ok ? "ok" : "err"); status.hidden = false; };

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if ($(".hp-input", form) && $(".hp-input", form).value) return; // anti-spam

        const subject = `${form.dataset.form} · ${($("[name=nombre]", form) || {}).value || "Web Aloumiño"}`;
        const text = formToText(form);

        if (CONFIG.formEndpoint) {
          btn.disabled = true;
          try {
            const data = new FormData(form);
            data.append("_subject", subject);
            data.append("_resumen", text);
            const res = await fetch(CONFIG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            if (form.dataset.order) Cart.clear();
            show("¡Grazas! Hemos recibido tu mensaje y te responderemos lo antes posible (normalmente en 24-48 h laborables).", true);
          } catch (err) {
            show(`No hemos podido enviar el formulario. Puedes escribirnos directamente a ${CONFIG.email}.`, false);
          } finally {
            btn.disabled = false;
          }
          return;
        }

        const href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text + "\n\n— Enviado desde la web de Aloumiño")}`;
        window.location.href = href;
        show(`Se abrirá tu programa de correo con el mensaje preparado; solo tienes que enviarlo. Si no se abre, escríbenos a ${CONFIG.email}.`, true);
      });
    });
  }

  // ---------- Animación al hacer scroll ----------
  let io;
  function observeReveal(root = document) {
    const els = $$(".reveal:not(.is-visible)", root);
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
    if (!io) {
      io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    }
    els.forEach((el) => io.observe(el));
  }

  // ---------- Inicio ----------
  function init() {
    Cart.load();
    renderLayout();
    renderProductLists();
    renderShop();
    renderCart();
    initForms();
    observeReveal();

    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-product]");
      if (card) { e.preventDefault(); openProduct(card.dataset.product); return; }
      if (e.target.closest("[data-cart-open]")) openCart();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeModal(); closeCart(); }
    });

    if (params.get("p")) openProduct(params.get("p"), false);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
