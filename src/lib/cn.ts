import { clsx, type ClassValue } from 'clsx';

/** Joins class names, skipping falsy ones: `cn('a', isOn && 'b')`. */
export function cn(...classes: ClassValue[]) {
  return clsx(classes);
}
