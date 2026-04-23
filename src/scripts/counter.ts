export function initCounters() {
  if (typeof window === "undefined") return;
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
  if (!counters.length) return;

  const format = (n: number) => n.toLocaleString("ru-RU");

  const animate = (el: HTMLElement) => {
    const target = Number(el.dataset.value ?? 0);
    const duration = Number(el.dataset.duration ?? 1800);
    const prefix = el.dataset.prefix ?? "";
    const suffix = el.dataset.suffix ?? "";
    const startTime = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = `${prefix}${format(val)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    counters.forEach((el) => {
      const target = Number(el.dataset.value ?? 0);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      el.textContent = `${prefix}${target.toLocaleString("ru-RU")}${suffix}`;
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target as HTMLElement);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => io.observe(el));
}
