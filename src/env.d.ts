/// <reference path="../.astro/types.d.ts" />
interface Window {
  Alpine: import("alpinejs").Alpine;
}
interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly GEMINI_API_KEY: string;
  readonly OPENAI_API_KEY: string;
  readonly TOGETHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
