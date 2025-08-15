import { Recurrence } from '../types';

/**
 * Calculates the next due date for a recurring task.
 * @param currentDate The current due date of the task.
 * @param recurrence The recurrence rule for the task.
 * @returns The next due date as an ISO string formatted for datetime-local input.
 */
export function calculateNextDueDate(currentDate: Date, recurrence: Recurrence): string {
  const nextDate = new Date(currentDate.getTime());

  switch (recurrence.type) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    
    case 'weekly':
      if (recurrence.daysOfWeek && recurrence.daysOfWeek.length > 0) {
        const sortedDays = [...recurrence.daysOfWeek].sort((a, b) => a - b);
        let currentDay = nextDate.getDay();
        let nextDayOfWeek = -1;

        // Find the next scheduled day in the same week (must be after the current day)
        for (const day of sortedDays) {
          if (day > currentDay) {
            nextDayOfWeek = day;
            break;
          }
        }

        let daysToAdd: number;
        if (nextDayOfWeek !== -1) {
          // Next occurrence is in the same week
          daysToAdd = nextDayOfWeek - currentDay;
        } else {
          // Next occurrence is in the following week, find the first day of the week
          const firstDayOfNextWeek = sortedDays[0];
          daysToAdd = (7 - currentDay) + firstDayOfNextWeek;
        }
        nextDate.setDate(nextDate.getDate() + daysToAdd);
      } else {
        // Default to adding 7 days if no days are selected for weekly
        nextDate.setDate(nextDate.getDate() + 7);
      }
      break;
    
    case 'monthly':
      // This is a simple approach; more complex logic is needed for end-of-month cases
      // e.g., Jan 31 -> Feb 28/29. For now, we add a month.
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
      
    case 'yearly':
      const interval = recurrence.yearlyInterval || 1;
      nextDate.setFullYear(nextDate.getFullYear() + interval);
      break;
  }
  
  // Return in 'YYYY-MM-DDTHH:mm' format
  const pad = (num) => num.toString().padStart(2, '0');
  const yyyy = nextDate.getFullYear();
  const MM = pad(nextDate.getMonth() + 1);
  const dd = pad(nextDate.getDate());
  const HH = pad(nextDate.getHours());
  const mm = pad(nextDate.getMinutes());

  return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
}