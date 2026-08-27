'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import type { Transaction } from '@/lib/financial-data'

type Goal = { id: string; title: string; target: number; current: number; due: string }
type Budget = { id: string; category: string; limit: number; month: string }
type Recurring = { id: string; title: string; amount: number; type: Transaction['type']; category: string; frequency: NonNullable<Transaction['frequency']>; day: number }
type Store = { transactions: Transaction[]; goals: Goal[]; budgets: Budget[]; recurring: Recurring[] }
const storageKey = 'financia-complete-v1'

export function SupabaseSync() {
  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    async function synchronize() {
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously()
      if (authError || !authData.user || cancelled) {
        if (authError) toast.error('Não foi possível conectar ao Supabase.')
        return
      }
      const userId = authData.user.id
      const local = JSON.parse(localStorage.getItem(storageKey) || '{"transactions":[],"goals":[],"budgets":[],"recurring":[]}') as Store
      const { data: remoteTransactions, error } = await supabase.from('transactions').select('*').eq('user_id', userId)
      if (error) return
      if (remoteTransactions.length && !local.transactions.length) {
        const restored: Store = {
          ...local,
          transactions: remoteTransactions.map((row) => ({ id: row.id, title: row.title, amount: Number(row.amount_cents) / 100, type: row.type, category: row.category_id || 'Sem categoria', frequency: row.frequency, occurredOn: row.occurred_on, date: new Date(`${row.occurred_on}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''), icon: row.type === 'income' ? 'briefcase' : 'wallet' })),
        }
        localStorage.setItem(storageKey, JSON.stringify(restored))
        window.location.reload()
        return
      }
      if (local.transactions.length) {
        await supabase.from('transactions').upsert(local.transactions.map((item) => ({ id: item.id, user_id: userId, title: item.title, amount_cents: Math.round(item.amount * 100), type: item.type, frequency: item.frequency || 'one_time', occurred_on: (item as Transaction & { occurredOn?: string }).occurredOn || new Date().toISOString().slice(0, 10) })))
      }
      if (local.goals.length) await supabase.from('goals').upsert(local.goals.map((item) => ({ id: item.id, user_id: userId, title: item.title, target_cents: Math.round(item.target * 100), current_cents: Math.round(item.current * 100), due_on: item.due || null })))
      if (local.budgets.length) await supabase.from('budgets').upsert(local.budgets.map((item) => ({ id: item.id, user_id: userId, limit_cents: Math.round(item.limit * 100), month: `${item.month}-01` })))
      if (local.recurring.length) await supabase.from('recurring_transactions').upsert(local.recurring.map((item) => ({ id: item.id, user_id: userId, title: item.title, amount_cents: Math.round(item.amount * 100), type: item.type, day_of_month: item.day, frequency: item.frequency })))
    }
    synchronize().catch(() => toast.error('Falha ao sincronizar com o Supabase.'))
    return () => { cancelled = true }
  }, [])
  return null
}
