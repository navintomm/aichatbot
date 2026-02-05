// ===========================
// STATE MANAGEMENT
// ===========================
const state = {
    selectedSymptoms: new Set(),
    selectedDuration: null,
    severityLevel: 7,
    additionalInfo: ''
};

// ===========================
// DOM ELEMENTS
// ===========================
const elements = {
    searchInput: document.getElementById('symptom-search'),
    dropdown: document.getElementById('symptom-dropdown'),
    symptomOptions: document.querySelectorAll('.symptom-option'),
    chipsContainer: document.getElementById('selected-chips'),
    durationButtons: document.querySelectorAll('.duration-btn'),
    severitySlider: document.getElementById('severity-slider'),
    severityValue: document.getElementById('severity-value'),
    additionalInfo: document.getElementById('additional-info'),
    analyzeBtn: document.getElementById('analyze-btn')
};

// ===========================
// CUSTOM DROPDOWN
// ===========================
function initializeCustomDropdown() {
    // Show dropdown on search input click/focus
    elements.searchInput.addEventListener('click', () => {
        elements.dropdown.classList.add('active');
    });

    elements.searchInput.addEventListener('focus', () => {
        elements.dropdown.classList.add('active');
    });

    // Filter symptoms based on search input
    elements.searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterSymptoms(searchTerm);
        elements.dropdown.classList.add('active');
    });

    // Handle symptom option clicks
    elements.symptomOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const symptom = option.dataset.symptom;
            toggleSymptom(symptom, option);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            elements.dropdown.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    elements.dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Quick Select Listeners
    const quickSymptoms = document.querySelectorAll('.quick-symptom');
    quickSymptoms.forEach(card => {
        card.addEventListener('click', () => {
            const symptom = card.dataset.symptom;
            // Toggle visual state of card
            if (state.selectedSymptoms.has(symptom)) {
                state.selectedSymptoms.delete(symptom);
                card.classList.remove('selected');
            } else {
                state.selectedSymptoms.add(symptom);
                card.classList.add('selected');
            }
            // Sync with dropdown options if visible/rendered
            const dropOption = document.querySelector(`.symptom-option[data-symptom="${symptom}"]`);
            if (dropOption) {
                if (state.selectedSymptoms.has(symptom)) dropOption.classList.add('selected');
                else dropOption.classList.remove('selected');
            }
            updateChips();
        });
    });
}

function filterSymptoms(searchTerm) {
    const categories = document.querySelectorAll('.dropdown-category');

    categories.forEach(category => {
        const options = category.querySelectorAll('.symptom-option');
        let hasVisibleOptions = false;

        options.forEach(option => {
            const symptomText = option.dataset.symptom.toLowerCase();
            const isMatch = symptomText.includes(searchTerm);

            option.style.display = isMatch ? 'flex' : 'none';
            if (isMatch) hasVisibleOptions = true;
        });

        // Hide category if no visible options
        category.style.display = hasVisibleOptions ? 'block' : 'none';
    });
}

function toggleSymptom(symptom, optionElement) {
    if (state.selectedSymptoms.has(symptom)) {
        state.selectedSymptoms.delete(symptom);
        optionElement.classList.remove('selected');
    } else {
        state.selectedSymptoms.add(symptom);
        optionElement.classList.add('selected');
    }
    updateChips();
}

// ===========================
// CHIPS MANAGEMENT
// ===========================
function updateChips() {
    elements.chipsContainer.innerHTML = '';

    state.selectedSymptoms.forEach(symptom => {
        const chip = createChip(symptom);
        elements.chipsContainer.appendChild(chip);
    });
}

function createChip(symptom) {
    const chip = document.createElement('div');
    chip.className = 'chip';

    const text = document.createElement('span');
    text.textContent = symptom;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'chip-remove';
    removeBtn.innerHTML = '×';
    removeBtn.setAttribute('aria-label', `Remove ${symptom}`);
    removeBtn.addEventListener('click', () => {
        removeSymptomFromChip(symptom);
    });

    chip.appendChild(text);
    chip.appendChild(removeBtn);

    return chip;
}

function removeSymptomFromChip(symptom) {
    // Remove from state
    state.selectedSymptoms.delete(symptom);

    // Update option visual state
    elements.symptomOptions.forEach(option => {
        if (option.dataset.symptom === symptom) {
            option.classList.remove('selected');
        }
    });

    // Update Quick Select visual state
    const quickCard = document.querySelector(`.quick-symptom[data-symptom="${symptom}"]`);
    if (quickCard) {
        quickCard.classList.remove('selected');
    }


    // Update chips
    updateChips();
}

// ===========================
// DURATION SELECTION
// ===========================
function initializeDurationButtons() {
    elements.durationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            elements.durationButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Update state
            state.selectedDuration = button.dataset.duration;
        });
    });
}

// ===========================
// SEVERITY SLIDER
// ===========================
function initializeSeveritySlider() {
    elements.severitySlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        state.severityLevel = value;
        elements.severityValue.textContent = value;

        // Update slider thumb color based on severity
        updateSliderColor(value);
    });
}

function updateSliderColor(value) {
    let color;

    if (value <= 3) {
        color = getComputedStyle(document.documentElement).getPropertyValue('--success-green');
    } else if (value <= 7) {
        color = getComputedStyle(document.documentElement).getPropertyValue('--warning-orange');
    } else {
        color = getComputedStyle(document.documentElement).getPropertyValue('--danger-red');
    }

    elements.severityValue.style.color = color;

    // Update slider track background dynamic gradient
    const percent = (value / 10) * 100;
    elements.severitySlider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
}

// ===========================
// FORM SUBMISSION
// ===========================
function initializeFormSubmission() {
    elements.analyzeBtn.addEventListener('click', () => {
        // Get additional info
        state.additionalInfo = elements.additionalInfo.value.trim();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Animate button
        animateSubmitButton();

        // Process form (in a real app, this would send data to backend)
        setTimeout(() => {
            displayResults();
        }, 1500);
    });
}

function validateForm() {
    if (state.selectedSymptoms.size === 0) {
        showNotification('Please select at least one symptom', 'warning');
        return false;
    }

    if (!state.selectedDuration) {
        showNotification('Please select symptom duration', 'warning');
        return false;
    }

    return true;
}

function animateSubmitButton() {
    const originalText = elements.analyzeBtn.innerHTML;
    elements.analyzeBtn.innerHTML = `
        <svg class="btn-icon spinning" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Analyzing...
    `;
    elements.analyzeBtn.disabled = true;

    // Add spinning animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .spinning { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        elements.analyzeBtn.innerHTML = originalText;
        elements.analyzeBtn.disabled = false;
        document.head.removeChild(style);
    }, 1500);
}

function displayResults() {
    const resultsData = {
        symptoms: Array.from(state.selectedSymptoms),
        duration: state.selectedDuration,
        severity: state.severityLevel,
        additionalInfo: state.additionalInfo
    };

    console.log('Sending to backend:', resultsData);

    // Send to backend API
    fetch('/api/diagnose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultsData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Diagnosis results:', data);

            if (data.success) {
                // Store results in sessionStorage
                sessionStorage.setItem('diagnosisResults', JSON.stringify(data));

                // Redirect to results page
                window.location.href = 'results.html';
            } else {
                showNotification('Error: ' + (data.error || 'Unable to complete diagnosis'), 'warning');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Unable to connect to diagnosis server. Please ensure the backend is running.', 'warning');
        });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }
        .notification-success {
            border-left: 4px solid var(--success-green);
            color: var(--success-green);
        }
        .notification-warning {
            border-left: 4px solid var(--warning-orange);
            color: var(--warning-orange);
        }
        .notification-info {
            border-left: 4px solid var(--primary-blue);
            color: var(--primary-blue);
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// INITIALIZATION
// ===========================
function init() {
    initializeCustomDropdown();
    initializeDurationButtons();
    initializeSeveritySlider();
    initializeFormSubmission();

    // Set initial slider color
    updateSliderColor(state.severityLevel);

    console.log('Healthcare Chatbot initialized successfully!');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
