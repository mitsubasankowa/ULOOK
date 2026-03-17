document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollTrack');
    const container = document.getElementById('scrollContainer');

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // 自動スクロールを一時停止
    const stopAutoScroll = () => {
        track.style.animation = 'none';
    };

    // 自動スクロールを再開
    const startAutoScroll = () => {
        track.style.animation = 'scroll 80s linear infinite';
    };

    // タッチ開始
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoScroll();
        
        // 現在の移動距離を取得
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        currentTranslate = matrix.m41;
        
        track.style.transition = 'none';
    }, { passive: true });

    // タッチ中（スワイプ）
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].clientX;
        const diff = x - startX;
        // 指の動きに合わせて移動
        track.style.transform = `translateX(${currentTranslate + diff}px)`;
    }, { passive: true });

    // タッチ終了
    container.addEventListener('touchend', () => {
        isDragging = false;
        // 1秒後に自動スクロールを再開
        setTimeout(startAutoScroll, 1000);
    });

    // --- PCマウス操作用（確認用） ---
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        stopAutoScroll();
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        currentTranslate = matrix.m41;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        track.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        setTimeout(startAutoScroll, 1000);
    });
});