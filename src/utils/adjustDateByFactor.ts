export default function adjustDateByFactor(factor: number, date: Date) {
  return new Date(date.getTime() + factor * 24 * 60 * 60 * 1000);
}
