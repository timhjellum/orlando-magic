(function () {
	var media = document.getElementById("bmCompare");
	if (!media) return;
	var after = media.querySelector(".compare-after");
	var handle = media.querySelector(".compare-handle");
	var dragging = false;

	function setPct(pct) {
		pct = Math.max(0, Math.min(100, pct));
		after.style.clipPath = "inset(0 0 0 " + pct + "%)";
		handle.style.left = pct + "%";
		media.setAttribute("aria-valuenow", Math.round(pct));
	}
	function pctFromEvent(e) {
		var rect = media.getBoundingClientRect();
		var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
		return (x / rect.width) * 100;
	}
	function onDown(e) {
		dragging = true;
		setPct(pctFromEvent(e));
		media.setPointerCapture &&
			e.pointerId != null &&
			media.setPointerCapture(e.pointerId);
	}
	function onMove(e) {
		if (!dragging) return;
		setPct(pctFromEvent(e));
	}
	function onUp() {
		dragging = false;
	}

	media.addEventListener("pointerdown", onDown);
	media.addEventListener("pointermove", onMove);
	media.addEventListener("pointerup", onUp);
	media.addEventListener("pointercancel", onUp);
	media.addEventListener("keydown", function (e) {
		var current = parseFloat(media.getAttribute("aria-valuenow")) || 50;
		if (e.key === "ArrowLeft") {
			setPct(current - 5);
			e.preventDefault();
		}
		if (e.key === "ArrowRight") {
			setPct(current + 5);
			e.preventDefault();
		}
	});

	setPct(50);

	("use strict");

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
