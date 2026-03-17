document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollTrack');
    const container = document.getElementById('scrollContainer');

    if (!track || !container) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    const scrollDuration = 80; // CSSの animation 秒数と一致させる

    // 現在の位置でアニメーションを物理的に停止・固定
    const stopAutoScroll = () => {
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        currentTranslate = matrix.m41; // 現在のX座標を数値で取得
        track.style.animation = 'none';
        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    // 指を離した場所から静かに再開
    const startAutoScroll = () => {
        const halfWidth = track.offsetWidth / 2;
        
        // 1セット分の幅（0 〜 -halfWidth）の中での相対的な位置を算出
        let relativeOffset = currentTranslate % halfWidth;
        if (relativeOffset > 0) relativeOffset -= halfWidth;

        // 全体の何パーセント地点にいるかを計算
        const progress = Math.abs(relativeOffset) / halfWidth;
        
        // アニメーションを再適用し、delay（マイナス値）で位置をピタッと合わせる
        track.style.animation = `scroll ${scrollDuration}s linear infinite`;
        track.style.animationDelay = `-${progress * scrollDuration}s`;
    };

    const handleStart = (clientX) => {
        isDragging = true;
        stopAutoScroll();
        startX = clientX - currentTranslate;
        container.style.cursor = 'grabbing';
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        currentTranslate = clientX - startX;

        // 無限ループ境界チェック（余白を出さないワープ）
        const halfWidth = track.offsetWidth / 2;
        if (currentTranslate <= -halfWidth) {
            startX += halfWidth;
            currentTranslate += halfWidth;
        } else if (currentTranslate > 0) {
            startX -= halfWidth;
            currentTranslate -= halfWidth;
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = 'grab';
        startAutoScroll();
    };

    // イベントリスナー登録
    container.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX), { passive: true });
    container.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX), { passive: true });
    container.addEventListener('touchend', handleEnd);

    container.addEventListener('mousedown', (e) => handleStart(e.clientX));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX));
    window.addEventListener('mouseup', handleEnd);
});