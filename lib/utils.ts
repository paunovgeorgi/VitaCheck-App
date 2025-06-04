import { FoodRelation, Period, Supplement } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to filter supplements by period and relation
export function filterSupplements(supplements: Supplement[], period: Period, relation: FoodRelation){
    return supplements.filter(item => item.time === period && item.relation === relation);
  };