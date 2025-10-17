
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const items = Array.from(gallery.querySelectorAll(".gallery-item"));
  const controls = document.querySelector(".gallery-controls");

 
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxDownload = document.getElementById("lightbox-download");
  const btnClose = lightbox.querySelector("[data-action=close]");
  const btnPrev = lightbox.querySelector("[data-action=prev]");
  const btnNext = lightbox.querySelector("[data-action=next]");

  let currentIndex = 0;

  
  function openLightbox(index) {
    const item = items[index];
    if (!item) return;
    const img = item.querySelector("img");
    const caption = item.querySelector(".caption").textContent;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightboxDownload.href = img.src;

    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    currentIndex = index;
  }

  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
    currentIndex = 0;
  }

  function showNext() {
    if (items.length === 0) return;
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    if (items.length === 0) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  
  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
    const img = item.querySelector("img");
    img.addEventListener("load", () => img.classList.add("loaded"));
  });

  btnClose?.addEventListener("click", closeLightbox);
  btnPrev?.addEventListener("click", showPrev);
  btnNext?.addEventListener("click", showNext);

  lightbox.addEventListener("click", (e) => {
    if (e.target.dataset.action === "close" || e.target === lightbox) {
      closeLightbox();
    }
  });

 
  document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  
  controls?.addEventListener("click", (e) => {
    if (e.target.matches("[data-category]")) {
      const category = e.target.getAttribute("data-category");
      controls.querySelectorAll("button").forEach(btn => btn.setAttribute("aria-pressed", "false"));
      e.target.setAttribute("aria-pressed", "true");

      items.forEach(item => {
        const itemCat = item.getAttribute("data-category");
        if (category === "all" || itemCat === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    }
  });

 
  const gridPrev = document.getElementById("grid-prev");
  const gridNext = document.getElementById("grid-next");

  gridPrev?.addEventListener("click", () => {
    gallery.scrollBy({left: -gallery.clientWidth, behavior: "smooth"});
  });
  gridNext?.addEventListener("click", () => {
    gallery.scrollBy({left: gallery.clientWidth, behavior: "smooth"});
  });

 
  [btnPrev, btnNext, btnClose].forEach(btn => {
    if (!btn) console.warn('Lightbox button missing in HTML');
  });
});