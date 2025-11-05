/**
 * V_Green 이미지 최적화 및 크롭 유틸리티
 * 이미지 로딩 속도 최적화 및 크기 일관성 개선
 */

// 이미지 lazy loading 처리
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 이미지 로드 완료 시 처리
                    if (img.complete) {
                        img.classList.add('loaded');
                    } else {
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        
                        img.addEventListener('error', () => {
                            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f0f0f0" width="400" height="300"/><text fill="%23666" font-family="Arial" font-size="14" x="50%" y="50%" text-anchor="middle" dy="0.3em">이미지를 불러올 수 없습니다</text></svg>';
                            img.classList.add('loaded');
                        });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserver를 지원하지 않는 브라우저
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// 이미지 크롭 및 비율 통일 함수
function normalizeImageAspectRatio(containerSelector, aspectRatio = '4/3') {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;
        
        // 비율 계산
        const [widthRatio, heightRatio] = aspectRatio.split('/').map(Number);
        const targetAspectRatio = widthRatio / heightRatio;
        
        // 컨테이너 스타일 설정
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        
        // 이미지 스타일 설정
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center center';
        
        // 비율 유지
        const updateAspectRatio = () => {
            const containerWidth = container.offsetWidth;
            const containerHeight = containerWidth / targetAspectRatio;
            container.style.height = `${containerHeight}px`;
        };
        
        updateAspectRatio();
        
        // 리사이즈 이벤트 리스너
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateAspectRatio, 100);
        });
    });
}

// 포트폴리오 이미지 그리드 최적화
function optimizePortfolioGrid() {
    const gridItems = document.querySelectorAll('.portfolio-grid-item, .comparison-before, .comparison-after');
    
    gridItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // 컨테이너 설정
        if (!item.classList.contains('image-container')) {
            item.classList.add('image-container');
        }
        
        // 이미지 스타일 강제 적용
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center center';
    });
}

// 이미지 프리로딩 (중요한 이미지만)
function preloadCriticalImages() {
    const criticalImages = [
        // 메인 페이지 중요 이미지들
        'https://page.gensparksite.com/v1/base64_upload/c965e012c32e3176a025cd45a95f73c4'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// 이미지 로딩 성능 모니터링
function monitorImageLoading() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalCount = images.length;
    
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                updateLoadingProgress(loadedCount, totalCount);
            });
            
            img.addEventListener('error', () => {
                loadedCount++;
                updateLoadingProgress(loadedCount, totalCount);
            });
        }
    });
    
    if (loadedCount === totalCount) {
        updateLoadingProgress(loadedCount, totalCount);
    }
}

function updateLoadingProgress(loaded, total) {
    // 로딩 진행 상황 업데이트 (필요시 사용)
    const percentage = Math.round((loaded / total) * 100);
    console.log(`이미지 로딩 진행률: ${percentage}%`);
}

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 이미지 lazy loading 초기화
    initImageLazyLoading();
    
    // 포트폴리오 그리드 최적화
    optimizePortfolioGrid();
    
    // 중요 이미지 프리로딩
    preloadCriticalImages();
    
    // 이미지 로딩 모니터링
    monitorImageLoading();
});

// 페이지 로드 완료 후 추가 최적화
window.addEventListener('load', function() {
    // 비율 통일 적용
    normalizeImageAspectRatio('.portfolio-grid-item', '4/3');
    normalizeImageAspectRatio('.comparison-before', '4/3');
    normalizeImageAspectRatio('.comparison-after', '4/3');
});

// 외부에서 사용할 수 있도록 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initImageLazyLoading,
        normalizeImageAspectRatio,
        optimizePortfolioGrid,
        preloadCriticalImages
    };
}
