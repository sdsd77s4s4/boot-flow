# Boot Flow - Mobile UX Guide

## Visão Geral

O upgrade mobile do Boot Flow oferece uma experiência nativa em dispositivos móveis com suporte completo a PWA, gestos, offline-first e recursos premium.

## Componentes Mobile

### MobileNavBar
Barra de navegação inferior fixa com 4 ícones principais:
- **Home**: Dashboard principal
- **Analytics**: Análises e métricas
- **Chat**: Chat com IA
- **Perfil**: Configurações e perfil

**Uso:**
```tsx
import { MobileNavBar } from '@/components/bootflow/mobile/MobileNavBar.bootflow.mobile';

<MobileNavBar />
```

### BottomSheet
Painel deslizável de baixo para cima para ações rápidas.

**Uso:**
```tsx
import { BottomSheet } from '@/components/bootflow/mobile/BottomSheet.bootflow.mobile';

<BottomSheet isOpen={open} onClose={() => setOpen(false)} title="Ações">
  <div>Conteúdo aqui</div>
</BottomSheet>
```

### MobileDashboard
Dashboard com cards empilhados e navegação por swipe.

**Uso:**
```tsx
import { MobileDashboard } from '@/components/bootflow/mobile/MobileDashboard.bootflow.mobile';

<MobileDashboard 
  cards={[
    { id: '1', title: 'Card 1', content: <div>...</div> },
    { id: '2', title: 'Card 2', content: <div>...</div> },
  ]}
/>
```

### SafeAreaView
Wrapper que adiciona padding para safe areas (notch, etc).

**Uso:**
```tsx
import { SafeAreaView } from '@/components/bootflow/mobile/SafeAreaView.bootflow.mobile';

<SafeAreaView top bottom>
  <div>Conteúdo seguro</div>
</SafeAreaView>
```

## Hooks

### useDeviceDetect
Detecta tipo de dispositivo e modo standalone.

```tsx
const { isMobile, isTablet, isDesktop, isIOS, isAndroid, isStandalone } = useDeviceDetect();
```

### useGestureControls
Controles de gestos (swipe, long-press).

```tsx
const { bind } = useGestureControls({
  onSwipeLeft: () => console.log('Swipe left'),
  onSwipeRight: () => console.log('Swipe right'),
  onLongPress: () => console.log('Long press'),
});
```

### useResponsiveLayout
Layout responsivo com configurações por breakpoint.

```tsx
const { layoutMode, config, isMobile } = useResponsiveLayout();
```

### useOfflineSync
Sincronização offline com IndexedDB.

```tsx
const { isOnline, pendingActions, addOfflineAction } = useOfflineSync();

await addOfflineAction({
  type: 'create',
  table: 'users',
  data: { name: 'John' },
});
```

### useBiometricAuth
Autenticação biométrica (TouchID/FaceID).

```tsx
const { isSupported, isEnabled, authenticate, enable } = useBiometricAuth();

if (isSupported && !isEnabled) {
  await enable();
}
```

## PWA

### Manifest
Arquivo: `public/manifest.bootflow.mobile.json`

Incluir no `index.html`:
```html
<link rel="manifest" href="/manifest.bootflow.mobile.json">
```

### Service Worker
Arquivo: `public/service-worker.bootflow.mobile.js`

Registrado automaticamente via `src/scripts/registerMobileServiceWorker.bootflow.mobile.ts`

## Gestos Suportados

- **Swipe Left/Right**: Navegação entre cards
- **Swipe Up**: Abrir bottom sheet
- **Swipe Down**: Fechar bottom sheet / pull-to-refresh
- **Long Press**: Ações rápidas (editar, compartilhar, exportar)

## Offline-First

O sistema salva ações localmente quando offline e sincroniza automaticamente quando online. Usa IndexedDB via `localforage` para persistência.

## Push Notifications

### OneSignal (Opcional)
```tsx
import { oneSignalService } from '@/lib/notifications/oneSignal.bootflow.mobile';

await oneSignalService.initialize({ appId: 'YOUR_APP_ID' });
```

### Supabase Realtime
```tsx
import { supabaseNotificationService } from '@/lib/notifications/supabaseNotify.bootflow.mobile';

supabaseNotificationService.subscribe(userId, (notification) => {
  console.log('Nova notificação:', notification);
});
```

## Pagamentos

### Stripe
```tsx
import { CheckoutStripe } from '@/components/bootflow/CheckoutStripe.bootflow.mobile';

<CheckoutStripe 
  amount={10000} // em centavos
  onSuccess={() => console.log('Sucesso!')}
  onError={(error) => console.error(error)}
/>
```

### PIX
```tsx
import { generatePIXPayment } from '@/modules/payments/pix.bootflow.mobile';

const payment = await generatePIXPayment({
  amount: 10000,
  description: 'Pagamento Boot Flow',
});
```

## IA

Todas as chamadas de IA passam por proxy server (`/api/ai/bootflowProxy.agent.ts`) para segurança. Funciona em modo mock se `OPENAI_API_KEY` não estiver configurado.

## Biometria

Disponível apenas em PWA instalado (modo standalone). Usa WebAuthn API.

## Performance

- Code splitting por vendor
- Lazy loading de componentes
- Cache inteligente (Workbox)
- Imagens responsivas (AVIF/WebP)

## Testes

Execute testes mobile:
```bash
npm run test:mobile
```

Viewports testados:
- iPhone X: 375x812
- Android: 412x915
- Tablet: 768x1024

