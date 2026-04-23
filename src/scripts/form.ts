import { submitLead } from "@lib/forms";

declare global {
  interface Window { ym?: (...args: any[]) => void; }
}

function shake(el: HTMLElement) {
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 280, easing: "ease-out" }
  );
}

function goal(name: string) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    const id = Number(document.body.dataset.ymId);
    if (id) window.ym(id, "reachGoal", name);
  }
}

export function initForms() {
  if (typeof window === "undefined") return;
  const forms = document.querySelectorAll<HTMLFormElement>("form[data-lead-form]");
  forms.forEach((form) => {
    if ((form as any)._bound) return;
    (form as any)._bound = true;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]");
      const successEl = form.querySelector<HTMLElement>("[data-form-success]");
      const errorEl = form.querySelector<HTMLElement>("[data-form-error]");
      const btnText = form.querySelector<HTMLElement>("[data-btn-text]");

      successEl?.classList.add("hidden");
      errorEl?.classList.add("hidden");

      const fd = new FormData(form);
      const honey = String(fd.get("website") ?? "");
      if (honey) return; // silent drop

      const name = String(fd.get("name") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();
      const consent = fd.get("consent") === "on";
      const source = String(fd.get("source") ?? form.dataset.source ?? "unknown");

      const phoneOk = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(phone);
      if (name.length < 2 || !phoneOk || !consent) {
        shake(form);
        if (errorEl) {
          errorEl.textContent =
            name.length < 2 ? "Укажите имя" : !phoneOk ? "Укажите корректный телефон" : "Нужно согласие на обработку данных";
          errorEl.classList.remove("hidden");
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      const originalBtnText = btnText?.textContent ?? "";
      if (btnText) btnText.textContent = "Отправляем…";

      const res = await submitLead({ name, phone, consent, source });

      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = originalBtnText;

      if (res.ok) {
        form.reset();
        successEl?.classList.remove("hidden");
        goal("lead_mock");
      } else {
        if (errorEl) {
          errorEl.textContent = "Не удалось отправить заявку. Позвоните нам или попробуйте позже.";
          errorEl.classList.remove("hidden");
        }
        shake(form);
      }
    });
  });
}
