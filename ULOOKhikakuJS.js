document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollTrack');
    const container = document.getElementById('scrollContainer');

    if (!track || !container) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    const scrollSpeed = 80; // CSSのanimation時間と合わせる

    // 自動スクロールを完全に停止
    const stopAutoScroll = () => {
        track.style.animation = 'none';
    };

    // 現在の位置からアニメーションを自然に再開
    const startAutoScroll = () => {
        const halfWidth = track.offsetWidth / 2;
        // 現在のズレ（0〜半分まで）から進捗率（0〜100%）を計算
        // translateXがマイナスなので絶対値をとる
        let progress = (Math.abs(currentTranslate) % halfWidth) / halfWidth * 100;
        
        track.style.animation = `scroll ${scrollSpeed}s linear infinite`;
        // 指を離した場所から再開するようにディレイを調整
        track.style.animationDelay = `-${(progress / 100) * scrollSpeed}s`;
    };

    // 操作開始
    const handleStart = (clientX) => {
        isDragging = true;
        
        // 現在のアニメーションによる移動位置を正確に取得
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        currentTranslate = matrix.m41;
        
        // 指の開始位置を補正
        startX = clientX - currentTranslate;
        
        stopAutoScroll();
        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    // 操作中（スワイプ）
    const handleMove = (clientX) => {
        if (!isDragging) return;
        
        currentTranslate = clientX - startX;
        const halfWidth = track.offsetWidth / 2;

        /* 【無限ループ・ワープ処理】
           左端や右端に到達して余白が出そうになったら、
           見た目を変えずに1セット分(halfWidth)位置を飛ばす
        */
        if (currentTranslate <= -halfWidth) {
            startX += halfWidth;
            currentTranslate += halfWidth;
        }
        if (currentTranslate > 0) {
            startX -= halfWidth;
            currentTranslate -= halfWidth;
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    // 操作終了
    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        startAutoScroll();
    };

    // --- イベントリスナー ---

    // タッチ操作
    container.addEventListener('touchstart', (e) => {
        handleStart(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        handleMove(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchend', handleEnd);

    // マウス操作
    container.addEventListener('mousedown', (e) => {
        handleStart(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        handleMove(e.clientX);
    });

    window.addEventListener('mouseup', handleEnd);
});