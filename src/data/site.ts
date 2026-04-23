// Site-wide constants. Placeholders are marked. Replace when real values arrive.

export const site = {
  companyName: "BONDAR’ GUARD",
  companyNameShort: "BONDAR’",
  tagline: "Пультовая охрана домов, коттеджей и бизнеса",
  city: "Москва",
  region: "Московская область",

  phone: "+7 (495) 000-00-00",
  phoneTel: "+74950000000",
  email: "info@bondarguard.ru",
  address: "г. Москва, ул. Примерная, 1",
  workingHours: "Пн–Вс, круглосуточно",

  inn: "0000000000",
  ogrn: "0000000000000",
  yearFounded: 2020,

  design: "premium-dark" as const,

  priceKvartiraFrom: 990,
  priceDomFrom: 1990,
  priceBiznesFrom: 2500,

  gbrTimeCity: "5–7 минут",
  gbrTimeRegion: "10–15 минут",

  social: {
    telegram: "",
    whatsapp: "",
    vk: "",
  },

  contactReceiver: "mock" as "mock" | "formspree" | "api",
  formspreeEndpoint: "",

  analytics: {
    yandexMetrikaId: "",
  },

  legal: {
    placeholder: true,
    privacyLastUpdated: "2026-04-23",
  },
};

export type Site = typeof site;
