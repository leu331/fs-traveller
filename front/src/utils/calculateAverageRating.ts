export function calculateAverageRating(reviews: { rating: number }[] = []): number {
  if (!reviews || reviews.length === 0) return 0; // 🔥 Garante que não é undefined

  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return sum / reviews.length;
}
