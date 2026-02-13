// Playful messages for the No button
const noMessages = [
    "😏 nope!",
    "try harder~",
    "not today!",
    "nice try 😘",
    "maybe... no 💕",
    "catch me! 😜",
    "too slow!",
    "almost! 💫"
];
let messageIndex = 0;

// Check if there's a valentine parameter in URL
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const valentineName = urlParams.get('valentine');

    if (valentineName) {
        // We have a valentine parameter - show question page
        const decodedName = decodeURIComponent(valentineName).trim();
        
        if (decodedName && decodedName.length > 0) {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('questionScreen').classList.add('show');
            document.getElementById('questionText').textContent = `${decodedName}, would you be my Val? ❤️`;
            
            // Position No button initially
            positionNoButtonRandomly();
        } else {
            // Invalid name - show fallback
            showFallback();
        }
    }
    // Otherwise, welcome screen is already showing by default
});

function generateLink() {
    const nameInput = document.getElementById('partnerName');
    const name = nameInput.value.trim();
    const errorMsg = document.getElementById('errorMessage');
    const linkContainer = document.getElementById('linkContainer');

    // Validate input
    if (!name || name.length === 0) {
        errorMsg.classList.add('show');
        nameInput.focus();
        return;
    }

    // Hide error if showing
    errorMsg.classList.remove('show');

    // Generate link
    const encodedName = encodeURIComponent(name);
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableLink = `${baseUrl}?valentine=${encodedName}`;

    // Display link
    document.getElementById('generatedLink').textContent = shareableLink;
    linkContainer.classList.add('show');

    // Store for copying
    window.currentLink = shareableLink;
}

function copyLink() {
    const link = window.currentLink;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
            showToast();
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopy(link);
        });
    } else {
        fallbackCopy(link);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        alert('Please copy the link manually');
    }
    document.body.removeChild(textarea);
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function positionNoButtonRandomly() {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    const btnWidth = noBtn.offsetWidth || 200;
    const btnHeight = noBtn.offsetHeight || 60;
    
    const maxX = containerRect.width - btnWidth - 20;
    const maxY = 300; // Keep it within reasonable vertical space
    
    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * maxY;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function moveNoButton(event) {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate safe boundaries
    const maxX = containerRect.width - btnWidth - 20;
    const maxY = 400;
    
    // Try to move at least 120px away from cursor
    let newX, newY;
    let attempts = 0;
    const minDistance = 120;
    
    do {
        newX = Math.random() * Math.max(0, maxX);
        newY = Math.random() * maxY;
        attempts++;
    } while (attempts < 5 && event.clientX && 
             Math.abs((newX + containerRect.left) - event.clientX) < minDistance &&
             Math.abs((newY + containerRect.top) - event.clientY) < minDistance);
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Change text
    noBtn.textContent = noMessages[messageIndex];
    messageIndex = (messageIndex + 1) % noMessages.length;
}

function handleTouch(event) {
    if (event.cancelable) {
        event.preventDefault();
    }
    moveNoButton(event.touches ? event.touches[0] : event);
}

// Also move on mousedown attempt
document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('mousedown', function(e) {
            e.preventDefault();
            moveNoButton(e);
        });
        
        noBtn.addEventListener('touchend', function(e) {
            if (e.cancelable) {
                e.preventDefault();
            }
            handleTouch(e);
        });
    }
});

function handleYes() {
    // Show celebration
    const celebration = document.getElementById('celebration');
    celebration.classList.add('show');
    
    // Create floating hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 150);
    }
    
    // Create confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (2 + Math.random() * 2) + 's';
    document.getElementById('celebration').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random colors for confetti
    const colors = ['#ff6b9d', '#ffc1cc', '#667eea', '#764ba2', '#d63447', '#28a745', '#ffd700', '#ff69b4'];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random position and size
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = (Math.random() * 10 + 5) + 'px';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    
    document.getElementById('celebration').appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3500);
}

function showFallback() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('questionScreen').classList.remove('show');
    document.getElementById('fallback').classList.add('show');
}

function goHome() {
    window.location.href = window.location.origin + window.location.pathname;
}