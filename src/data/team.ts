export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  initials: string;
  placeholder: boolean;
}

export const team: TeamMember[] = [
  { name: "Александр Бондарь", role: "Основатель и генеральный директор", photo: "/images/team/alexandr.jpg", initials: "АБ", placeholder: true },
  { name: "Владимир Вепрь", role: "Начальник групп быстрого реагирования", photo: "/images/team/vladimir.jpg", initials: "ВВ", placeholder: true },
  { name: "Вадим Хрусталев", role: "Главный инженер систем безопасности", photo: "/images/team/vadim.jpg", initials: "ВХ", placeholder: true },
  { name: "Мария Соколова", role: "Руководитель мониторингового центра", photo: "/images/team/maria.jpg", initials: "МС", placeholder: true },
  { name: "Денис Смирнов", role: "Директор по работе с клиентами", photo: "/images/team/denis.jpg", initials: "ДС", placeholder: true },
  { name: "Игорь Павлов", role: "Руководитель технической службы", photo: "/images/team/igor.jpg", initials: "ИП", placeholder: true },
];
