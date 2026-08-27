'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, CalendarDays, Check, LayoutDashboard, Plus, Search, Target, Wallet, X } from 'lucide-react'
import { toast } from 'sonner'
import { budgets, formatBRL, goals, type Transaction, transactions as seedTransactions } from '@/lib/financial-data'

const categories = ['Alimentação', 'Casa', 'Transporte', 'Educação', 'Lazer', 'Contas', 'Família', 'Doações', 'Salário']
const navigation = [
  { key: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { key: 'transactions', label: 'Lançamentos', icon: ArrowUpRight },
  { key: 'goals', label: 'Metas', icon: Target },
  { key: 'budget', label: 'Orçamento', icon: Wallet },
]

type TransactionType = Transaction['type']

function Summary({ items }: { items: Transaction[] }) {
  const income = items.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expense = items.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  const cards = [
    { label: 'Saldo atual', value: income - expense, icon: Wallet, tone: 'bg-[var(--primary)] text-white' },
    { label: 'Entradas no período', value: income, icon: ArrowDownLeft, tone: 'bg-emerald-100 text-emerald-700' },
    { label: 'Despesas no período', value: expense, icon: ArrowUpRight, tone: 'bg-rose-100 text-rose-700' },
  ]
  return <div className="grid gap-4 md:grid-cols-3">{cards.map(({ label, value, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className={`flex size-10 items-center justify-center rounded-xl ${tone}`}><Icon className="size-5" /></div><p className="mt-5 text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold">{formatBRL(value)}</p></div>)}</div>
}

function TransactionForm({ onSave, onClose }: { onSave: (item: Transaction) => void; onClose: () => void }) {
  const [type, setType] = useState<TransactionType>('expense')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedAmount = Number(amount.replace(',', '.'))
    if (!title.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error('Informe uma descrição e um valor maior que zero.')
      return
    }
    onSave({ id: crypto.randomUUID(), title: title.trim(), category, date: new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''), amount: parsedAmount, type, icon: type === 'income' ? 'briefcase' : 'wallet' })
    toast.success('Lançamento adicionado.')
    onClose()
  }

  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 sm:items-center sm:p-4"><form onSubmit={submit} className="w-full max-w-lg rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-3xl"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">Novo lançamento</h2><p className="mt-1 text-sm text-muted-foreground">Registre uma movimentação para atualizar seu painel.</p></div><button type="button" onClick={onClose} aria-label="Fechar" className="rounded-lg p-2 hover:bg-accent"><X className="size-5" /></button></div><div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1"><button type="button" onClick={() => setType('expense')} className={`rounded-lg py-2 text-sm font-semibold ${type === 'expense' ? 'bg-card text-rose-700 shadow-sm' : 'text-muted-foreground'}`}>Despesa</button><button type="button" onClick={() => setType('income')} className={`rounded-lg py-2 text-sm font-semibold ${type === 'income' ? 'bg-card text-emerald-700 shadow-sm' : 'text-muted-foreground'}`}>Entrada</button></div><div className="mt-5 grid gap-4"><label className="grid gap-2 text-sm font-medium">Descrição<input required value={title} onChange={(event) => setTitle(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Ex.: Mercado" /></label><div className="grid grid-cols-2 gap-4"><label className="grid gap-2 text-sm font-medium">Valor<input required min="0.01" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" placeholder="0,00" /></label><label className="grid gap-2 text-sm font-medium">Data<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label></div><label className="grid gap-2 text-sm font-medium">Categoria<select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3">{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div><button type="submit" className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] font-semibold text-white hover:opacity-90"><Check className="size-4" />Salvar lançamento</button></form></div>
}

function TransactionList({ items }: { items: Transaction[] }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Lançamentos recentes</h2><p className="mt-1 text-sm text-muted-foreground">Dados salvos neste dispositivo</p></div><CalendarDays className="size-5 text-muted-foreground" /></div><div className="mt-4 divide-y divide-border">{items.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">Nenhum lançamento encontrado.</p> : items.map((item) => <div key={item.id} className="flex items-center gap-3 py-3"><div className={`flex size-10 items-center justify-center rounded-xl ${item.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{item.type === 'income' ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.title}</p><p className="text-xs text-muted-foreground">{item.category} · {item.date}</p></div><strong className={item.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}>{item.type === 'income' ? '+' : '-'} {formatBRL(item.amount)}</strong></div>)}</div></div>
}

export function FinanciaApp() {
  const [items, setItems] = useState<Transaction[]>(seedTransactions)
  const [active, setActive] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | TransactionType>('all')
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('financia-transactions')
    if (saved) setItems(JSON.parse(saved) as Transaction[])
  }, [])

  useEffect(() => { window.localStorage.setItem('financia-transactions', JSON.stringify(items)) }, [items])

  const filtered = useMemo(() => items.filter((item) => (filter === 'all' || item.type === filter) && `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase())), [items, filter, search])
  const title = navigation.find((item) => item.key === active)?.label ?? 'Visão geral'

  return <div className="min-h-screen bg-background text-foreground"><div className="mx-auto flex min-h-screen max-w-[1400px]"><aside className="hidden w-64 shrink-0 border-r border-border bg-card p-6 lg:block"><div className="flex items-center gap-3 text-xl font-bold"><span className="flex size-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white">F</span>FinanCia</div><p className="mb-3 mt-12 text-xs font-bold uppercase tracking-widest text-muted-foreground">Navegação</p><nav className="grid gap-1">{navigation.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActive(key)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${active === key ? 'bg-[var(--primary)] text-white' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}><Icon className="size-4" />{label}</button>)}</nav></aside><main className="min-w-0 flex-1 p-4 pb-24 sm:p-8"><header className="mb-8 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">24 de agosto de 2026</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">Olá, Flávio</h1></div><button onClick={() => setFormOpen(true)} className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-4 font-semibold text-white shadow-sm hover:opacity-90"><Plus className="size-4" /><span className="hidden sm:inline">Novo lançamento</span></button></header>{active === 'dashboard' && <div className="grid gap-8"><div><p className="mb-4 text-sm text-muted-foreground">Uma visão clara do seu dinheiro.</p><Summary items={items} /></div><TransactionList items={filtered.slice(0, 8)} /><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><h2 className="font-semibold">Suas metas</h2>{goals.map((goal) => <div key={goal.title} className="mt-5"><div className="flex justify-between text-sm"><span>{goal.title}</span><strong>{Math.round(goal.current / goal.target * 100)}%</strong></div><div className="mt-2 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${goal.current / goal.target * 100}%` }} /></div></div>)}</div><div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><h2 className="font-semibold">Orçamento</h2>{budgets.map((budget) => <div key={budget.name} className="mt-4"><div className="flex justify-between text-sm"><span>{budget.name}</span><span className="text-muted-foreground">{formatBRL(budget.spent)} / {formatBRL(budget.limit)}</span></div><div className="mt-2 h-2 rounded-full bg-muted"><div className={`h-full rounded-full ${budget.spent > budget.limit ? 'bg-rose-500' : 'bg-[var(--primary)]'}`} style={{ width: `${Math.min(budget.spent / budget.limit * 100, 100)}%` }} /></div></div>)}</div></div></div>}{active === 'transactions' && <div className="grid gap-6"><div><h2 className="text-2xl font-bold">{title}</h2><p className="mt-1 text-muted-foreground">Controle tudo que entra e sai.</p></div><Summary items={items} /><div className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex flex-wrap gap-3"><div className="relative min-w-48 flex-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm" placeholder="Buscar lançamento" /></div><select value={filter} onChange={(event) => setFilter(event.target.value as 'all' | TransactionType)} className="h-10 rounded-xl border border-input bg-background px-3 text-sm"><option value="all">Todos</option><option value="income">Entradas</option><option value="expense">Despesas</option></select></div><div className="mt-4"><TransactionList items={filtered} /></div></div></div>}{active === 'goals' && <div className="grid gap-6"><h2 className="text-2xl font-bold">Metas financeiras</h2><div className="grid gap-4 md:grid-cols-2">{goals.map((goal) => <div key={goal.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><h3 className="font-semibold">{goal.title}</h3><p className="mt-1 text-sm text-muted-foreground">Prazo: {goal.due}</p><p className="mt-8 text-2xl font-bold">{formatBRL(goal.current)}</p><p className="text-sm text-muted-foreground">de {formatBRL(goal.target)}</p><div className="mt-4 h-3 rounded-full bg-muted"><div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${goal.current / goal.target * 100}%` }} /></div></div>)}</div></div>}{active === 'budget' && <div className="grid gap-6"><h2 className="text-2xl font-bold">Orçamento mensal</h2><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{budgets.map((budget) => <div key={budget.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><h3 className="font-semibold">{budget.name}</h3><p className="mt-5 text-xl font-bold">{formatBRL(budget.spent)} <span className="text-sm font-normal text-muted-foreground">/ {formatBRL(budget.limit)}</span></p><div className="mt-4 h-2 rounded-full bg-muted"><div className={`h-full rounded-full ${budget.spent > budget.limit ? 'bg-rose-500' : 'bg-[var(--primary)]'}`} style={{ width: `${Math.min(budget.spent / budget.limit * 100, 100)}%` }} /></div></div>)}</div></div>}</main></div><nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-border bg-card p-2 lg:hidden">{navigation.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActive(key)} className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] ${active === key ? 'text-[var(--primary)]' : 'text-muted-foreground'}`}><Icon className="size-5" />{label}</button>)}</nav>{formOpen && <TransactionForm onSave={(item) => setItems((current) => [item, ...current])} onClose={() => setFormOpen(false)} />}</div>
}
