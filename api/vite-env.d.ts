/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STRIPE_SECRET_KEY?: string;
  readonly OPENAI_API_KEY?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

