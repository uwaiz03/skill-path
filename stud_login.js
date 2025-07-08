// Skill Path - Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Validate form inputs
            if (!username.trim()) {
                showValidationMessage('username', 'Please enter your username');
                return;
            }
            
            if (!password) {
                showValidationMessage('password', 'Please enter your password');
                return;
            }
            
            // Here you would typically send the login request to your server
            // For demonstration, we'll just simulate a login process
            simulateLogin(username, password, rememberMe);
        });
    }

    // Input focus effects
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => {
        // Remove validation message on input
        input.addEventListener('input', function() {
            removeValidationMessage(this.id);
        });

        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });

    // Welcome animation for the branding
    animateWelcome();
});

// Function to show validation message
function showValidationMessage(inputId, message) {
    removeValidationMessage(inputId);
    
    const inputElement = document.getElementById(inputId);
    const errorMessage = document.createElement('div');
    
    errorMessage.className = 'validation-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ef4444';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    
    inputElement.parentElement.parentElement.appendChild(errorMessage);
    inputElement.parentElement.style.borderColor = '#ef4444';
}

// Function to remove validation message
function removeValidationMessage(inputId) {
    const inputElement = document.getElementById(inputId);
    const parent = inputElement.parentElement.parentElement;
    const message = parent.querySelector('.validation-message');
    
    if (message) {
        parent.removeChild(message);
        inputElement.parentElement.style.borderColor = '';
    }
}

// Simulate login process
function simulateLogin(username, password, rememberMe) {
    // Show loading state on button
    const loginBtn = document.querySelector('.login-btn');
    const originalBtnText = loginBtn.textContent;
    
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // For demo purposes, any username with "test" will succeed, others will fail
        if (username.toLowerCase().includes('test')) {
            // Success case
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            loginBtn.style.backgroundColor = '#4ade80';
            
            // Save to localStorage if remember me is checked
            if (rememberMe) {
                localStorage.setItem('skillpath_username', username);
                // Note: In a real application, never store passwords in localStorage
            }
            
            // Redirect after successful login (in a real application)
            setTimeout(() => {
                alert('Login successful! In a real application, you would be redirected to the dashboard.');
                loginBtn.textContent = originalBtnText;
                loginBtn.disabled = false;
                loginBtn.style.backgroundColor = '';
            }, 1000);
        } else {
            // Failure case
            loginBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
            loginBtn.style.backgroundColor = '#ef4444';
            
            setTimeout(() => {
                showValidationMessage('username', 'Invalid username or password');
                loginBtn.textContent = originalBtnText;
                loginBtn.disabled = false;
                loginBtn.style.backgroundColor = '';
            }, 1000);
        }
    }, 1500);
}

// Welcome animation for the branding
function animateWelcome() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
        // Add a staggered animation delay
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        feature.style.transitionDelay = `${0.9 + (index * 0.1)}s`;
        
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 100);
    });
}

// Check if username is stored in localStorage (for "Remember me" functionality)
window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('skillpath_username');
    const usernameInput = document.getElementById('username');
    const rememberCheckbox = document.getElementById('remember');
    
    if (savedUsername && usernameInput && rememberCheckbox) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
});

function redirectToHome() {
    // You would typically add authentication logic here
    window.location.href = 'stud_home.html';
}