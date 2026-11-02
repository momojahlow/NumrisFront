# Smart Print · Numeris — Landing page OCR & RAG

## Objectif

Créer dans l’application React existante une landing page française pour Numeris, l’application de Smart Print dédiée à la numérisation et à la dématérialisation documentaire augmentée par l’IA : présentation du parcours OCR, extraction/structuration des informations, recherche documentaire par RAG et réponses reliées aux sources. La page doit être moderne, responsive et animée, en s’inspirant des références visuelles partagées par l’utilisateur.

## Direction de conception

- **Mouvement :** SaaS éditorial contemporain, avec une interface documentaire sobre et des touches de visualisation produit.
- **Principes :** clarté, traçabilité, confiance et maîtrise des usages métiers.
- **Palette :** couleurs du logo officiel fourni : bleu `#0067bb`, noir et blanc. Le bleu identifie la technologie, les actions et les sélections; le bleu nuit ancre les barres d’espace de travail; le noir, le blanc et les gris bleutés préservent contraste et lisibilité. Les couleurs de statut restent sémantiques; aucun turquoise décoratif n’est repris de l’image de référence.
- **Mise en page :** grand hero bleu nuit, titre éditorial à gauche et visualisation du document traité à droite; sections claires et asymétriques pour le flux de traitement, la technologie, la démonstration, la confiance et la FAQ, suivies d’un formulaire contact responsive en fin de page. Une barre de contact bleu nuit défile hors de l’écran, tandis que la navigation blanche reste sticky en haut avec une ombre légère au scroll.
- **Signatures :** marque documentaire compacte, faisceau de scan animé et panneau RAG affichant ses sources.
- **Interactions et animations :** navigation mobile repliable, liens d’ancrage, démonstration locale interactive, cartes au survol et mouvement discret du faisceau/illustrations; respecter `prefers-reduced-motion`.
- **Typographie :** Manrope pour les titres et le logotype, DM Sans pour le corps, en cohérence avec la référence Digiassur fournie.
- **Essence de marque :** rendre les documents d’entreprise consultables et compréhensibles, de la page numérisée à la réponse sourcée. Personnalité : claire, précise, rassurante.
- **Voix :** directe et concrète. Exemples : « Donnez une seconde vie à vos documents. » et « La bonne réponse. Et le bon document. »
- **Logo :** logo officiel fourni par Smart Print, en bleu `#0067bb` et noir avec fond transparent; conserver ses proportions, sa transparence et son contraste dans l’en-tête, le workspace, le footer et le favicon.
- **Couleur signature :** bleu du logo `#0067bb`, accompagné du noir `#111316` et du blanc.

## Parcours de devis

La page `/devis` permet de choisir une prestation (numérisation, OCR/extraction, RAG ou projet global), d’estimer le volume documentaire et de décrire le besoin. Les coordonnées sont validées côté client et serveur; un honeypot réduit le spam; la demande est enregistrée côté serveur avec une référence de suivi. Aucun fichier n’est demandé ni téléversé.

La navigation principale inclut un lien « Contact » vers la dernière section de l’accueil. Son formulaire demande les coordonnées et le message avec consentement explicite, masque un honeypot et réutilise la mutation de demandes existante pour l’enregistrement et la référence de suivi.

## Connexion

Pour cette simulation, le bouton de `/connexion` ouvre `/dashboard`, un tableau de bord de démonstration utilisant uniquement des données fictives côté client. Aucun compte, document, service IA ou stockage réel n’est sollicité. La route `/admin` reste distincte et conserve sa protection par authentification et rôle admin.

## Espace admin

Les espaces de travail partagent `NumerisWorkspace` : navigation latérale claire avec groupes à sous-menus repliables, barre supérieure bleu nuit, bleu Numeris pour l’état actif, menus de compte et notifications, et navigation clavier/mobile accessible. `/dashboard#overview` reste une simulation isolée, avec filtres locaux, indicateurs et graphiques explicitement fictifs, documents d’exemple et assistant RAG pré-écrit. `/admin` reprend le même cadre visuel mais affiche uniquement les demandes et indicateurs issus de la base, sans graphiques inventés; les sous-menus filtrent les demandes par statut. Les lectures et changements de statut restent protégés côté serveur par `adminProcedure`; l’interface distingue la connexion requise d’un compte sans rôle admin.

## Structure du projet

- `client/src/pages/Home.tsx` : point d’entrée de la page d’accueil.
- `client/src/pages/NumerisHome.tsx` : contenu React de la landing page, démonstration locale et formulaire contact final.
- `client/src/components/NumerisHeader.tsx` : navigation et identité Numeris partagées.
- `client/src/components/NumerisWorkspace.tsx` : shell responsive partagé par la démo et l’espace admin protégé.
- `client/src/components/DemoAnalytics.tsx` : graphiques de démonstration, sans dépendance à une source réelle.
- `client/src/pages/QuoteRequest.tsx` et `quote-page.css` : formulaire de devis.
- `client/src/pages/LoginPage.tsx` et `login-page.css` : entrée en mode démonstration.
- `client/src/pages/DemoDashboard.tsx` : tableau de bord de simulation, isolé des API réelles.
- `client/src/pages/AdminPage.tsx` : espace admin Tailwind 4 et suivi des demandes.
- `server/adminRouter.ts` : endpoints de gestion accessibles au rôle admin uniquement.
- `client/src/pages/numeris.css` : palette, mise en page responsive et animations de la landing page.
- `client/public/manus-routes.json` : manifeste des routes publiques.
- `drizzle/schema.ts` et `server/quoteRouter.ts` : validation et stockage des demandes de devis.

## Comportement des démonstrations

La démo RAG d’accueil est autonome côté client et ne transmet ni document ni question à un service externe. Les exemples de réponses et de sources sont fictifs. La demande de devis requiert une base de données configurée et une migration appliquée pour être enregistrée côté serveur.
