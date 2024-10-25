// Load trail data
async function loadTrails() {
    try {
        const response = await fetch('/data/trails.json');
        const data = await response.json();
        
        const trailList = document.getElementById('trailList');
        if (!trailList) return; // Only run on pages with trailList element

        data.trails.forEach(trail => {
            const card = document.createElement('div');
            card.className = 'trail-card';
            card.innerHTML = `
                <h2>${trail.name}</h2>
                <span class="difficulty">${trail.difficulty}</span>
                <div class="details">
                    <p>Length: ${trail.length}</p>
                    <p>Elevation: ${trail.elevation}</p>
                    <p>Location: ${trail.location}</p>
                </div>
                <a href="/trails/${trail.id}.html">View Details</a>
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