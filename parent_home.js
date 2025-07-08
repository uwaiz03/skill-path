// Skill Path - Parent Dashboard JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the skills chart
    initializeSkillsChart();
    
    // Set up modal functionality
    setupModalEvents();
    
    // Set up notifications
    setupNotifications();
    
    // Set up form submission for goals
    setupGoalForm();
    
    // Set up dropdown for profile menu
    setupProfileDropdown();
    
    // Initialize progress bar animations
    animateProgressBars();
    
    // Set welcome message based on time of day
    setWelcomeMessage();
    
    // Apply hover effects to dashboard cards
    setupCardInteractions();
    
    // Initialize skill tooltips
    addSkillTooltips();
    
    // Initialize the recommendation system
    updateRecommendations();
});

// Chart initialization with student skill assessment data
function initializeSkillsChart() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    
    // Define the data for the radar chart showing student's skills
    const data = {
        labels: [
            'Creative Thinking',
            'Logical Reasoning',
            'Verbal Communication',
            'Problem Solving',
            'Teamwork',
            'Attention to Detail',
            'Critical Analysis',
            'Artistic Ability',
        ],
        datasets: [{
            label: 'Skills Assessment',
            data: [90, 85, 82, 75, 70, 65, 72, 88],
            fill: true,
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgb(79, 70, 229)',
            pointBackgroundColor: 'rgb(79, 70, 229)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(79, 70, 229)'
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.r + '% proficiency';
                        }
                    }
                }
            }
        }
    };
    
    // Create the chart
    const skillsChart = new Chart(ctx, config);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        skillsChart.resize();
    });
}

// Modal functionality for adding goals
function setupModalEvents() {
    const modal = document.getElementById('goal-modal');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Open modal when Add Goal button is clicked
    addGoalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modal when X is clicked
    closeModalBtn.addEventListener('click', function() {
        closeModalFunc();
    });
    
    // Close modal when Cancel button is clicked
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModalFunc();
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModalFunc();
        }
    });
    
    // Escape key closes modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
    
    // Function to close the modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Reset form fields
        document.getElementById('goal-form').reset();
    }
}

// Notifications setup
function setupNotifications() {
    const notificationIcon = document.querySelector('.notifications');
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            // This would normally open a notifications panel
            // For demonstration, we'll show details about the 3 notifications
            alert('You have 3 new notifications:\n\n1. Alex completed Math Practice Quiz\n2. Goal "Science Fair Project" is 65% complete\n3. New learning resource added for Creative Arts');
        });
    }
}

// Goal form submission handling
function setupGoalForm() {
    const goalForm = document.getElementById('goal-form');
    
    if (goalForm) {
        goalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const title = document.getElementById('goal-title').value;
            const description = document.getElementById('goal-description').value;
            const deadline = document.getElementById('goal-deadline').value;
            const category = document.getElementById('goal-category').value;
            
            // Validate form
            if (!title || !deadline) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to the server
            // For demonstration purposes, we'll just add it to the UI
            addNewGoalToUI(title, deadline, category);
            
            // Close the modal
            document.querySelector('.close-modal').click();
        });
    }
}

// Add the new goal to the UI
function addNewGoalToUI(title, deadline, category) {
    const goalsContainer = document.querySelector('.goals-container');
    
    // Format the date for display
    const deadlineDate = new Date(deadline);
    const formattedDate = deadlineDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Create new goal HTML
    const goalHTML = `
        <div class="goal">
            <div class="goal-header">
                <h4>${title}</h4>
                <span class="goal-badge in-progress">New</span>
            </div>
            <div class="goal-details">
                <div class="deadline">
                    <i class="fas fa-calendar"></i>
                    <span>Due: ${formattedDate}</span>
                </div>
                <div class="goal-progress">
                    <div class="progress-info">
                        <span>Progress</span>
                        <span>0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert the new goal at the top of the container
    goalsContainer.insertAdjacentHTML('afterbegin', goalHTML);
    
    // Add a highlight effect to the new goal
    const newGoal = goalsContainer.firstElementChild;
    newGoal.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
    
    // Remove highlight after a short delay
    setTimeout(() => {
        newGoal.style.transition = 'background-color 1s ease';
        newGoal.style.backgroundColor = '';
    }, 100);
}

// Progress animation for skill bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = targetWidth;
        }, 200);
    });
}

// Set up profile dropdown menu functionality
function setupProfileDropdown() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // Toggle dropdown when profile button is clicked
    profileBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown') && dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    });
}

// Add hover effects to dashboard cards
function setupCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect for better UX
        card.addEventListener('click', function() {
            const headerElement = this.querySelector('.card-header h3');
            if (headerElement) {
                headerElement.style.color = 'var(--primary-color)';
                setTimeout(() => {
                    headerElement.style.color = '';
                }, 300);
            }
        });
    });
}

// Add a welcome message based on time of day
function setWelcomeMessage() {
    const welcomeText = document.querySelector('.welcome-text h2');
    const hour = new Date().getHours();
    let greeting = 'Welcome back';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    if (welcomeText) {
        welcomeText.textContent = `${greeting}, Sarah!`;
    }
}

// Add tooltips to skill bars for better understanding
function addSkillTooltips() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        const skillName = item.querySelector('.progress-info span:first-child').textContent;
        const percentage = item.querySelector('.progress-info span:last-child').textContent;
        
        item.setAttribute('title', `${skillName}: ${percentage} proficiency`);
        item.style.cursor = 'help';
    });
}

// Add recommendations based on skill assessments
function updateRecommendations() {
    // This function would typically fetch personalized recommendations from a backend
    // For now, we'll just implement a visual effect to highlight recommendations
    const activities = document.querySelectorAll('.activity');
    
    if (activities.length) {
        // Add pulsing effect to activities to draw attention
        activities.forEach((activity, index) => {
            // Add a slight delay between each activity
            setTimeout(() => {
                activity.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                activity.style.transform = 'translateY(-5px)';
                activity.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                
                setTimeout(() => {
                    activity.style.transform = '';
                    activity.style.boxShadow = '';
                }, 500);
            }, index * 1000);
        });
    }
    
    // Additionally, we can simulate new recommendations every few days
    // This is just for demonstration purposes - in production, this would be server-driven
    const activitiesContainer = document.querySelector('.activities-container');
    
    // We'd normally update recommendations based on new assessments or learning progress
    // For demonstration, let's add this functionality to the "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.activity .secondary-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const activityTitle = this.parentElement.querySelector('h4').textContent;
            alert(`More information about "${activityTitle}" will be sent to your email.\n\nWe've also scheduled a personalized recommendation update based on Alex's recent progress.`);
        });
    });
}

// Track student progress and send updates to parent
function trackStudentProgress() {
    // In a real application, this would connect to a backend service
    // For demonstration, we'll simulate progress updates
    const progressBars = document.querySelectorAll('.goal .progress');
    
    // Simulate automatic progress updates for in-progress goals
    setInterval(() => {
        progressBars.forEach(bar => {
            const currentGoal = bar.closest('.goal');
            const statusBadge = currentGoal.querySelector('.goal-badge');
            
            // Only update in-progress goals
            if (statusBadge && statusBadge.classList.contains('in-progress') && 
                !statusBadge.textContent.includes('Completed')) {
                
                const progressInfo = bar.parentElement.previousElementSibling;
                const progressText = progressInfo.querySelector('span:last-child');
                const currentProgress = parseInt(progressText.textContent);
                
                // Randomly increment progress by 1-5% (in a real app this would be actual data)
                if (currentProgress < 100) {
                    const increment = Math.floor(Math.random() * 5) + 1;
                    const newProgress = Math.min(currentProgress + increment, 100);
                    
                    // Update progress text and bar
                    progressText.textContent = `${newProgress}%`;
                    bar.style.width = `${newProgress}%`;
                    
                    // If completed, update badge
                    if (newProgress === 100) {
                        statusBadge.textContent = 'Completed';
                        statusBadge.classList.remove('in-progress');
                        statusBadge.classList.add('completed');
                    }
                }
            }
        });
    }, 120000); // Update every 2 minutes (for demo purposes)
}

// Call this function to simulate progress updates over time
// Uncomment in production or for demo purposes
// trackStudentProgress();