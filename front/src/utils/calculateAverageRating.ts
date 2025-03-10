export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
