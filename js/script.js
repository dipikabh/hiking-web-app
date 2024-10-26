// Load and display trail data
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
                <div class="trail-header">
                    <h2>${trail.name}</h2>
                    <span class="difficulty ${trail.difficulty.toLowerCase()}">${trail.difficulty}</span>
                </div>
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
        // Highlight the specific trail if it exists
        const trailElement = document.querySelector(`[data-trail-id="${trailId}"]`);
        if (trailElement) {
            trailElement.classList.add('highlighted');
        }
    }
}

// Check if current page is within scope and add visual indicator
function checkScope() {
    const currentPath = window.location.pathname;
    const isInScope = currentPath.startsWith('/trails/');
    document.body.setAttribute('data-scope', isInScope ? 'in' : 'out');

    // Add scope indicator for testing
    const scopeIndicator = document.createElement('div');
    scopeIndicator.className = 'scope-indicator';
    scopeIndicator.textContent = `Page ${isInScope ? 'is' : 'is not'} within scope`;
    document.body.insertBefore(scopeIndicator, document.body.firstChild);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTrails();
    checkScope();
    handleDeepLink();
    checkDisplayMode();
    updateDisplayMode();
});