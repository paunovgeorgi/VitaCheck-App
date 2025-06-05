'use client';

import { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { Clock, ChevronDown} from 'lucide-react';
import Header from './Header';
import SupplementList from './SupplementList';
import { createSupplement, deleteSupplement, getUserSupplements } from '@/lib/actions/supplement.action';
import { PERIODS } from '@/constants';
import { createSupplementInterface, FoodRelation, Period, Supplement } from '../../types';
import { filterSupplements } from '@/lib/utils';
import SupplementInput from './SupplementInput';

const ManageSupplements = () => {
 const [openPeriods, setOpenPeriods] = useState<Record<Period, boolean>>({
    Morning: false,
    Noon: false,
    Evening: false,
});

const [supplementsChanged, setSupplementsChanged] = useState(false);
const [supplements, setSupplements] = useState<Supplement[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const loadSupplements = async () => {
        try {
            setIsLoading(true);
            const data = await getUserSupplements();
            setSupplements(data);
            setSupplementsChanged(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load supplements');
        } finally {
            setIsLoading(false);
        }
    };

    loadSupplements();
}, [supplementsChanged]); // Depend on supplementsChanged

const handleCreate = async (supplementData: createSupplementInterface) => {
    await createSupplement(supplementData);
    setSupplementsChanged(true); // Trigger reload
};

const handleDelete = async (id: string) => {
    await deleteSupplement(id);
    setSupplementsChanged(true); // Trigger reload
};


// Helper function to filter supplements by period and relation
  // const filterSupplements = (period: Period, relation: FoodRelationType) => {
  //   return supplements.filter(item => item.time === period && item.relation === relation);
  // };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="min-h-screen text-white px-6 py-10 w-full">
      {/* <div className='w-screen vita-background'></div> */}
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-xl font-semibold text-orange-400 mb-1">Add New Supplement</h2>
        <p className="text-sm text-gray-400 mb-6">Enter supplement details and optionally auto-categorize.</p>

        <SupplementInput onAddSupplement={handleCreate} />
      </motion.div>


      {isLoading ? <div>Loading....</div> : (
              <div className="max-w-2xl mx-auto animate-flip-down shadow-lg p-6 rounded-2xl shadow-gray-900">
        <h2 className="text-xl font-semibold text-orange-400 mb-1">My Supplements</h2>
        <p className="text-sm text-gray-400 mb-4">Your organized supplement schedule.</p>

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
        handleRemoveSupplement={handleDelete}
        relation={FoodRelation.BEFORE}/>}
    {suppsWithFood.length > 0 && <SupplementList 
        supplements={suppsWithFood}
        // period={period}
        handleRemoveSupplement={handleDelete}
        relation={FoodRelation.WITH}/>}
   {suppsAfterEating.length > 0 && <SupplementList 
        supplements={suppsAfterEating}
        // period={period}
        handleRemoveSupplement={handleDelete}
        relation={FoodRelation.AFTER}/>}

      {/* Display message when period list is empty    */}
     {!hasSupplements && (
      <p className="text-gray-600 italic mt-2 animate-flip-down">No supplements added.</p>
    )}
</details>)}       
        )}
      </div>
      )}


    </div>
  );
};

export default ManageSupplements;
