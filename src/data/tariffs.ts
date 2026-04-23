import { site } from "./site";

export interface Tariff {
  id: string;
  label: string;
  badge?: string;
  priceFrom: number;
  unit: string;
  target: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export const tariffs: Tariff[] = [
  {
    id: "kvartira",
    label: "Квартира",
    priceFrom: site.priceKvartiraFrom,
    unit: "₽/мес",
    target: "Городское жильё",
    features: [
      "Контрольная панель + 2 датчика движения",
      "2 датчика открытия",
      "Брелок экстренной тревоги",
      "Круглосуточный пульт",
      "ГБР с выездом 5–7 мин",
      "Мобильное приложение",
    ],
    cta: "Подключить квартиру",
  },
  {
    id: "dom",
    label: "Дом",
    badge: "Чаще всего выбирают",
    priceFrom: site.priceDomFrom,
    unit: "₽/мес",
    target: "Коттеджи, дома, таунхаусы",
    features: [
      "Панель + 4 датчика движения",
      "До 5 датчиков открытия",
      "Уличная сирена с подсветкой",
      "Брелок + кодовое слово",
      "ГБР 10–15 мин в области",
      "Интеграция с камерами",
      "Контрольные обходы по расписанию",
    ],
    cta: "Подключить дом",
    highlight: true,
  },
  {
    id: "biznes",
    label: "Бизнес",
    priceFrom: site.priceBiznesFrom,
    unit: "₽/мес",
    target: "Офисы, магазины, склады",
    features: [
      "Стационарная тревожная кнопка",
      "Панель + датчики по ТЗ",
      "Мобильная кнопка руководителя",
      "Круглосуточный пульт",
      "Видеоверификация тревог",
      "Электронные акты и отчёты",
      "SLA в договоре",
    ],
    cta: "Подключить бизнес",
  },
];
