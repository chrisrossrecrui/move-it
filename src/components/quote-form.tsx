import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SERVICE_OPTIONS, saveLead, saveLeadKey, type ServiceNeed } from "@/lib/lead";

const field =
  "mt-1.5 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink outline-none transition focus:border-accent";

type Props = {
  idPrefix: string;
  anchorId?: string;
};

export function QuoteForm({ idPrefix, anchorId }: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<ServiceNeed>("Local Move");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
    const lead = {
      name: trimmedName,
      phone: phone.trim(),
      service,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };
    saveLead(lead);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (response.ok) {
        const data = (await response.json()) as { key?: string };
        if (data.key) saveLeadKey(data.key);
      }
    } catch {
      // Quote UX must not fail closed if the intake service is down.
    }
    void navigate({ to: "/thank-you" });
  }

  return (
    <form
      id={anchorId}
      onSubmit={onSubmit}
      className="rounded-2xl bg-fog p-4 sm:p-5"
      noValidate
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Request a quote</p>
        <p className="text-xs text-muted">About a minute</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-xs font-semibold text-ink" htmlFor={`${idPrefix}-name`}>
          Name
          <input
            id={`${idPrefix}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={field}
            placeholder="Your name"
            required
          />
        </label>
        <label className="block text-xs font-semibold text-ink" htmlFor={`${idPrefix}-phone`}>
          Phone
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={field}
            placeholder="Mobile number"
            required
          />
        </label>
        <label className="block text-xs font-semibold text-ink" htmlFor={`${idPrefix}-service`}>
          Service needed
          <select
            id={`${idPrefix}-service`}
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value as ServiceNeed)}
            className={field}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm font-medium text-accent-deep">
          {error}
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="order-2 text-xs leading-relaxed text-muted sm:order-1">
          Next page: pick a consult window. We’ll use the number you entered.
        </p>
        <button
          type="submit"
          className="order-1 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-paper transition-transform duration-150 ease-out hover:bg-accent-deep active:scale-[0.96] sm:order-2"
        >
          Get Instant Quote
        </button>
      </div>
      <label className="mt-3 block text-xs font-semibold text-ink" htmlFor={`${idPrefix}-message`}>
        Message <span className="font-medium text-muted">(optional)</span>
        <input
          id={`${idPrefix}-message`}
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={field}
          placeholder="Cities, date, or what you’re moving"
          maxLength={400}
        />
      </label>
    </form>
  );
}
