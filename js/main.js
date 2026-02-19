/**
 * 江南风韵旅游网站 - 主脚本
 * 包含轮播图、导航交互等功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initBannerSlider();
    initBookSlider();  // 3D翻书轮播
    initCultureSlider();
    initNavigation();
    initScrollEffects();
});

/**
 * 横幅轮播图
 */
function initBannerSlider() {
    const slider = document.querySelector('.banner-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    
    let currentIndex = 0;
    let autoplayTimer;
    const autoplayInterval = 5000;

    function showSlide(index) {
        // 处理边界情况
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // 移除所有活动状态
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 添加当前活动状态
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, autoplayInterval);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
        }
    }

    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            startAutoplay();
        });
    }

    // 绑定指示器点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            startAutoplay();
        });
    });

    // 鼠标悬停时暂停自动播放
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // 初始化
    showSlide(0);
    startAutoplay();
}

/**
 * 3D翻书轮播效果
 */
function initBookSlider() {
    const slider = document.querySelector('.book-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.book-slide');
    const prevBtn = slider.querySelector('.book-prev');
    const nextBtn = slider.querySelector('.book-next');
    
    if (slides.length === 0) return;

    let currentIndex = 1; // 默认显示第二张为中间
    let isAnimating = false;

    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            // 清除所有类
            slide.classList.remove('active', 'prev', 'prev-2', 'next', 'next-2', 'hidden');
            
            const diff = index - currentIndex;
            
            if (diff === 0) {
                slide.classList.add('active');
            } else if (diff === -1 || (currentIndex === 0 && index === slides.length - 1)) {
                slide.classList.add('prev');
            } else if (diff === -2 || (currentIndex <= 1 && index === slides.length - 2 + currentIndex)) {
                slide.classList.add('prev-2');
            } else if (diff === 1 || (currentIndex === slides.length - 1 && index === 0)) {
                slide.classList.add('next');
            } else if (diff === 2 || (currentIndex >= slides.length - 2 && index === 1 - (slides.length - 1 - currentIndex))) {
                slide.classList.add('next-2');
            } else {
                slide.classList.add('hidden');
            }
        });
    }

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // 循环处理
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentIndex = index;
        updateSlidePositions();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // 点击左右卡片时切换
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            if (slide.classList.contains('prev') || slide.classList.contains('prev-2')) {
                prevSlide();
            } else if (slide.classList.contains('next') || slide.classList.contains('next-2')) {
                nextSlide();
            }
        });
    });

    // 键盘支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // 自动播放
    let autoplayTimer;
    const autoplayInterval = 4000;

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, autoplayInterval);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
        }
    }

    // 鼠标悬停时暂停
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // 初始化
    updateSlidePositions();
    startAutoplay();
}

/**
 * 集团文化轮播图
 */
function initCultureSlider() {
    const slider = document.querySelector('.culture-slider');
    if (!slider) return;

    const slidesContainer = slider.querySelector('.culture-slides');
    const slides = slider.querySelectorAll('.culture-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');

    if (slides.length <= 3) return;

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 30; // 包含 gap

    function updateSlider() {
        const transform = -currentIndex * slideWidth;
        slidesContainer.style.transform = `translateX(${transform}px)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < slides.length - 3) {
                currentIndex++;
                updateSlider();
            }
        });
    }
}

/**
 * 导航栏交互
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 滚动时添加阴影效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - navbar.offsetHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 高亮当前活动的导航项
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

/**
 * 滚动动画效果
 */
function initScrollEffects() {
    const animatedElements = document.querySelectorAll('.feature-item, .service-item, .dest-card, .route-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 添加动画类的样式
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 特色功能项点击切换
 */
function initFeatureToggle() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他项的活动状态
            featureItems.forEach(i => {
                i.querySelector('.feature-icon').classList.remove('red');
                i.querySelector('.feature-icon').classList.add('outline');
            });
            
            // 设置当前项为活动状态
            const icon = this.querySelector('.feature-icon');
            icon.classList.remove('outline');
            icon.classList.add('red');
        });
    });
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化返回顶部
document.addEventListener('DOMContentLoaded', initBackToTop);

/**
 * DIY烹饪模块交互 - 三级交互系统
 */
document.addEventListener('DOMContentLoaded', function() {
    initDIYCooking();
});

// 菜品数据配置
const dishesData = {
    classic: {
        name: '经典',
        dishes: [
            { id: 'chaofengan', name: '炒粉干', image: 'photo/粉干/经典/炒粉干.jpg', video: 'video/粉干制作视频/经典/经典视频/炒粉干.mp4', desc: '经典温州炒粉干，大火快炒，粉干分明，锅气十足。' },
            { id: 'nongjia', name: '农家烧粉干', image: 'photo/粉干/经典/农家烧粉干.jpg', video: 'video/粉干制作视频/经典/经典视频/农家烧粉干.mp4', desc: '传统农家做法，高汤焖煮，汤汁浓郁，软糯入味。' }
        ]
    },
    nutrition: {
        name: '营养',
        dishes: [
            { id: 'n1', name: '猪肝肉丝粉干', image: 'photo/粉干/营养/猪肝肉丝粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/猪肝肉丝.mp4', desc: '补血养肝，营养丰富。' },
            { id: 'n2', name: '番茄豆腐牛肉粉干', image: 'photo/粉干/营养/番茄豆腐牛肉粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/番茄豆腐牛肉.mp4', desc: '番茄酸甜，牛肉鲜嫩，营养均衡。' },
            { id: 'n3', name: '娃娃菜虾丸粉干', image: 'photo/粉干/营养/娃娃菜虾丸粉干_edit_80180357914776.jpg', video: 'video/粉干制作视频/营养/营养视频/娃娃菜虾丸.mp4', desc: '清淡鲜美，适合全家。' },
            { id: 'n4', name: '羊肚菌肉粉干', image: 'photo/粉干/营养/羊肚菌肉粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/羊肚菌肉.mp4', desc: '菌菇飘香，滋补养身。' },
            { id: 'n5', name: '番茄鱼片粉干', image: 'photo/粉干/营养/番茄鱼片粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/番茄鱼片.mp4', desc: '酸甜开胃，鱼肉嫩滑。' },
            { id: 'n6', name: '萝卜玉米排骨粉干', image: 'photo/粉干/营养/萝卜玉米排骨粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/萝卜玉米排骨.mp4', desc: '炖煮入味，营养丰富。' },
            { id: 'n7', name: '菠菜肉丸粉干', image: 'photo/粉干/营养/菠菜肉丸粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/菠菜肉丸.mp4', desc: '补铁补钙，老少皆宜。' },
            { id: 'n8', name: '山药苹果排骨粉干', image: 'photo/粉干/营养/山药苹果排骨粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/山药苹果排骨.mp4', desc: '健脾养胃，清甜可口。' },
            { id: 'n9', name: '萝卜丝煎蛋粉干', image: 'photo/粉干/营养/萝卜丝煎蛋粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/萝卜丝煎蛋.mp4', desc: '简单美味，家常必备。' },
            { id: 'n10', name: '鲫鱼豆腐粉干', image: 'photo/粉干/营养/鲫鱼豆腐粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/鲫鱼豆腐.mp4', desc: '奶白汤底，鲜美可口。' },
            { id: 'n11', name: '白萝卜牛肉粉干', image: 'photo/粉干/营养/萝卜牛肉粉干_edit_83042720168685.jpg', video: 'video/粉干制作视频/营养/营养视频/白萝卜牛肉.mp4', desc: '萝卜清甜，牛肉软烂。' },
            { id: 'n12', name: '虫草炖鸡粉干', image: 'photo/粉干/营养/虫草炖鸡粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/虫草炖鸡.mp4', desc: '滋补养身，鲜香浓郁。' },
            { id: 'n13', name: '山药芙蓉粉干', image: 'photo/粉干/营养/山药芙蓉粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/山药芙蓉.mp4', desc: '绵软细腻，清淡养胃。' },
            { id: 'n14', name: '三鲜菌菇粉干', image: 'photo/粉干/营养/三鲜菌菇粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/三鲜菌菇.mp4', desc: '菌菇飘香，鲜味十足。' },
            { id: 'n15', name: '香菇老鸭粉干', image: 'photo/粉干/营养/香菇老鸭粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/香菇老鸭.mp4', desc: '老火慢炖，滋阴润燥。' },
            { id: 'n16', name: '丝瓜蛤蜊粉干', image: 'photo/粉干/营养/丝瓜蛤蜊粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/丝瓜蛤蜊.mp4', desc: '海鲜清鲜，丝瓜嫩滑。' },
            { id: 'n17', name: '红枣枸杞乌鸡粉干', image: 'photo/粉干/营养/红枣枸杞乌鸡粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/红枣枸杞乌鸡.mp4', desc: '补气养血，美容养颜。' },
            { id: 'n18', name: '丝瓜平菇粉干', image: 'photo/粉干/营养/丝瓜平菇粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)丝瓜平菇.mp4', tag: '低脂', desc: '清淡低脂，健康首选。' },
            { id: 'n19', name: '黄瓜菌菇粉干', image: 'photo/粉干/营养/黄瓜菌菇粉干_edit_82078481228427.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)黄瓜菌菇.mp4', tag: '低脂', desc: '清爽解腻，减脂必备。' },
            { id: 'n20', name: '玉米冬瓜粉干', image: 'photo/粉干/营养/玉米冬瓜粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)玉米冬瓜.mp4', tag: '低脂', desc: '消暑利水，清甜可口。' },
            { id: 'n21', name: '裙带菜豆芽粉干', image: 'photo/粉干/营养/裙带菜豆芽粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)裙带菜豆芽.mp4', tag: '低脂', desc: '海藻爽脆，豆芽清香。' },
            { id: 'n22', name: '白菜菌菇豆腐粉干', image: 'photo/粉干/营养/白菜菌菇豆腐粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)白菜菌菇豆腐.mp4', tag: '低脂', desc: '鲜香可口，营养丰富。' },
            { id: 'n23', name: '西兰花豆腐煎蛋粉干', image: 'photo/粉干/营养/西兰花豆腐煎蛋粉干.jpg', video: 'video/粉干制作视频/营养/营养视频/(低脂)西兰花豆腐煎蛋.mp4', tag: '低脂', desc: '高蛋白低脂，营养均衡。' }
        ]
    },
    golden: {
        name: '金汤',
        dishes: [
            { id: 'g1', name: '上汤菠菜粉干', image: 'photo/粉干/金汤/上汤菠菜粉干.jpg', video: 'video/粉干制作视频/金汤/金汤视频/上汤菠菜.mp4', desc: '清淡鲜美，营养丰富。' },
            { id: 'g2', name: '佛跳墙粉干', image: 'photo/粉干/金汤/佛跳墙粉干.jpg', video: 'video/粉干制作视频/金汤/金汤视频/佛跳墙.mp4', desc: '海味山珍，顶级美味。' },
            { id: 'g3', name: '酸辣粉干', image: 'photo/粉干/金汤/酸辣粉干.jpg', video: 'video/粉干制作视频/金汤/金汤视频/酸辣汤.mp4', desc: '酸辣开胃，冬日暖身。' },
            { id: 'g4', name: '鱼糊汤粉干', image: 'photo/粉干/金汤/鱼糊汤粉干.jpg', video: 'video/粉干制作视频/金汤/金汤视频/鱼糊汤粉干.mp4', desc: '鱼汤浓郁，鲜香可口。' },
            { id: 'g5', name: '金秋八鲜粉干', image: 'photo/粉干/金汤/金秋八鲜粉干.jpg', video: 'video/粉干制作视频/金汤/金汤视频/金秋八鲜.mp4', desc: '八鲜荟萃，金汤浓郁。' }
        ]
    }
};

// 菜谱详情数据
const recipesData = {
    'chaofengan': {
        title: '炒粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干200g、鸡蛋2个、豆芽100g、韭菜50g、葱花、酱油、盐、食用油</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>粉干用温水泡软，控干水分</li>
                <li>鸡蛋打散，豆芽洗净，韭菜切段</li>
                <li>热锅倒油，炒散鸡蛋盛出备用</li>
                <li>锅中再加油，放入粉干大火快炒</li>
                <li>加入酱油上色，不断翻炒避免粘连</li>
                <li>加入豆芽、韭菜、鸡蛋翻炒均匀</li>
                <li>撒上葱花，调味出锅</li>
            </ol>
            <p><strong>小贴士：</strong>大火快炒是炒粉干的秘诀，要不停翻动防止粘锅。</p>
        `
    },
    'nongjia': {
        title: '农家烧粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干200g、五花肉100g、青菜适量、葱姜蒜、酱油、盐、高汤</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>粉干提前用温水泡软约20分钟，沥干备用</li>
                <li>五花肉切薄片，青菜洗净切段</li>
                <li>热锅冷油，爆香葱姜蒜至金黄</li>
                <li>加入五花肉翻炒至出油变色</li>
                <li>加入粉干和适量高汤，中火焖煮5分钟</li>
                <li>待汤汁收至八成，加入青菜翻炒</li>
                <li>调入酱油、盐，翻匀即可出锅</li>
            </ol>
            <p><strong>小贴士：</strong>火候是关键，粉干要煮至软糯但不烂，汤汁收干有锅气最佳。</p>
        `
    },
    'g1': {
        title: '上汤菠菜粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、菠菜100g（焯水）、皮蛋1个（约50g，切丁）、咸鸭蛋1个（约50g，切丁）、蒜末5g、葱花5g</p>
            <p><strong>调料：</strong>盐2g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>皮蛋、咸鸭蛋切丁，菠菜焯水备用</li>
                <li>热油下蒜末爆香，加皮蛋、咸蛋丁炒香，加水400ml煮开成上汤，加盐调味</li>
                <li>煮粉</li>
                <li>碗底放葱花，冲入上汤，放粉，铺上菠菜</li>
            </ol>
            <p><strong>小贴士：</strong>皮蛋和咸蛋搭配，汤底鲜美浓郁，菠菜要提前焯水去涩味。</p>
        `
    },
    'g2': {
        title: '佛跳墙粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、鸡腿肉100g、猪骨100g、干贝20g（泡发）、花菇30g（泡发切片）、鲍鱼1个（可选，约50g）、姜片10g、葱花5g</p>
            <p><strong>调料：</strong>料酒10ml、盐3g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>鸡腿、猪骨焯水，干贝泡发，花菇切片</li>
                <li>热油下姜片爆香，加鸡肉、猪骨炒香，加水600ml、干贝、花菇炖1小时成高汤，加盐调味</li>
                <li>煮粉</li>
                <li>碗底放葱花，冲入高汤，放粉，铺上炖煮食材</li>
            </ol>
            <p><strong>小贴士：</strong>高汤需要慢火炖煮1小时，汤底才会浓郁鲜香，干贝提前泡发更出鲜味。</p>
        `
    },
    'g3': {
        title: '酸辣粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、肉末80g、花生20g（炒香）、榨菜20g（切末）、香菜5g（切碎）、蒜末5g</p>
            <p><strong>调料：</strong>生抽15ml、辣椒油10ml、醋15ml、糖3g、盐2g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>热油下蒜末爆香，加肉末炒熟，加生抽、辣椒油、醋、糖调味，盛出备用</li>
                <li>煮粉</li>
                <li>碗底放盐、生抽、醋、辣椒油、葱花，冲入开水或骨汤300ml</li>
                <li>放粉，铺上肉末、榨菜、花生、香菜</li>
            </ol>
            <p><strong>小贴士：</strong>酸辣比例可根据口味调整，花生要炒香才脆，榨菜增添咸鲜口感。</p>
        `
    },
    'g4': {
        title: '鱼糊汤粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、鱼肉（草鱼/鲫鱼）150g（鱼骨熬汤，鱼片备用）、姜片10g、葱花5g、淀粉水（淀粉10g+水20ml）</p>
            <p><strong>调料：</strong>料酒10ml、盐3g、生抽10ml、白胡椒粉1g</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>鱼肉去骨切片，鱼片用料酒、盐、淀粉抓匀腌制；鱼骨熬汤（加姜片煮20分钟得汤400ml）</li>
                <li>捞出鱼骨，汤中加生抽、盐、白胡椒粉调味，淋入淀粉水勾芡成鱼糊汤</li>
                <li>鱼片下入滚汤中烫熟</li>
                <li>煮粉</li>
                <li>碗底放葱花，冲入鱼糊汤，放粉，铺上鱼片</li>
            </ol>
            <p><strong>小贴士：</strong>鱼片要提前腌制去腥，淀粉水勾芡让汤底更浓稠鲜滑。</p>
        `
    },
    'g5': {
        title: '金秋八鲜粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干50g、南瓜50g（切块）、玉米50g（切段）、山药50g（切片）、香菇30g（泡发切片）、木耳20g（泡发撕小朵）、胡萝卜30g（切片）、豆皮30g（切条）、青菜30g、姜片5g、葱花5g</p>
            <p><strong>调料：</strong>盐4g、食用油15ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li>所有食材切好备用</li>
                <li>热油下姜片爆香，加南瓜、玉米、山药、胡萝卜翻炒，加水500ml煮10分钟，再加香菇、木耳、豆皮煮5分钟，加青菜煮1分钟，加盐调味</li>
                <li>煮粉</li>
                <li>碗底放葱花，冲入汤，放粉，铺上八鲜食材</li>
            </ol>
            <p><strong>小贴士：</strong>八鲜食材下锅顺序按耐煮程度，南瓜玉米先下，青菜最后，保持各材料最佳口感。</p>
        `
    },
    'n1': {
        title: '猪肝肉丝粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干、猪肝150g、瘦肉丝100g、青菜、小葱、姜蒜</p>
            <p><strong>调料：</strong>盐、生抽、老抽、料酒、白胡椒粉、淀粉、食用油、香油</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>处理猪肝：</strong>猪肝切薄片，清水多洗几遍，挤干血水。加料酒+生抽+少许淀粉+白胡椒粉，抓匀腌10分钟。</li>
                <li><strong>腌肉丝：</strong>肉丝加少许盐+生抽+淀粉+一点油，抓匀腌5分钟。</li>
                <li><strong>炒码子（关键）：</strong>热油下姜蒜爆香，先下肉丝炒至变色盛出。再放猪肝，大火快炒至变色，立刻盛出。</li>
                <li><strong>煮粉干：</strong>水开下粉干，煮到变软熟透，捞出装碗。旁边另起一锅，煮点青菜。</li>
                <li><strong>调汤底：</strong>碗里放盐+生抽+少许老抽+白胡椒粉+葱花。冲入开水或骨汤，放入粉干、青菜。</li>
                <li><strong>合碗：</strong>把炒好的猪肝肉丝铺在粉干上，滴几滴香油，完成。</li>
            </ol>
            <p><strong>小贴士：</strong>猪肝要大火快炒，变色立刻盛出，这样才能保持鲜嫩口感，补血养肝效果好。</p>
        `
    },
    'n2': {
        title: '番茄牛肉粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干、牛肉150g、番茄2个、姜、葱</p>
            <p><strong>调料：</strong>盐、生抽、蚝油、淀粉、食用油、白胡椒粉</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>腌牛肉：</strong>牛肉切薄片，加生抽1勺+蚝油半勺+淀粉1勺+少许油抓匀腌10分钟，又嫩又不柴。</li>
                <li><strong>炒番茄汤底：</strong>番茄切块，锅里少油炒软，炒出红油沙汤。加开水/热水，大火煮开。</li>
                <li><strong>煮粉干：</strong>另起锅烧水，水开下粉干，煮软熟透捞出装碗。</li>
                <li><strong>烫牛肉：</strong>番茄汤里加盐、少许生抽调味。转中火，把牛肉一片片下锅，变色立刻熟。撒一点白胡椒粉更香。</li>
                <li><strong>装碗：</strong>把番茄牛肉汤浇在粉干上，撒葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>番茄要炒出红油汤汁，牛肉逆纹切片并提前腌制，入锅变色即熟，保持鲜嫩多汁。</p>
        `
    },
    'n3': {
        title: '娃娃菜虾滑粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干、虾滑、娃娃菜、姜、葱</p>
            <p><strong>调料：</strong>盐、生抽、白胡椒粉、香油</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>煮粉干：</strong>水烧开，放入粉干，煮到变软熟透，捞出装碗备用。</li>
                <li><strong>煮汤底：</strong>锅里加清水或高汤，放姜片、少许盐煮开。转小火，用勺子把虾滑一个个挖进锅里，煮到浮起来就熟了。</li>
                <li><strong>下娃娃菜：</strong>放入娃娃菜，煮1-2分钟至变软。加一点点生抽、白胡椒粉调味。</li>
                <li><strong>装碗：</strong>把虾滑、娃娃菜和汤一起浇在粉干上，撒葱花，滴几滴香油，完成。</li>
            </ol>
            <p><strong>小贴士：</strong>虾滑煮至浮起即熟，不要久煮。娃娃菜清甜爽口，搭配虾滑清淡鲜美，适合全家享用。</p>
        `
    },
    'n4': {
        title: '羊肚菌肉丝粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干、羊肚菌6-8朵、瘦肉100g、姜、葱</p>
            <p><strong>调料：</strong>盐、生抽、料酒、淀粉、白胡椒粉、香油</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>泡发羊肚菌：</strong>羊肚菌用温水泡15分钟，泡软后轻轻洗净泥沙。泡菌的水别倒掉，静置澄清，后面煮汤超鲜。</li>
                <li><strong>腌肉丝：</strong>瘦肉切丝，加生抽1勺+料酒半勺+淀粉1勺+少许油抓匀腌10分钟，又嫩又入味。</li>
                <li><strong>炒香汤底：</strong>锅里少油，下姜丝爆香，放肉丝炒至变色。放入羊肚菌翻炒几下，香味立刻出来。</li>
                <li><strong>煮鲜汤：</strong>倒入刚才澄清的羊肚菌水，再加适量清水/高汤，大火煮开。转小火煮3-5分钟，让菌香煮进汤里。</li>
                <li><strong>煮粉干：</strong>另起锅煮粉干，煮软后捞出装碗。</li>
                <li><strong>调味装碗：</strong>汤里加盐、少许生抽、白胡椒粉调味。把羊肚菌肉丝汤浇在粉干上，撒葱花，滴几滴香油即可。</li>
            </ol>
            <p><strong>小贴士：</strong>羊肚菌泡发水千万别倒，澄清后用来煮汤，鲜味加倍。菌菇飘香，滋补养身。</p>
        `
    },
    'n5': {
        title: '番茄鱼片粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干、鱼片（龙利鱼/巴沙鱼/草鱼/黑鱼都可以）、番茄2个、姜、葱</p>
            <p><strong>腌鱼片调料：</strong>盐、白胡椒粉、料酒、淀粉、少许油</p>
            <p><strong>调味料：</strong>盐、生抽、番茄酱（可选）</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>腌鱼片：</strong>鱼片里加盐少许+白胡椒粉+料酒1勺+淀粉1勺+少许油抓匀腌10分钟，滑嫩不碎。</li>
                <li><strong>炒番茄汤底：</strong>番茄切块，锅里少油炒软，炒出红油汤汁。想更浓可以加半勺番茄酱，加开水大火煮开。</li>
                <li><strong>煮粉干：</strong>另起锅烧水，水开下粉干，煮软捞出装碗。</li>
                <li><strong>滑鱼片：</strong>番茄汤里加盐、少许生抽调味。转中小火，把鱼片一片片下锅，变色浮起就熟，别久煮。</li>
                <li><strong>装碗：</strong>把番茄鱼片连汤浇在粉干上，撒葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>鱼片要滑嫩，关键是腌制和火候。中小火滑鱼片，变色即熟，酸甜开胃，鱼肉嫩滑。</p>
        `
    },
    'n6': {
        title: '萝卜玉米排骨粉干',
        recipe: `
            <p><strong>食材准备：</strong>排骨500g、白萝卜1根、甜玉米1根、粉干200g、生姜3片、葱段2段、料酒1勺、盐适量、白胡椒粉少许、葱花少许</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>处理食材：</strong>排骨剁成3cm小段，冷水下锅，加入1片姜、半勺料酒，大火煮沸，撇去浮沫后再煮2分钟捞出，用温水洗净血沫。白萝卜去皮切滚刀块，玉米切段，粉干用温水浸泡20分钟至软。</li>
                <li><strong>煎炒增香：</strong>热锅凉油，油热后放入姜片爆香，下入排骨，中火煎至两面金黄微焦，倒入1勺料酒去腥，翻炒均匀。</li>
                <li><strong>慢炖出鲜：</strong>加入足量开水（没过排骨2指），放入葱段，大火煮沸后转小火，加盖慢炖40分钟。待汤色奶白、排骨软烂，加入玉米段和萝卜块，继续炖20分钟，加盐和白胡椒粉调味。</li>
                <li><strong>煮粉成面：</strong>另起一锅，水开后下入泡软的粉干，大火煮3-4分钟至透明无硬芯，捞出过凉水，沥干放入碗中。</li>
                <li><strong>浇汤成菜：</strong>舀入滚烫的排骨汤，铺上排骨、玉米和萝卜，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>排骨煎至金黄再炖，汤会更香浓。炖煮时间充足，排骨软烂，萝卜清甜，营养丰富。</p>
        `
    },
    'n7': {
        title: '菠菜肉丸粉干',
        recipe: `
            <p><strong>食材准备：</strong>猪肉末300g、菠菜200g、粉干200g、鸡蛋1个、淀粉2勺、葱姜水3勺、生抽1勺、蚝油1勺、盐适量、白胡椒粉少许、香油几滴、葱花少许</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>手打肉丸：</strong>猪肉末中加入1个鸡蛋、2勺淀粉、1勺生抽、1勺蚝油，分次倒入葱姜水，沿同一方向搅拌至上劲，用虎口挤出大小均匀的丸子，放入冷水中定型。</li>
                <li><strong>焯烫去涩：</strong>菠菜洗净，锅中水开后加少许盐和油，放入菠菜焯烫1分钟，捞出过凉水，挤干水分切段备用。</li>
                <li><strong>煮丸出鲜：</strong>锅中加足量清水，水开后转小火，下入肉丸，待丸子全部浮起后，撇去表面浮沫，保持微沸状态煮5分钟至熟透。</li>
                <li><strong>煮粉入味：</strong>下入泡软的粉干，转中火煮3分钟，加入菠菜段，加盐和白胡椒粉调味，轻轻推匀。</li>
                <li><strong>点睛提香：</strong>出锅前淋入几滴香油，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>肉丸搅拌上劲口感才Q弹，菠菜焯水去草酸，补铁补钙，老少皆宜。</p>
        `
    },
    'n8': {
        title: '山药苹果排骨粉干',
        recipe: `
            <p><strong>食材准备：</strong>排骨400g、山药1根、苹果1个、粉干200g、生姜3片、枸杞10粒、料酒1勺、盐适量、葱花少许</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>预处理：</strong>排骨焯水洗净，苹果去核切大块，山药去皮切滚刀块（浸泡在水中防氧化），粉干泡软备用。</li>
                <li><strong>煎香排骨：</strong>热锅倒油，下姜片爆香，放入排骨中火煎至两面微黄，倒入1勺料酒，翻炒至香气四溢。</li>
                <li><strong>慢炖出甜：</strong>加入足量开水，转入砂锅，大火煮沸后转小火炖30分钟。放入苹果块，继续炖20分钟，再加入山药块，炖15分钟至山药软糯，汤色清润甘甜。</li>
                <li><strong>煮粉捞起：</strong>另起锅水开后，下粉干煮3分钟至透明，捞出放入碗中。</li>
                <li><strong>浇汤成鲜：</strong>舀入山药苹果排骨汤，加盐调味，撒上枸杞和葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>苹果和山药的组合创新独特，健脾养胃，汤色清甜可口，营养均衡。</p>
        `
    },
    'n9': {
        title: '萝卜丝煎蛋粉干',
        recipe: `
            <p><strong>食材准备：</strong>白萝卜1根、鸡蛋2个、粉干200g、蒜末1勺、盐适量、白胡椒粉少许、葱花少许、食用油适量</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>萝卜处理：</strong>白萝卜去皮擦成细丝，用少许盐腌制10分钟，挤干多余水分，去除辛辣味。</li>
                <li><strong>煎蛋成丝：</strong>鸡蛋打散，热锅倒油，油热后倒入蛋液，小火煎成金黄蛋饼，盛出放凉后切成细丝。</li>
                <li><strong>炒香萝卜：</strong>锅中留底油，爆香蒜末，下入萝卜丝，中火翻炒2分钟至萝卜丝变软、微微出水。</li>
                <li><strong>煮粉成汤：</strong>加入足量开水，大火煮沸后，下入泡软的粉干，转中火煮3分钟。</li>
                <li><strong>调味出锅：</strong>放入蛋丝，加盐和白胡椒粉调味，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>萝卜丝腌制去辛辣，煎蛋要小火慢煎，简单美味，家常必备。</p>
        `
    },
    'n10': {
        title: '鲫鱼豆腐粉干',
        recipe: `
            <p><strong>食材准备：</strong>鲫鱼1条（约500g）、嫩豆腐1块、粉干200g、生姜3片、葱段2段、盐适量、白胡椒粉少许、食用油适量、葱花少许</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>煎鱼去腥：</strong>鲫鱼处理干净，用厨房纸擦干水分，热锅凉油，油热后放入鲫鱼，中小火煎至两面金黄，倒入开水，放入姜片和葱段。</li>
                <li><strong>煮出奶白：</strong>大火煮沸5分钟，至汤色奶白，转小火炖10分钟，让鱼肉的鲜味充分融入汤中。</li>
                <li><strong>豆腐入汤：</strong>加入切好的嫩豆腐块，小火再炖5分钟，注意不要过度翻动，保持豆腐完整。</li>
                <li><strong>煮粉捞起：</strong>另起锅水开后，下粉干煮2分钟至软，捞出放入碗中。</li>
                <li><strong>浇汤提鲜：</strong>舀入奶白的鲫鱼汤，加盐和白胡椒粉调味，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>鲫鱼煎至金黄再加开水，才能煮出奶白汤色。豆腐嫩滑，汤汁鲜美可口。</p>
        `
    },
    'n11': {
        title: '白萝卜牛肉粉干',
        recipe: `
            <p><strong>食材准备：</strong>牛肉200g、白萝卜1根、粉干200g、生姜3片、蒜末1勺、生抽1勺、淀粉1勺、蚝油1勺、盐适量、香菜少许、食用油适量</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>牛肉腌制：</strong>牛肉逆纹切成薄片，加入1勺生抽、1勺淀粉、半勺蚝油，抓匀腌制10分钟，让肉质更嫩。</li>
                <li><strong>萝卜焯水：</strong>白萝卜切丝，锅中水开后下入萝卜丝，焯烫1分钟，捞出过凉水，去除辛辣。</li>
                <li><strong>滑炒牛肉：</strong>热锅倒油，油热后下姜蒜爆香，转大火，下入牛肉片快速滑炒至变色，立即盛出，保持牛肉的鲜嫩。</li>
                <li><strong>煮粉成汤：</strong>另起锅加水煮沸，下入泡软的粉干，中火煮3分钟，加入萝卜丝和炒好的牛肉。</li>
                <li><strong>调味出锅：</strong>加盐和蚝油调味，撒上香菜即可。</li>
            </ol>
            <p><strong>小贴士：</strong>牛肉逆纹切片更嫩，大火快炒保持鲜嫩口感。萝卜清甜，牛肉软烂。</p>
        `
    },
    'n12': {
        title: '虫草炖鸡粉干',
        recipe: `
            <p><strong>食材准备：</strong>土鸡半只（约500g）、虫草（或虫草花）10g、粉干200g、生姜3片、料酒1勺、盐适量、葱花少许</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>土鸡焯水：</strong>土鸡剁块，冷水下锅，加姜片和料酒，大火煮沸，撇去浮沫后煮2分钟捞出，用温水洗净。</li>
                <li><strong>慢炖出鲜：</strong>将鸡块、姜片、虫草放入砂锅，加入足量开水，大火煮沸后转小火，加盖慢炖1小时，至鸡肉软烂脱骨。</li>
                <li><strong>调味提鲜：</strong>加盐调味，继续炖10分钟，让盐味充分融入汤中。</li>
                <li><strong>煮粉捞起：</strong>另起锅水开后，下粉干煮3分钟至软，捞出放入碗中。</li>
                <li><strong>浇汤成珍：</strong>舀入浓郁的虫草鸡汤，铺上鸡肉，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>虫草慢炖释放营养，鸡汤浓郁鲜香，滋补养身效果极佳。</p>
        `
    },
    'n13': {
        title: '山药芙蓉粉干',
        recipe: `
            <p><strong>食材准备：</strong>山药1根、鸡蛋2个（取蛋黄）、粉干200g、青菜碎少许、盐适量、白胡椒粉少许、食用油适量</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>山药制泥：</strong>山药去皮，上锅蒸15分钟至软烂，取出压成细腻的泥状。鸡蛋取蛋黄，打散备用。</li>
                <li><strong>煮粉成汤：</strong>锅中加水煮沸，下入泡软的粉干，中火煮3分钟。</li>
                <li><strong>芙蓉入汤：</strong>加入山药泥，用勺子轻轻搅散，煮至汤汁变得浓稠顺滑。</li>
                <li><strong>蛋花成型：</strong>转小火，淋入蛋黄液，快速用筷子搅散，形成漂亮的蛋花。</li>
                <li><strong>调味出锅：</strong>加盐和白胡椒粉调味，撒上青菜碎即可。</li>
            </ol>
            <p><strong>小贴士：</strong>山药泥让汤汁浓稠绵软，蛋黄芙蓉细腻，清淡养胃，适合老人小孩。</p>
        `
    },
    'n14': {
        title: '三鲜菌菇粉干',
        recipe: `
            <p><strong>食材准备：</strong>香菇5朵、金针菇1把、蟹味菇1把、粉干200g、蒜末1勺、生抽1勺、蚝油1勺、盐适量、葱花少许、食用油适量</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>菌菇处理：</strong>香菇切片，金针菇、蟹味菇洗净，锅中水开后下入所有菌菇，焯烫1分钟，捞出沥干，去除土腥味。</li>
                <li><strong>炒香提鲜：</strong>热锅倒油，爆香蒜末，下入焯好的菌菇，中火翻炒2分钟，至菌菇出水、香气浓郁。</li>
                <li><strong>煮粉成汤：</strong>加入足量开水，大火煮沸，下入泡软的粉干，转中火煮3分钟。</li>
                <li><strong>调味出锅：</strong>加入1勺生抽、1勺蚝油，加盐调味，撒上葱花即可。</li>
            </ol>
            <p><strong>小贴士：</strong>三种菌菇营养互补，焯水去土腥味，炒香后更能激发菌菇鲜味。</p>
        `
    },
    'n15': {
        title: '香菇老鸭粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、鸭肉块200g、干香菇30g（泡发后切片）、姜片10g、葱花5g、青菜50g</p>
            <p><strong>调料：</strong>料酒10ml、生抽15ml、老抽5ml、盐3g、白胡椒粉1g、食用油15ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备工作：</strong>鸭肉焯水去腥，香菇泡发切片。</li>
                <li><strong>炖煮汤底：</strong>热油下姜片爆香，加鸭肉炒至变色，加香菇翻炒，加料酒、生抽、老抽，加水500ml炖30分钟成汤底，加盐调味。</li>
                <li><strong>煮粉煮菜：</strong>煮粉、煮青菜。</li>
                <li><strong>组合成菜：</strong>碗底放盐、生抽、葱花，冲入鸭汤，放入粉干、青菜，铺上鸭肉香菇。</li>
            </ol>
            <p><strong>小贴士：</strong>老鸭肉质紧实，需慢火炖煮，香菇提鲜，滋阴润燥功效好。</p>
        `
    },
    'n16': {
        title: '丝瓜蛤蜊粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、丝瓜150g（去皮切块）、蛤蜊200g（吐沙洗净）、姜丝5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、白胡椒粉1g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>蛤蜊吐沙洗净，丝瓜去皮切块。</li>
                <li><strong>煮汤底：</strong>热油下姜丝爆香，加丝瓜翻炒，加蛤蜊和开水300ml煮至开口，加盐、白胡椒粉调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入丝瓜蛤蜊汤，放粉，铺上蛤蜊丝瓜。</li>
            </ol>
            <p><strong>小贴士：</strong>蛤蜊要提前吐沙，煮至开口即可。海鲜清鲜，丝瓜嫩滑，汤汁鲜美。</p>
        `
    },
    'n17': {
        title: '红枣枸杞乌鸡粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、乌鸡块200g、红枣20g、枸杞5g、姜片10g、葱花5g</p>
            <p><strong>调料：</strong>料酒10ml、盐3g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>乌鸡焯水：</strong>乌鸡焯水去血沫。</li>
                <li><strong>炖煮汤底：</strong>热油下姜片爆香，加乌鸡翻炒，加料酒、水500ml、红枣炖40分钟，最后加枸杞再炖5分钟，加盐调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入乌鸡汤，放粉，铺上乌鸡红枣枸杞。</li>
            </ol>
            <p><strong>小贴士：</strong>乌鸡补气养血，红枣枸杞增强滋补效果，美容养颜，适合女性。</p>
        `
    },
    'n18': {
        title: '丝瓜平菇粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、丝瓜150g（去皮切片）、平菇100g（撕小朵）、姜丝5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、白胡椒粉1g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>丝瓜去皮切片，平菇撕小朵。</li>
                <li><strong>炒煮汤底：</strong>热油下姜丝爆香，加丝瓜翻炒，加平菇炒软，加水300ml煮开，加盐、白胡椒粉调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上丝瓜平菇。</li>
            </ol>
            <p><strong>小贴士：</strong>丝瓜清甜嫩滑，平菇菌香浓郁，清淡低脂，健康首选。</p>
        `
    },
    'n19': {
        title: '黄瓜菌菇粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、黄瓜100g（切片）、混合菌菇（香菇、金针菇等）100g、姜丝5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、生抽10ml、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>黄瓜切片，菌菇洗净。</li>
                <li><strong>炒煮汤底：</strong>热油下姜丝爆香，加菌菇炒香，加黄瓜翻炒，加水300ml煮开，加盐、生抽调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上黄瓜菌菇。</li>
            </ol>
            <p><strong>小贴士：</strong>黄瓜清爽解腻，菌菇鲜香，低脂减脂必备，清爽可口。</p>
        `
    },
    'n20': {
        title: '玉米冬瓜粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、玉米100g（切段）、冬瓜150g（去皮切块）、姜片5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>冬瓜去皮切块，玉米切段。</li>
                <li><strong>炒煮汤底：</strong>热油下姜片爆香，加玉米翻炒，加冬瓜和水400ml煮至软烂，加盐调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上玉米冬瓜。</li>
            </ol>
            <p><strong>小贴士：</strong>冬瓜消暑利水，玉米清甜，低脂清淡，夏日消暑佳品。</p>
        `
    },
    'n21': {
        title: '裙带菜豆芽粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、裙带菜20g（泡发后切段）、豆芽100g、蒜末5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、生抽10ml、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>裙带菜泡发切段，豆芽洗净。</li>
                <li><strong>炒煮汤底：</strong>热油下蒜末爆香，加豆芽翻炒，加裙带菜和水300ml煮开，加盐、生抽调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上裙带菜豆芽。</li>
            </ol>
            <p><strong>小贴士：</strong>裙带菜海藻爽脆，豆芽清香，低脂高纤，健康轻食。</p>
        `
    },
    'n22': {
        title: '白菜菌菇豆腐粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、白菜100g（切段）、菌菇（香菇、平菇等）80g、豆腐100g（切块）、姜丝5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、生抽10ml、食用油10ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>白菜切段，菌菇撕小朵，豆腐切块。</li>
                <li><strong>炒煮汤底：</strong>热油下姜丝爆香，加菌菇炒香，加白菜炒软，加水400ml煮开，加豆腐煮5分钟，加盐、生抽调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上白菜菌菇豆腐。</li>
            </ol>
            <p><strong>小贴士：</strong>白菜清甜，菌菇鲜香，豆腐滑嫩，三者搭配营养丰富又低脂。</p>
        `
    },
    'n23': {
        title: '西兰花豆腐煎蛋粉干',
        recipe: `
            <p><strong>食材准备：</strong>粉干150g、西兰花100g（焯水）、豆腐100g（切块）、鸡蛋1个（约50g，煎成荷包蛋）、蒜末5g、葱花5g</p>
            <p><strong>调料：</strong>盐3g、食用油15ml</p>
            <p><strong>步骤：</strong></p>
            <ol>
                <li><strong>准备食材：</strong>西兰花焯水，豆腐切块，鸡蛋煎成荷包蛋备用。</li>
                <li><strong>煮汤底：</strong>热油下蒜末爆香，加水400ml煮开，加豆腐、西兰花、煎蛋煮2分钟，加盐调味。</li>
                <li><strong>煮粉：</strong>煮粉。</li>
                <li><strong>组合装碗：</strong>碗底放葱花，冲入汤，放粉，铺上西兰花豆腐煎蛋。</li>
            </ol>
            <p><strong>小贴士：</strong>西兰花营养丰富，豆腐高蛋白，荷包蛋增香，高蛋白低脂，营养均衡。</p>
        `
    }
};

// 默认菜谱
const defaultRecipe = `
    <p><strong>食材准备：</strong>粉干200g、主料适量、配菜适量、调味料</p>
    <p><strong>步骤：</strong></p>
    <ol>
        <li>粉干提前用温水泡软备用</li>
        <li>准备主料和配菜</li>
        <li>按照视频教程烹制</li>
        <li>加入粉干翻炒或炖煮</li>
        <li>调味出锅即可</li>
    </ol>
    <p><strong>小贴士：</strong>请观看视频教程获取详细做法。</p>
`;

// 视频知识点提示
const videoTips = [
    { time: 30, text: '💡 你知道吗？粉干的历史可以追溯到唐朝！' },
    { time: 60, text: '💡 小技巧：泡粉干时水温不宜过高，40度左右最佳' },
    { time: 90, text: '💡 粉干富含碳水化合物，是优质的能量来源' },
    { time: 120, text: '💡 高楼粉干采用传统工艺，口感更加劲道' }
];

// 当前状态
let currentCategory = 'classic';
let currentSlideIndex = 0;
let currentDishIndex = 0;
let currentRating = 0;
let uploadedFiles = [];

// 初始化DIY烹饪模块
function initDIYCooking() {
    initCategorySlider();
    initDishSlider();
    initStarRating();
    initUploadArea();
    initReviewMedia();
}

// 首页分类滑动
function initCategorySlider() {
    const slides = document.getElementById('categorySlides');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (!slides) return;
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slides.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slides.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) slideCategory(1);
            else slideCategory(-1);
        }
    });
    
    // 指示器点击
    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            currentSlideIndex = index;
            updateCategorySlide();
        });
    });
}

// 切换分类滑块
function slideCategory(direction) {
    const totalSlides = 3;
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    updateCategorySlide();
}

function updateCategorySlide() {
    const slides = document.getElementById('categorySlides');
    const allSlides = document.querySelectorAll('.category-slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    if (!slides) return;
    
    slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    allSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });
    
    indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentSlideIndex);
    });
}

// 进入菜品列表
function enterDishList(category) {
    currentCategory = category;
    currentDishIndex = 0;
    
    document.getElementById('diyHomepage').style.display = 'none';
    document.getElementById('diyDishlist').style.display = 'block';
    document.getElementById('dishlistTitle').textContent = dishesData[category].name;
    
    renderDishCards();
}

// 返回首页
function backToHomepage() {
    document.getElementById('diyDishlist').style.display = 'none';
    document.getElementById('diyHomepage').style.display = 'block';
}

// 渲染菜品卡片
function renderDishCards() {
    const slider = document.getElementById('dishSlider');
    const dishes = dishesData[currentCategory].dishes;
    
    if (!slider) return;
    
    slider.innerHTML = dishes.map((dish, index) => `
        <div class="dish-card" data-index="${index}">
            <div class="dish-card-text">
                <h4>${dish.name}</h4>
                ${dish.tag ? `<span class="dish-tag">${dish.tag}</span>` : ''}
                <p>${dish.desc}</p>
                <button class="btn-confirm-dish" onclick="openDishDetail('${dish.id}', ${index})">确定</button>
            </div>
            <div class="dish-card-image">
                <img src="${dish.image}" alt="${dish.name}" onerror="this.src='photo/DIY烹饪图片/${dishesData[currentCategory].name}右滑式封面.jpg'">
            </div>
        </div>
    `).join('');
    
    updateDishCount();
    initDishSliderScroll();
}

// 菜品滑动监听
function initDishSlider() {
    // 初始化时不执行，等渲染后执行
}

function initDishSliderScroll() {
    const slider = document.getElementById('dishSlider');
    if (!slider) return;
    
    slider.addEventListener('scroll', () => {
        const cards = slider.querySelectorAll('.dish-card');
        const scrollTop = slider.scrollTop;
        const cardHeight = slider.clientHeight;
        
        currentDishIndex = Math.round(scrollTop / cardHeight);
        updateDishCount();
    });
}

function updateDishCount() {
    const countEl = document.getElementById('dishCount');
    const dishes = dishesData[currentCategory].dishes;
    if (countEl) {
        countEl.textContent = `${currentDishIndex + 1}/${dishes.length}`;
    }
}

// 打开菜品详情
function openDishDetail(dishId, index) {
    const dishes = dishesData[currentCategory].dishes;
    const dish = dishes[index];
    const modal = document.getElementById('dishModal');
    const video = document.getElementById('dishVideo');
    const title = document.getElementById('dishTitle');
    const recipeContent = document.getElementById('recipeContent');
    
    if (!modal || !dish) return;
    
    // 设置标题
    title.textContent = dish.name;
    
    // 设置视频
    if (video) {
        video.querySelector('source').src = dish.video;
        video.load();
        video.currentTime = 0;
    }
    
    // 设置菜谱
    const recipe = recipesData[dishId] || { recipe: defaultRecipe };
    recipeContent.innerHTML = recipe.recipe;
    
    // 重置状态
    resetModalState();
    
    // 显示弹窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 初始化视频知识点
    initVideoTips();
}

// 关闭菜品详情
function closeDishModal() {
    const modal = document.getElementById('dishModal');
    const video = document.getElementById('dishVideo');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (video) {
        video.pause();
    }
}

// 重置弹窗状态
function resetModalState() {
    currentRating = 0;
    uploadedFiles = [];
    
    // 重置AI反馈
    const aiFeedback = document.getElementById('aiFeedback');
    const btnAiEvaluate = document.getElementById('btnAiEvaluate');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    
    if (aiFeedback) aiFeedback.style.display = 'none';
    if (btnAiEvaluate) btnAiEvaluate.style.display = 'none';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
    
    // 重置星级
    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach(star => star.classList.remove('active'));
    
    // 重置评论
    const reviewInput = document.getElementById('reviewInput');
    if (reviewInput) reviewInput.value = '';
    
    const mediaPreview = document.getElementById('reviewMediaPreview');
    if (mediaPreview) mediaPreview.innerHTML = '';
    
    const starPointsPreview = document.getElementById('starPointsPreview');
    if (starPointsPreview) starPointsPreview.textContent = '';
    
    const mediaPointsPreview = document.getElementById('mediaPointsPreview');
    if (mediaPointsPreview) mediaPointsPreview.textContent = '';
}

// 视频知识点提示
function initVideoTips() {
    const video = document.getElementById('dishVideo');
    const tipsEl = document.getElementById('videoTips');
    const tipText = document.getElementById('tipText');
    
    if (!video || !tipsEl) return;
    
    let shownTips = [];
    
    video.addEventListener('timeupdate', () => {
        const currentTime = Math.floor(video.currentTime);
        
        videoTips.forEach(tip => {
            if (currentTime >= tip.time && currentTime < tip.time + 5 && !shownTips.includes(tip.time)) {
                shownTips.push(tip.time);
                tipText.textContent = tip.text;
                tipsEl.style.display = 'flex';
                
                setTimeout(() => {
                    tipsEl.style.display = 'none';
                }, 4000);
            }
        });
    });
}

// 星级评分
function initStarRating() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('star') && e.target.closest('#ratingStars')) {
            const rating = parseInt(e.target.dataset.rating);
            currentRating = rating;
            updateStars(rating);
            updateStarPointsPreview(rating);
        }
    });
    
    document.addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('star') && e.target.closest('#ratingStars')) {
            const rating = parseInt(e.target.dataset.rating);
            updateStars(rating);
            updateStarPointsPreview(rating);
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('star') && e.target.closest('#ratingStars')) {
            updateStars(currentRating);
            if (currentRating > 0) {
                updateStarPointsPreview(currentRating);
            } else {
                const preview = document.getElementById('starPointsPreview');
                if (preview) preview.textContent = '';
            }
        }
    }, true);
}

function updateStars(rating) {
    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        star.classList.toggle('active', starRating <= rating);
    });
}

function updateStarPointsPreview(rating) {
    const STAR_POINTS = { 1: 0, 2: 0, 3: 2, 4: 3, 5: 5 };
    const preview = document.getElementById('starPointsPreview');
    if (preview && rating > 0) {
        const points = STAR_POINTS[rating];
        preview.textContent = points > 0 ? `+${points}积分` : '无积分';
        preview.style.color = points > 0 ? 'var(--accent-gold)' : '#999';
    }
}

// 上传作品区域
function initUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const uploadInput = document.getElementById('workUpload');
    
    if (!uploadArea || !uploadInput) return;
    
    uploadArea.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-remove-img')) {
            uploadInput.click();
        }
    });
    
    uploadInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const placeholder = document.querySelector('.upload-placeholder');
                const preview = document.getElementById('uploadPreview');
                const previewImg = document.getElementById('previewImg');
                const btnAiEvaluate = document.getElementById('btnAiEvaluate');
                
                if (placeholder) placeholder.style.display = 'none';
                if (preview) {
                    preview.style.display = 'block';
                    previewImg.src = e.target.result;
                }
                if (btnAiEvaluate) btnAiEvaluate.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// 移除上传的图片
function removeUploadedImg() {
    const placeholder = document.querySelector('.upload-placeholder');
    const preview = document.getElementById('uploadPreview');
    const btnAiEvaluate = document.getElementById('btnAiEvaluate');
    const uploadInput = document.getElementById('workUpload');
    const aiFeedback = document.getElementById('aiFeedback');
    
    if (placeholder) placeholder.style.display = 'block';
    if (preview) preview.style.display = 'none';
    if (btnAiEvaluate) btnAiEvaluate.style.display = 'none';
    if (uploadInput) uploadInput.value = '';
    if (aiFeedback) aiFeedback.style.display = 'none';
}

// 提交AI评价
function submitForAIEvaluation() {
    const btnAiEvaluate = document.getElementById('btnAiEvaluate');
    const aiFeedback = document.getElementById('aiFeedback');
    
    if (btnAiEvaluate) btnAiEvaluate.textContent = '🤖 AI分析中...';
    
    // 模拟AI分析
    setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 75;
        const colorScore = (Math.random() * 2 + 8).toFixed(1);
        
        document.getElementById('aiScore').textContent = score;
        document.getElementById('aiColor').textContent = colorScore;
        
        const prosOptions = [
            '色泽金黄诱人，摆盘整齐有序',
            '粉干分明不粘连，火候掌控得当',
            '配色协调，整体观感良好',
            '造型美观，很有食欲感'
        ];
        const consOptions = [
            '可以适当增加配菜的颜色搭配',
            '建议摆盘时注意层次感',
            '可考虑添加点缀提升美感',
            '汤汁收得可以再浓郁一些'
        ];
        
        document.getElementById('aiPros').textContent = prosOptions[Math.floor(Math.random() * prosOptions.length)];
        document.getElementById('aiCons').textContent = consOptions[Math.floor(Math.random() * consOptions.length)];
        
        const points = Math.floor(score / 20) + 2;
        document.getElementById('uploadPoints').textContent = `+${points}`;
        
        if (btnAiEvaluate) btnAiEvaluate.style.display = 'none';
        if (aiFeedback) aiFeedback.style.display = 'block';
        
        // 触发积分奖励
        triggerPointsReward(points, '作品上传');
    }, 2000);
}

// 评论媒体上传
function initReviewMedia() {
    const mediaInput = document.getElementById('reviewMedia');
    
    if (!mediaInput) return;
    
    mediaInput.addEventListener('change', function() {
        const preview = document.getElementById('reviewMediaPreview');
        const pointsPreview = document.getElementById('mediaPointsPreview');
        
        if (!preview) return;
        
        let imageCount = 0;
        let videoCount = 0;
        
        Array.from(this.files).forEach((file, index) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const isVideo = file.type.startsWith('video/');
                const mediaItem = document.createElement('div');
                mediaItem.className = 'media-item';
                mediaItem.innerHTML = `
                    ${isVideo ? 
                        `<video src="${e.target.result}"></video>` : 
                        `<img src="${e.target.result}">`
                    }
                    <button class="remove-media" onclick="this.parentElement.remove(); updateMediaPoints();">×</button>
                `;
                preview.appendChild(mediaItem);
            };
            
            reader.readAsDataURL(file);
            
            if (file.type.startsWith('image/')) imageCount++;
            else if (file.type.startsWith('video/')) videoCount++;
        });
        
        // 更新积分预览
        const totalPoints = imageCount * 2 + videoCount * 6;
        if (pointsPreview) {
            pointsPreview.textContent = `+${totalPoints}积分`;
        }
    });
}

// 提交评价
function submitReview() {
    const reviewInput = document.getElementById('reviewInput');
    const reviewText = reviewInput?.value?.trim();
    
    if (!reviewText && currentRating === 0) {
        alert('请输入评价内容或选择评分');
        return;
    }
    
    // 检查是否已经评分过
    const hasReviewed = localStorage.getItem('hasReviewed');
    if (hasReviewed === 'true') {
        alert('您已经提交过评价了，每位用户只能评价一次哦！');
        return;
    }
    
    // 计算积分
    const STAR_POINTS = { 1: 0, 2: 0, 3: 2, 4: 3, 5: 5 };
    let totalPoints = STAR_POINTS[currentRating] || 0;
    
    const mediaItems = document.querySelectorAll('#reviewMediaPreview .media-item');
    mediaItems.forEach(item => {
        if (item.querySelector('video')) totalPoints += 6;
        else totalPoints += 2;
    });
    
    // 添加评论到列表
    const reviewsList = document.getElementById('reviewsList');
    const starsHtml = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
    const today = new Date().toISOString().split('T')[0];
    
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
        <div class="review-header">
            <span class="reviewer">用户${Math.floor(Math.random() * 10000)}</span>
            <span class="review-stars">${starsHtml}</span>
            <span class="review-date">${today}</span>
        </div>
        <p class="review-text">${reviewText || '用户给出了评分'}</p>
    `;
    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    
    // 触发积分奖励
    if (totalPoints > 0) {
        triggerPointsReward(totalPoints, '评价提交');
    }
    
    // 标记用户已评分
    localStorage.setItem('hasReviewed', 'true');
    
    alert(`评价提交成功！获得 +${totalPoints} 积分`);
    
    // 重置表单
    if (reviewInput) reviewInput.value = '';
    currentRating = 0;
    updateStars(0);
    document.getElementById('reviewMediaPreview').innerHTML = '';
    document.getElementById('starPointsPreview').textContent = '';
    document.getElementById('mediaPointsPreview').textContent = '';
}

// ========================================
// 积分系统
// ========================================

// 积分换算比率：1 RMB = 80 Pts
const POINTS_PER_RMB = 80;

// 礼品数据
const giftData = {
    gift1: { name: '伴手礼套餐一', points: 8400, rmb: 105, img: '商品/商品/伴手礼套餐/套餐一105R.jpg' },
    gift2: { name: '伴手礼套餐二', points: 16000, rmb: 200, img: '商品/商品/伴手礼套餐/套餐二200R.jpg' },
    gift3: { name: '伴手礼套餐五', points: 22400, rmb: 280, img: '商品/商品/伴手礼套餐/套餐五280R.jpg' },
    gift4: { name: '伴手礼套餐六', points: 26400, rmb: 330, img: '商品/商品/伴手礼套餐/套餐六330R.jpg' },
    gift5: { name: '伴手礼套餐三', points: 42400, rmb: 530, img: '商品/商品/伴手礼套餐/套餐三530R.jpg' },
    gift6: { name: '伴手礼套餐四', points: 80800, rmb: 1010, img: '商品/商品/伴手礼套餐/套餐四1010R.jpg' },
    plush1: { name: '红小藤毛绒玩偶', points: 8000, rmb: 100, img: '商品/商品/衍生品/红小藤/毛绒玩偶/毛绒小藤100R每个.jpg' },
    charm1: { name: '红小藤立体挂件', points: 6400, rmb: 80, img: '商品/商品/衍生品/红小藤/挂件/站立毛绒立体挂件(80R).png' },
    postcard1: { name: '品牌明信片套装', points: 1200, rmb: 15, img: '商品/商品/衍生品/品牌明信片/醒狮明信片15R.jpg' },
    
    // 豆豆系列
    bean1: { name: '毛绒豆豆玩偶', points: 6400, rmb: 80, img: '商品/商品/衍生品/豆豆/毛绒玩偶/毛绒豆豆80R每个.jpg' },
    bean2: { name: '豆娃帆布包', points: 5120, rmb: 64, img: '商品/商品/衍生品/豆豆/豆娃/帆布包(64R).jpg' },
    bean3: { name: '豆娃手机壳', points: 2400, rmb: 30, img: '商品/商品/衍生品/豆豆/豆娃/手机壳(30R).jpg' },
    bean4: { name: '豆娃手账本', points: 2800, rmb: 35, img: '商品/商品/衍生品/豆豆/豆娃/手账本(35R).jpg' },
    
    // 红小藤挂件系列
    xiaoteng1: { name: '红小藤托腮挂件', points: 1200, rmb: 15, img: '商品/商品/衍生品/红小藤/挂件/托腮平面挂件(15R).jpg' },
    xiaoteng2: { name: '红小藤站立挂件', points: 1200, rmb: 15, img: '商品/商品/衍生品/红小藤/挂件/站立平面挂件(15R).jpg' },
    xiaoteng3: { name: '红小藤挥旗挂件', points: 2000, rmb: 25, img: '商品/商品/衍生品/红小藤/挂件/双手挥旗平面挂件(25R).jpg' },
    
    // 品牌明信片系列
    postcard2: { name: '年画娃娃明信片', points: 1200, rmb: 15, img: '商品/商品/衍生品/品牌明信片/年画娃娃明信片15R.jpg' },
    postcard3: { name: '春梅少年明信片', points: 800, rmb: 10, img: '商品/商品/衍生品/品牌明信片/春梅少年明信片单价10R.jpg' },
    
    // Logo系列
    logo1: { name: 'Logo套餐一', points: 6400, rmb: 80, img: '商品/商品/衍生品/logo/套餐1(80R).jpg' },
    logo2: { name: 'Logo套餐二', points: 14400, rmb: 180, img: '商品/商品/衍生品/logo/套餐2(180R).jpg' },
    logo3: { name: 'Logo挂件', points: 1600, rmb: 20, img: '商品/商品/衍生品/logo/挂件20R(1600Pts).jpg' },
    logo4: { name: 'Logo明信片', points: 640, rmb: 8, img: '商品/商品/衍生品/logo/明信片8R(640Pts).jpg' },
    
    // 粉干产品
    fengan1: { name: '绛藤间高楼粉干', points: 2400, rmb: 30, img: '商品/商品/绛藤间高楼粉干30R每斤.jpg' }
};

let currentExchangeGift = null;

// 从localStorage获取积分
function getTotalPoints() {
    return parseInt(localStorage.getItem('userTotalPoints') || '0');
}

// 保存积分到localStorage
function setTotalPoints(points) {
    localStorage.setItem('userTotalPoints', points.toString());
    updatePointsDisplay();
}

// 更新页面上所有积分显示
function updatePointsDisplay() {
    const totalPoints = getTotalPoints();
    const rmbValue = (totalPoints / POINTS_PER_RMB).toFixed(2);
    
    // 顶部积分显示
    const topDisplay = document.getElementById('totalPointsDisplay');
    if (topDisplay) topDisplay.textContent = totalPoints;
    
    // 积分卡片显示
    const cardDisplay = document.getElementById('myTotalPoints');
    if (cardDisplay) cardDisplay.textContent = totalPoints;
    
    // RMB等值显示
    const rmbDisplay = document.getElementById('pointsRmbValue');
    if (rmbDisplay) rmbDisplay.textContent = rmbValue;
}

// 触发积分奖励
function triggerPointsReward(points, source) {
    console.log(`积分奖励触发: +${points}分, 来源: ${source}`);
    
    const currentPoints = getTotalPoints();
    const newPoints = currentPoints + points;
    setTotalPoints(newPoints);
    
    // 显示积分增加动画
    showPointsAnimation(points);
    
    // TODO: 调用后端API同步积分
    // 示例: await fetch('/api/points/add', { method: 'POST', body: JSON.stringify({ points, source }) });
}

// 积分增加动画
function showPointsAnimation(points) {
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = `+${points} Pts`;
    animation.style.cssText = `
        position: fixed;
        top: 60px;
        right: 200px;
        font-size: 24px;
        font-weight: bold;
        color: #D4A84B;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        animation: pointsFlyUp 1.5s ease-out forwards;
        z-index: 10001;
    `;
    document.body.appendChild(animation);
    
    setTimeout(() => animation.remove(), 1500);
}

// 添加积分动画样式
function addPointsAnimationStyle() {
    if (document.getElementById('points-animation-style')) return;
    
    const style = document.createElement('style');
    style.id = 'points-animation-style';
    style.textContent = `
        @keyframes pointsFlyUp {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-50px); }
        }
    `;
    document.head.appendChild(style);
}

// 打开兑换弹窗
function openExchangeModal(giftId) {
    const gift = giftData[giftId];
    if (!gift) return;
    
    currentExchangeGift = { id: giftId, ...gift };
    
    const modal = document.getElementById('exchange-modal');
    const giftImg = document.getElementById('exchangeGiftImg');
    const giftName = document.getElementById('exchangeGiftName');
    const pointsNeeded = document.getElementById('exchangePointsNeeded');
    const rmbValue = document.getElementById('exchangeRmbValue');
    const currentPoints = document.getElementById('exchangeCurrentPoints');
    const result = document.getElementById('exchangeResult');
    const confirmBtn = document.getElementById('btnConfirmExchange');
    
    giftImg.src = gift.img;
    giftName.textContent = gift.name;
    pointsNeeded.textContent = `${gift.points} Pts`;
    rmbValue.textContent = `¥${gift.rmb.toFixed(2)}`;
    
    const userPoints = getTotalPoints();
    currentPoints.textContent = `${userPoints} Pts`;
    
    // 检查是否有足够积分
    if (userPoints >= gift.points) {
        result.className = 'exchange-result success';
        result.textContent = '✓ 积分足够，可以兑换';
        confirmBtn.disabled = false;
    } else {
        result.className = 'exchange-result error';
        result.textContent = `✗ 积分不足，还差 ${gift.points - userPoints} Pts`;
        confirmBtn.disabled = true;
    }
    
    modal.classList.add('active');
}

// 关闭兑换弹窗
function closeExchangeModal() {
    const modal = document.getElementById('exchange-modal');
    modal.classList.remove('active');
    currentExchangeGift = null;
}

// 确认兑换
function confirmExchange() {
    if (!currentExchangeGift) return;
    
    const userPoints = getTotalPoints();
    const pointsNeeded = currentExchangeGift.points;
    
    if (userPoints < pointsNeeded) {
        alert('积分不足，无法兑换');
        return;
    }
    
    // 扣除积分
    setTotalPoints(userPoints - pointsNeeded);
    
    // 显示成功提示
    alert(`🎉 兑换成功！\n\n您已成功兑换：${currentExchangeGift.name}\n消耗积分：${pointsNeeded} Pts\n剩余积分：${getTotalPoints()} Pts\n\n请等待工作人员联系您安排发货。`);
    
    closeExchangeModal();
    
    // TODO: 调用后端API记录兑换
    // await fetch('/api/exchange', { method: 'POST', body: JSON.stringify({ giftId: currentExchangeGift.id, points: pointsNeeded }) });
}

// 初始化积分系统
function initPointsSystem() {
    addPointsAnimationStyle();
    updatePointsDisplay();
    
    // 点击弹窗外部关闭
    const modal = document.getElementById('exchange-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeExchangeModal();
            }
        });
    }
}

// 页面加载时初始化积分系统
document.addEventListener('DOMContentLoaded', initPointsSystem);

// 全局函数挂载
window.slideCategory = slideCategory;
window.enterDishList = enterDishList;
window.backToHomepage = backToHomepage;
window.openDishDetail = openDishDetail;
window.closeDishModal = closeDishModal;
window.removeUploadedImg = removeUploadedImg;
window.submitForAIEvaluation = submitForAIEvaluation;
window.submitReview = submitReview;
window.openExchangeModal = openExchangeModal;
window.closeExchangeModal = closeExchangeModal;
window.confirmExchange = confirmExchange;
window.triggerPointsReward = triggerPointsReward;

// ========================================
// 复购入口 - 闲鱼口令复制
// ========================================
function copyXianyuCode() {
    const code = 'KnMwUMhVZrM HU293';
    
    // 使用现代Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(code);
        });
    } else {
        fallbackCopy(code);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        alert('复制失败，请手动复制口令：' + text);
    }
    
    document.body.removeChild(textarea);
}

// 显示复制成功提示
function showCopySuccess() {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = '✅ 口令已复制！打开闲鱼App即可直达店铺';
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #5D7E3E, #4a6931);
        color: white;
        padding: 18px 30px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: toastFadeIn 0.3s ease;
    `;
    
    // 添加动画样式
    if (!document.getElementById('copy-toast-style')) {
        const style = document.createElement('style');
        style.id = 'copy-toast-style';
        style.textContent = `
            @keyframes toastFadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes toastFadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ========================================
// 返回顶部功能
// ========================================

// 返回顶部函数
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 监听滚动事件，显示/隐藏返回顶部按钮
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 导出函数到全局
window.scrollToTop = scrollToTop;

window.copyXianyuCode = copyXianyuCode;
