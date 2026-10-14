import type { ComponentProps, ReactNode } from "react";

export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <img
        src="/photos/mountains.jpg"
        alt=""
        className="h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-dusk/50" />
    </div>
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="/" className={`flex min-h-11 items-center gap-2.5 ${onDark ? "text-paper" : "text-ink"}`}>
      <img src="/favicon.svg" alt="" className="size-9" />
      <span className="text-lg font-extrabold tracking-tight">Move it</span>
    </a>
  );
}

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="relative flex min-h-52 items-center justify-between gap-4 overflow-hidden px-5 py-5 sm:min-h-64 sm:px-10 sm:py-6">
      <img
        src="/photos/header.jpg"
        alt="Semi-truck on a Colorado mountain highway at sunset"
        className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dusk/80 via-dusk/45 to-dusk/25" />
      <div className="relative">
        <Wordmark onDark />
      </div>
      <div className="relative">{children}</div>
    </header>
  );
}

export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-8">
      <div className="overflow-hidden rounded-sheet bg-paper text-ink shadow-2xl">{children}</div>
    </div>
  );
}

const tap =
  "transition-transform duration-150 ease-out active:scale-[0.96] disabled:active:scale-100";

export function AccentLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-paper hover:bg-accent-deep ${tap} ${className}`}
    >
      {children}
    </a>
  );
}

export function GhostButton({
  children,
  className = "",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink hover:bg-fog ${tap} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink hover:bg-fog ${tap} ${className}`}
    >
      {children}
    </a>
  );
}
