// Initialize Team Performance Chart
const teamCtx = document.getElementById('teamPerformanceChart').getContext('2d');
const teamChart = new Chart(teamCtx, {
    type: 'bar',
    data: {
        labels: ['Frontend', 'Backend', 'Design'],
        datasets: [{
            label: 'Completed Tasks',
            data: [45, 38, 28],
            backgroundColor: '#27ae60'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// Initialize Member Performance Chart
const memberCtx = document.getElementById('memberPerformanceChart').getContext('2d');
const memberChart = new Chart(memberCtx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Top Performer',
            data: [12, 15, 18, 20],
            borderColor: '#2ecc71'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCharts(btn.dataset.timeframe);
    });
});

function updateCharts(timeframe) {
    // Simulate data update based on timeframe
    const newData = timeframe === 'weekly' 
        ? [45, 38, 28] 
        : [180, 155, 120];
    
    teamChart.data.datasets[0].data = newData;
    teamChart.update();
}

// Deep Dive Functionality
let currentView = 'team';
let currentSelection = null;

document.querySelector('.toggle-view-btn').addEventListener('click', () => {
    currentView = currentView === 'team' ? 'member' : 'team';
    document.querySelector('.toggle-view-btn').dataset.view = currentView;
    updateTaskHistoryView();
});

function updateTaskHistoryView() {
    const taskList = document.querySelector('.task-list-scroll');
    taskList.innerHTML = '';
    
    if (currentView === 'team') {
        // Show team-level data
        teams.forEach(team => {
            const item = document.createElement('div');
            item.className = 'task-item';
            item.innerHTML = `
                <span>${team.name}</span>
                <span>${team.completed}</span>
                <span>${team.avgTime}h</span>
                <span>${team.overdue}</span>
            `;
            item.addEventListener('click', () => drillDown(team));
            taskList.appendChild(item);
        });
    } else {
        // Show member-level data
        members.forEach(member => {
            const item = document.createElement('div');
            item.className = 'task-item';
            item.innerHTML = `
                <span>${member.name}</span>
                <span>${member.completed}</span>
                <span>${member.avgTime}h</span>
                <span>${member.overdue}</span>
            `;
            taskList.appendChild(item);
        });
    }
}

// Demo Data
const teams = [
    { name: 'Frontend', completed: 45, avgTime: 5.2, overdue: 3 },
    { name: 'Backend', completed: 38, avgTime: 6.1, overdue: 5 },
    { name: 'Design', completed: 28, avgTime: 4.8, overdue: 2 }
];

const members = [
    { name: 'Sarah C.', completed: 22, avgTime: 4.5, overdue: 1 },
    { name: 'Mike T.', completed: 18, avgTime: 5.1, overdue: 2 }
];

// Initial population
updateTaskHistoryView();

// Export Handler
document.querySelector('.export-btn').addEventListener('click', () => {
    alert('Export initiated - this would generate PDF/CSV report');
});