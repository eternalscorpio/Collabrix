// Feedback Data & Functions
const feedbackData = [
    {
        id: 1,
        user: "Sarah Johnson",
        date: "2023-07-25",
        category: "process",
        text: "The deployment process needs better documentation for new team members",
        acknowledged: false
    },
    {
        id: 2,
        user: "Michael Chen",
        date: "2023-07-24",
        category: "team",
        text: "We need more cross-training between frontend and backend teams",
        acknowledged: true
    }
];

function renderFeedback() {
    const container = document.querySelector('.feedback-list');
    container.innerHTML = '';

    feedbackData.forEach(fb => {
        const item = document.createElement('div');
        item.className = `feedback-item ${fb.acknowledged ? 'acknowledged' : ''}`;
        item.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-user">${fb.user}</span>
                <span class="feedback-date">${fb.date}</span>
                <span class="feedback-category category-${fb.category}">
                    ${fb.category.charAt(0).toUpperCase() + fb.category.slice(1)}
                </span>
            </div>
            <p class="feedback-text">${fb.text}</p>
            <div class="feedback-actions">
                <button class="acknowledge-btn" data-id="${fb.id}">
                    ${fb.acknowledged ? '<i class="fas fa-check-circle"></i> Acknowledged' : 'Mark as Acknowledged'}
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Handle Acknowledgment
document.addEventListener('click', (e) => {
    if (e.target.closest('.acknowledge-btn')) {
        const btn = e.target.closest('.acknowledge-btn');
        const id = btn.dataset.id;
        const feedback = feedbackData.find(f => f.id == id);
        feedback.acknowledged = true;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Acknowledged';
        btn.disabled = true;
        btn.closest('.feedback-item').classList.add('acknowledged');
    }
});

// Recommendation System
const recommendations = [
    {
        id: 1,
        priority: 'high',
        text: "Response times have increased by 25% - recommend additional training sessions",
        assigned: false
    }
];

function renderRecommendations() {
    const container = document.querySelector('.suggestions-list');
    container.innerHTML = '';

    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div class="rec-meta">
                <span class="rec-priority ${rec.priority}">
                    ${rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                </span>
                <span class="rec-date">Generated ${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="rec-content">
                <p>${rec.text}</p>
                <div class="rec-actions">
                    <button class="assign-btn" data-id="${rec.id}">
                        <i class="fas fa-user-tag"></i> ${rec.assigned ? 'Assigned' : 'Assign to Lead'}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Handle Recommendation Assignment
document.addEventListener('click', (e) => {
    if (e.target.closest('.assign-btn')) {
        const btn = e.target.closest('.assign-btn');
        const id = btn.dataset.id;
        const recommendation = recommendations.find(r => r.id == id);

        if (!recommendation.assigned) {
            recommendation.assigned = true;
            btn.innerHTML = '<i class="fas fa-check"></i> Assigned';
            btn.disabled = true;

            // Show notification
            createNotification('assignment',
                `Recommendation sent to Team Leads: "${recommendation.text}"`);
        }
    }
});

// Initial Render
renderFeedback();
renderRecommendations();