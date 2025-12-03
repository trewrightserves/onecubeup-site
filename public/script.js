// Heights Platform Integration URLs
const HEIGHTS_URLS = {
    executive: 'https://your-heights-domain.com/lean-prompting-framework',
    invite: 'https://your-heights-domain.com/lean-prompting-framework?coupon='
};

// Pricing selection functionality
function selectPricing(type) {
    const executiveOption = document.getElementById('executiveOption');
    const inviteOption = document.getElementById('inviteOption');
    const inviteCodeSection = document.getElementById('inviteCodeSection');
    const pricingTierInput = document.getElementById('pricingTier');
    const paymentAmountInput = document.getElementById('paymentAmount');
    const cohortTrackingInput = document.getElementById('cohortTracking');
    const purchaseBtn = document.getElementById('purchaseBtn');

    // Reset active states
    executiveOption.classList.remove('active');
    inviteOption.classList.remove('active');

    if (type === 'executive') {
        executiveOption.classList.add('active');
        inviteCodeSection.style.display = 'none';
        pricingTierInput.value = 'executive';
        paymentAmountInput.value = '47';
        cohortTrackingInput.value = 'executive-47';
        purchaseBtn.textContent = 'Continue to Heights Platform - $47';
    } else if (type === 'invite') {
        inviteOption.classList.add('active');
        inviteCodeSection.style.display = 'block';
        pricingTierInput.value = 'invite';
        paymentAmountInput.value = '3';
        cohortTrackingInput.value = 'invite-3';
        purchaseBtn.textContent = 'Continue to Heights Platform - $3';
    }
}

// Modal functionality
function openCourseModal() {
    document.getElementById('courseModal').style.display = 'block';
}

function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('courseModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form submission with Heights Platform redirect
document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Validate invite code if needed
    if (data.pricingTier === 'invite') {
        const inviteCode = document.getElementById('inviteCode').value.trim();
        if (!inviteCode) {
            alert('Please enter your invitation code to access partner pricing.');
            return;
        }

        if (inviteCode.length < 3) {
            alert('Please enter a valid invitation code.');
            return;
        }

        data.inviteCode = inviteCode;
    }

    // Prepare tracking data for your CRM
    const trackingData = {
        lead_source: 'lean_prompting_framework',
        pricing_tier: data.pricingTier,
        payment_amount: data.paymentAmount,
        cohort: data.cohortTracking,
        signup_date: new Date().toISOString(),
        customer_data: data
    };

    console.log('CRM Tracking Data:', trackingData);

    // TODO: Send tracking data to your CRM via webhook or API
    // Example: fetch('YOUR_CRM_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(trackingData) });

    // Redirect to Heights Platform with appropriate URL
    let heightsUrl;
    if (data.pricingTier === 'executive') {
        heightsUrl = HEIGHTS_URLS.executive;
    } else {
        // Append coupon code to URL for invite pricing
        heightsUrl = HEIGHTS_URLS.invite + encodeURIComponent(data.inviteCode);
    }

    // Store customer data in sessionStorage for Heights to potentially access
    sessionStorage.setItem('onecubeup_customer', JSON.stringify(data));

    // Redirect to Heights Platform
    // UNCOMMENT WHEN READY TO GO LIVE:
    // window.location.href = heightsUrl;

    // For demo purposes, show success message
    alert(`Redirecting to Heights Platform...\n\nPricing Tier: ${data.cohortTracking}\nAmount: ${data.paymentAmount}\n\nYou will:\n1. Complete payment on Heights Platform\n2. Get instant course access\n3. Receive welcome email\n4. Enter 7-day onboarding sequence\n\nURL: ${heightsUrl}`);

    closeCourseModal();
    this.reset();
    selectPricing('executive');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.includes('onclick')) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.value-item, .service-card');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Initialize pricing selection
    selectPricing('executive');
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));
