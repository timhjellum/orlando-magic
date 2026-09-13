(function () {
	"use strict";

	var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
	var slides = items.map(function (el) {
		var img = el.querySelector("svg");
		return {
			src: img.getAttribute("src"),
			title: el.querySelector(".cap-title").textContent,
			desc: el.querySelector(".cap-desc").textContent
		};
	});

	var lightbox = document.getElementById("lightbox");
	var lbImg = document.getElementById("lightbox-img");
	var lbTitle = document.getElementById("lightbox-title");
	var lbDesc = document.getElementById("lightbox-desc");
	var lbCounter = document.getElementById("lightbox-counter");
	var closeBtn = document.getElementById("lightbox-close");
	var prevBtn = document.getElementById("lightbox-prev");
	var nextBtn = document.getElementById("lightbox-next");

	var currentIndex = 0;
	var lastFocused = null;

	function render() {
		var slide = slides[currentIndex];
		lbImg.setAttribute("src", slide.src);
		lbImg.setAttribute("alt", slide.title);
		lbTitle.textContent = slide.title;
		lbDesc.textContent = slide.desc;
		lbCounter.textContent = (currentIndex + 1) + " / " + slides.length;
	}

	function openLightbox(index) {
		currentIndex = index;
		lastFocused = document.activeElement;
		render();
		lightbox.classList.add("is-open");
		lightbox.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		closeBtn.focus();
	}

	function closeLightbox() {
		lightbox.classList.remove("is-open");
		lightbox.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
		lbImg.setAttribute("src", "");
		if (lastFocused) { lastFocused.focus(); }
	}

	function step(delta) {
		currentIndex = (currentIndex + delta + slides.length) % slides.length;
		render();
	}

	items.forEach(function (el, i) {
		el.addEventListener("click", function () { openLightbox(i); });
	});

	closeBtn.addEventListener("click", closeLightbox);
	prevBtn.addEventListener("click", function () { step(-1); });
	nextBtn.addEventListener("click", function () { step(1); });

	lightbox.addEventListener("click", function (e) {
		if (e.target === lightbox) { closeLightbox(); }
	});

	document.addEventListener("keydown", function (e) {
		if (!lightbox.classList.contains("is-open")) { return; }
		if (e.key === "Escape") { closeLightbox(); }
		else if (e.key === "ArrowLeft") { step(-1); }
		else if (e.key === "ArrowRight") { step(1); }
		else if (e.key === "Tab") {
			var focusable = [closeBtn, prevBtn, nextBtn];
			var idx = focusable.indexOf(document.activeElement);
			e.preventDefault();
			if (e.shiftKey) {
				idx = (idx <= 0) ? focusable.length - 1 : idx - 1;
			} else {
				idx = (idx === -1 || idx === focusable.length - 1) ? 0 : idx + 1;
			}
			focusable[idx].focus();
		}
	});

	/* Scrollspy for nav */
	var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
	var sections = navLinks.map(function (a) {
		return document.querySelector(a.getAttribute("href"));
	});

	function updateActive() {
		var pos = window.scrollY + 120;
		var activeIdx = 0;
		for (var i = 0; i < sections.length; i++) {
			if (sections[i] && sections[i].offsetTop <= pos) { activeIdx = i; }
		}
		navLinks.forEach(function (a, i) {
			a.classList.toggle("is-active", i === activeIdx);
		});
	}

	window.addEventListener("scroll", updateActive, { passive: true });
	updateActive();


	/* ------------------------------------------------------------------
	 CodePen can't host a .json file. Requesting "skills.json" returns a
	 404 whose body is this pen's own HTML, so the fetch always fails.
 
	 Pick ONE of these:
	   A) Leave DATA_URL null and use the inline DATA below (simplest).
	   B) Upload json.json to your CodePen Assets (you have Pro) and put
		  the full https://assets.codepen.io/... URL in DATA_URL.
	   C) Point DATA_URL at any CORS-enabled host (GitHub raw, gist, etc).
  ------------------------------------------------------------------ */
	//var DATA_URL = null;
	var DATA_URL = "skills.json";

	var DATA = {
		skillsHeader: "Skills Header",
		skillsDesc: "This is the skills description",
		skills: [
			{
				skillName: "Stakeholder Alignment",
				skillDesc:
					"Facilitated Discovery, Requirements Analysis, Stakeholder Interviews, Iterative Design, and Design Reviews to align business objectives with user needs."
			},
			{
				skillName: "Content Inventory",
				skillDesc:
					"Conducted comprehensive content inventories to catalog existing digital assets, assess content structure and quality, and establish a foundation for information architecture and migration."
			},
			{
				skillName: "Taxonomy",
				skillDesc:
					"Developed content taxonomies and classification structures to organize information, improve findability, and establish consistent relationships across the system."
			},
			{
				skillName: "User Personas",
				skillDesc:
					"Conducted persona development to establish user profiles, define key goals and behaviors, and inform the overall UX and information architecture."
			},
			{
				skillName: "User Flows",
				skillDesc:
					"Designed User Flows and interaction patterns to simplify complex workflows"
			},
			{
				skillName: "Wireframes",
				skillDesc:
					"Created Wireframes to define page structure, functionality, and user interactions"
			},
			{
				skillName: "Interactive Prototypes",
				skillDesc:
					"Developed Interactive Prototypes to validate concepts and communicate design solutions"
			},
			{
				skillName: "Sitemaps",
				skillDesc:
					"Developed Site Architecture and Sitemaps to define content hierarchy, navigation, and overall digital structure"
			}
		],
		tags: [
			{ tagName: "Stakeholder Alignment" },
			{ tagName: "Business Requirements" },
			{ tagName: "Functional Specifications" },
			{ tagName: "Wireframes" },
			{ tagName: "Storyboards" },
			{ tagName: "Hi / Lo-Fidelity Prototyping" },
			{ tagName: "Use-Case & Scenarios" },
			{ tagName: "Sitemaps" },
			{ tagName: "Taxonomies" },
			{ tagName: "SEO" }
		]
	};

	var $1 = function (sel) {
		return document.querySelector(sel);
	};

	// Null-safe: this pen has no #header / #description / #source, and the
	// old code threw on the first one it touched.
	function setText(sel, value) {
		var el = $1(sel);
		if (el) el.textContent = value;
	}

	function parseLoose(text) {
		try {
			return JSON.parse(text);
		} catch (e) {
			return JSON.parse(text.replace(/,(\s*[}\]])/g, "$1"));
		}
	}

	function decodeEntities(str) {
		var el = document.createElement("textarea");
		el.innerHTML = String(str);
		return el.value;
	}

	function render(data) {
		var skills = Array.isArray(data.skills) ? data.skills : [];
		var tags = Array.isArray(data.tags) ? data.tags : [];

		// Optional — only written if those elements exist in the markup.
		setText("#header", data.skillsHeader || "");
		setText("#description", data.skillsDesc || "");

		var stepsEl = $1(".steps");
		var tagsEl = $1(".skill-tags");

		if (tagsEl) {
			tagsEl.textContent = "";
			tags.forEach(function (tag, i) {
				var span = document.createElement("span");
				span.className = "tag";
				span.style.animationDelay = i * 45 + "ms";
				span.textContent = decodeEntities(tag.tagName || "");
				tagsEl.appendChild(span);
			});
		}

		if (stepsEl) {
			stepsEl.textContent = "";
			skills.forEach(function (skill, i) {
				var card = document.createElement("div");
				card.className = "card";
				card.style.animationDelay = i * 70 + "ms";

				var num = document.createElement("div");
				num.className = "num";
				num.textContent = String(i + 1).padStart(2, "0");

				var title = document.createElement("div");
				title.className = "title";
				title.textContent = decodeEntities(skill.skillName || "");

				var desc = document.createElement("div");
				desc.className = "desc";
				desc.textContent = decodeEntities(skill.skillDesc || "");

				card.appendChild(num);
				card.appendChild(title);
				card.appendChild(desc);
				stepsEl.appendChild(card);
			});
		}

		if (!stepsEl && !tagsEl) {
			console.warn(
				"[skills] No .steps or .skill-tags container found in the markup."
			);
		}
	}

	function start() {
		if (!DATA_URL) {
			render(DATA);
			return;
		}

		fetch(DATA_URL, { cache: "no-store" })
			.then(function (res) {
				if (!res.ok) throw new Error("HTTP " + res.status);
				var type = res.headers.get("content-type") || "";
				if (type.indexOf("html") !== -1)
					throw new Error("got HTML, not JSON — bad path?");
				return res.text();
			})
			.then(function (text) {
				render(parseLoose(text));
			})
			.catch(function (err) {
				console.warn(
					"[skills] " +
					DATA_URL +
					" failed (" +
					err.message +
					") — using inline data."
				);
				render(DATA);
			});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start);
	} else {
		start();
	}
})();
