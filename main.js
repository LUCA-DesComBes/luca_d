document.addEventListener("DOMContentLoaded", () => {
	const navToggle = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector(".nav-menu");
	const themeToggle = document.querySelector(".theme-toggle");

	// Mobile menu
	navToggle?.addEventListener("click", () => {
		const expanded = navToggle.getAttribute("aria-expanded") === "true";
		navToggle.setAttribute("aria-expanded", String(!expanded));
		navMenu.classList.toggle("open");
	});

	// Theme toggle (light/dark)
	const setTheme = (t) => {
		document.body.dataset.theme = t;
		themeToggle.textContent = t === "dark" ? "🌙" : "☀️";
		localStorage.setItem("theme", t);
	};
	const saved = localStorage.getItem("theme");
	const prefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	setTheme(saved || (prefersDark ? "dark" : "light"));

	themeToggle?.addEventListener("click", () => {
		setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", (e) => {
			const href = a.getAttribute("href");
			if (href.length > 1) {
				e.preventDefault();
				document
					.querySelector(href)
					?.scrollIntoView({ behavior: "smooth", block: "start" });
				// close menu on mobile
				if (navMenu.classList.contains("open"))
					navMenu.classList.remove("open");
			}
		});
	});

	// Reveal on scroll
	const reveals = document.querySelectorAll("section, .card");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
					entry.target.classList.remove("reveal");
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	reveals.forEach((r) => {
		r.classList.add("reveal");
		io.observe(r);
	});
});
