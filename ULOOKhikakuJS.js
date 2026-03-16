document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollTrack');
    const container = document.getElementById('scrollContainer');
    const items = document.querySelectorAll('.lens-card, .photochromic-nav');

    container.addEventListener('touchstart', () => { track.classList.add('is-paused'); }, {passive: true});
    container.addEventListener('touchend', () => { track.classList.remove('is-paused'); }, {passive: true});

    items.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) window.location.href = page;
        });
    });
});