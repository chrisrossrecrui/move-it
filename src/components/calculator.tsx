import { useMemo, useState } from "react";
import {
  CALC_SERVICES,
  DISTANCES,
  FLEET_SPANS,
  LOCAL_SIZES,
  SPECIALTY_SCOPES,
  WEIGHTS,
  estimate,
  money,
  type CalcService,
  type Choice,
} from "@/lib/estimate";

function ChoiceRow({
  label,
  choices,
  value,
  onChange,
}: {
  label: string;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {choices.map((choice) => {
          const selected = choice.id === value;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(choice.id)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink hover:bg-paper"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Calculator() {
  const [service, setService] = useState<CalcService>("local");
  const [primary, setPrimary] = useState("small");
  const [distance, setDistance] = useState("regional");

  function chooseService(next: CalcService) {
    setService(next);
    if (next === "local") setPrimary("small");
    if (next === "freight") setPrimary("mid");
    if (next === "fleet") setPrimary("day");
    if (next === "specialty") setPrimary("piece");
  }

  const result = useMemo(() => estimate(service, primary, distance), [service, primary, distance]);

  const primaryChoices =
    service === "local"
      ? LOCAL_SIZES
      : service === "freight"
        ? WEIGHTS
        : service === "fleet"
          ? FLEET_SPANS
          : SPECIALTY_SCOPES;

  const primaryLabel =
    service === "local"
      ? "Home size"
      : service === "freight"
        ? "Rough weight"
        : service === "fleet"
          ? "How long you need the truck"
          : "Scope";

  return (
    <section id="estimate" className="px-5 py-14 sm:px-10 sm:py-16">
      <div className="rounded-sheet bg-fog p-5 sm:p-8">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">Ballpark</p>
        <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
          A typical Colorado range before anyone locks a price.
        </h2>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_0.8fr]">
          <div className="space-y-6">
            <ChoiceRow
              label="Service"
              choices={CALC_SERVICES}
              value={service}
              onChange={(id) => chooseService(id as CalcService)}
            />
            <ChoiceRow
              label={primaryLabel}
              choices={primaryChoices}
              value={primary}
              onChange={setPrimary}
            />
            {service === "freight" ? (
              <ChoiceRow
                label="Distance inside Colorado"
                choices={DISTANCES}
                value={distance}
                onChange={setDistance}
              />
            ) : null}
          </div>
          <div className="rounded-2xl bg-ink p-6 text-paper">
            <p className="text-xs font-semibold tracking-widest text-paper/70 uppercase">
              Typical range
            </p>
            <p className="mt-3 text-4xl font-extrabold tracking-tight tabular-nums" aria-live="polite">
              {money(result.low)}–{money(result.high)}
            </p>
            <p className="mt-3 text-sm font-semibold text-accent">
              Typical for Colorado — not a firm quote.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-paper/80">{result.detail}</p>
            <a
              href="#quote"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96]"
            >
              Get a written quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
