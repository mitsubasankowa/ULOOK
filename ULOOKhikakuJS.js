document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollTrack');
    const container = document.getElementById('scrollContainer');

    if (!track || !container) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    const scrollSpeed = 80; // アニメーションの1周の時間（秒）

    // 自動スクロールを完全に停止
    const stopAutoScroll = () => {
        track.style.animation = 'none';
    };

    // 現在の位置からアニメーションを自然に再開
    const startAutoScroll = () => {
        const halfWidth = track.offsetWidth / 2;
        // 現在のズレ（0〜半分まで）から進捗率（0〜100%）を計算
        let progress = (Math.abs(currentTranslate) % halfWidth) / halfWidth * 100;
        
        track.style.animation = `scroll ${scrollSpeed}s linear infinite`;
        // 指を離した場所から再開するようにディレイをマイナス値で調整
        track.style.animationDelay = `-${(progress / 100) * scrollSpeed}s`;
    };

    // 操作開始の共通処理
    const handleStart = (clientX) => {
        isDragging = true;
        
        // 現在のアニメーションによる移動位置を正確に取得
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        currentTranslate = matrix.m41;
        
        startX = clientX - currentTranslate;
        
        stopAutoScroll();
        // transformを固定して指に追従させる準備
        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    // 操作中（移動）の共通処理
    const handleMove = (clientX) => {
        if (!isDragging) return;
        
        currentTranslate = clientX - startX;
        const halfWidth = track.offsetWidth / 2;

        // 【無限ループ・ワープ処理】
        // 左に動かしすぎて余白が出そうになったら右へワープ
        if (currentTranslate <= -halfWidth) {
            startX += halfWidth;
            currentTranslate += halfWidth;
        }
        // 右に動かしすぎて左端が見えそうになったら左へワープ
        if (currentTranslate > 0) {
            startX -= halfWidth;
            currentTranslate -= halfWidth;
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    // 操作終了の共通処理
    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        startAutoScroll();
    };

    // --- イベントリスナーの登録 ---

    // タッチ操作（タブレット・スマホ）
    container.addEventListener('touchstart', (e) => {
        handleStart(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        handleMove(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchend', handleEnd);

    // マウス操作（PC確認用）
    container.addEventListener('mousedown', (e) => {
        handleStart(e.clientX);
        container.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            container.style.cursor = 'grab';
            handleEnd();
        }
    });
});