(function () {
  'use strict';

  const banner = document.querySelector('[data-summer-closure-banner]');
  if (!banner) return;

  const dismissalKey = 'pawsh_summer_closure_banner_dismissed';
  const expiry = new Date(2026, 7, 25, 0, 0, 0);
  let dismissed = false;

  try {
    dismissed = sessionStorage.getItem(dismissalKey) === 'true';
  } catch (error) {
    // The notice still works when storage is unavailable.
  }

  if (new Date() >= expiry || dismissed) {
    banner.remove();
    return;
  }

  banner.hidden = false;

  const closeButton = banner.querySelector('[data-summer-closure-close]');
  if (!closeButton) return;

  closeButton.addEventListener('click', function () {
    try {
      sessionStorage.setItem(dismissalKey, 'true');
    } catch (error) {
      // Dismiss for this page even when storage is unavailable.
    }
    banner.remove();
  });
}());
