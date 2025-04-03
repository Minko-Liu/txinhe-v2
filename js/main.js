// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 3D场景设置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const container = document.getElementById('hero-3d');

if (container) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 创建一个简单的板材3D模型
    const geometry = new THREE.BoxGeometry(2, 0.1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x050505,
        shininess: 100
    });
    const board = new THREE.Mesh(geometry, material);

    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);

    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(board);

    camera.position.z = 3;

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        board.rotation.x += 0.005;
        board.rotation.y += 0.005;
        renderer.render(scene, camera);
    }

    animate();

    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 产品展示图片数据
const galleryImages = [

    { src: 'images/gallery/1.png', title: 'gallery' },
    { src: 'images/gallery/2.png', title: 'gallery' },
    { src: 'images/gallery/3.png', title: 'gallery' },
    { src: 'images/gallery/4.png', title: 'gallery' },
    { src: 'images/gallery/5.png', title: 'gallery' },
    { src: 'images/gallery/6.png', title: 'gallery' },
    { src: 'images/gallery/7.png', title: 'gallery' },
];

// 动态加载图片到画廊
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
        `;

        galleryItem.addEventListener('click', () => openLightbox(image));
        galleryGrid.appendChild(galleryItem);
    });
}

// 灯箱效果
function openLightbox(image) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${image.src}" alt="${image.title}">
            <h3>${image.title}</h3>
        </div>
    `;

    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });

    document.body.appendChild(lightbox);

    // 添加灯箱样式
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        }

        .lightbox-content {
            max-width: 90%;
            max-height: 90vh;
            position: relative;
        }

        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }

        .lightbox-content h3 {
            color: white;
            text-align: center;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
}

// 移动端菜单
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenu.classList.toggle('active');
    });

    // 添加移动端菜单样式
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                flex-direction: column;
                padding: 20px;
                backdrop-filter: blur(10px);
            }

            .nav-links a {
                padding: 10px 0;
                display: block;
                text-align: center;
            }

            .mobile-menu.active span:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }

            .mobile-menu.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // 如果是移动端，点击后关闭菜单
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                mobileMenu.classList.remove('active');
            }
        }
    });
}); 