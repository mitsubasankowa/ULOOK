document.addEventListener('DOMContentLoaded', () => {
    const viewArea = document.getElementById('viewArea');
    const onImage = document.getElementById('onImage');
    const badge = document.getElementById('badge');

    if (!viewArea || !onImage || !badge) return;

    // タブレット・PC両方に対応させる関数
    const toggleDisplay = (e) => {
        // 二重動作を防ぐ
        e.preventDefault();
        
        const isActive = onImage.classList.toggle('active');
        
        if (isActive) {
            badge.innerText = '装着ON';
            badge.classList.remove('is-off');
            badge.classList.add('is-on');
        } else {
            badge.innerText = '装着OFF';
            badge.classList.remove('is-on');
            badge.classList.add('is-off');
        }
    };

    // 「クリック」と「指で触れた瞬間（touchend）」の両方に反応させる
    viewArea.addEventListener('click', toggleDisplay);
    viewArea.addEventListener('touchend', toggleDisplay);
});