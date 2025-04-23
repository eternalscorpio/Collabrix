document.addEventListener('DOMContentLoaded', () => {
    // Initialize Productivity Chart
    const completionCtx = document.getElementById('completionRateChart').getContext('2d');
    new Chart(completionCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Task Completion Rate',
                data: [65, 72, 78, 81], // Example data
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Weekly Task Completion Rate'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Generate Team Health Data
    const teamMembers = [
        { name: 'Sarah C.', load: 85, status: 'over' },
        { name: 'Mike T.', load: 65, status: 'safe' },
        { name: 'Emma R.', load: 92, status: 'over' },
        { name: 'John P.', load: 78, status: 'warn' }
    ];

    const teamGrid = document.querySelector('.team-health-grid');
    teamMembers.forEach(member => {
        const memberEl = document.createElement('div');
        memberEl.className = 'member-load';
        memberEl.innerHTML = `
            <div class="member-name">${member.name}</div>
            <div class="load-bar">
                <div class="load-fill ${member.status}" style="width: ${member.load}%"></div>
            </div>
            <div class="load-percent">${member.load}%</div>
            ${member.status === 'over' ? '<i class="fas fa-exclamation-triangle warning"></i>' : ''}
        `;
        teamGrid.appendChild(memberEl);
    });

    // Populate Feedback
    const feedbackData = [
        { user: 'Mike Chen', text: 'Need better deployment docs', category: 'process', date: 'Today' },
        { user: 'Lisa Park', text: 'Too many context switches', category: 'workflow', date: '2d ago' }
    ];

    const feedbackFeed = document.querySelector('.feedback-feed');
    feedbackData.forEach(fb => {
        const item = document.createElement('div');
        item.className = 'feedback-item';
        item.innerHTML = `
            <div class="feedback-header">
                <span class="user">${fb.user}</span>
                <span class="date">${fb.date}</span>
            </div>
            <p class="excerpt">${fb.text}</p>
            <div class="feedback-tag ${fb.category}">${fb.category}</div>
        `;
        feedbackFeed.appendChild(item);
    });

    // Theme Toggle
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeSwitcher.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeSwitcher.textContent = ' Light Mode';
            themeSwitcher.prepend(icon);
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeSwitcher.textContent = ' Dark Mode';
            themeSwitcher.prepend(icon);
        }
    });
});