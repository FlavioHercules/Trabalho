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
const emptyStore: Store = { transactions: [], goals: [], budgets: [], recurring: [] }

function readStore() { try { return JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(emptyStore)) as Store } catch { return emptyStore } }
function report(error: { message: string } | null, operation: string) { if (error) throw new Error(`${operation}: ${error.message}`) }
function validUuid(value: unknown): value is string { return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) }
function ensureUuid(value: unknown) { return validUuid(value) ? value : crypto.randomUUID() }
function toCents(value: unknown, label: string) { const amount = typeof value === 'number' ? value : Number(value); if (!Number.isFinite(amount) || amount <= 0 || amount > 90_000_000_000_000) throw new Error(`${label}: valor inválido ou grande demais`); return BigInt(Math.round(amount * 100)).toString() }

export function SupabaseSync() {
  useEffect(() => {
    if (!supabase) { toast.error('Supabase não configurado. Confira o arquivo .env.local.'); return }
    let cancelled = false
    let authenticationBlocked = false
    let userId = ''
    async function synchronize() {
      if (authenticationBlocked) return
      if (!userId) {
        const { data } = await supabase.auth.getUser()
        userId = data.user?.id || ''
        if (!userId) {
          const { data: authData, error: authError } = await supabase.auth.signInAnonymously()
          report(authError, 'Autenticação')
          userId = authData.user?.id || ''
        }
      }
      if (!userId || cancelled) return
      const local = readStore()
      const normalized: Store = { transactions: local.transactions.map((item) => ({ ...item, id: ensureUuid(item.id) })), goals: local.goals.map((item) => ({ ...item, id: ensureUuid(item.id) })), budgets: local.budgets.map((item) => ({ ...item, id: ensureUuid(item.id) })), recurring: local.recurring.map((item) => ({ ...item, id: ensureUuid(item.id) })) }
      if (JSON.stringify(normalized) !== JSON.stringify(local)) localStorage.setItem(storageKey, JSON.stringify(normalized))
      const transactions = normalized.transactions.flatMap((item) => { try { return [{ id: item.id, user_id: userId, title: item.title, amount_cents: toCents(item.amount, `Lançamento "${item.title}"`), type: item.type, frequency: item.frequency || 'one_time', occurred_on: (item as Transaction & { occurredOn?: string }).occurredOn || new Date().toISOString().slice(0, 10) }] } catch (error) { toast.error(error instanceof Error ? error.message : `Lançamento "${item.title}" inválido`); return [] } })
      const goals = normalized.goals.map((item) => ({ id: item.id, user_id: userId, title: item.title, target_cents: toCents(item.target, `Meta "${item.title}"`), current_cents: item.current > 0 ? toCents(item.current, `Meta "${item.title}"`) : '0', due_on: item.due || null }))
      const budgets = normalized.budgets.map((item) => ({ id: item.id, user_id: userId, limit_cents: toCents(item.limit, `Orçamento "${item.id}"`), month: `${item.month}-01` }))
      const recurring = normalized.recurring.map((item) => ({ id: item.id, user_id: userId, title: item.title, amount_cents: toCents(item.amount, `Recorrente "${item.title}"`), type: item.type, day_of_month: item.day, frequency: item.frequency }))
      if (transactions.length) report((await supabase.from('transactions').upsert(transactions)).error, 'Lançamentos')
      if (goals.length) report((await supabase.from('goals').upsert(goals)).error, 'Metas')
      if (budgets.length) report((await supabase.from('budgets').upsert(budgets)).error, 'Orçamentos')
      if (recurring.length) report((await supabase.from('recurring_transactions').upsert(recurring)).error, 'Recorrentes')
    }
    const run = () => synchronize().catch((error: Error & { status?: number; code?: string }) => { if (!cancelled) { authenticationBlocked = error.message.includes('Anonymous sign-ins are disabled') || error.status === 422; if (authenticationBlocked) toast.error('Supabase recusou o login anônimo (422). Ative Anonymous Sign-Ins e desative CAPTCHA em Authentication > Providers > Anonymous.'); else toast.error(`Supabase${error.code ? ` [${error.code}]` : ''}: ${error.message}`) } })
    run()
    const timer = window.setInterval(run, 3000)
    return () => { cancelled = true; window.clearInterval(timer) }
  }, [])
  return null
}
