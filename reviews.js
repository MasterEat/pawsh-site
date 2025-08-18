window.initReviews = function () {
  const placeId = 'ChIJryGcYlWjoRQRimgI2tGaEVc';
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  service.getDetails(
    { placeId, fields: ['rating', 'user_ratings_total', 'reviews'] },
    (result, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !result) {
        console.error('Error fetching reviews:', status);
        return;
      }
      document.querySelector('.google-rating').textContent = result.rating;
      document.querySelector('.google-review-count').textContent = `(${result.user_ratings_total} reviews)`;
      const container = document.querySelector('.google-reviews');
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
