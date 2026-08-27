import { Toaster } from 'sonner'
import { FinanciaComplete } from '@/components/financia-complete'
import { SupabaseSync } from '@/components/supabase-sync-fixed'

export default function Page() {
  return (
    <>
      <FinanciaComplete />
      <SupabaseSync />
      <Toaster position="top-right" richColors />
    </>
  )
}
