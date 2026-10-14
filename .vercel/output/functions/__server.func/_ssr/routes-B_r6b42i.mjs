import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Play, r as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as SERVICE_OPTIONS, c as Wordmark, i as GhostLink, m as saveLead, n as Backdrop, o as Sheet, r as GhostButton, t as AccentLink } from "./site-frame-hQ5qTs0w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_r6b42i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CALC_SERVICES = [
	{
		id: "local",
		label: "Local move"
	},
	{
		id: "freight",
		label: "Freight"
	},
	{
		id: "fleet",
		label: "Fleet support"
	},
	{
		id: "specialty",
		label: "Specialized"
	}
];
var LOCAL_SIZES = [
	{
		id: "studio",
		label: "Studio or room"
	},
	{
		id: "small",
		label: "1–2 bedrooms"
	},
	{
		id: "family",
		label: "3–4 bedrooms"
	},
	{
		id: "large",
		label: "Large home"
	}
];
var WEIGHTS = [
	{
		id: "light",
		label: "Under 1,000 lb"
	},
	{
		id: "mid",
		label: "1,000–8,000 lb"
	},
	{
		id: "heavy",
		label: "Heavy or near-full"
	}
];
var DISTANCES = [
	{
		id: "short",
		label: "Under 50 miles"
	},
	{
		id: "regional",
		label: "50–150 miles"
	},
	{
		id: "long",
		label: "150–300 miles"
	},
	{
		id: "state",
		label: "Across Colorado"
	}
];
var FLEET_SPANS = [
	{
		id: "day",
		label: "One day"
	},
	{
		id: "week",
		label: "A week"
	},
	{
		id: "lane",
		label: "Ongoing weekly lane"
	}
];
var SPECIALTY_SCOPES = [
	{
		id: "piece",
		label: "Single piece"
	},
	{
		id: "room",
		label: "A room of valuables"
	},
	{
		id: "full",
		label: "Full specialty move"
	}
];
function round10(value) {
	return Math.round(value / 10) * 10;
}
function estimate(service, primary, distance) {
	if (service === "local") {
		const table = {
			studio: {
				low: 450,
				high: 850,
				detail: "A small Colorado local move. Usually one truck and a short carry."
			},
			small: {
				low: 750,
				high: 1500,
				detail: "Typical for a 1–2 bedroom home inside one Colorado metro."
			},
			family: {
				low: 1500,
				high: 2900,
				detail: "Typical for a 3–4 bedroom Colorado move, including a longer load."
			},
			large: {
				low: 2800,
				high: 5400,
				detail: "Typical for a large Colorado home. Access and packing move this the most."
			}
		};
		return table[primary] ?? table.small;
	}
	if (service === "freight") {
		const weight = {
			light: [240, 520],
			mid: [560, 1280],
			heavy: [1200, 2700]
		};
		const multiplier = {
			short: 1,
			regional: 1.35,
			long: 1.8,
			state: 2.2
		};
		const band = weight[primary] ?? weight.mid;
		const factor = multiplier[distance] ?? 1.35;
		return {
			low: round10(band[0] * factor),
			high: round10(band[1] * factor),
			detail: "Typical for Colorado point-to-point freight at this weight and distance. Waiting time and odd hours change it."
		};
	}
	if (service === "fleet") {
		const table = {
			day: {
				low: 820,
				high: 1400,
				detail: "A dedicated truck and driver for one Colorado day."
			},
			week: {
				low: 4100,
				high: 6900,
				detail: "A dedicated Colorado week. Extra stops are confirmed on the quote."
			},
			lane: {
				low: 3600,
				high: 6400,
				detail: "A recurring weekly lane inside Colorado, priced per week."
			}
		};
		return table[primary] ?? table.day;
	}
	const table = {
		piece: {
			low: 240,
			high: 680,
			detail: "One protected piece — piano, glass, or equipment — inside Colorado."
		},
		room: {
			low: 680,
			high: 1700,
			detail: "A room of items that need blankets, straps, and a slower load."
		},
		full: {
			low: 1700,
			high: 4400,
			detail: "A full specialty move. Handling is written into the quote."
		}
	};
	return table[primary] ?? table.piece;
}
function money(value) {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
}
function ChoiceRow({ label, choices, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "text-sm font-semibold text-ink",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: choices.map((choice) => {
			const selected = choice.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": selected,
				onClick: () => onChange(choice.id),
				className: `min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:bg-paper"}`,
				children: choice.label
			}, choice.id);
		})
	})] });
}
function Calculator() {
	const [service, setService] = (0, import_react.useState)("local");
	const [primary, setPrimary] = (0, import_react.useState)("small");
	const [distance, setDistance] = (0, import_react.useState)("regional");
	function chooseService(next) {
		setService(next);
		if (next === "local") setPrimary("small");
		if (next === "freight") setPrimary("mid");
		if (next === "fleet") setPrimary("day");
		if (next === "specialty") setPrimary("piece");
	}
	const result = (0, import_react.useMemo)(() => estimate(service, primary, distance), [
		service,
		primary,
		distance
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "estimate",
		className: "px-5 py-14 sm:px-10 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sheet bg-fog p-5 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-muted uppercase",
					children: "Ballpark"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl",
					children: "A typical Colorado range before anyone locks a price."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_0.8fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: "Service",
								choices: CALC_SERVICES,
								value: service,
								onChange: (id) => chooseService(id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: service === "local" ? "Home size" : service === "freight" ? "Rough weight" : service === "fleet" ? "How long you need the truck" : "Scope",
								choices: service === "local" ? LOCAL_SIZES : service === "freight" ? WEIGHTS : service === "fleet" ? FLEET_SPANS : SPECIALTY_SCOPES,
								value: primary,
								onChange: setPrimary
							}),
							service === "freight" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: "Distance inside Colorado",
								choices: DISTANCES,
								value: distance,
								onChange: setDistance
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-ink p-6 text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-paper/70 uppercase",
								children: "Typical range"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-4xl font-extrabold tracking-tight tabular-nums",
								"aria-live": "polite",
								children: [
									money(result.low),
									"–",
									money(result.high)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-accent",
								children: "Typical for Colorado — not a firm quote."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-pretty text-paper/80",
								children: result.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#quote",
								className: "mt-6 inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96]",
								children: "Get a written quote"
							})
						]
					})]
				})
			]
		})
	});
}
var field = "mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink outline-none transition focus:border-accent";
function QuoteForm({ idPrefix, anchorId }) {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [service, setService] = (0, import_react.useState)("Local Move");
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	function onSubmit(event) {
		event.preventDefault();
		const trimmedName = name.trim();
		const digits = phone.replace(/\D/g, "");
		if (trimmedName.length < 2) {
			setError("Add your name so we know who the quote is for.");
			return;
		}
		if (digits.length < 10) {
			setError("Add a phone number we can reach. No company line is listed here.");
			return;
		}
		setError(null);
		saveLead({
			name: trimmedName,
			phone: phone.trim(),
			service,
			message: message.trim(),
			submittedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		navigate({ to: "/thank-you" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		id: anchorId,
		onSubmit,
		className: "rounded-2xl bg-fog p-4 sm:p-5",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-ink",
					children: "Request a quote"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "About a minute"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold text-ink",
						htmlFor: `${idPrefix}-name`,
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `${idPrefix}-name`,
							name: "name",
							autoComplete: "name",
							value: name,
							onChange: (event) => setName(event.target.value),
							className: field,
							placeholder: "Your name",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold text-ink",
						htmlFor: `${idPrefix}-phone`,
						children: ["Phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `${idPrefix}-phone`,
							name: "phone",
							type: "tel",
							inputMode: "tel",
							autoComplete: "tel",
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							className: field,
							placeholder: "Mobile number",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold text-ink",
						htmlFor: `${idPrefix}-service`,
						children: ["Service needed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: `${idPrefix}-service`,
							name: "service",
							value: service,
							onChange: (event) => setService(event.target.value),
							className: field,
							children: SERVICE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: option,
								children: option
							}, option))
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-3 text-sm font-medium text-accent-deep",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "order-2 text-xs leading-relaxed text-muted sm:order-1",
					children: "Next page: pick a consult window. We’ll use the number you entered."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "order-1 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96] sm:order-2",
					children: "Get Instant Quote"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-xs font-semibold text-ink",
				htmlFor: `${idPrefix}-message`,
				children: [
					"Message ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-muted",
						children: "(optional)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `${idPrefix}-message`,
						name: "message",
						value: message,
						onChange: (event) => setMessage(event.target.value),
						className: field,
						placeholder: "Cities, date, or what you’re moving",
						maxLength: 400
					})
				]
			})
		]
	});
}
var LANES = [
	{
		from: "Denver",
		to: "Colorado Springs",
		state: "On time",
		hot: true
	},
	{
		from: "Boulder",
		to: "Fort Collins",
		state: "Loading",
		hot: false
	},
	{
		from: "Grand Junction",
		to: "Denver",
		state: "In transit",
		hot: true
	},
	{
		from: "Pueblo",
		to: "Aurora",
		state: "Scheduled",
		hot: false
	}
];
var SERVICES = [
	{
		title: "Local Colorado moves",
		body: "Apartments and homes inside Colorado. A clear arrival window and furniture that arrives the way it left.",
		image: "/photos/cab.jpg",
		alt: "Driver heading toward a Colorado mountain pass"
	},
	{
		title: "Statewide freight",
		body: "Pallets, equipment, and overflow inventory between Colorado cities. A window and a status — not a black box.",
		image: "/photos/dock.jpg",
		alt: "Semi-truck at a loading dock with mountains behind"
	},
	{
		title: "Fleet support",
		body: "A dedicated truck and driver when the week needs a lane you can count on. Built for recurring business runs.",
		image: "/photos/fleet.jpg",
		alt: "Four semi-trucks lined up in a Colorado valley at dawn"
	},
	{
		title: "Specialized handling",
		body: "Pianos, glass, and shop equipment that can’t ride loose. Wrapped, strapped, and walked through before it moves.",
		image: "/photos/cargo.jpg",
		alt: "Piano and furniture strapped inside a moving truck"
	}
];
var FAQS = [
	{
		q: "How does pricing work?",
		a: "The calculator shows a typical Colorado range. It is not a locked price. After a short call you get a written number based on the actual job — size, access, and distance. No mystery line items added after you book."
	},
	{
		q: "Where do you work?",
		a: "Colorado, statewide. That covers local moves and longer runs between Colorado cities. If a job starts or ends outside the state, say so in the message and we’ll tell you plainly whether we can take it."
	},
	{
		q: "How fast can you schedule?",
		a: "Local moves are often set within a few days when the calendar is open. Freight and dedicated trucks are booked against a window you choose. The next page lets you pick a consult time so the quote call doesn’t drift."
	},
	{
		q: "What about insurance and handling?",
		a: "Coverage and how the load is protected are confirmed in writing with your quote. Specialized pieces are called out before a truck is assigned. We don’t bury the handling plan in fine print, and we don’t publish license numbers on this page."
	},
	{
		q: "What happens after I send the form?",
		a: "You pick a time window. We reach you on the phone number you entered, confirm scope, and send a written price. You decide whether to book. There is no obligation."
	}
];
function FilmDialog({ mode, onClose }) {
	(0, import_react.useEffect)(() => {
		if (!mode) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = previous;
		};
	}, [mode, onClose]);
	if (!mode) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-dusk/80 p-3 sm:items-center",
		role: "presentation",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "film-title",
			className: "w-full max-w-3xl rounded-2xl bg-ink p-3 text-paper shadow-2xl sm:p-4",
			onClick: (event) => event.stopPropagation(),
			children: [mode === "route" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: "/photos/route.mp4",
				poster: "/photos/highway.jpg",
				controls: true,
				playsInline: true,
				className: "aspect-video w-full rounded-xl bg-dusk"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/photos/cab.jpg",
				alt: "Driver heading toward a Colorado mountain pass",
				className: "aspect-video w-full rounded-xl object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 px-2 pt-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "film-title",
					className: "text-xl font-bold text-balance",
					children: mode === "route" ? "Colorado routes" : "45-second crew film"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-relaxed text-pretty text-paper/80",
					children: mode === "route" ? "A short look at the kind of highway this work lives on. Press play for sound." : "This slot is for a short introduction from the Move it crew — how a Colorado job is scoped, loaded, and closed. The film isn’t up yet. Your quote call covers the same ground."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex h-11 shrink-0 items-center rounded-full bg-paper px-4 text-sm font-semibold text-ink",
					children: "Close"
				})]
			})]
		})
	});
}
function HomePage() {
	const [film, setFilm] = (0, import_react.useState)(null);
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pb-24 md:pb-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-4 px-5 py-4 sm:px-10 sm:py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccentLink, {
						href: "#quote",
						className: "px-4 sm:px-5",
						children: "Get Instant Quote"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "px-5 pb-8 sm:px-10 sm:pb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs font-semibold tracking-widest text-muted uppercase",
							children: "Colorado Transport Solutions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mx-auto mt-3 max-w-4xl text-center text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl sm:leading-tight",
							children: "Reliable Transport Across Colorado: From Local Moves to Statewide Freight."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted sm:text-lg",
							children: "On-time windows, fewer surprise costs, and a straight answer from the first call to the last mile."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostLink, {
								href: "#services",
								children: "View Services"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
								onClick: () => setFilm("route"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
									className: "size-4 fill-current",
									"aria-hidden": "true"
								}), "Watch Video"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-6 max-w-4xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, {
								idPrefix: "hero",
								anchorId: "quote"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "relative flex min-h-96 flex-col justify-end overflow-hidden rounded-2xl bg-ink text-paper",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/photos/truck-night.jpg",
											alt: "Matte black semi-truck at night",
											className: "absolute inset-0 h-full w-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "photo-fade absolute inset-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "relative p-5 text-sm font-medium leading-relaxed",
											children: "One contact for the whole Colorado run — load, road, and delivery."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "flex min-h-96 flex-col rounded-2xl bg-ink p-4 text-paper",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold tracking-widest text-paper/60 uppercase",
											children: "Sample day"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-2 text-lg font-semibold leading-snug text-balance",
											children: "Schedules you can read. Windows, not guesswork."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex flex-1 flex-col rounded-xl bg-paper p-3 text-ink",
											children: [LANES.map((lane) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 border-b border-line py-2.5 last:border-b-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `size-1.5 shrink-0 rounded-full ${lane.hot ? "bg-accent" : "bg-line"}`,
														"aria-hidden": "true"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0 flex-1 truncate text-sm font-medium",
														children: [
															lane.from,
															" → ",
															lane.to
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `shrink-0 text-xs font-semibold ${lane.hot ? "text-accent" : "text-muted"}`,
														children: lane.state
													})
												]
											}, `${lane.from}-${lane.to}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-auto pt-2 text-xs text-muted",
												children: "Illustrative schedule. Not live tracking."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFilm("route"),
									className: "group relative min-h-96 overflow-hidden rounded-2xl bg-ink text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/photos/highway.jpg",
											alt: "Semi-truck on a Colorado mountain highway at sunset",
											className: "absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-dusk/20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-paper/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-lg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												className: "size-4 fill-current",
												"aria-hidden": "true"
											}), "Watch Video"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "flex min-h-96 flex-col overflow-hidden rounded-2xl bg-ink text-paper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold tracking-widest text-paper/60 uppercase",
												children: "Colorado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-3 text-lg font-semibold leading-snug text-balance",
												children: "Trusted by people who need the truck when it was promised."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-paper/80",
												children: "Serving Colorado businesses and families."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/photos/trails.jpg",
										alt: "Night highway light trails through the Colorado mountains",
										className: "mt-auto h-44 w-full object-cover"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "services",
					className: "border-t border-line px-5 py-14 sm:px-10 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-muted uppercase",
							children: "Services"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
							children: "Four ways we move Colorado. Same standard on each."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-8 sm:grid-cols-2",
							children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: service.image,
									alt: service.alt,
									className: "aspect-[3/2] w-full rounded-2xl object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-xl font-bold tracking-tight",
									children: service.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-pretty text-muted sm:text-base",
									children: service.body
								})
							] }, service.title))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "film",
					className: "border-t border-line px-5 py-14 sm:px-10 sm:py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-center gap-8 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setFilm("team"),
							className: "group relative overflow-hidden rounded-2xl text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/photos/cab.jpg",
									alt: "From the cab, a Colorado highway at dusk",
									className: "aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-dusk/25" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/95 px-4 py-2.5 text-sm font-semibold text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "size-4 fill-current",
										"aria-hidden": "true"
									}), "Play · 45 sec"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-muted uppercase",
								children: "The crew"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
								children: "Forty-five seconds with the people on the truck."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-base leading-relaxed text-pretty text-muted",
								children: "How a Colorado job is walked, loaded, and closed. The film slot is ready. Until it runs, the quote call is the same conversation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccentLink, {
									href: "#quote",
									children: "Book a quote call"
								})
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-t border-line px-5 py-14 sm:px-10 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-muted uppercase",
							children: "On the road"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
							children: "Serving Colorado businesses and families."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-pretty text-muted",
							children: "Neighborhood moves and business inventory. One standard: show up, protect the load, land the window."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-4",
							children: [
								["/photos/highway.jpg", "Semi-truck on a high Colorado highway"],
								["/photos/dock.jpg", "Freight truck at a dock after dusk"],
								["/photos/fleet.jpg", "Fleet staged against snowy Colorado peaks"],
								["/photos/trails.jpg", "Mountain highway at night"]
							].map(([src, alt]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt,
								className: "aspect-[4/3] w-full rounded-2xl object-cover"
							}, src))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "faq",
					className: "border-t border-line px-5 py-14 sm:px-10 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-muted uppercase",
							children: "Questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
							children: "Straight answers before you book."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 border-t border-line",
							children: FAQS.map((item, index) => {
								const open = openFaq === index;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-line",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex w-full items-center justify-between gap-4 py-5 text-left",
										"aria-expanded": open,
										onClick: () => setOpenFaq(open ? null : index),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-semibold sm:text-lg",
											children: item.q
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: `size-5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`,
											"aria-hidden": "true"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "faq-panel",
										"data-open": open ? "true" : "false",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "max-w-3xl pb-5 text-sm leading-relaxed text-pretty text-muted sm:text-base",
												children: item.a
											})
										})
									})]
								}, item.q);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-t border-line px-5 py-14 sm:px-10 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs font-semibold tracking-widest text-muted uppercase",
							children: "Next step"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mx-auto mt-2 max-w-2xl text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
							children: "Get a Colorado quote without the runaround."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-center text-pretty text-muted",
							children: "Send the form. Pick a window on the next page. We’ll confirm scope and a written price."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-8 max-w-4xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, { idPrefix: "final" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pb-8 text-center text-sm text-muted sm:px-10",
					children: "Move it · Colorado"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#quote",
				className: "flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper",
				children: "Get Instant Quote"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmDialog, {
			mode: film,
			onClose: () => setFilm(null)
		})
	] });
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
