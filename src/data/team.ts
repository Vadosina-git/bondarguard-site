export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  initials: string;
  placeholder: boolean;
}

export const team: TeamMember[] = [
  { name: "Алексей Бондарь", role: "Основатель и генеральный директор", photo: "/images/team/alexey.jpg", initials: "АБ", placeholder: true },
  { name: "Мария Соколова", role: "Руководитель мониторингового центра", photo: "/images/team/maria.jpg", initials: "МС", placeholder: true },
  { name: "Дмитрий Кравцов", role: "Начальник групп быстрого реагирования", photo: "/images/team/dmitry.jpg", initials: "ДК", placeholder: true },
  { name: "Игорь Панин", role: "Главный инженер систем безопасности", photo: "/images/team/igor.jpg", initials: "ИП", placeholder: true },
];
