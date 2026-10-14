import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Backdrop, GhostLink, Sheet, SiteHeader } from "@/components/site-frame";
import {
  WINDOWS,
  formatDay,
  greetingName,
  readConsult,
  readLead,
  saveConsult,
  upcomingDays,
  type Lead,
  type WindowId,
} from "@/lib/lead";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Quote received | Move it Colorado" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [ready, setReady] = useState(false);
  const [days, setDays] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<WindowId>("morning");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedLead = readLead();
    const storedConsult = readConsult();
    const nextDays = upcomingDays(6);
    setLead(storedLead);
    setDays(nextDays);
    if (storedConsult && nextDays.includes(storedConsult.date)) {
      setDate(storedConsult.date);
      setSlot(storedConsult.window);
      setSaved(true);
    } else {
      setDate(nextDays[0] ?? "");
    }
    setReady(true);
  }, []);

  const chosen = WINDOWS.find((item) => item.id === slot) ?? WINDOWS[0];
  const dayLabel = date ? formatDay(date) : null;
  const name = lead ? greetingName(lead.name) : null;

  function holdWindow() {
    if (!date) return;
    saveConsult({ date, window: slot, savedAt: new Date().toISOString() });
    setSaved(true);
  }

  return (
    <>
      <Backdrop />
      <Sheet>
        <SiteHeader>
          <GhostLink href="/#quote">Edit request</GhostLink>
        </SiteHeader>
        <div className="px-5 pt-2 pb-12 sm:px-10 sm:pb-16">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Request received</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {name ? `Thanks, ${name}.` : "Thanks — we have your request."}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted">
            {lead
              ? `Your ${lead.service.toLowerCase()} quote is in. Pick a window for a short consult. We’ll use the phone number you entered.`
              : "If you just sent the form, your details are stored on this device. If not, start with the quote form so we know how to reach you."}
          </p>

          {!lead && ready ? (
            <div className="mt-6">
              <GhostLink href="/#quote">Get Instant Quote</GhostLink>
            </div>
          ) : null}

          <div className="mt-10">
            <h2 className="text-lg font-bold">Choose a consult window</h2>
            <p className="mt-1 text-sm text-muted">Next available days. Times are local to you.</p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {days.map((iso) => {
                const label = formatDay(iso);
                const selected = iso === date;
                return (
                  <button
                    key={iso}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setDate(iso);
                      setSaved(false);
                    }}
                    className={`min-h-16 min-w-24 shrink-0 rounded-2xl border px-3 py-3 text-left transition-colors ${
                      selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"
                    }`}
                  >
                    <span className="block text-xs font-semibold tracking-wide uppercase">{label.weekday}</span>
                    <span className="mt-1 block text-sm font-bold">{label.monthDay}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {WINDOWS.map((item) => {
                const selected = item.id === slot;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSlot(item.id);
                      setSaved(false);
                    }}
                    className={`min-h-16 rounded-2xl border px-3 py-3 text-left transition-colors ${
                      selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"
                    }`}
                  >
                    <span className="block text-sm font-bold">{item.label}</span>
                    <span className={`mt-1 block text-xs ${selected ? "text-paper/75" : "text-muted"}`}>
                      {item.hours}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={holdWindow}
              disabled={!ready || !date}
              className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96] disabled:opacity-60"
            >
              {saved ? "Update window" : "Save this window"}
            </button>
          </div>

          {saved && dayLabel ? (
            <div className="mt-8 max-w-xl rounded-2xl bg-accent-soft p-5 sm:p-6">
              <p className="text-lg font-bold text-ink">
                Consult held for {dayLabel.weekday}, {dayLabel.monthDay}, {chosen.hours}.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink">
                <li>We reach out in that window on the number you gave us.</li>
                <li>We confirm what is moving, where in Colorado, and access.</li>
                <li>You get a written price. You choose whether to schedule.</li>
              </ol>
              <p className="mt-4 text-sm text-ink">No obligation to book. This window stays on this device.</p>
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              Saving a window doesn’t book a truck. It tells us when to talk.
            </p>
          )}
        </div>
        <p className="px-5 pb-8 text-center text-sm text-muted">Move it · Colorado</p>
      </Sheet>
    </>
  );
}
