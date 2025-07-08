// Initialize radar chart for skills visualization
document.addEventListener('DOMContentLoaded', function() {
    // Radar Chart for skills
    const ctx = document.getElementById('radarChart');
    if (ctx) {
        const radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Creativity',
                    'Problem Solving',
                    'Communication',
                    'Technical Skills',
                    'Analytical Thinking',
                    'Leadership'
                ],
                datasets: [{
                    label: 'Your Skills',
                    data: [70, 85, 60, 75, 80, 65],
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Animated progress for assessment cards
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const progressBar = this.nextElementSibling.querySelector('.progress');
            progressBar.style.width = '0%';
            
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    // Here you would redirect to the actual assessment
                    alert('Redirecting to assessment...');
                } else {
                    width += 1;
                    progressBar.style.width = width + '%';
                }
            }, 20);
        });
    });

    // Carousel functionality for career cards
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const careerCards = document.querySelectorAll('.career-card');
    let currentSlide = 0;
    const totalSlides = Math.ceil(careerCards.length / 4); // Assuming 4 cards visible at once on desktop
    
    // Initialize dots
    updateDots();
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    function updateCarousel() {
        // This is a simplified version. In a real implementation,
        // you would slide the cards horizontally
        careerCards.forEach((card, index) => {
            // Just for demonstration, toggle visibility
            if (window.innerWidth <= 768) {
                // On mobile, show only the current slide
                card.style.display = Math.floor(index / 1) === currentSlide ? 'block' : 'none';
            } else if (window.innerWidth <= 1024) {
                // On tablet, show 2 cards per slide
                card.style.display = Math.floor(index / 2) === currentSlide ? 'block' : 'none';
            } else {
                // On desktop, show 4 cards per slide
                card.style.display = Math.floor(index / 4) === currentSlide ? 'block' : 'none';
            }
        });
        
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a, .cta-buttons a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Floating cursor effect
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) { // Only on desktop
        cursorFollower.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            setTimeout(() => {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
        
        // Add initial animation class
        section.classList.add('fade-in');
    });

    // Add hover effects to assessment cards
    const assessmentCards = document.querySelectorAll('.assessment-card');
    assessmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Mobile menu toggle (simplified - would need more code for full implementation)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        header.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', () => {
            nav.querySelector('ul').style.display = 
                nav.querySelector('ul').style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Typing effect for the hero heading
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        const text = highlight.textContent;
        highlight.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                highlight.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
});

// Mock notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <p>${message}</p>
        <span class="close-notification">&times;</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Sample data for demonstration
const sampleUserData = {
    name: " Yahya ",
    completedAssessments: 2,
    topStrengths: ["Creativity", "Analytical Thinking", "Technical Skills"],
    suggestedCareers: [
        "Software Developer", 
        "UX Designer", 
        "Environmental Scientist", 
        "Digital Marketing Specialist"
    ]
};

// Add CSS for the notification
const style = document.createElement('style');
style.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        border-left: 4px solid var(--primary-color);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-radius: var(--radius-md);
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .toast-notification.show {
        transform: translateX(0);
    }
    
    .toast-notification i {
        color: var(--primary-color);
    }
    
    .toast-notification p {
        flex: 1;
        margin: 0;
    }
    
    .close-notification {
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--text-secondary);
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .menu-toggle {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-primary);
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        nav ul {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: var(--shadow-md);
        }
    }
`;

document.head.appendChild(style);

// Welcome message on page load
setTimeout(() => {
    if (sampleUserData.name) {
        showNotification(`Welcome back, ${sampleUserData.name}! You have ${sampleUserData.completedAssessments} assessments completed.`);
    }
}, 2000);