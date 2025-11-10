-- ============================================
-- Script SQL para ADICIONAR coluna 'pago'
-- na tabela users
-- ============================================

-- Adiciona coluna pago se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'users' 
                 AND column_name = 'pago') THEN
    ALTER TABLE public.users ADD COLUMN pago BOOLEAN DEFAULT FALSE;
    COMMENT ON COLUMN public.users.pago IS 'Indica se o cliente está com pagamento em dia';
  END IF;
END $$;

-- Cria índice para melhor performance em buscas por status de pagamento
CREATE INDEX IF NOT EXISTS idx_users_pago ON public.users(pago) WHERE pago = TRUE;

-- Atualiza a coluna updated_at quando pago for alterado (opcional, através de trigger)
-- Isso pode ser feito através de um trigger se necessário

