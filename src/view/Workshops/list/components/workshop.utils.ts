import type { ISchedule, IWorkshop } from "../interfaces";

const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABELS: Record<(typeof DAY_KEYS)[number], string> = {
  monday: "Lun",
  tuesday: "Mar",
  wednesday: "Mié",
  thursday: "Jue",
  friday: "Vie",
  saturday: "Sáb",
  sunday: "Dom",
};

const getDayKey = (date: Date): (typeof DAY_KEYS)[number] =>
  DAY_KEYS[date.getDay() === 0 ? 6 : date.getDay() - 1];

const formatTimeRange = (value: string) => value.replace(/\s*-\s*/g, " a ").trim();

const parseTimeToMinutes = (time: string): number | null => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

  return hours * 60 + minutes;
};

const isWithinSchedule = (scheduleValue: string, now = new Date()): boolean => {
  const [openTime, closeTime] = scheduleValue.split("-").map((part) => part.trim());
  if (!openTime || !closeTime) return true;

  const openMinutes = parseTimeToMinutes(openTime);
  const closeMinutes = parseTimeToMinutes(closeTime);
  if (openMinutes === null || closeMinutes === null) return true;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};

export const isWorkshopOpen = (schedule?: ISchedule, now = new Date()): boolean => {
  if (!schedule) return false;

  const todaySchedule = schedule[getDayKey(now)];
  if (!todaySchedule?.trim()) return false;

  return isWithinSchedule(todaySchedule, now);
};

export const formatWorkshopSchedule = (schedule?: ISchedule): string | null => {
  if (!schedule) return null;

  const activeDays = DAY_KEYS.filter((day) => schedule[day]?.trim());
  if (activeDays.length === 0) return null;

  const groupedByHours = new Map<string, (typeof DAY_KEYS)[number][]>();

  activeDays.forEach((day) => {
    const hours = schedule[day]?.trim() ?? "";
    const currentGroup = groupedByHours.get(hours) ?? [];
    currentGroup.push(day);
    groupedByHours.set(hours, currentGroup);
  });

  const [hours, days] = [...groupedByHours.entries()].sort(([, leftDays], [, rightDays]) => {
    return DAY_KEYS.indexOf(leftDays[0]) - DAY_KEYS.indexOf(rightDays[0]);
  })[0];

  const firstDay = DAY_LABELS[days[0]];
  const lastDay = DAY_LABELS[days[days.length - 1]];
  const dayRange = days.length === 1 ? firstDay : `${firstDay} a ${lastDay}`;

  return `${dayRange} • ${formatTimeRange(hours)}`;
};

export const getWorkshopMainPhone = (workshop: IWorkshop): string | undefined =>
  workshop.whatsapp ?? workshop.phones[0];

export const getWorkshopAddress = (workshop: IWorkshop): string => {
  const location = [workshop.city, workshop.state, workshop.country].filter(Boolean).join(", ");
  if (!workshop.address) return location;
  return location ? `${workshop.address}, ${location}` : workshop.address;
};

export const getWorkshopCategory = (workshop: IWorkshop): string | undefined => workshop.services[0];

export const buildWhatsAppUrl = (phone: string, workshopName: string): string => {
  const digits = phone.replace(/\D/g, "");
  const message = encodeURIComponent(`Hola, vi ${workshopName} en MotCarApp y me gustaría obtener más información.`);
  return `https://wa.me/${digits}?text=${message}`;
};
