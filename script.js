/* ============================================
   WALK 'N' TALK - MAIN JAVASCRIPT FILE
   Version 3.0 - Full Fixed (Hamburger + All)
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       1. DATA
       ============================================ */
    const bannerMessages = [
        "Step into Comfort with Our Latest Footwear Collection!",
        "Unleash Your Style with Trendy Footwear!",
        "Comfort Meets Fashion - Shop the New Arrivals!",
        "Exclusive Footwear Offers Just for You!"
    ];

    const sliderMessages = [
        "Walk in Comfort",
        "Step with Confidence",
        "Fashion Meets Comfort"
    ];

    const sliderImages = [
        "shoe5.jpg",
        "slider1.png",
        "slide.jpg"
    ];

    const products = [
        { id: 1,  name: "Wool Piper Go",            price: 110, category: "men",   image: "ad.png" },
        { id: 2,  name: "Wool Runner Mizzles",      price: 125, category: "men",   image: "ab.png" },
        { id: 3,  name: "Tree Dasher 2",            price: 135, category: "women", image: "bc.png" },
        { id: 4,  name: "Wool Dasher Mizzles",      price: 145, category: "women", image: "cd.png" },
        { id: 5,  name: "Women's Lounger Lift",     price: 105, category: "women", image: "loungerliftwomen.png" },
        { id: 6,  name: "Men's Tree Dasher Relay",  price: 130, category: "men",   image: "menstreerelay.png" },
        { id: 7,  name: "Women's Tree Runner Go",   price: 120, category: "women", image: "womenstreerunnergo.png" },
        { id: 8,  name: "Men's Tree Runner Go",     price: 120, category: "men",   image: "mentreeundergo.png" },
        { id: 9,  name: "Women's Tree Breezers",    price: 110, category: "women", image: "womenstreebreexers.png" },
        { id: 10, name: "Men's Tree Runners",       price: 120, category: "men",   image: "menstreerunner.png" },
        { id: 11, name: "Women's Tree Gliders",     price: 130, category: "women", image: "womenstreeglider.png" },
        { id: 12, name: "Kids' Playful Sneakers",   price: 75,  category: "kids",  image: "grid1.jpg" }
    ];

    /* ============================================
       2. GLOBAL STATE
       ============================================ */
    let bannerIndex = 0;
    let sliderIndex = 0;
    let currentIdreesGroup = 1;
    const TOTAL_IDREES_GROUPS = 2;

    /* ============================================
       3. TOAST NOTIFICATION SYSTEM
       ============================================ */
    function showToast(message, type = 'info', duration = 3000) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${iconMap[type] || iconMap.info}"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    /* ============================================
       4. BANNER ROTATION
       ============================================ */
    function changeBannerMessage() {
        const bannerText = document.getElementById('banner-text');
        if (!bannerText) return;
        bannerText.textContent = bannerMessages[bannerIndex];
        bannerIndex = (bannerIndex + 1) % bannerMessages.length;
    }

    /* ============================================
       5. HERO SLIDER ROTATION
       ============================================ */
    function changeSliderContent() {
        const sliderImage = document.getElementById('slider-image');
        const sliderText = document.getElementById('slider-text');
        if (!sliderImage || !sliderText) return;

        sliderImage.style.opacity = '0.3';
        setTimeout(() => {
            sliderImage.src = sliderImages[sliderIndex];
            sliderText.textContent = sliderMessages[sliderIndex];
            sliderImage.style.opacity = '1';
            sliderIndex = (sliderIndex + 1) % sliderImages.length;
        }, 200);
    }

    /* ============================================
       6. IDREES CAROUSEL
       ============================================ */
    function nextIdrees() {
        if (currentIdreesGroup < TOTAL_IDREES_GROUPS) {
            const currentEl = document.getElementById(`group-${currentIdreesGroup}`);
            const nextEl = document.getElementById(`group-${currentIdreesGroup + 1}`);
            if (currentEl) currentEl.style.display = 'none';
            currentIdreesGroup++;
            if (nextEl) nextEl.style.display = 'flex';
        }
        toggleIdreesButtons();
    }

    function prevIdrees() {
        if (currentIdreesGroup > 1) {
            const currentEl = document.getElementById(`group-${currentIdreesGroup}`);
            const prevEl = document.getElementById(`group-${currentIdreesGroup - 1}`);
            if (currentEl) currentEl.style.display = 'none';
            currentIdreesGroup--;
            if (prevEl) prevEl.style.display = 'flex';
        }
        toggleIdreesButtons();
    }

    function toggleIdreesButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (!prevBtn || !nextBtn) return;
        prevBtn.style.display = (currentIdreesGroup === 1) ? 'none' : 'block';
        nextBtn.style.display = (currentIdreesGroup === TOTAL_IDREES_GROUPS) ? 'none' : 'block';
    }

    /* ============================================
       7. MOBILE MENU — FULL FIX
       ============================================ */
    function setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');

        if (!mobileMenu) {
            console.warn('⚠️ menu-toggle button not found in DOM');
            return;
        }

        // Remove any existing listeners by cloning (safety)
        const newBtn = mobileMenu.cloneNode(true);
        mobileMenu.parentNode.replaceChild(newBtn, mobileMenu);

        newBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isCurrentlyOpen = newBtn.classList.contains('active');

            if (isCurrentlyOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        function openMenu() {
            newBtn.classList.add('active');
            newBtn.setAttribute('aria-expanded', 'true');
            if (navLeft) navLeft.classList.add('active');
            if (navRight) navRight.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeMenu() {
            newBtn.classList.remove('active');
            newBtn.setAttribute('aria-expanded', 'false');
            if (navLeft) navLeft.classList.remove('active');
            if (navRight) navRight.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        // Close on any link click inside nav
        document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Close if user clicks outside (on the overlay)
        document.addEventListener('click', (e) => {
            if (!newBtn.classList.contains('active')) return;
            const clickedInsideNav = e.target.closest('.nav-left, .nav-right, .menu-toggle');
            if (!clickedInsideNav) closeMenu();
        });

        // Close menu if viewport is resized to desktop width
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && newBtn.classList.contains('active')) {
                closeMenu();
            }
        });

        // Expose for debugging
        window.__toggleMenu = { openMenu, closeMenu };
    }

    /* ============================================
       8. CART SYSTEM (localStorage)
       ============================================ */
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('wnt_cart') || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem('wnt_cart', JSON.stringify(cart));
        } catch (e) {
            console.warn('Could not save cart:', e);
        }
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        const badges = document.querySelectorAll('#cart-count');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.classList.add('bump');
            setTimeout(() => badge.classList.remove('bump'), 400);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            showToast('Product not found', 'error');
            return;
        }

        const cart = getCart();
        const existing = cart.find(item => item.id === productId);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
        }

        saveCart(cart);
        updateCartCount();
        showToast(`"${product.name}" added to cart!`, 'success');
    }

    /* ============================================
       9. CATALOGUE RENDER
       ============================================ */
    function renderCatalogue(filterCategory = 'all', sortBy = 'default', searchQuery = '') {
        const grid = document.getElementById('catalogue-grid');
        if (!grid) return;

        let filtered = products.slice();

        if (filterCategory && filterCategory !== 'all') {
            filtered = filtered.filter(p => p.category === filterCategory);
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                filtered.sort((a, b) => a.id - b.id);
        }

        const resultsInfo = document.getElementById('results-info');
        if (resultsInfo) {
            const total = products.length;
            if (filtered.length === total) {
                resultsInfo.innerHTML = `Showing all <strong>${total}</strong> products`;
            } else {
                resultsInfo.innerHTML = `Showing <strong>${filtered.length}</strong> of ${total} products`;
            }
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <p class="no-results">
                    <i class="fas fa-search"></i>
                    No products found matching your criteria.<br>
                    <small>Try a different search or filter.</small>
                </p>
            `;
            return;
        }

        grid.innerHTML = filtered.map(product => `
            <div class="catalogue-item" data-id="${product.id}">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x250/f0f0f0/666?text=${encodeURIComponent(product.name)}';">
                <div class="catalogue-item-info">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">$${product.price}</p>
                    <button class="btn-add-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = parseInt(this.dataset.id, 10);
                addToCart(id);
                this.classList.add('added');
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                setTimeout(() => {
                    this.classList.remove('added');
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                }, 1500);
            });
        });
    }

    /* ============================================
       10. CATALOGUE FILTERS
       ============================================ */
    function setupCatalogueFilters() {
        const grid = document.getElementById('catalogue-grid');
        if (!grid) return;

        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        const inlineSearch = document.getElementById('search-inline');

        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category') || 'all';
        const initialQuery = urlParams.get('query') || '';

        if (categoryFilter) categoryFilter.value = initialCategory;
        if (inlineSearch && initialQuery) inlineSearch.value = initialQuery;

        const applyFilters = () => {
            renderCatalogue(
                categoryFilter ? categoryFilter.value : 'all',
                sortFilter ? sortFilter.value : 'default',
                inlineSearch ? inlineSearch.value : ''
            );
        };

        if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
        if (sortFilter) sortFilter.addEventListener('change', applyFilters);
        if (inlineSearch) {
            let debounceTimer;
            inlineSearch.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(applyFilters, 250);
            });
        }

        applyFilters();
    }

    /* ============================================
       11. CONTACT FORM
       ============================================ */
    function setupContactForm() {
        const form = document.getElementById('contact-form-el');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const firstName = (data.get('first-name') || '').trim();
            const email = (data.get('email') || '').trim();

            if (!firstName || !email) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            showToast(`Thanks ${firstName}! We'll get back to you soon.`, 'success', 4000);
            form.reset();
        });
    }

    /* ============================================
       12. NEWSLETTER
       ============================================ */
    function setupNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const email = input ? input.value.trim() : '';

            if (!email || !email.includes('@')) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            showToast('Subscribed! Check your inbox for 15% off.', 'success', 4000);
            form.reset();
        });
    }

    /* ============================================
       13. AUTH FORMS
       ============================================ */
    function setupAuthForms() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = loginForm.querySelector('#email').value.trim();
                const password = loginForm.querySelector('#password').value;

                if (!email || !password) {
                    showToast('Please fill in all fields.', 'error');
                    return;
                }

                showToast('Signed in successfully!', 'success');
                loginForm.reset();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const firstName = registerForm.querySelector('#firstName').value.trim();
                const email = registerForm.querySelector('#emailRegister').value.trim();
                const password = registerForm.querySelector('#passwordRegister').value;
                const confirm = registerForm.querySelector('#confirmPassword').value;

                if (!firstName || !email || !password || !confirm) {
                    showToast('Please fill in all fields.', 'error');
                    return;
                }

                if (password.length < 6) {
                    showToast('Password must be at least 6 characters.', 'error');
                    return;
                }

                if (password !== confirm) {
                    showToast('Passwords do not match!', 'error');
                    return;
                }

                showToast(`Welcome, ${firstName}! Your account is ready.`, 'success', 4000);
                registerForm.reset();
            });
        }
    }

    /* ============================================
       14. FOOTER YEAR
       ============================================ */
    function setFooterYear() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    /* ============================================
       15. INIT
       ============================================ */
    function init() {
        changeBannerMessage();
        changeSliderContent();
        setInterval(changeBannerMessage, 4000);
        setInterval(changeSliderContent, 5000);

        setupMobileMenu();
        setupCatalogueFilters();
        setupContactForm();
        setupNewsletter();
        setupAuthForms();
        setFooterYear();
        toggleIdreesButtons();
        updateCartCount();

        console.log('✅ Walk \'N\' Talk initialized.');
        console.log('📍 Page:', window.location.pathname);
        console.log('🛒 Cart items:', getCart().length);
        console.log('📐 Window width:', window.innerWidth + 'px', window.innerWidth <= 768 ? '(mobile)' : '(desktop)');
        console.log('🍔 Hamburger visible:', window.innerWidth <= 768 ? 'YES' : 'NO (resize to see)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ============================================
       16. GLOBAL EXPORTS
       ============================================ */
    window.nextIdrees = nextIdrees;
    window.prevIdrees = prevIdrees;
    window.addToCart = addToCart;

})();