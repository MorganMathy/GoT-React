export function formatReleaseDate(dateString) {
  // Options de formatage de la date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Création d'un objet Date à partir de la chaîne de caractères dateString
  const releaseDate = new Date(dateString);

  // Formatage de la date en utilisant les options spécifiées
  return releaseDate.toLocaleDateString(undefined, options);
}
