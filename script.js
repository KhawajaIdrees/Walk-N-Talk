/* ============================================
   WALK 'N' TALK - MAIN JAVASCRIPT FILE
   Handles: Banner, Slider, Mobile Menu, Search,
            Catalogue Rendering, Filters, Carousel,
            Footer Year, Add to Cart
   ============================================ */

/* ============================================
   1. BANNER MESSAGES & SLIDER DATA
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

let bannerIndex = 0;
let sliderIndex = 0;

/* ============================================
   2. BANNER ROTATION
   ============================================ */
function changeBannerMessage() {
    const bannerText = document.getElementById('banner-text');
    if (bannerText) {
        bannerText.textContent = bannerMessages[bannerIndex];
        bannerIndex = (bannerIndex + 1) % bannerMessages.length;
    }
}

/* ============================================
   3. HERO SLIDER ROTATION
   ============================================ */
function changeSliderContent() {
    const sliderImage = document.getElementById('slider-image');
    const sliderText = document.getElementById('slider-text');
    if (sliderImage && sliderText) {
        sliderImage.src = sliderImages[sliderIndex];
        sliderText.textContent = sliderMessages[sliderIndex];
        sliderIndex = (sliderIndex + 1) % sliderImages.length;
    }
}

/* ============================================
   4. IDREES PRODUCT CAROUSEL (Home Page)
   ============================================ */
let currentGroup = 1;
const totalGroups = 2; // Two slide groups in index.html

function nextIdrees() {
    if (currentGroup < totalGroups) {
        const currentEl = document.getElementById(`group-${currentGroup}`);
        const nextEl = document.getElementById(`group-${currentGroup + 1}`);
        if (currentEl) currentEl.style.display = 'none';
        currentGroup++;
        if (nextEl) nextEl.style.display = 'flex';
    }
    toggleIdreesButtons();
}

function prevIdrees() {
    if (currentGroup > 1) {
        const currentEl = document.getElementById(`group-${currentGroup}`);
        const prevEl = document.getElementById(`group-${currentGroup - 1}`);
        if (currentEl) currentEl.style.display = 'none';
        currentGroup--;
        if (prevEl) prevEl.style.display = 'flex';
    }
    toggleIdreesButtons();
}

function toggleIdreesButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn && nextBtn) {
        prevBtn.style.display = (currentGroup === 1) ? 'none' : 'block';
        nextBtn.style.display = (currentGroup === totalGroups) ? 'none' : 'block';
    }
}

/* ============================================
   5. MOBILE MENU TOGGLE (Hamburger)
   ============================================ */
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');

    if (!mobileMenu) return;

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (navLeft) navLeft.classList.toggle('active');
        if (navRight) navRight.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (navLeft) navLeft.classList.remove('active');
            if (navRight) navRight.classList.remove('active');
        });
    });
}

/* ============================================
   6. SEARCH FUNCTIONALITY
   ============================================ */
function setupSearch() {
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const input = form.querySelector('input');
            const query = input ? input.value.trim() : '';
            // Form submits naturally to catalogue.html with ?query=...
            console.log('Searching for:', query);
        });
    });
}

/* ============================================
   7. CATALOGUE — PRODUCT DATA
   ============================================ */
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
   8. CATALOGUE — RENDER FUNCTION
   ============================================ */
function renderCatalogue(filterCategory = 'all', sortBy = 'default', searchQuery = '') {
    const grid = document.getElementById('catalogue-grid');
    if (!grid) return; // Not on catalogue page

    let filteredProducts = [...products];

    // Filter by category
    if (filterCategory && filterCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }

    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }

    // Empty state
    if (filteredProducts.length === 0) {
        grid.innerHTML = `<p class="no-results">No products found matching your criteria. Try a different search or filter.</p>`;
        return;
    }

    // Render product cards
    grid.innerHTML = filteredProducts.map(product => `
        <div class="catalogue-item">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/300x250/f0f0f0/666?text=Product';">
            <div class="catalogue-item-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

/* ============================================
   9. ADD TO CART
   ============================================ */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`✅ Added "${product.name}" to cart!\n\nPrice: $${product.price}\nCategory: ${product.category}`);
        // In a real app, you'd update a cart state / localStorage here
    }
}

/* ============================================
   10. CATALOGUE — FILTERS SETUP
   ============================================ */
function setupCatalogueFilters() {
    const grid = document.getElementById('catalogue-grid');
    if (!grid) return; // Not on catalogue page

    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    // Read URL params (?category=men&query=runner)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category') || 'all';
    const searchQuery = urlParams.get('query') || '';

    // Set the category dropdown to match the URL
    if (categoryFilter) categoryFilter.value = initialCategory;

    // Initial render
    renderCatalogue(
        initialCategory,
        sortFilter ? sortFilter.value : 'default',
        searchQuery
    );

    // Event: category change
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            renderCatalogue(
                categoryFilter.value,
                sortFilter ? sortFilter.value : 'default',
                searchQuery
            );
        });
    }

    // Event: sort change
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            renderCatalogue(
                categoryFilter ? categoryFilter.value : 'all',
                sortFilter.value,
                searchQuery
            );
        });
    }
}

/* ============================================
   11. FOOTER YEAR (Auto-update)
   ============================================ */
function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ============================================
   12. INITIALIZATION (runs on every page)
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    // Banner & slider first render
    changeBannerMessage();
    changeSliderContent();

    // Auto-rotate every few seconds
    setInterval(changeBannerMessage, 4000);
    setInterval(changeSliderContent, 5000);

    // Setup all interactive features
    setupMobileMenu();
    setupSearch();
    setupCatalogueFilters();
    setFooterYear();
    toggleIdreesButtons();

    // Debug log
    console.log('✅ Walk \'N\' Talk site initialized successfully.');
    console.log('Current page:', window.location.pathname);
});

/* ============================================
   13. EXPOSE FUNCTIONS TO GLOBAL SCOPE
   (needed for inline onclick in HTML)
   ============================================ */
window.nextIdrees = nextIdrees;
window.prevIdrees = prevIdrees;
window.addToCart = addToCart;
window.renderCatalogue = renderCatalogue;