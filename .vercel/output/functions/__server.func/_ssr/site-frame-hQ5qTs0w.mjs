import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-frame-hQ5qTs0w.js
var import_jsx_runtime = require_jsx_runtime();
var SERVICE_OPTIONS = [
	"Local Move",
	"Long-Haul Freight",
	"Fleet Support",
	"Other"
];
var WINDOWS = [
	{
		id: "morning",
		label: "Morning",
		hours: "8–11 AM"
	},
	{
		id: "midday",
		label: "Midday",
		hours: "11 AM–2 PM"
	},
	{
		id: "afternoon",
		label: "Afternoon",
		hours: "2–5 PM"
	},
	{
		id: "evening",
		label: "Evening",
		hours: "5–7 PM"
	}
];
var LEAD_KEY = "moveit.lead";
var CONSULT_KEY = "moveit.consult";
function saveLead(lead) {
	localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
}
function readLead() {
	try {
		const raw = localStorage.getItem(LEAD_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data.name || !data.phone || !data.service) return null;
		if (!SERVICE_OPTIONS.includes(data.service)) return null;
		return data;
	} catch {
		return null;
	}
}
function saveConsult(consult) {
	localStorage.setItem(CONSULT_KEY, JSON.stringify(consult));
}
function readConsult() {
	try {
		const raw = localStorage.getItem(CONSULT_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data.date || !data.window) return null;
		if (!WINDOWS.some((item) => item.id === data.window)) return null;
		return data;
	} catch {
		return null;
	}
}
function upcomingDays(count = 6) {
	const days = [];
	const start = /* @__PURE__ */ new Date();
	start.setHours(12, 0, 0, 0);
	start.setDate(start.getDate() + 1);
	for (let i = 0; i < count; i += 1) {
		const date = new Date(start);
		date.setDate(start.getDate() + i);
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		days.push(`${date.getFullYear()}-${month}-${day}`);
	}
	return days;
}
function formatDay(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(year, (month ?? 1) - 1, day ?? 1);
	return {
		weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
		monthDay: date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		})
	};
}
function greetingName(full) {
	const first = full.trim().split(/\s+/)[0] ?? "";
	if (first.length < 2 || first.length > 24) return null;
	return first;
}
function Backdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 -z-10",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/photos/mountains.jpg",
			alt: "",
			className: "h-full w-full object-cover",
			fetchPriority: "high"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-dusk/50" })]
	});
}
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "/",
		className: "flex min-h-11 items-center gap-2.5 text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/favicon.svg",
			alt: "",
			className: "size-9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-extrabold tracking-tight",
			children: "Move it"
		})]
	});
}
function Sheet({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-sheet bg-paper text-ink shadow-2xl",
			children
		})
	});
}
var tap = "transition-transform duration-150 ease-out active:scale-[0.96] disabled:active:scale-100";
function AccentLink({ href, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: `inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-paper hover:bg-accent-deep ${tap} ${className}`,
		children
	});
}
function GhostButton({ children, className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink hover:bg-fog ${tap} ${className}`,
		...props,
		children
	});
}
function GhostLink({ href, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: `inline-flex h-12 items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink hover:bg-fog ${tap} ${className}`,
		children
	});
}
//#endregion
export { SERVICE_OPTIONS as a, Wordmark as c, readConsult as d, readLead as f, upcomingDays as h, GhostLink as i, formatDay as l, saveLead as m, Backdrop as n, Sheet as o, saveConsult as p, GhostButton as r, WINDOWS as s, AccentLink as t, greetingName as u };
