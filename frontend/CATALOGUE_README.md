# Page Catalogue des Dispensaires

## Description
La page Catalogue.jsx présente une vue complète de tous les dispensaires partenaires de KmrCare à Douala.

## Fonctionnalités

### 🏥 Affichage des Dispensaires
- **12 dispensaires** répartis dans les 5 arrondissements de Douala
- **Informations détaillées** : nom, quartier, services, spécialités, horaires, téléphone
- **Système de notation** avec étoiles
- **Images représentatives** avec overlay gradient

### 🔍 Système de Filtrage
- **Filtrage par arrondissement** : Douala 1er, 2ème, 3ème, 4ème, 5ème
- **Filtrage par service** : Consultation, Urgences, Laboratoire, Prénatal, etc.
- **Barre de recherche** : recherche par nom de dispensaire ou quartier
- **Compteur de résultats** en temps réel

### 📱 Design Responsive
- **Grille adaptative** : 1 colonne (mobile) → 4 colonnes (desktop)
- **Navigation optimisée** pour mobile et desktop
- **Filtres responsive** avec boutons adaptatifs
- **Cards interactives** avec animations au hover

### 🎨 Charte Graphique
- **Couleurs principales** : 
  - Bleu foncé (#0f425d)
  - Vert médical (#0b9444) 
  - Bleu clair (#a5c2f7)
- **Typographie** : Police Poppins
- **Animations** : Motion/Framer Motion pour les interactions

### 🧭 Navigation
- **Navbar sticky** avec logo KmrCare
- **Bouton de retour** vers la page d'accueil
- **Intégration React Router** pour la navigation SPA

## Structure des Données

Chaque dispensaire contient :
```javascript
{
  id: number,
  nom: string,
  quartier: string,
  arrondissement: string,
  image: string,
  services: string[],
  horaires: string,
  rating: number,
  telephone: string,
  specialites: string[],
  description: string
}
```

## Dispensaires Inclus

1. **Dispensaire Central Akwa** (Douala 1er)
2. **Dispensaire Bonanjo** (Douala 1er)
3. **Dispensaire Makepe** (Douala 4ème)
4. **Dispensaire Bonaberi** (Douala 2ème)
5. **Dispensaire Bepanda** (Douala 3ème)
6. **Dispensaire New Bell** (Douala 1er)
7. **Dispensaire Ndokotti** (Douala 4ème)
8. **Dispensaire Koumassi** (Douala 3ème)
9. **Dispensaire Japoma** (Douala 5ème)
10. **Dispensaire Deido** (Douala 1er)
11. **Dispensaire Logbaba** (Douala 5ème)
12. **Dispensaire PK8** (Douala 4ème)

## Navigation
- **URL** : `/catalogue`
- **Accessible depuis** : Page Vitrine via le bouton "Voir Tous les Dispensaires"
- **Retour** : Bouton de retour vers la page d'accueil

## Technologies Utilisées
- React 19
- React Router DOM
- Framer Motion (animations)
- Tailwind CSS (styling)
- React Hooks (useState, useMemo)

## Instructions d'utilisation

1. Depuis la page d'accueil, cliquez sur "Voir Tous les Dispensaires" dans la section Vitrine
2. Utilisez les filtres pour affiner votre recherche
3. Explorez les cartes de dispensaires avec leurs informations détaillées
4. Cliquez sur "Prendre RDV" pour réserver un rendez-vous
5. Utilisez le bouton de retour pour revenir à l'accueil
