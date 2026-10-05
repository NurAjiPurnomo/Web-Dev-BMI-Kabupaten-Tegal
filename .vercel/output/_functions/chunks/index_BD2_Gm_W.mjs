import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, d as maybeRenderHead, i as renderComponent, m as defineScriptVars, p as addAttribute, u as renderTemplate } from "./server_3JpwUDJR.mjs";
import { t as createComponent } from "./compiler_CrHCyIHa.mjs";
import { n as renderScript, t as $$Layout } from "./Layout_DkTVwF9-.mjs";
import { i as fetchHeroSlides, n as fetchAgendaList, o as fetchNewsList, s as fetchSiteSettings } from "./supabase_CDNNdpTp.mjs";
import { n as $$Footer, r as $$Header, t as $$LayananModal } from "./LayananModal_uITHnjUr.mjs";
//#region src/components/HeroSlider.astro
createAstro("https://astro.build");
var $$HeroSlider = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroSlider;
	const { slides = [] } = Astro.props;
	const activeSlides = slides.filter((s) => s.active);
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero-slider-section" id="hero-slider" data-astro-cid-5auvlcfn><div class="slider-container" data-astro-cid-5auvlcfn>${activeSlides.map((slide, index) => renderTemplate`<div${addAttribute(`slide ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-index")} data-astro-cid-5auvlcfn><div class="slide-bg"${addAttribute(`background-image: url('${slide.image}');`, "style")} data-astro-cid-5auvlcfn><div class="overlay-gradient" data-astro-cid-5auvlcfn></div></div><div class="slide-content-wrapper" data-astro-cid-5auvlcfn><div class="slide-content" data-astro-cid-5auvlcfn><h1 class="hero-title" data-astro-cid-5auvlcfn>${slide.title}</h1>${slide.subtitle && renderTemplate`<p class="hero-subtitle" data-astro-cid-5auvlcfn>${slide.subtitle}</p>`}</div></div></div>`)}<!-- Carousel Controls --><button class="slider-btn prev-btn" aria-label="Previous Slide" data-astro-cid-5auvlcfn><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-5auvlcfn><path d="M15 18l-6-6 6-6" data-astro-cid-5auvlcfn></path></svg></button><button class="slider-btn next-btn" aria-label="Next Slide" data-astro-cid-5auvlcfn><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-5auvlcfn><path d="M9 18l6-6-6-6" data-astro-cid-5auvlcfn></path></svg></button><!-- Pagination Dots --><div class="pagination-dots" data-astro-cid-5auvlcfn>${activeSlides.map((_, index) => renderTemplate`<button${addAttribute(`dot ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-slide-to")}${addAttribute(`Go to slide ${index + 1}`, "aria-label")} data-astro-cid-5auvlcfn></button>`)}</div></div></section>${renderScript($$result, "C:/BMI/src/components/HeroSlider.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/BMI/src/components/HeroSlider.astro", void 0);
//#endregion
//#region src/components/NewsSection.astro
createAstro("https://astro.build");
var $$NewsSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NewsSection;
	const { newsList = [] } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="news-section" id="recent-news" data-astro-cid-3x7ilnzn><div class="news-container" data-astro-cid-3x7ilnzn><div class="section-header" data-astro-cid-3x7ilnzn><div class="title-wrapper" data-astro-cid-3x7ilnzn><span class="sub-heading-pill" data-astro-cid-3x7ilnzn>KABAR TERBARU</span><h2 class="section-title" data-astro-cid-3x7ilnzn>Berita Terkini</h2></div><a href="/berita" class="view-all-link" data-astro-cid-3x7ilnzn><span data-astro-cid-3x7ilnzn>Lihat Semua Berita</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-3x7ilnzn><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-3x7ilnzn></path></svg></a></div><div class="news-grid" id="news-grid-container" data-astro-cid-3x7ilnzn>${newsList.map((item) => renderTemplate`<a${addAttribute(`/berita/${item.id}`, "href")} class="pdip-card"${addAttribute(item.id, "data-news-id")} data-astro-cid-3x7ilnzn><div class="pdip-card-img-wrap" data-astro-cid-3x7ilnzn><img${addAttribute(item.image, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="pdip-card-img" data-astro-cid-3x7ilnzn><span class="pdip-cat-tag" data-astro-cid-3x7ilnzn>${item.category}</span></div><div class="pdip-card-body" data-astro-cid-3x7ilnzn><span class="pdip-card-date" data-astro-cid-3x7ilnzn>${item.date}</span><h3 class="pdip-card-title" data-astro-cid-3x7ilnzn>${item.title}</h3><p class="pdip-card-excerpt" data-astro-cid-3x7ilnzn>${item.excerpt}</p><div class="pdip-card-footer" data-astro-cid-3x7ilnzn><span data-astro-cid-3x7ilnzn>Baca Selengkapnya</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-3x7ilnzn><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-3x7ilnzn></path></svg></div></div><!-- Authentic Batik Corner Accent --><div class="batik-corner" title="BMI Tegal Cultural Accent" data-astro-cid-3x7ilnzn><svg viewBox="0 0 80 80" class="batik-svg" data-astro-cid-3x7ilnzn><path d="M80 0 L80 80 L0 80 Z" fill="var(--dark-red)" data-astro-cid-3x7ilnzn></path><path d="M80 20 L20 80 M80 40 L40 80 M80 60 L60 80" stroke="var(--primary-red)" stroke-width="3" opacity="0.6" data-astro-cid-3x7ilnzn></path><circle cx="65" cy="65" r="4" fill="#E2E8F0" opacity="0.8" data-astro-cid-3x7ilnzn></circle></svg></div></a>`)}</div></div></section>`;
}, "C:/BMI/src/components/NewsSection.astro", void 0);
//#endregion
//#region src/components/AgendaSection.astro
var $$AgendaSection = createComponent(async ($$result, $$props, $$slots) => {
	const agendaItems = (await fetchAgendaList()).slice(0, 6).map((item) => ({
		id: item.id,
		title: item.title,
		date: item.schedule,
		time: "",
		location: item.location || item.kecamatan,
		category: item.badge,
		status: item.impact || "Akan Datang",
		image: item.image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
	}));
	return renderTemplate`${maybeRenderHead($$result)}<section class="agenda-home-section" id="agenda-kegiatan" data-astro-cid-yc6sm5xs><div class="container" data-astro-cid-yc6sm5xs><!-- Header Section Matching pdipkotasemarang.id (| Agenda & Kegiatan) --><div class="agenda-header-bar" data-astro-cid-yc6sm5xs><div data-astro-cid-yc6sm5xs><span class="sub-heading-pill" data-astro-cid-yc6sm5xs>KEGIATAN MASYARAKAT</span><h2 class="agenda-section-title" data-astro-cid-yc6sm5xs>Agenda & Program Kerja</h2></div><a href="/program" class="view-all-link" data-astro-cid-yc6sm5xs><span data-astro-cid-yc6sm5xs>Lihat Semua Agenda</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-yc6sm5xs><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-yc6sm5xs></path></svg></a></div><!-- Agenda Cards Grid --><div class="agenda-cards-grid" data-astro-cid-yc6sm5xs>${agendaItems.map((item) => renderTemplate`<div class="agenda-item-card" data-astro-cid-yc6sm5xs><div class="agenda-card-thumb" data-astro-cid-yc6sm5xs><img${addAttribute(item.image, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="agenda-thumb-img" data-astro-cid-yc6sm5xs><span class="agenda-cat-badge" data-astro-cid-yc6sm5xs>${item.category}</span></div><div class="agenda-card-content" data-astro-cid-yc6sm5xs><div class="agenda-meta-date" data-astro-cid-yc6sm5xs><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-yc6sm5xs><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-astro-cid-yc6sm5xs></rect><line x1="16" y1="2" x2="16" y2="6" data-astro-cid-yc6sm5xs></line><line x1="8" y1="2" x2="8" y2="6" data-astro-cid-yc6sm5xs></line><line x1="3" y1="10" x2="21" y2="10" data-astro-cid-yc6sm5xs></line></svg><span data-astro-cid-yc6sm5xs>${item.date}${item.time ? ` (${item.time})` : ""}</span></div><h3 class="agenda-card-heading" data-astro-cid-yc6sm5xs>${item.title}</h3><div class="agenda-location-info" data-astro-cid-yc6sm5xs><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-yc6sm5xs><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-yc6sm5xs></path><circle cx="12" cy="10" r="3" data-astro-cid-yc6sm5xs></circle></svg><span data-astro-cid-yc6sm5xs>${item.location}</span></div><div class="agenda-card-foot" data-astro-cid-yc6sm5xs><span class="status-pill" data-astro-cid-yc6sm5xs>${item.status}</span><a href="/program" class="detail-btn" data-astro-cid-yc6sm5xs>Detail Agenda</a></div></div></div>`)}</div></div></section>`;
}, "C:/BMI/src/components/AgendaSection.astro", void 0);
//#endregion
//#region src/components/NewsDetailModal.astro
createAstro("https://astro.build");
var $$NewsDetailModal = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NewsDetailModal;
	const { newsList = [] } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div id="news-modal" class="modal-backdrop hidden" data-astro-cid-lpuydxvv><div class="modal-card" data-astro-cid-lpuydxvv><button id="close-news-modal" class="modal-close-btn" aria-label="Tutup modal" data-astro-cid-lpuydxvv><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-lpuydxvv><line x1="18" y1="6" x2="6" y2="18" data-astro-cid-lpuydxvv></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-lpuydxvv></line></svg></button><div class="modal-content-wrap" id="modal-content-wrap" data-astro-cid-lpuydxvv><div class="modal-hero" data-astro-cid-lpuydxvv><img id="modal-img" src="" alt="" class="modal-banner" data-astro-cid-lpuydxvv><div class="modal-category-badge" id="modal-category" data-astro-cid-lpuydxvv>Berita</div></div><div class="modal-body" data-astro-cid-lpuydxvv><span class="modal-date" id="modal-date" data-astro-cid-lpuydxvv></span><h2 class="modal-title" id="modal-title" data-astro-cid-lpuydxvv></h2><div class="modal-divider" data-astro-cid-lpuydxvv></div><div class="modal-text" id="modal-text" data-astro-cid-lpuydxvv></div></div></div></div></div><script>(function(){${defineScriptVars({ newsList })}
  window.newsData = newsList;

  window.openNewsDetailModal = function(id) {
    const item = window.newsData.find(n => n.id === id);
    if (!item) return;

    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-category').innerText = item.category || 'Berita';
    document.getElementById('modal-date').innerText = item.date;
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-text').innerText = item.content || item.excerpt;

    const modal = document.getElementById('news-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('news-modal');
    const closeBtn = document.getElementById('close-news-modal');

    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
})();<\/script>`;
}, "C:/BMI/src/components/NewsDetailModal.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const settings = await fetchSiteSettings();
	const heroSlides = await fetchHeroSlides();
	const news = await fetchNewsList();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${settings.siteName} - ${settings.subTitle}`,
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {
		"siteName": settings.siteName,
		"data-astro-cid-lcdefpme": true
	})}${maybeRenderHead($$result)}<main data-astro-cid-lcdefpme>${renderComponent($$result, "HeroSlider", $$HeroSlider, {
		"slides": heroSlides,
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "NewsSection", $$NewsSection, {
		"newsList": news.slice(0, 6),
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "AgendaSection", $$AgendaSection, { "data-astro-cid-lcdefpme": true })}</main>${renderComponent($$result, "Footer", $$Footer, {
		"settings": settings,
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "NewsDetailModal", $$NewsDetailModal, {
		"newsList": news,
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "LayananModal", $$LayananModal, { "data-astro-cid-lcdefpme": true })}` })}`;
}, "C:/BMI/src/pages/index.astro", void 0);
var $$file = "C:/BMI/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
