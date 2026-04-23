export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
};

export const mainNav: NavItem[] = [
  {
    label: "Охраняем",
    href: "/ohrana-domov",
    children: [
      { label: "Дома и коттеджи", href: "/ohrana-domov", description: "Загородная недвижимость" },
      { label: "Квартиры", href: "/ohrana-kvartir", description: "Пультовая охрана жилья" },
      { label: "Бизнес", href: "/ohrana-biznesa", description: "Офисы, магазины, склады" },
      { label: "Дачи", href: "/ohrana-dachi", description: "Сезонная и круглогодичная" },
    ],
  },
  {
    label: "Услуги",
    href: "/pultovaya-ohrana",
    children: [
      { label: "Пультовая охрана", href: "/pultovaya-ohrana", description: "Мониторинг и ГБР" },
      { label: "Охранная сигнализация", href: "/ohrannaya-signalizatsiya", description: "Монтаж под ключ" },
      { label: "Тревожная кнопка", href: "/trevozhnaya-knopka", description: "Моментальный вызов ГБР" },
      { label: "Пожарная сигнализация", href: "/pozharnaya-signalizatsiya", description: "АПС и оповещение" },
      { label: "Видеонаблюдение", href: "/videonablyudenie", description: "IP-камеры, DVR" },
    ],
  },
  { label: "Тарифы", href: "/tarify" },
  { label: "Оборудование", href: "/oborudovanie" },
  { label: "О компании", href: "/o-kompanii" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/kontakty" },
];

export const footerNav = {
  services: {
    title: "Услуги",
    items: [
      { label: "Пультовая охрана", href: "/pultovaya-ohrana" },
      { label: "Охранная сигнализация", href: "/ohrannaya-signalizatsiya" },
      { label: "Тревожная кнопка", href: "/trevozhnaya-knopka" },
      { label: "Пожарная сигнализация", href: "/pozharnaya-signalizatsiya" },
      { label: "Видеонаблюдение", href: "/videonablyudenie" },
    ],
  },
  objects: {
    title: "Охраняем",
    items: [
      { label: "Дома и коттеджи", href: "/ohrana-domov" },
      { label: "Квартиры", href: "/ohrana-kvartir" },
      { label: "Бизнес", href: "/ohrana-biznesa" },
      { label: "Дачи", href: "/ohrana-dachi" },
    ],
  },
  company: {
    title: "Компания",
    items: [
      { label: "О компании", href: "/o-kompanii" },
      { label: "Тарифы", href: "/tarify" },
      { label: "Оборудование", href: "/oborudovanie" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/kontakty" },
    ],
  },
  legal: {
    title: "Документы",
    items: [
      { label: "Политика конфиденциальности", href: "/policy" },
      { label: "Публичная оферта", href: "/oferta" },
    ],
  },
};
