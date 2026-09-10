# Cecília — 1 ano 🌸

Site de celebração do 1º aniversário da Cecília com Netlify Functions + Supabase.

## Setup Rápido

### 1. Criar banco de dados no Supabase

1. Vá para [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. No dashboard, vá para **SQL Editor** e execute:

```sql
CREATE TABLE storage_data (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_key ON storage_data(key);
CREATE INDEX idx_prefix ON storage_data(key text_pattern_ops);
```

4. Copie suas credenciais em **Settings > API**:
   - `SUPABASE_URL` (URL do projeto)
   - `SUPABASE_ANON_KEY` (Anon public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (Service role secret key)

### 2. Configurar variáveis de ambiente

1. Crie um arquivo `.env` na raiz:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

2. No Netlify, adicione as mesmas variáveis em **Site settings > Build & deploy > Environment**

### 3. Deploy no Netlify

1. Conecte seu repo do GitHub no [netlify.com](https://netlify.com)
2. Netlify detecta automaticamente `netlify.toml` e faz o deploy
3. Pronto! Seu site estará em `seu-site.netlify.app`

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar com Netlify Dev (emula Functions localmente)
npm run dev
```

O site rodará em `http://localhost:8888`

## Arquitetura

- **Frontend**: HTML/CSS/JS estático com API calls
- **Backend**: Netlify Functions (serverless)
- **Banco de dados**: Supabase (PostgreSQL)
- **Storage**: Tabela `storage_data` com key-value pairs

## Funcionalidades

✅ Mural de recadinhos (persistente)  
✅ RSVP/Confirmação de presença  
✅ Admin panel com lista de confirmados  
✅ Jogo da memória (local)  
✅ Galeria de fotos (local)  
✅ Countdown (local)  

## Troubleshooting

**"storage is not defined"**: Adicione `<script src="/storage-api.js"></script>` no HTML

**Erro 403 no Supabase**: Verifique se as variáveis de ambiente estão corretas

**Functions não funcionam localmente**: Instale `netlify-cli` e rode `npm run dev`

---

Feito com 💚 para Cecília
