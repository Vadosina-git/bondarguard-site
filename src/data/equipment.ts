export type EquipmentCategory = "panel" | "sensor" | "camera" | "access" | "fire";

export interface EquipmentItem {
  slug: string;
  name: string;
  category: EquipmentCategory;
  description: string;
  specs: string[];
}

export const equipment: EquipmentItem[] = [
  {
    slug: "panel-hub",
    name: "Контрольная панель",
    category: "panel",
    description: "Мозг системы. Связь с пультом через GSM + Ethernet, автономный аккумулятор до 24 часов.",
    specs: ["До 100 беспроводных устройств", "Встроенный аккумулятор", "Шифрование радиоканала"],
  },
  {
    slug: "motion",
    name: "Датчик движения",
    category: "sensor",
    description: "ИК-датчик с защитой от ложных срабатываний от животных до 20 кг.",
    specs: ["Дальность 12 м, угол 90°", "Pet-immunity", "Батарея на 5 лет"],
  },
  {
    slug: "door",
    name: "Датчик открытия",
    category: "sensor",
    description: "Магнитоконтактный датчик на двери, окна, ворота.",
    specs: ["Толщина 8 мм", "Батарея 3 года", "Дальность связи до 1000 м"],
  },
  {
    slug: "glass",
    name: "Датчик разбития стекла",
    category: "sensor",
    description: "Акустический датчик, распознаёт спектр разбиваемого стекла.",
    specs: ["Радиус 8 м", "Защита от ложных шумов", "Батарея 5 лет"],
  },
  {
    slug: "leak",
    name: "Датчик протечки",
    category: "sensor",
    description: "Мгновенное уведомление и (опционально) автоматическое перекрытие воды через шаровый кран.",
    specs: ["Мгновенное срабатывание", "Работа с кранами", "Батарея 5 лет"],
  },
  {
    slug: "smoke",
    name: "Датчик задымления",
    category: "fire",
    description: "Пожарный извещатель с оповещением на пульт и через приложение.",
    specs: ["Дым + тепло", "Автотест 1/год", "Батарея 5 лет"],
  },
  {
    slug: "ip-cam-outdoor",
    name: "Уличная IP-камера",
    category: "camera",
    description: "Разрешение 4 Мп, ночной режим, антивандальное исполнение IP66.",
    specs: ["Ночная подсветка 30 м", "IP66", "PoE / WiFi"],
  },
  {
    slug: "ip-cam-indoor",
    name: "Внутренняя камера",
    category: "camera",
    description: "Поворотная камера 2 Мп с микрофоном и двухсторонней связью.",
    specs: ["360° поворот", "Двустороннее аудио", "Ночной режим"],
  },
  {
    slug: "alarm-button",
    name: "Тревожная кнопка",
    category: "access",
    description: "Стационарная кнопка для магазинов, офисов, касс. Мгновенный вызов ГБР.",
    specs: ["Беззвучный режим", "Антивандальная", "Шифрованный канал"],
  },
  {
    slug: "mobile-button",
    name: "Мобильная тревожная кнопка",
    category: "access",
    description: "Брелок-кулон для руководителей, инкассаторов, одиноких сотрудников.",
    specs: ["Батарея 2 года", "Геолокация GPS/ГЛОНАСС", "IP67"],
  },
];
