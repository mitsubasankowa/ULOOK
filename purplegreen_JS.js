document.addEventListener('DOMContentLoaded', () => {
    const viewArea = document.getElementById('viewArea');
    const onImage = document.getElementById('onImage');
    const badge = document.getElementById('badge');

    if (!viewArea || !onImage || !badge) return;

    viewArea.addEventListener('click', () => {
        const isActive = onImage.classList.toggle('active');
        if (isActive) {
            badge.innerText = '装着ON';
            badge.classList.replace('is-off', 'is-on');
        } else {
            badge.innerText = '装着OFF';
            badge.classList.replace('is-on', 'is-off');
        }
    });
});