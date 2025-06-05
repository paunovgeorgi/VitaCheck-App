import { useState } from 'react';
import { Pill, Trash2, Info, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Supplement } from '@/types';
import { useSupplements } from '@/hooks/useSupplements';

interface SupplementListItemProps {
    supp: Supplement,
    // onRemoveHandle: (id: string) => void;
}


const SupplementListItem = ({supp }: SupplementListItemProps) => {

  const {removeSupplement, isLoading} = useSupplements();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveSupplement = async () => {
    try {
      setIsDeleting(true);
      await removeSupplement(supp.id);
      toast.success('Deleted', {
        description: `${supp.name} has been deleted.`,
        duration: 3000,
      });
    } catch (error) {
       toast.error('Error', {
              description: 'Could not delete supplement. Please try again.',
            });
      console.log('Could not delete supplement', error);
      
    }
    setIsDeleting(false);
  }

  const [open, setOpen] = useState(false);

  return (
    <li className="p-2 rounded flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <Pill className="w-4 text-green-300" />
        <span>
          {supp.name}{" "}
          <span className="text-xs max-md:hidden text-orange-300">{supp.dosage}</span>
        </span>

        {/* Dialog trigger icon */}
        {supp.reasoning && (
                  <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Info
              className="size-4 text-blue-300 hover:text-blue-400 hover:cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700 shadow-md shadow-accent text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Reasoning Behind This Supplement</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Understand why this was recommended.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 text-sm">
              {supp.reasoning || "No reasoning provided for this supplement."}
            </div>
            <div className="mt-2 text-right">
              <DialogClose asChild>
                <Button variant="secondary" className="text-sm bg-transparent border cursor-pointer hover:bg-accent/80 border-accent">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        )}

      </div>
      {isDeleting ? <Loader2 className='animate-spin size-4'/> :  <Trash2
        onClick={handleRemoveSupplement}
        className="size-4 text-red-400 hover:text-red-500 hover:cursor-pointer"
      />}   
    </li>
  );
};

export default SupplementListItem;