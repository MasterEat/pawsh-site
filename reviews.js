window.initReviews = function () {
  const placeId = 'YOUR_PLACE_ID';
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  service.getDetails(
    { placeId, fields: ['rating', 'user_ratings_total', 'reviews'] },
    (result, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !result) {
        console.error('Error fetching reviews:', status);
        return;
      }
      document.getElementById('rating-value').textContent = result.rating;
      document.getElementById('rating-count').textContent = `(${result.user_ratings_total} reviews)`;
      const container = document.getElementById('reviews-container');
      if (result.reviews) {
        result.reviews.slice(0, 3).forEach(r => {
          const reviewEl = document.createElement('div');
          reviewEl.className = 'review';
          reviewEl.innerHTML = `<p class="review-text">"${r.text}"</p><p class="review-author">- ${r.author_name}</p>`;
          container.appendChild(reviewEl);
        });
      }
    }
  );
};
