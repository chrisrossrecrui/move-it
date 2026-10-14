import { useEffect, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Calculator } from "@/components/calculator";
import { QuoteForm } from "@/components/quote-form";
import { AccentLink, Backdrop, GhostButton, GhostLink, Sheet, Wordmark } from "@/components/site-frame";

const LANES = [
  { from: "Denver", to: "Colorado Springs", state: "On time", hot: true },
  { from: "Boulder", to: "Fort Collins", state: "Loading", hot: false },
  { from: "Grand Junction", to: "Denver", state: "In transit", hot: true },
  { from: "Pueblo", to: "Aurora", state: "Scheduled", hot: false },
];

const SERVICES = [
  {
    title: "Local Colorado moves",
    body: "Apartments and homes inside Colorado. A clear arrival window and furniture that arrives the way it left.",
    image: "/photos/cab.jpg",
    alt: "Driver heading toward a Colorado mountain pass",
  },
  {
    title: "Statewide freight",
    body: "Pallets, equipment, and overflow inventory between Colorado cities. A window and a status — not a black box.",
    image: "/photos/dock.jpg",
    alt: "Semi-truck at a loading dock with mountains behind",
  },
  {
    title: "Fleet support",
    body: "A dedicated truck and driver when the week needs a lane you can count on. Built for recurring business runs.",
    image: "/photos/fleet.jpg",
    alt: "Four semi-trucks lined up in a Colorado valley at dawn",
  },
  {
    title: "Specialized handling",
    body: "Pianos, glass, and shop equipment that can’t ride loose. Wrapped, strapped, and walked through before it moves.",
    image: "/photos/cargo.jpg",
    alt: "Piano and furniture strapped inside a moving truck",
  },
];

const FAQS = [
  {
    q: "How does pricing work?",
    a: "The calculator shows a typical Colorado range. It is not a locked price. After a short call you get a written number based on the actual job — size, access, and distance. No mystery line items added after you book.",
  },
  {
    q: "Where do you work?",
    a: "Colorado, statewide. That covers local moves and longer runs between Colorado cities. If a job starts or ends outside the state, say so in the message and we’ll tell you plainly whether we can take it.",
  },
  {
    q: "How fast can you schedule?",
    a: "Local moves are often set within a few days when the calendar is open. Freight and dedicated trucks are booked against a window you choose. The next page lets you pick a consult time so the quote call doesn’t drift.",
  },
  {
    q: "What about insurance and handling?",
    a: "Coverage and how the load is protected are confirmed in writing with your quote. Specialized pieces are called out before a truck is assigned. We don’t bury the handling plan in fine print, and we don’t publish license numbers on this page.",
  },
  {
    q: "What happens after I send the form?",
    a: "You pick a time window. We reach you on the phone number you entered, confirm scope, and send a written price. You decide whether to book. There is no obligation.",
  },
];

function FilmDialog({
  mode,
  onClose,
}: {
  mode: "route" | "team" | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!mode) return;
    const onKey = (event: KeyboardEvent) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-dusk/80 p-3 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="film-title"
        className="w-full max-w-3xl rounded-2xl bg-ink p-3 text-paper shadow-2xl sm:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        {mode === "route" ? (
          <video
            src="/photos/route.mp4"
            poster="/photos/highway.jpg"
            controls
            playsInline
            className="aspect-video w-full rounded-xl bg-dusk"
          />
        ) : (
          <img
            src="/photos/cab.jpg"
            alt="Driver heading toward a Colorado mountain pass"
            className="aspect-video w-full rounded-xl object-cover"
          />
        )}
        <div className="flex items-start justify-between gap-4 px-2 pt-4 pb-2">
          <div>
            <h2 id="film-title" className="text-xl font-bold text-balance">
              {mode === "route" ? "Colorado routes" : "45-second crew film"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-paper/80">
              {mode === "route"
                ? "A short look at the kind of highway this work lives on. Press play for sound."
                : "This slot is for a short introduction from the Move it crew — how a Colorado job is scoped, loaded, and closed. The film isn’t up yet. Your quote call covers the same ground."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-paper px-4 text-sm font-semibold text-ink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const [film, setFilm] = useState<"route" | "team" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Backdrop />
      <div className="pb-24 md:pb-10">
        <Sheet>
          <section className="relative overflow-hidden">
            <img
              src="/photos/header.jpg"
              alt="Semi-truck on a Colorado mountain highway at sunset"
              className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dusk/55 via-dusk/15 to-dusk/25" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-paper/80 to-paper sm:h-32" />

            <div className="relative flex items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6">
              <Wordmark onDark />
              <AccentLink href="#quote" className="px-4 sm:px-5">
                Get Instant Quote
              </AccentLink>
            </div>

            <div className="relative px-5 pt-6 pb-20 text-center sm:px-10 sm:pt-10 sm:pb-24">
              <p className="text-xs font-semibold tracking-widest text-paper/90 uppercase">
                Colorado Transport Solutions
              </p>
              <h1 className="hero-title mx-auto mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-balance text-paper sm:text-5xl sm:leading-tight">
                Reliable Transport Across Colorado: From Local Moves to Statewide Freight.
              </h1>
            </div>
          </section>

          <section className="px-5 pb-8 sm:px-10 sm:pb-10">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted sm:text-lg">
              On-time windows, fewer surprise costs, and a straight answer from the first call to the last mile.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <GhostLink href="#services">View Services</GhostLink>
              <GhostButton onClick={() => setFilm("route")}>
                <Play className="size-4 fill-current" aria-hidden="true" />
                Watch Video
              </GhostButton>
            </div>
            <div className="mx-auto mt-6 max-w-4xl">
              <QuoteForm idPrefix="hero" anchorId="quote" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <article className="relative flex min-h-96 flex-col justify-end overflow-hidden rounded-2xl bg-ink text-paper">
                <img
                  src="/photos/truck-night.jpg"
                  alt="Matte black semi-truck at night"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="photo-fade absolute inset-0" />
                <p className="relative p-5 text-sm font-medium leading-relaxed">
                  One contact for the whole Colorado run — load, road, and delivery.
                </p>
              </article>

              <article className="flex min-h-96 flex-col rounded-2xl bg-ink p-4 text-paper">
                <p className="text-xs font-semibold tracking-widest text-paper/60 uppercase">
                  Sample day
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-balance">
                  Schedules you can read. Windows, not guesswork.
                </h2>
                <div className="mt-4 flex flex-1 flex-col rounded-xl bg-paper p-3 text-ink">
                  {LANES.map((lane) => (
                    <div
                      key={`${lane.from}-${lane.to}`}
                      className="flex items-center gap-2 border-b border-line py-2.5 last:border-b-0"
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${lane.hot ? "bg-accent" : "bg-line"}`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {lane.from} → {lane.to}
                      </span>
                      <span
                        className={`shrink-0 text-xs font-semibold ${lane.hot ? "text-accent" : "text-muted"}`}
                      >
                        {lane.state}
                      </span>
                    </div>
                  ))}
                  <p className="mt-auto pt-2 text-xs text-muted">Illustrative schedule. Not live tracking.</p>
                </div>
              </article>

              <button
                type="button"
                onClick={() => setFilm("route")}
                className="group relative min-h-96 overflow-hidden rounded-2xl bg-ink text-left"
              >
                <img
                  src="/photos/highway.jpg"
                  alt="Semi-truck on a Colorado mountain highway at sunset"
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-dusk/20" />
                <span className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-paper/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-lg">
                  <Play className="size-4 fill-current" aria-hidden="true" />
                  Watch Video
                </span>
              </button>

              <article className="flex min-h-96 flex-col overflow-hidden rounded-2xl bg-ink text-paper">
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-widest text-paper/60 uppercase">Colorado</p>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-balance">
                    Trusted by people who need the truck when it was promised.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-paper/80">
                    Serving Colorado businesses and families.
                  </p>
                </div>
                <img
                  src="/photos/trails.jpg"
                  alt="Night highway light trails through the Colorado mountains"
                  className="mt-auto h-44 w-full object-cover"
                />
              </article>
            </div>
          </section>

          <section id="services" className="border-t border-line px-5 py-14 sm:px-10 sm:py-16">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Services</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Four ways we move Colorado. Same standard on each.
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <article key={service.title}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted sm:text-base">
                    {service.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="film" className="border-t border-line px-5 py-14 sm:px-10 sm:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <button
                type="button"
                onClick={() => setFilm("team")}
                className="group relative overflow-hidden rounded-2xl text-left"
              >
                <img
                  src="/photos/cab.jpg"
                  alt="From the cab, a Colorado highway at dusk"
                  className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-dusk/25" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/95 px-4 py-2.5 text-sm font-semibold text-ink">
                  <Play className="size-4 fill-current" aria-hidden="true" />
                  Play · 45 sec
                </span>
              </button>
              <div>
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">The crew</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                  Forty-five seconds with the people on the truck.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted">
                  How a Colorado job is walked, loaded, and closed. The film slot is ready. Until it runs, the quote call is the same conversation.
                </p>
                <div className="mt-6">
                  <AccentLink href="#quote">Book a quote call</AccentLink>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-line px-5 py-14 sm:px-10 sm:py-16">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">On the road</p>
            <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Serving Colorado businesses and families.
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-muted">
              Neighborhood moves and business inventory. One standard: show up, protect the load, land the window.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["/photos/highway.jpg", "Semi-truck on a high Colorado highway"],
                ["/photos/dock.jpg", "Freight truck at a dock after dusk"],
                ["/photos/fleet.jpg", "Fleet staged against snowy Colorado peaks"],
                ["/photos/trails.jpg", "Mountain highway at night"],
              ].map(([src, alt]) => (
                <img key={src} src={src} alt={alt} className="aspect-[4/3] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>

          <Calculator />

          <section id="faq" className="border-t border-line px-5 py-14 sm:px-10 sm:py-16">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Questions</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Straight answers before you book.
            </h2>
            <div className="mt-6 border-t border-line">
              {FAQS.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div key={item.q} className="border-b border-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      <span className="text-base font-semibold sm:text-lg">{item.q}</span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <div className="faq-panel" data-open={open ? "true" : "false"}>
                      <div className="overflow-hidden">
                        <p className="max-w-3xl pb-5 text-sm leading-relaxed text-pretty text-muted sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="border-t border-line px-5 py-14 sm:px-10 sm:py-16">
            <p className="text-center text-xs font-semibold tracking-widest text-muted uppercase">
              Next step
            </p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Get a Colorado quote without the runaround.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-pretty text-muted">
              Send the form. Pick a window on the next page. We’ll confirm scope and a written price.
            </p>
            <div className="mx-auto mt-8 max-w-4xl">
              <QuoteForm idPrefix="final" />
            </div>
          </section>

          <p className="px-5 pb-8 text-center text-sm text-muted sm:px-10">Move it · Colorado</p>
        </Sheet>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden">
        <a
          href="#quote"
          className="flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper"
        >
          Get Instant Quote
        </a>
      </div>

      <FilmDialog mode={film} onClose={() => setFilm(null)} />
    </>
  );
}
