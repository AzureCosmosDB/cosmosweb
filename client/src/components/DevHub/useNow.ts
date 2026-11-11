import {useEffect, useState} from 'react';

/**
 * Current time, available only after hydration. Static HTML is built without it, so time-based
 * rendering (hiding expired offers, "Upcoming" labels) never causes a server/client mismatch.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}

// Dates in the content data are Pacific time (the events are US-based); November-December is PST.
const endOfDay = (isoDate: string): number => new Date(`${isoDate}T23:59:59-08:00`).getTime();
const startOfDay = (isoDate: string): number => new Date(`${isoDate}T00:00:00-08:00`).getTime();

export function isExpired(lastDay: string | undefined, now: Date | null): boolean {
  if (!lastDay || !now) return false;
  return now.getTime() > endOfDay(lastDay);
}

export type EventStatus = 'upcoming' | 'underway';

export function eventStatus(start: string | undefined, now: Date | null): EventStatus | null {
  if (!start || !now) return null;
  return now.getTime() < startOfDay(start) ? 'upcoming' : 'underway';
}
