document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('fa-times');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonial Slider (Simple Version)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        testimonials[index].style.display = 'block';
    }
    
    // Initialize first testimonial
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }

    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .service-card, .project-card, .testimonial-card, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .service-card, .project-card, .testimonial-card, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Service Popup Functionality
const serviceCards = document.querySelectorAll('.service-card');
const servicePopup = document.getElementById('servicePopup');
const closePopup = document.querySelector('.close-popup');
const popupTitle = document.getElementById('popupServiceTitle');
const popupDescription = document.getElementById('popupServiceDescription');
const serviceImagesContainer = document.getElementById('serviceImages');

// Service data with images and descriptions
const servicesData = {
    'RCC WORK': {
        description: 'From office towers to retail spaces, we deliver commercial projects that combine functionality with aesthetic appeal. Our team specializes in creating modern, efficient spaces that meet the highest industry standards.',
        images: [
            'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
        ]
    },
    'EXTENSION WORK': {
        description: 'Quality homes built with precision and care, designed to meet your lifestyle needs and exceed expectations. We offer custom home building and development services with attention to every detail.',
        images: [
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115'
        ]
    },
    // Add other services following the same pattern
    'CIVIL WORK': {
        description: 'Robust industrial facilities designed for efficiency, safety, and long-term operational success. We build warehouses, factories, and specialized industrial spaces with durable materials.',
        images: [
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
            'https://images.unsplash.com/photo-1513828583688-c52646db42da',
            'https://images.unsplash.com/photo-1519501025264-65ba15a82390'
        ]
    },
    'INTERIORS': {
        description: 'Bridges, roads, and public works that connect communities and drive economic growth. Our infrastructure projects are built to last with innovative engineering solutions.',
        images: [
            'https://images.unsplash.com/photo-1476231682828-37e571bc172f',
            'https://images.unsplash.com/photo-1541625602330-2277a4c46182',
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df'
        ]
    },
    'RESTORATION & REPAIRS': {
        description: 'Green building solutions that reduce environmental impact while maintaining structural integrity. We use eco-friendly materials and energy-efficient designs for sustainable development.',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
            'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
        ]
    },
    'PAINTING WORK': {
        description: 'Transforming existing spaces to meet modern standards and functional requirements. Our renovation services breathe new life into old structures while preserving their character.',
        images: [
            'https://images.unsplash.com/photo-1556911220-bff31c812dba',
            'https://images.unsplash.com/photo-1600121848594-d8644e57abab',
            'https://images.unsplash.com/photo-1600566752225-3f2fe98059b1'
        ]
    }
};

// Open popup when service card is clicked
serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const serviceData = servicesData[serviceName];
        
        if (serviceData) {
            popupTitle.textContent = serviceName;
            popupDescription.textContent = serviceData.description;
            
            // Clear previous images
            serviceImagesContainer.innerHTML = '';
            
            // Add new images
            serviceData.images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = serviceName;
                serviceImagesContainer.appendChild(img);
            });
            
            // Show popup
            servicePopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close popup
closePopup.addEventListener('click', function() {
    servicePopup.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close when clicking outside content
servicePopup.addEventListener('click', function(e) {
    if (e.target === this) {
        servicePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});