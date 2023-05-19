export function calculateTotalPages(linkHeader) {
  // Si linkHeader est vide, il n'y a qu'une seule page
  if (!linkHeader) {
    return 1;
  }

  // Recherche du lien "last" dans linkHeader
  const lastLink = linkHeader.split(',').find((link) => link.includes('rel="last"'));
  // Si aucun lien "last" n'est trouvé, il n'y a qu'une seule page
  if (!lastLink) {
    return 1;
  }

  // Recherche du numéro de page dans le lien "last"
  const matches = lastLink.match(/page=(\d+)/);
  // Si aucun numéro de page n'est trouvé, il n'y a qu'une seule page
  if (!matches) {
    return 1;
  }

  // Conversion du numéro de page en entier et retourne le résultat
  return parseInt(matches[1]);
}
