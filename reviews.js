async function loadGoogleRatings() {
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Network response was not ok');
    const result = await res.json();
    document.querySelector('.google-rating').textContent = `Μέση βαθμολογία: ${result.rating}`;
    document.querySelector('.google-review-count').textContent = `Σύνολο αξιολογήσεων: ${result.user_ratings_total}`;
    document.querySelector('.google-reviews').innerHTML = (result.reviews || []).slice(0, 3).map(r =>
      `<p><strong>${r.author_name}</strong>: ${r.text}</p>`
    ).join('');
  } catch (err) {
    console.error('Google ratings fetch failed', err);
  }
}

document.addEventListener('DOMContentLoaded', loadGoogleRatings);
