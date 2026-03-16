document.addEventListener('DOMContentLoaded', () => {
    const viewArea = document.getElementById('viewArea');
    const onImage = document.getElementById('onImage');
    const badge = document.getElementById('badge');

    if (!viewArea || !onImage || !badge) return;

    viewArea.addEventListener('click', () => {
        // 画像の表示・非表示を切り替え
        const isActive = onImage.classList.toggle('active');
        
        // ボタン（バッジ）のスタイルとテキストを更新
        if (isActive) {
            badge.innerText = '装着ON';
            badge.classList.remove('is-off');
            badge.classList.add('is-on');
        } else {
            badge.innerText = '装着OFF';
            badge.classList.remove('is-on');
            badge.classList.add('is-off');
        }
    });
});