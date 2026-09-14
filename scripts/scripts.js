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

})();
