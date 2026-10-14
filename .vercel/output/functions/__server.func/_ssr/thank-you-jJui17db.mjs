import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Wordmark, d as readConsult, f as readLead, h as upcomingDays, i as GhostLink, l as formatDay, n as Backdrop, o as Sheet, p as saveConsult, s as WINDOWS, u as greetingName } from "./site-frame-hQ5qTs0w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thank-you-jJui17db.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThankYouPage() {
	const [lead, setLead] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [days, setDays] = (0, import_react.useState)([]);
	const [date, setDate] = (0, import_react.useState)("");
	const [slot, setSlot] = (0, import_react.useState)("morning");
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const storedLead = readLead();
		const storedConsult = readConsult();
		const nextDays = upcomingDays(6);
		setLead(storedLead);
		setDays(nextDays);
		if (storedConsult && nextDays.includes(storedConsult.date)) {
			setDate(storedConsult.date);
			setSlot(storedConsult.window);
			setSaved(true);
		} else setDate(nextDays[0] ?? "");
		setReady(true);
	}, []);
	const chosen = WINDOWS.find((item) => item.id === slot) ?? WINDOWS[0];
	const dayLabel = date ? formatDay(date) : null;
	const name = lead ? greetingName(lead.name) : null;
	function holdWindow() {
		if (!date) return;
		saveConsult({
			date,
			window: slot,
			savedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaved(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostLink, {
				href: "/#quote",
				children: "Edit request"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 pt-2 pb-12 sm:px-10 sm:pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-muted uppercase",
					children: "Request received"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl",
					children: name ? `Thanks, ${name}.` : "Thanks — we have your request."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted",
					children: lead ? `Your ${lead.service.toLowerCase()} quote is in. Pick a window for a short consult. We’ll use the phone number you entered.` : "If you just sent the form, your details are stored on this device. If not, start with the quote form so we know how to reach you."
				}),
				!lead && ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostLink, {
						href: "/#quote",
						children: "Get Instant Quote"
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Choose a consult window"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Next available days. Times are local to you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-2 overflow-x-auto pb-1",
							children: days.map((iso) => {
								const label = formatDay(iso);
								const selected = iso === date;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": selected,
									onClick: () => {
										setDate(iso);
										setSaved(false);
									},
									className: `min-h-16 min-w-24 shrink-0 rounded-2xl border px-3 py-3 text-left transition-colors ${selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-semibold tracking-wide uppercase",
										children: label.weekday
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm font-bold",
										children: label.monthDay
									})]
								}, iso);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: WINDOWS.map((item) => {
								const selected = item.id === slot;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": selected,
									onClick: () => {
										setSlot(item.id);
										setSaved(false);
									},
									className: `min-h-16 rounded-2xl border px-3 py-3 text-left transition-colors ${selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-bold",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `mt-1 block text-xs ${selected ? "text-paper/75" : "text-muted"}`,
										children: item.hours
									})]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: holdWindow,
							disabled: !ready || !date,
							className: "mt-5 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96] disabled:opacity-60",
							children: saved ? "Update window" : "Save this window"
						})
					]
				}),
				saved && dayLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 max-w-xl rounded-2xl bg-accent-soft p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg font-bold text-ink",
							children: [
								"Consult held for ",
								dayLabel.weekday,
								", ",
								dayLabel.monthDay,
								", ",
								chosen.hours,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We reach out in that window on the number you gave us." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We confirm what is moving, where in Colorado, and access." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You get a written price. You choose whether to schedule." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-ink",
							children: "No obligation to book. This window stays on this device."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-sm leading-relaxed text-muted",
					children: "Saving a window doesn’t book a truck. It tells us when to talk."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 pb-8 text-center text-sm text-muted",
			children: "Move it · Colorado"
		})
	] })] });
}
//#endregion
export { ThankYouPage as component };
