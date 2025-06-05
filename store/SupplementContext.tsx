'use client';

import { createSupplement, deleteSupplement, getUserSupplements } from "@/lib/actions/supplement.action";
import { createSupplementInterface, Period, Supplement } from "@/types";
import { createContext, useState, useEffect } from "react";

interface SupplementContextType {
    supplements: Supplement[];
    isLoading: boolean;
    error: string | null;
    addSupplement: (supplement: createSupplementInterface) => Promise<void>;
    removeSupplement: (supplementId: string) => Promise<void>;
    refreshSupplements: () => Promise<void>;
    openPeriods: Record<Period, boolean>;
    setOpenPeriod: (period: Period, isOpen: boolean) => void;
}

const SupplementContext = createContext<SupplementContextType | undefined>(undefined);

export function SupplementContextProvider({ children }: { children: React.ReactNode }) {
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openPeriods, setOpenPeriods] = useState<Record<Period, boolean>>({
        Morning: false,
        Noon: false,
        Evening: false,
    });

    const setOpenPeriod = (period: Period, isOpen: boolean) => {
        setOpenPeriods(prev => ({
            ...prev,
            [period]: isOpen
        }));
    };

    const refreshSupplements = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserSupplements();
            setSupplements(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load supplements');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshSupplements();
    }, []);

    async function addSupplement(supplement: createSupplementInterface) {
        try {
            setError(null);
            const newSupplement = await createSupplement(supplement);
            setSupplements(prev => [...prev, newSupplement]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add supplement');
            throw err;
        }
    }

    async function removeSupplement(supplementId: string) {
        try {
            setError(null);
            await deleteSupplement(supplementId);
            setSupplements(prev => prev.filter(supp => supp.id !== supplementId));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove supplement');
            throw err;
        }
    }



    const value: SupplementContextType = {
        supplements,
        isLoading,
        error,
        addSupplement,
        removeSupplement,
        refreshSupplements,
        openPeriods,
        setOpenPeriod
    };

    return (
        <SupplementContext.Provider value={value}>
            {children}
        </SupplementContext.Provider>
    );
}

export default SupplementContext;