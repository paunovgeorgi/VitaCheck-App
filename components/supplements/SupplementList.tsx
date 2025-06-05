import { FoodRelationType, Supplement } from "@/types";
import SupplementListItem from "./SupplementListItem"

interface SupplementListProps {
     supplements: Supplement[];
    // handleRemoveSupplement: (id: string) => Promise<void>;
    relation: FoodRelationType;
}

const SupplementList = ({supplements, relation}: SupplementListProps) => {
  return (
      <div>
        <p className='text-left mt-2 text-sm font-semibold text-orange-300'>{relation}</p>
      <ul className=" space-y-2 group-open:animate-flip-down bg-gray-800">
        {supplements.map((supp) => (
            <SupplementListItem key={supp.id} supp={supp}/>    
        ))}
      
      </ul>
      </div>
  )
}

export default SupplementList