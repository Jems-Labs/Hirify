import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function ToUTCConversion(date:any, time:any){
  const localDateTimeString = `${format(date, "yyyy-MM-dd")}T${time}:00`;
  // Create a Date object for the local date and time
  const localDateTime = new Date(localDateTimeString);

  const utcDateTime = new Date(localDateTime.toISOString());
  return utcDateTime.toISOString()
}