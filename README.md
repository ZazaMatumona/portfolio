# Portfolio — António Zaza Da Cruz

Site estático em HTML, CSS e JavaScript puro (sem frameworks, sem build).

## Estrutura

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── i18n.js      ← dicionário PT/EN
│   └── script.js    ← interatividade (menu, idioma, scroll, formulário)
└── assets/          ← coloca aqui a tua foto/imagens quando quiseres
```

## Como testar localmente

Não precisas de instalar nada de especial. Duas opções:

1. **Mais simples:** faz duplo-clique em `index.html` e abre no navegador.
2. **Recomendado** (evita pequenos problemas com caminhos de ficheiros):
   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```
   Depois abre `http://localhost:8000` no navegador.

## Publicar no Cloudflare Pages (via GitHub)

Como já tens conta no GitHub (`ZazaMatumona`), este é o caminho mais simples e permite que, no futuro, baste fazeres `git push` para atualizar o site automaticamente.

### Passo 1 — Criar o repositório no GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Primeira versão do portfolio"
git branch -M main
git remote add origin https://github.com/ZazaMatumona/portfolio.git
git push -u origin main
```

> Se preferires, cria o repositório primeiro em github.com (botão "New repository", nome sugerido: `portfolio`), antes de fazer o `git remote add`.

### Passo 2 — Ligar o Cloudflare Pages ao repositório

1. Entra em [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → aba **Pages** → **Connect to Git**.
2. Autoriza o Cloudflare a aceder à tua conta GitHub e escolhe o repositório `portfolio`.
3. Nas definições de build, usa:
   - **Framework preset:** `None`
   - **Build command:** *(deixa vazio)*
   - **Build output directory:** `/` (a raiz do projeto)
4. Clica em **Save and Deploy**.

Em menos de um minuto o Cloudflare publica o site num endereço do tipo `portfolio-xyz.pages.dev`.

### Passo 3 — Domínio próprio (opcional)

Se tiveres um domínio (ex: `zazadacruz.com`):
1. No projeto Pages → **Custom domains** → **Set up a custom domain**.
2. Segue as instruções para apontar o domínio (se o domínio já estiver no Cloudflare, é automático).

### Atualizações futuras

A partir daqui, qualquer alteração que faças localmente só precisa de:

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

O Cloudflare Pages deteta o `push` e publica a nova versão automaticamente — sem teres de fazer mais nada.

## Próximos passos sugeridos

- [ ] Substituir o avatar com iniciais "AZ" por uma foto real (em `assets/`)
- [ ] Adicionar um favicon (ícone do separador do navegador)
- [ ] Quando o Automatos.ao e o Hubs Cuvala estiverem prontos, adicionar novos `project-card` na secção de projetos da AxiomTech (o padrão já existe no `index.html`, basta copiar o bloco do NzoChain)
- [ ] Considerar registar um domínio próprio (ex: `zazadacruz.com` ou `zazadacruz.ao`)
