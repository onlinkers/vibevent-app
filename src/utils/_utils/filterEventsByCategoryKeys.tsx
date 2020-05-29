import { Event } from "types/props";

/**
 * Filters an array of events by a set of category keys
 * @param events - array of events
 * @param selectedCategoryKeys - array of category keys of the event categories we want to keep
 */
export const filterEventsByCategoryKeys = (events: Event[], selectedCategoryKeys: string[] = []) => {
  // If no 'selectedKeys' provided, return the entire events list
  if(!selectedCategoryKeys.length) return events;
  return events.filter((event) => (
    // check if at least one of the event's categories exists in the selected keys list
    event.categories.some((category) => selectedCategoryKeys.includes(category))
  ));
};
