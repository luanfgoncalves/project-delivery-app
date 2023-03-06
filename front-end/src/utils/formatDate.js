function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-br');
}

export default formatDate;
