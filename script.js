const products = [
  {
    id: "th-01",
    brand: "Tommy Hilfiger",
    brandKey: "tommy-hilfiger",
    category: "Remera",
    categoryKey: "remera",
    name: "Essential Flag Tee",
    art: "art-tommy",
    description: "Remera de corte limpio pensada para funcionar como base de todos los días.",
  },
  {
    id: "th-02",
    brand: "Tommy Hilfiger",
    brandKey: "tommy-hilfiger",
    category: "Buzo",
    categoryKey: "buzo",
    name: "Buzo Tommy Hilfiger",
    art: "art-ink",
    images: [
      "assets/products/tommy-hilfiger-01.png",
      "assets/products/tommy-hilfiger-02.png",
      "assets/products/tommy-hilfiger-03.png",
    ],
    priceUyu: 3000,
    description: "Buzo clásico de cuello redondo, de presencia sobria y textura confortable.",
  },
  {
    id: "th-03",
    brand: "Tommy Hilfiger",
    brandKey: "tommy-hilfiger",
    category: "Campera",
    categoryKey: "campera",
    name: "Lightweight Harrington",
    art: "art-tommy",
    description: "Campera liviana de silueta atemporal para sumar estructura sin rigidez.",
  },
  {
    id: "ck-01",
    brand: "Calvin Klein",
    brandKey: "calvin-klein",
    category: "Remera",
    categoryKey: "remera",
    name: "Monogram Jersey Tee",
    art: "art-calvin",
    description: "Jersey esencial con una lectura limpia de la identidad monogramática de la firma.",
  },
  {
    id: "ck-02",
    brand: "Calvin Klein",
    brandKey: "calvin-klein",
    category: "Campera",
    categoryKey: "campera",
    name: "Campera Calvin Klein",
    art: "art-ink",
    images: [
      "assets/products/calvin-klein-01.png",
      "assets/products/calvin-klein-02.png",
      "assets/products/calvin-klein-03.png",
    ],
    priceUyu: 3000,
    description: "Campera negra con capucha y cierre frontal, de expresión urbana y fácil de combinar.",
  },
  {
    id: "ck-03",
    brand: "Calvin Klein",
    brandKey: "calvin-klein",
    category: "Pantalón",
    categoryKey: "pantalon",
    name: "Straight Cotton Pant",
    art: "art-calvin",
    description: "Pantalón de pierna recta y proporción versátil, pensado para acompañar sin competir.",
  },
  {
    id: "ea-01",
    brand: "Emporio Armani",
    brandKey: "emporio-armani",
    category: "Remera",
    categoryKey: "remera",
    name: "Eagle Signature Tee",
    art: "art-armani",
    description: "Remera de estética precisa, con el gesto gráfico característico del águila.",
  },
  {
    id: "ea-02",
    brand: "Emporio Armani",
    brandKey: "emporio-armani",
    category: "Pantalón",
    categoryKey: "pantalon",
    name: "Tailored Relaxed Trouser",
    art: "art-armani",
    description: "Pantalón de caída limpia que combina una lectura sastrera con comodidad diaria.",
  },
  {
    id: "ea-03",
    brand: "Emporio Armani",
    brandKey: "emporio-armani",
    category: "Campera",
    categoryKey: "campera",
    name: "Minimal Bomber Jacket",
    art: "art-ink",
    description: "Bomber de líneas simples para una capa exterior de presencia refinada.",
  },
  {
    id: "coach-01",
    brand: "Coach",
    brandKey: "coach",
    category: "Remera",
    categoryKey: "remera",
    name: "Signature Cotton Tee",
    art: "art-coach",
    description: "Base de algodón con una interpretación discreta del universo visual de Coach.",
  },
  {
    id: "coach-02",
    brand: "Coach",
    brandKey: "coach",
    category: "Canguro",
    categoryKey: "canguro",
    name: "Heritage Zip Hoodie",
    art: "art-coach",
    description: "Canguro con cierre frontal, tacto suave y un punto de contraste bien medido.",
  },
  {
    id: "coach-03",
    brand: "Coach",
    brandKey: "coach",
    category: "Campera",
    categoryKey: "campera",
    name: "Varsity Leather Detail",
    art: "art-ink",
    description: "Campera de inspiración varsity con detalles cuidados y una silueta contemporánea.",
  },
  {
    id: "lacoste-01",
    brand: "Lacoste",
    brandKey: "lacoste",
    category: "Campera",
    categoryKey: "campera",
    name: "Campera Lacoste",
    art: "art-coach",
    images: [
      "assets/products/lacoste-01.png",
      "assets/products/lacoste-02.png",
      "assets/products/lacoste-03.png",
    ],
    priceUyu: 3000,
    description: "Campera con capucha y cierre frontal, con el cocodrilo como firma visual de la pieza.",
  },
];

const USD_UYU_RATE = 40;
const state = { brand: "all", category: "all", currency: "UYU" };
const grid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const activeFilter = document.querySelector("#active-filter");
const dialog = document.querySelector("#product-dialog");
const cartPanel = document.querySelector("#cart-panel");
const cart = [];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PROMO_CODES = {
  ATELIER10: { rate: 0.1, label: "10% de descuento" },
};
const WHATSAPP_PHONE = "59892809934";
let activeProductId = null;
let galleryIndex = 0;
let appliedPromo = null;

function brandLabel(key) {
  return {
    "tommy-hilfiger": "Tommy Hilfiger",
    "calvin-klein": "Calvin Klein",
    "emporio-armani": "Emporio Armani",
    coach: "Coach",
    lacoste: "Lacoste",
  }[key];
}

function categoryLabel(key) {
  return {
    remera: "Remeras",
    pantalon: "Pantalones",
    canguro: "Canguros",
    buzo: "Buzos",
    campera: "Camperas",
  }[key];
}

function formatPrice(priceUyu) {
  if (priceUyu === undefined || priceUyu === null) return "Precio a confirmar";
  const isUsd = state.currency === "USD";
  const amount = isUsd ? priceUyu / USD_UYU_RATE : priceUyu;
  const formatted = amount.toLocaleString("es-UY", {
    minimumFractionDigits: isUsd ? 2 : 0,
    maximumFractionDigits: isUsd ? 2 : 0,
  });
  return `${isUsd ? "US$" : "$U"} ${formatted}`;
}

function productVisual(product, index) {
  if (product.images?.length) {
    return `
      <div class="product-art card-art has-image">
        <img src="${product.images[0]}" alt="${product.name}" />
        <span class="gallery-count">${product.images.length} fotos</span>
        <span class="art-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="card-thumbnails" aria-hidden="true">
        ${product.images.map((image) => `<img src="${image}" alt="" />`).join("")}
      </div>
    `;
  }

  return `
    <div class="product-art card-art ${product.art}">
      <span class="art-label">Foto pendiente</span>
      <span class="art-number">${String(index + 1).padStart(2, "0")}</span>
    </div>
  `;
}

function productCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.brand = product.brandKey;
  card.dataset.category = product.categoryKey;
  card.innerHTML = `
    <button class="product-card-button" type="button" data-product-id="${product.id}" aria-label="Ver ficha de ${product.name}">
      ${productVisual(product, index)}
      <div class="product-info">
        <div class="product-heading">
          <div>
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
          </div>
          <span class="product-arrow" aria-hidden="true">↗</span>
        </div>
        <div class="product-meta-line">
          <p class="product-category">${product.category}</p>
          <span class="product-price">${formatPrice(product.priceUyu)}</span>
        </div>
      </div>
    </button>
  `;
  return card;
}

function renderProducts() {
  const filtered = products.filter((product) => {
    if (!product.images?.length) return false;
    const matchesBrand = state.brand === "all" || product.brandKey === state.brand;
    const matchesCategory = state.category === "all" || product.categoryKey === state.category;
    return matchesBrand && matchesCategory;
  });

  grid.innerHTML = "";
  filtered.forEach((product, index) => grid.appendChild(productCard(product, index)));
  emptyState.hidden = filtered.length !== 0;
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "pieza" : "piezas"}`;

  const brandText = state.brand === "all" ? "todas las marcas" : brandLabel(state.brand);
  const categoryText = state.category === "all" ? "todas las prendas" : categoryLabel(state.category);
  activeFilter.innerHTML = `<span>Mostrando ${brandText} · ${categoryText}</span>`;
}

function syncFilterButtons() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    const filterType = button.dataset.filter;
    button.classList.toggle("is-active", state[filterType] === button.dataset.value);
  });
}

function setFilter(type, value) {
  state[type] = value;
  syncFilterButtons();
  renderProducts();
}

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest(".filter-button");
  if (filterButton) {
    setFilter(filterButton.dataset.filter, filterButton.dataset.value);
    if (window.innerWidth <= 920) toggleMenu(false);
    return;
  }

  const brandLink = event.target.closest("[data-brand-link]");
  if (brandLink) {
    setFilter("brand", brandLink.dataset.brandLink);
    document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const galleryControl = event.target.closest("[data-gallery-control]");
  if (galleryControl) {
    setGalleryIndex(galleryIndex + (galleryControl.dataset.galleryControl === "next" ? 1 : -1));
    return;
  }

  const productButton = event.target.closest("[data-product-id]");
  if (productButton) openDialog(productButton.dataset.productId);
});

function openDialog(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  activeProductId = product.id;
  galleryIndex = 0;
  const dialogArt = document.querySelector("#dialog-art");
  const dialogGallery = document.querySelector("#dialog-gallery");
  dialogArt.className = `dialog-art product-art ${product.images?.length ? "has-image" : product.art}`;
  dialogGallery.innerHTML = "";

  if (product.images?.length) {
    dialogArt.innerHTML = `
      <button class="gallery-arrow gallery-arrow-prev" type="button" data-gallery-control="prev" aria-label="Foto anterior">←</button>
      <div class="dialog-image-stage"><img id="dialog-image" src="${product.images[0]}" alt="${product.name}" /></div>
      <button class="gallery-arrow gallery-arrow-next" type="button" data-gallery-control="next" aria-label="Foto siguiente">→</button>
      <span class="gallery-position" id="gallery-position">01 / ${String(product.images.length).padStart(2, "0")}</span>
    `;
    dialogGallery.innerHTML = product.images
      .map((image, index) => `<button class="dialog-thumb ${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}" aria-label="Ver foto ${index + 1}"><img src="${image}" alt="" /></button>`)
      .join("");
    dialogGallery.dataset.productId = product.id;
  } else {
    dialogArt.innerHTML = `<span class="art-label">Foto pendiente</span><span class="art-number">01</span>`;
    dialogGallery.removeAttribute("data-product-id");
  }
  document.querySelector("#dialog-brand").textContent = product.brand;
  document.querySelector("#dialog-title").textContent = product.name;
  document.querySelector("#dialog-description").textContent = product.description;
  document.querySelector("#dialog-price").textContent = formatPrice(product.priceUyu);
  document.querySelector("#dialog-category").textContent = product.category;
  document.querySelector("#dialog-size").textContent = "Talle a seleccionar";
  document.querySelector("#dialog-size-select").value = "XS";
  document.querySelector("#dialog-size-select").disabled = !product.priceUyu && product.priceUyu !== 0;
  document.querySelector("#add-to-cart").disabled = !product.priceUyu && product.priceUyu !== 0;
  document.querySelector("#add-to-cart").textContent = product.priceUyu ? "Agregar al carrito" : "Precio a confirmar";
  document.querySelector("#dialog-feedback").textContent = "";
  dialog.showModal();
}

function setGalleryIndex(nextIndex) {
  const product = products.find((item) => item.id === activeProductId);
  if (!product?.images?.length) return;
  galleryIndex = (nextIndex + product.images.length) % product.images.length;
  const image = document.querySelector("#dialog-image");
  if (image) {
    image.src = product.images[galleryIndex];
    image.alt = `${product.name}, foto ${galleryIndex + 1}`;
  }
  const position = document.querySelector("#gallery-position");
  if (position) position.textContent = `${String(galleryIndex + 1).padStart(2, "0")} / ${String(product.images.length).padStart(2, "0")}`;
  document.querySelectorAll(".dialog-thumb").forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === galleryIndex));
}

document.querySelector("#dialog-gallery").addEventListener("click", (event) => {
  const thumbnail = event.target.closest("[data-gallery-index]");
  if (!thumbnail) return;
  const product = products.find((item) => item.id === activeProductId);
  if (!product?.images?.length) return;
  setGalleryIndex(Number(thumbnail.dataset.galleryIndex));
});

document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#add-to-cart").addEventListener("click", () => {
  const product = products.find((item) => item.id === activeProductId);
  if (!product?.priceUyu) return;
  const size = document.querySelector("#dialog-size-select").value;
  const existing = cart.find((item) => item.productId === product.id && item.size === size);
  if (existing) existing.quantity += 1;
  else cart.push({ productId: product.id, size, quantity: 1 });
  document.querySelector("#dialog-size").textContent = `Talle ${size}`;
  document.querySelector("#dialog-feedback").textContent = "Agregado al carrito.";
  renderCart();
});

function cartTotals() {
  const subtotalUyu = cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return total + (product?.priceUyu || 0) * item.quantity;
  }, 0);
  const discountUyu = appliedPromo ? subtotalUyu * appliedPromo.rate : 0;
  return { subtotalUyu, discountUyu, totalUyu: subtotalUyu - discountUyu };
}

function renderCart() {
  const cartItems = document.querySelector("#cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  const cartCheckout = document.querySelector("#cart-checkout");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totals = cartTotals();

  document.querySelector("#cart-count").textContent = totalQuantity;
  document.querySelector("#cart-panel-count").textContent = `(${totalQuantity})`;
  cartEmpty.hidden = totalQuantity > 0;
  cartCheckout.hidden = totalQuantity === 0;
  cartItems.innerHTML = cart.map((item, index) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return "";
    const thumbnail = product.images?.[0] || "";
    return `
      <article class="cart-item">
        <div class="cart-item-image ${thumbnail ? "has-image" : product.art}">
          ${thumbnail ? `<img src="${thumbnail}" alt="" />` : `<span>${product.brand.slice(0, 1)}</span>`}
        </div>
        <div class="cart-item-info">
          <span class="cart-item-brand">${product.brand}</span>
          <h3>${product.name}</h3>
          <span class="cart-item-size">Talle ${item.size}</span>
          <div class="cart-item-bottom">
            <div class="quantity-control" aria-label="Cantidad">
              <button type="button" data-cart-action="decrease" data-cart-index="${index}" aria-label="Disminuir cantidad">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="increase" data-cart-index="${index}" aria-label="Aumentar cantidad">＋</button>
            </div>
            <strong>${formatPrice(product.priceUyu * item.quantity)}</strong>
          </div>
        </div>
        <button class="cart-item-remove" type="button" data-cart-action="remove" data-cart-index="${index}" aria-label="Quitar ${product.name}">×</button>
      </article>
    `;
  }).join("");

  document.querySelector("#cart-subtotal").textContent = formatPrice(totals.subtotalUyu);
  document.querySelector("#cart-discount").textContent = totals.discountUyu ? `− ${formatPrice(totals.discountUyu)}` : "—";
  document.querySelector("#cart-total").textContent = formatPrice(totals.totalUyu);
}

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-cart-action]");
  if (!actionButton) return;
  const index = Number(actionButton.dataset.cartIndex);
  const item = cart[index];
  if (!item) return;
  if (actionButton.dataset.cartAction === "increase") item.quantity += 1;
  if (actionButton.dataset.cartAction === "decrease") item.quantity -= 1;
  if (actionButton.dataset.cartAction === "remove" || item.quantity <= 0) cart.splice(index, 1);
  renderCart();
});

document.querySelector("#promo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#promo-code");
  const code = input.value.trim().toUpperCase();
  const message = document.querySelector("#promo-message");
  if (PROMO_CODES[code]) {
    appliedPromo = { code, ...PROMO_CODES[code] };
    message.textContent = `${code}: ${appliedPromo.label}`;
    message.className = "promo-message is-success";
  } else {
    appliedPromo = null;
    message.textContent = code ? "Código no válido." : "Ingresá un código para aplicarlo.";
    message.className = "promo-message is-error";
  }
  renderCart();
});

function toggleCart(force) {
  const button = document.querySelector("#cart-toggle");
  const shouldOpen = typeof force === "boolean" ? force : cartPanel.getAttribute("aria-hidden") === "true";
  cartPanel.classList.toggle("is-open", shouldOpen);
  cartPanel.setAttribute("aria-hidden", String(!shouldOpen));
  button.setAttribute("aria-expanded", String(shouldOpen));
}

document.querySelector("#cart-toggle").addEventListener("click", () => toggleCart());
document.querySelector("#cart-close").addEventListener("click", () => toggleCart(false));
document.querySelector("#cart-empty-close").addEventListener("click", () => toggleCart(false));

document.querySelector("#confirm-order").addEventListener("click", () => {
  const hint = document.querySelector("#cart-hint");
  if (!cart.length) return;
  if (WHATSAPP_PHONE.includes("X")) {
    hint.textContent = "Falta configurar el número de WhatsApp del catálogo.";
    hint.classList.add("is-warning");
    return;
  }
  const totals = cartTotals();
  const lines = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return `• ${product.name} — talle ${item.size} — x${item.quantity} — ${formatPrice(product.priceUyu * item.quantity)}`;
  });
  const message = [
    "Hola, quiero confirmar este pedido:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(totals.subtotalUyu)}`,
    appliedPromo ? `Descuento (${appliedPromo.code}): − ${formatPrice(totals.discountUyu)}` : "",
    `Total: ${formatPrice(totals.totalUyu)}`,
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
});

function resetFilters() {
  state.brand = "all";
  state.category = "all";
  syncFilterButtons();
  renderProducts();
}

document.querySelector("#reset-filters").addEventListener("click", resetFilters);
document.querySelector("#empty-reset").addEventListener("click", resetFilters);
document.querySelector("#currency-select").addEventListener("change", (event) => {
  state.currency = event.target.value;
  renderProducts();
  renderCart();
  if (dialog.open) {
    const product = products.find((item) => item.id === activeProductId);
    if (product) document.querySelector("#dialog-price").textContent = formatPrice(product.priceUyu);
  }
});

function toggleMenu(force) {
  const panel = document.querySelector("#filter-panel");
  const button = document.querySelector(".menu-toggle");
  const shouldOpen = typeof force === "boolean" ? force : !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", shouldOpen);
  button.setAttribute("aria-expanded", String(shouldOpen));
}

document.querySelector(".menu-toggle").addEventListener("click", () => toggleMenu());
document.querySelector("#mobile-filter-trigger").addEventListener("click", () => toggleMenu());

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) toggleMenu(false);
});

renderProducts();
renderCart();
