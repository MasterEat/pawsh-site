// Fetch Google reviews and display them on the page

document.addEventListener('DOMContentLoaded', async () => {
  const ratingEl = document.querySelector('.google-rating');
  const countEl = document.querySelector('.google-review-count');
  const reviewsEl = document.querySelector('.google-reviews');

  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Network response was not ok');
    const { rating, user_ratings_total, reviews } = await res.json();

    if (ratingEl) ratingEl.textContent = `⭐ ${rating.toFixed(1)}`;
    if (countEl) countEl.textContent = `${user_ratings_total} αξιολογήσεις`;

    if (reviewsEl) {
      reviewsEl.innerHTML = '';
      reviews.forEach(r => {
        const wrapper = document.createElement('div');
        wrapper.className = 'review';
        wrapper.innerHTML = `
          <p><strong>${r.author_name}</strong> - ${r.rating}/5</p>
          <p>${r.text}</p>
        `;
        reviewsEl.appendChild(wrapper);
      });
    }
  } catch (err) {
    console.error('Error fetching reviews:', err);
    if (reviewsEl) reviewsEl.textContent = 'Αποτυχία φόρτωσης αξιολογήσεων.';
  }
});

