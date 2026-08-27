export type Transaction = {
  id: string
  title: string
  category: string
  date: string
  amount: number
  type: 'income' | 'expense'
  frequency?: 'one_time' | 'weekly' | 'monthly' | 'yearly' | 'custom'
  recurrence_interval?: number
  recurrence_end_on?: string
  occurredOn?: string
  icon: string
}

export const transactions: Transaction[] = [
  { id: '1', title: 'Trabalho na UNIVASF', category: 'Salário', date: '23 ago', amount: 400, type: 'income', icon: 'briefcase', occurredOn: '2026-08-23' },
  { id: '2', title: 'Curso', category: 'Educação', date: '23 ago', amount: 80, type: 'expense', icon: 'book-open', occurredOn: '2026-08-23' },
  { id: '3', title: 'Celular', category: 'Contas', date: '23 ago', amount: 30, type: 'expense', icon: 'smartphone', occurredOn: '2026-08-23' },
  { id: '4', title: 'Mãe', category: 'Família', date: '23 ago', amount: 80, type: 'expense', icon: 'heart', occurredOn: '2026-08-23' },
  { id: '5', title: 'Dízimo', category: 'Doações', date: '23 ago', amount: 40, type: 'expense', icon: 'hand-heart', occurredOn: '2026-08-23' },
]

export const trendData = [
  { day: '18 ago', entradas: 120, despesas: 80, saldo: 2080 },
  { day: '19 ago', entradas: 320, despesas: 110, saldo: 2290 },
  { day: '20 ago', entradas: 180, despesas: 140, saldo: 2330 },
  { day: '21 ago', entradas: 460, despesas: 210, saldo: 2580 },
  { day: '22 ago', entradas: 280, despesas: 160, saldo: 2700 },
  { day: '23 ago', entradas: 400, despesas: 230, saldo: 2570 },
  { day: '24 ago', entradas: 240, despesas: 170, saldo: 2640 },
]

export const categories = [
  { name: 'Casa', value: 460, color: 'var(--chart-1)' },
  { name: 'Alimentação', value: 320, color: 'var(--chart-2)' },
  { name: 'Transporte', value: 180, color: 'var(--chart-3)' },
  { name: 'Educação', value: 140, color: 'var(--chart-4)' },
  { name: 'Lazer', value: 90, color: 'var(--chart-5)' },
]

export const goals = [
  { title: 'Comprar notebook', current: 2100, target: 3000, due: '31 dez 2026', icon: 'laptop' },
  { title: 'Reserva de emergência', current: 4200, target: 6000, due: '30 mar 2027', icon: 'shield-check' },
]

export const budgets = [
  { name: 'Alimentação', spent: 320, limit: 500, status: 'Dentro do orçamento' },
  { name: 'Transporte', spent: 280, limit: 350, status: 'Próximo do limite' },
  { name: 'Lazer', spent: 210, limit: 180, status: 'Limite ultrapassado' },
]

export const formatBRL = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const iconFor = (name: string) => name

export type NavItem = { label: string; icon: string; key: string }
export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'layout-dashboard', key: 'dashboard' },
  { label: 'Lançamentos', icon: 'arrow-left-right', key: 'transactions' },
  { label: 'Metas', icon: 'target', key: 'goals' },
  { label: 'Orçamento', icon: 'wallet', key: 'budget' },
  { label: 'Análises', icon: 'chart-no-axes-combined', key: 'analytics' },
  { label: 'Recorrentes', icon: 'repeat', key: 'recurring' },
  { label: 'Calendário', icon: 'calendar-days', key: 'calendar' },
]

export const categoriesDonut = [...categories, { name: 'Outros', value: 60, color: 'var(--muted-foreground)' }]

export const recurring = [
  { name: 'Academia', value: 89.9, day: 5, category: 'Saúde', active: true },
  { name: 'Internet', value: 99.9, day: 10, category: 'Casa', active: true },
  { name: 'Curso de inglês', value: 80, day: 15, category: 'Educação', active: true },
  { name: 'Streaming', value: 55.9, day: 20, category: 'Lazer', active: false },
]

export const installments = [
  { name: 'Curso profissionalizante', value: 80, current: 4, total: 10, remaining: 480 },
  { name: 'Notebook', value: 350, current: 7, total: 12, remaining: 1750 },
]
