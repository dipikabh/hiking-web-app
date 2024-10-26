// Load trail data
async function loadTrails() {
    try {
        const response = await fetch('/data/trails.json');
        const data = await response.json();
        
        const trailList = document.getElementById('trailList');
        if (!trailList) return; // Only run on pages with trailList element

        // Clear existing cards
        trailList.innerHTML = '';

        data.trails.forEach(trail => {
            const card = document.createElement('div');
            card.className = 'trail-card';
            card.innerHTML = `
                <h2>${trail.name}</h2>
                <span class="difficulty">${trail.difficulty}</span>
                <div class="trail-stats">
                    <div class="stat">
                        <span class="icon">📏</span>
                        <span class="value">${trail.length}</span>
                    </div>
                    <div class="stat">
                        <span class="icon">⛰️</span>
                        <span class="value">${trail.elevation}</span>
                    </div>
                </div>
                <div class="trail-location">
                    <span class="icon">📍</span>
                    <span>${trail.location}</span>
                </div>
                <p class="trail-description">${trail.description}</p>
                <div class="trail-conditions">
                    <span class="icon">ℹ️</span>
                    <span>${trail.conditions}</span>
                </div>
                <a href="/trails/${trail.id}.html" class="view-trail">View Trail Details</a>
            `;
            trailList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading trails:', error);
    }
}

// Check display mode
function checkDisplayMode() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add('standalone-mode');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTrails();
    checkDisplayMode();
});

// Display mode detection and testing
function updateDisplayMode() {
    const displayModeElement = document.getElementById('displayMode');
    if (!displayModeElement) return;

    let currentMode = 'browser tab';
    if (window.matchMedia('(display-mode: standalone)').matches) {
        currentMode = 'standalone';
    } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        currentMode = 'minimal-ui';
    } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
        currentMode = 'fullscreen';
    }
    
    displayModeElement.textContent = `Current display mode: ${currentMode}`;
}

// Deep linking test
function handleDeepLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const trailId = urlParams.get('trail');
    
    if (trailId) {
        console.log(`Deep linked to trail: ${trailId}`);
        // You can add logic here to navigate to the specific trail
    }
}

// Update event listeners in the initialization
document.addEventListener('DOMContentLoaded', () => {
    loadTrails();
    checkDisplayMode();
    updateDisplayMode();
    handleDeepLink();
    
    // Listen for display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', updateDisplayMode);
});

// Modify loadTrails() in script.js to clear existing cards first
async function loadTrails() {
    try {
        const response = await fetch('/data/trails.json');
        const data = await response.json();
        
        const trailList = document.getElementById('trailList');
        if (!trailList) return;

        // Clear existing cards
        trailList.innerHTML = '';
        
        data.trails.forEach(trail => {
            // ... rest of the code
        });
    } catch (error) {
        console.error('Error loading trails:', error);
    }
}

// Check if current page is within scope
function checkScope() {
    const currentPath = window.location.pathname;
    const isInScope = currentPath.startsWith('/trails/');
    document.body.setAttribute('data-scope', isInScope ? 'in' : 'out');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTrails();
    checkScope();
});