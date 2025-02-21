// Existing banner messages
const bannerMessages = [
    "Step into Comfort with Our Latest Footwear Collection!",
    "Unleash Your Style with Trendy Footwear!",
    "Comfort Meets Fashion - Shop the New Arrivals!",
    "Exclusive Footwear Offers Just for You!"
];

const sliderMessages = [
    "Walk in Comfort",      // for shoe9.webp
    "Step with Confidence", // for shoe10.webp
    "Fashion Meets Comfort",// for shoe11.webp
   
];

const images = [
    "shoe5.jpg",
    "slider1.png",
    "slide.jpg"   
];

let bannerIndex = 0;
let sliderIndex = 0;

function changeBannerMessage() {
    document.getElementById('banner-text').textContent = bannerMessages[bannerIndex]; // Update banner text
    bannerIndex = (bannerIndex + 1) % bannerMessages.length; // Loop through banner messages
}

function changeSliderContent() {
    const sliderImage = document.getElementById('slider-image');
    const sliderText = document.getElementById('slider-text');

    // Change image source and message
    sliderImage.src = images[sliderIndex];
    sliderText.textContent = sliderMessages[sliderIndex];

    // Loop through the slider array
    sliderIndex = (sliderIndex + 1) % images.length;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize both banner and slider
    changeBannerMessage();
    changeSliderContent();

    // Change banner text every 3 seconds
    setInterval(changeBannerMessage, 3000);

    // Change slider content every 5 seconds
    setInterval(changeSliderContent, 3000); // Adjust time for the slider if needed
});



// Search button functionality
document.querySelector('.search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = document.querySelector('.search-form input').value;

    // Perform search logic here
    console.log('Searching for:', searchQuery);
    alert('You searched for: ' + searchQuery);
});

// Array of slider images and texts
const sliders = [
    { image: 'slide.jpg', text: 'Step into Comfort' },
    { image: 'slider1.png', text: 'Explore New Collections' }
];

let currentGroup = 1;
const totalGroups = sliders.length; // Number of groups

function nextIdrees() {
    if (currentGroup < totalGroups) {
        document.getElementById(`group-${currentGroup}`).style.display = 'none'; // Corrected ID syntax
        currentGroup++;
        document.getElementById(`group-${currentGroup}`).style.display = 'flex'; // Corrected ID syntax
    }
    toggleButtons();
}

function prevIdrees() {
    if (currentGroup > 1) {
        document.getElementById(`group-${currentGroup}`).style.display = 'none'; // Corrected ID syntax
        currentGroup--;
        document.getElementById(`group-${currentGroup}`).style.display = 'flex'; // Corrected ID syntax
    }
    toggleButtons();
}

function toggleButtons() {
    // Show or hide the next button
    document.getElementById('next-btn').style.display = (currentGroup === totalGroups) ? 'none' : 'block';

    // Show or hide the previous button
    document.getElementById('prev-btn').style.display = (currentGroup === 1) ? 'none' : 'block';
}

// Initialize button visibility
toggleButtons();


// Get the elements for mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');

// Toggle mobile navigation on hamburger menu click
mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active'); // Toggle the active class
});