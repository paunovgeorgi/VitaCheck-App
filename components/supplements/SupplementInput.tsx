'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { commonSupplements } from '@/constants';
import { useFilteredSuggestions } from '@/hooks/useFilteredSuggestions';
import { CommonSupplement, FoodRelation, TimeOfDay } from '@/types';
import { categorizeSupplement } from '@/lib/actions/ai.action';
import { useSupplements } from '@/hooks/useSupplements';
import { toast } from "sonner"

const SupplementInput = () => {

  const {isLoading, addSupplement, setOpenPeriod} = useSupplements();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const [relation, setRelation] = useState<FoodRelation>(FoodRelation.BEFORE);
  const [time, setTime] = useState<TimeOfDay>(TimeOfDay.morning);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { suggestions, showSuggestions, setShowSuggestions } = useFilteredSuggestions(name, commonSupplements);

  const inputRef = useRef<HTMLInputElement | null>(null);
const suggestionsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
  setReasoning('');
  setError('');
  }, [name]);

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

 const handleBlur = () => {
    setTimeout(() => {
    const active = document.activeElement;
    if (
      !suggestionsRef.current?.contains(active) &&
      active !== inputRef.current
    ) {
      setShowSuggestions(false);
    }
  }, 0);
};


  const handleSelectSuggestion = (supp: CommonSupplement) => {
    setName(supp.name);
    setDosage(supp.dosage);
    setShowSuggestions(false);
  };

  const handleAiSuggestion = async () => {
    if (!name.trim()) return;

    setIsCategorizing(true);
    setReasoning('');
    try{
      setError('');
      const data = await categorizeSupplement(name);
    console.log(data);
    
      setReasoning(data.reasoning || '');
      setRelation(data.suggestedMealCategory || FoodRelation.BEFORE);
      setTime(data.suggestedTimeCategory || TimeOfDay.morning);
    } catch (err) {
      console.error('AI error:', err);
      setError('Unable to provide AI reasoning at the moment. Please try again later.');
    } finally {
      setIsCategorizing(false);
    }
  };

    const handleAdd = async () => {
    if (!name) return;
    try {
      setIsAdding(true);
      await addSupplement({
        name,
        dosage,
        reasoning,
        relation,
        time
      });
      setName('');
      setDosage('');
      setReasoning('');
       toast.success('Success', {
        description: `${name} has been added to your supplements.`,
        duration: 3000,
      });
      setOpenPeriod(time, true);
    } catch (error) {
       toast.error('Error', {
        description: 'Could not add supplement. Please try again.',
      });
      console.log('Could not add supplement', error);    
    }
    setIsAdding(false);  
  };

  return (
    <div className="mb-6">
      <label className="block mb-1 text-sm">Supplement Name</label>
      <div className="flex gap-2 items-center relative">
        <input
          ref={inputRef}
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="e.g., Vitamin D3"
        />
      
        <div className="relative group">
  <button
    onClick={handleAiSuggestion}
    disabled={isCategorizing || name.length === 0 || reasoning.length > 0}
    className="border disabled:border-gray-400 border-accent enabled:hover:bg-accent/80 rounded-sm enabled:hover:cursor-pointer p-2"
  >
      {isCategorizing ? <Loader2 className="animate-spin" /> : <Wand2 />}
  </button>

  <div className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-gray-800 text-white px-2 py-1 rounded shadow-lg top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
    Get smart categorizations with AI
  </div>
</div>

        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute top-full mt-2 left-0 w-full z-20 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-48 overflow-y-auto"
          >
            {suggestions.map(s => (
              <li
                key={s.name}
                onMouseDown={() => handleSelectSuggestion(s)}
                className="group px-4 py-2 text-sm cursor-pointer hover:bg-accent "
              >
                <span className="font-medium group-hover:text-black">{s.name}</span>
                <span className="text-xs text-muted-foreground ml-2 group-hover:text-white">({s.dosage})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {reasoning && (
        <p className="text-sm mt-2 p-2 bg-gray-800 rounded text-muted-foreground animate-fade">
          {reasoning}
        </p>
      )}
      {error && <p className="text-sm mt-2 p-2 bg-gray-800 rounded text-muted-foreground animate-fade">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 text-sm">Time of Day</label>
          <select
            value={time}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTime(e.target.value as TimeOfDay)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option>Morning</option>
            <option>Noon</option>
            <option>Evening</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Relation to Food</label>
          <select
            value={relation}
            onChange={e => setRelation(e.target.value as FoodRelation)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option>Before Eating</option>
            <option>With Food</option>
            <option>After Eating</option>
          </select>
        </div>
      </div>

      <button
        disabled={!name}
        onClick={handleAdd}
        className="mt-4 text-center w-full py-2 rounded bg-accent enabled:hover:bg-accent/80 enabled:hover:cursor-pointer transition font-semibold text-white"
      >
        {isAdding ? <Loader2 className='animate-spin mx-auto'/> : 'Add Supplement'}
        
      </button>
    </div>
  );
};

export default SupplementInput;
