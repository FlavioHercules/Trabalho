'use client'

import { useState } from 'react'
import Configuracoes from '@/components/Configuracoes'
import Dashboard, { type DashboardPage } from '@/components/Dashboard'
import Consultoria from '@/components/Consultoria'
import Irrigacao from '@/components/Irrigacao'
import Login from '@/components/Login'
import Notificacoes from '@/components/Notificacoes'
import Relatorios from '@/components/Relatorios'
import Sensores from '@/components/Sensores'
import Talhoes from '@/components/Talhoes'

type AppPage = DashboardPage | 'Login'

export default function Page() {
  const [activePage, setActivePage] = useState<AppPage>('Dashboard')

  if (activePage === 'Login') {
    return <Login onLogin={() => setActivePage('Dashboard')} />
  }

  const content = (() => {
    switch (activePage) {
      case 'Dashboard':
        return null
      case 'Talhões':
        return <Talhoes />
      case 'Sensores':
        return <Sensores />
      case 'Irrigação':
        return <Irrigacao />
      case 'Consultoria':
        return <Consultoria />
      case 'Relatórios':
        return <Relatorios />
      case 'Notificações':
        return <Notificacoes />
      case 'Configurações':
        return <Configuracoes />
    }
  })()

  return (
    <Dashboard
      activePage={activePage}
      onNavigate={setActivePage}
      onOpenLogin={() => setActivePage('Login')}
      content={content}
    />
  )
}
