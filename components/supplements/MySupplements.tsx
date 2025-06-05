'use client';

import { Clock, ChevronDown, Loader2} from 'lucide-react';
import { FoodRelation, Period} from "@/types";
import SupplementList from "./SupplementList";
import { filterSupplements } from "@/lib/utils";
import { PERIODS } from "@/constants";
import { useSupplements } from '@/hooks/useSupplements';


const MySupplements = () => {
 const { supplements, isLoading, openPeriods} = useSupplements();

  return (
    <>
             {isLoading ? <div className='w-full flex justify-center items-center'><Loader2 className='text-accent animate-spin'/></div> : (
                <div className='animate-flip-down'>     
                {PERIODS.map((period: Period) => {
        
        
                const suppsBeforeEating = filterSupplements(supplements, period, FoodRelation.BEFORE);
                const suppsWithFood = filterSupplements(supplements, period, FoodRelation.WITH);
                const suppsAfterEating = filterSupplements(supplements, period, FoodRelation.AFTER);
                const hasSupplements = suppsBeforeEating.length > 0 || 
                                        suppsWithFood.length > 0 || 
                                        suppsAfterEating.length > 0;
        
                    return (
                <details
                    key={period}
                    className="group mb-4 bg-gray-900 rounded-lg p-4 shadow"
                    open={openPeriods[period]}
                >
        
          <summary className="cursor-pointer font-semibold text-white list-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent" />
                {period}
              </div>
              <ChevronDown className="w-4 h-4 text-accent transition-transform duration-300 group-open:rotate-180" />
            </div>
          </summary>
          {suppsBeforeEating.length > 0 && <SupplementList 
                supplements={suppsBeforeEating}
                // period={period}
                relation={FoodRelation.BEFORE}/>}
            {suppsWithFood.length > 0 && <SupplementList 
                supplements={suppsWithFood}
                // period={period}
                relation={FoodRelation.WITH}/>}
           {suppsAfterEating.length > 0 && <SupplementList 
                supplements={suppsAfterEating}
                // period={period}
                relation={FoodRelation.AFTER}/>}
        
              {/* Display message when period list is empty    */}
             {!hasSupplements && (
              <p className="text-gray-600 italic mt-2 animate-flip-down">No supplements added.</p>
            )}
        </details>)}       
                )}
              </div>
              )}     
    </>
  )
}

export default MySupplements