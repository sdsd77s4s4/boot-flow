# Boot Flow - Mobile Setup Guide

## Instalação Rápida

### 1. Dependências (já instaladas)
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Criar/atualizar `.env`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-... # Opcional
VITE_ONESIGNAL_APP_ID=... # Opcional
```

### 3. Gerar Ícones PWA
```bash
node scripts/bootflow/generate-pwa-icons.bootflow.mobile.js
# Substituir SVGs por ícones reais e converter para PNG
```

### 4. Registrar Service Worker
Adicionar em `index.html`:
```html
<link rel="manifest" href="/manifest.bootflow.mobile.json">
```

Adicionar em `src/main.tsx`:
```ts
import { registerMobileServiceWorker } from './scripts/registerMobileServiceWorker.bootflow.mobile';
registerMobileServiceWorker();
```

### 5. Integrar Componentes Mobile

#### Exemplo: Adicionar MobileNavBar
```tsx
import { MobileNavBar } from '@/components/bootflow/mobile/MobileNavBar.bootflow.mobile';

function App() {
  return (
    <>
      {/* Seu conteúdo */}
      <MobileNavBar />
    </>
  );
}
```

#### Exemplo: Usar BottomSheet
```tsx
import { BottomSheet } from '@/components/bootflow/mobile/BottomSheet.bootflow.mobile';

const [open, setOpen] = useState(false);

<BottomSheet isOpen={open} onClose={() => setOpen(false)} title="Ações">
  <div>Conteúdo</div>
</BottomSheet>
```

## Estrutura de Arquivos

```
src/
├── components/
│   └── bootflow/
│       ├── mobile/
│       │   ├── MobileNavBar.bootflow.mobile.tsx
│       │   ├── BottomSheet.bootflow.mobile.tsx
│       │   ├── MobileDashboard.bootflow.mobile.tsx
│       │   └── SafeAreaView.bootflow.mobile.tsx
│       ├── PushPermissionPrompt.bootflow.mobile.tsx
│       └── CheckoutStripe.bootflow.mobile.tsx
├── hooks/
│   ├── useDeviceDetect.bootflow.mobile.ts
│   ├── useGestureControls.bootflow.mobile.ts
│   ├── useResponsiveLayout.bootflow.mobile.ts
│   ├── useOfflineSync.bootflow.mobile.ts
│   ├── useBiometricAuth.bootflow.mobile.ts
│   └── useLocalEncryption.bootflow.mobile.ts
├── modules/
│   └── payments/
│       ├── stripe.bootflow.mobile.ts
│       └── pix.bootflow.mobile.ts
├── lib/
│   └── notifications/
│       ├── oneSignal.bootflow.mobile.ts
│       └── supabaseNotify.bootflow.mobile.ts
└── scripts/
    └── registerMobileServiceWorker.bootflow.mobile.ts

api/
├── payments/
│   ├── stripe/
│   │   └── create-intent.bootflow.mobile.ts
│   └── pix/
│       ├── generate.bootflow.mobile.ts
│       └── status.bootflow.mobile.ts
└── ai/
    └── bootflowProxy.agent.ts

public/
├── manifest.bootflow.mobile.json
├── service-worker.bootflow.mobile.js
└── icons/
    ├── bootflow-192-maskable.png
    └── bootflow-512-maskable.png
```

## Testes

### Executar Testes Mobile
```bash
npm run test:mobile # Quando configurado
```

### Testes Manuais
1. Abrir DevTools → Device Toolbar
2. Testar viewports: 375x812, 412x915, 768x1024
3. Verificar:
   - Navegação mobile
   - Gestos (swipe, long-press)
   - Offline sync
   - Push notifications
   - Pagamentos

## Deploy

### Vercel
1. Configurar environment variables
2. Deploy automático via Git

### Supabase Edge Functions
```bash
supabase functions deploy daily-report
```

## Troubleshooting

### Service Worker não registra
- Verificar se HTTPS está habilitado (ou localhost)
- Verificar console do navegador

### Push Notifications não funcionam
- Verificar permissões do navegador
- Verificar configuração OneSignal (se usado)

### Offline Sync não funciona
- Verificar IndexedDB no DevTools
- Verificar console para erros

## Suporte

Consulte:
- `docs/BOOTFLOW-MOBILE-UX.md` - Guia de UX
- `logs/bootflow-mobile-upgrade.log` - Log detalhado
- `logs/bootflow-mobile-summary.md` - Resumo completo

