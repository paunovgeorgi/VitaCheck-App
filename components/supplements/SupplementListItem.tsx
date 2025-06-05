import { useState } from 'react';
import { Pill, Trash2, Info } from 'lucide-react';
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

interface SupplementListItemProps {
    supp: Supplement,
    onRemoveHandle: (id: string) => void;
}


const SupplementListItem = ({supp, onRemoveHandle }: SupplementListItemProps) => {
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

      <Trash2
        onClick={() => onRemoveHandle(supp.id)}
        className="size-4 text-red-400 hover:text-red-500 hover:cursor-pointer"
      />
    </li>
  );
};

export default SupplementListItem;