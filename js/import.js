async function loadHTML(elementId, path) {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id '${elementId}' not found`);
            return;
        }

        const response = await fetch(path);
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.error('HTML 로드 중 에러 발생:', error);
    }
}

// 순차적 로드
async function initLayout() {
    // 먼저 layout 로드
    await loadHTML('layout', './basic/layout.html');
    await loadHTML('header', './basic/header.html');
    await loadHTML('footer', './basic/footer.html');

    // header 높이만큼 container에 margin-top 설정
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    
    if (header && container) {
        const headerHeight = header.offsetHeight;
        container.style.marginTop = headerHeight + 'px';
    }
}

document.addEventListener('DOMContentLoaded', initLayout);

// 창 크기가 변경될 때도 margin 조정
window.addEventListener('resize', function() {
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    
    if (header && container) {
        const headerHeight = header.offsetHeight;
        container.style.marginTop = headerHeight + 'px';
    }
});

document.addEventListener('DOMContentLoaded', initLayout);