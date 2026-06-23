# GAMMA — Régie

Outil de pilotage de projets événementiels et calendrier éditorial.

---

## Déploiement sur Vercel (étape par étape)

### Prérequis
- Un compte [GitHub](https://github.com) (gratuit)
- Un compte [Vercel](https://vercel.com) (gratuit, plan Hobby)
- Une clé API Anthropic (sur [console.anthropic.com](https://console.anthropic.com))

---

### Étape 1 — Mettre le code sur GitHub

1. Crée un nouveau dépôt privé sur GitHub (ex. `gamma-regie`)
2. Dépose tous ces fichiers dedans (upload ou via Git)
3. Push sur la branche `main`

---

### Étape 2 — Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) → **Add New Project**
2. Connecte ton compte GitHub et sélectionne le dépôt `gamma-regie`
3. Vercel détecte automatiquement Vite → laisse les paramètres par défaut
4. Clique **Deploy** — le premier déploiement prend ~1 minute

---

### Étape 3 — Ajouter la clé API Anthropic

Sans cette étape, les analyses vocales et PDF ne fonctionneront pas.

1. Dans Vercel, va dans ton projet → **Settings** → **Environment Variables**
2. Ajoute une variable :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : ta clé (commence par `sk-ant-api03-...`)
   - **Environments** : coche les trois (Production, Preview, Development)
3. Clique **Save**
4. Va dans **Deployments** → clique les **3 points** sur le dernier déploiement → **Redeploy**

---

### Étape 4 — Accéder à l'appli

Vercel te donne une URL du type `gamma-regie-xxx.vercel.app`.  
Tu peux aussi ajouter un domaine personnalisé dans **Settings → Domains**.

---

### Développement local (optionnel)

```bash
npm install
npm run dev
```

Pour les appels API en local, crée un fichier `.env.local` :
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Et dans un second terminal, lance la fonction API localement :
```bash
npx vercel dev
```

---

### Coûts estimés

| Service | Plan | Coût |
|---|---|---|
| Vercel | Hobby (personnel) | 0 €/mois |
| GitHub | Gratuit | 0 €/mois |
| Anthropic API | Pay-as-you-go | ~2-5 €/mois |

---

### Structure du projet

```
/
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances
├── vite.config.js          # Config Vite
├── vercel.json             # Config Vercel (routes, fonctions)
├── .gitignore
├── .env.example            # Modèle de variables d'environnement
├── src/
│   ├── main.jsx            # Point d'entrée React
│   └── App.jsx             # Application complète
└── api/
    └── analyze.js          # Fonction serverless (proxy Anthropic)
```
