'use server';

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { createSupplementInterface } from "@/types";

export const createSupplement = async (supplementData: createSupplementInterface) => {
    const {userId: user_id} = await auth();
    const supabase = createSupabaseClient();

    const {data, error} = await supabase.from('supplements').insert({...supplementData, user_id}).select();

    if (error || !data) {
        throw new Error(error?.message || 'Failed to create supplement');
    }

    return data[0];
}

export const deleteSupplement = async (supplementId: string) => {
    const {userId: user_id} = await auth();
    const supabase = createSupabaseClient();

    // First verify the supplement belongs to the user
    const {data: supplement} = await supabase
        .from('supplements')
        .select()
        .eq('id', supplementId)
        .eq('user_id', user_id)
        .single();

    if (!supplement) {
        throw new Error('Supplement not found or unauthorized');
    }

    // If verification passed, proceed with deletion
    const {error} = await supabase
        .from('supplements')
        .delete()
        .eq('id', supplementId)
        .eq('user_id', user_id);

    if (error) {
        throw new Error(error.message || 'Failed to delete supplement');
    }

    return true;
}

export const getUserSupplements = async () => {
    const supabase = createSupabaseClient();
    const {userId} = await auth();

    const { data, error } = await supabase
        .from('supplements')
        .select()
        .eq('user_id', userId)

    if (error) {
        throw new Error(error.message);     
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data;
}