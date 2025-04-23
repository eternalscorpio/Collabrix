document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
  
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeButton();
  
    function updateThemeButton() {
      const isDark = body.classList.contains('dark-mode');
      themeSwitcher.innerHTML = `<i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i> ${isDark ? 'Light' : 'Dark'} Mode`;
    }
  
    themeSwitcher.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
      updateThemeButton();
    });
  
    // Panel Navigation
    const panels = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.sidebar a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        // Switch panels
        panels.forEach(panel => panel.classList.remove('active'));
        target.classList.add('active');
        
        // Update active nav link
        navLinks.forEach(n => n.classList.remove('active'));
        link.classList.add('active');
      });
    });
  
    // Feedback System
    document.querySelectorAll('.acknowledge-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const feedbackItem = e.target.closest('.feedback-item');
        feedbackItem.classList.add('acknowledged');
        feedbackItem.querySelector('.acknowledge-btn').disabled = true;
        // Here you would typically send an API request
      });
    });
  
    // Export System (Dummy Implementation)
    document.querySelectorAll('.export-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Export functionality is placeholder - would generate report');
      });
    });
  
    // Chat System
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
  
    document.querySelector('.chat-input button').addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  
    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;
  
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.innerHTML = `
        <div class="message-header">
          <span class="sender">You</span>
          <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${message}</div>
      `;
      
      chatMessages.appendChild(messageElement);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Notification System (Simulated)
    const notificationList = document.querySelector('.notification-list');
    
    function createNotification(type, message) {
      const notification = document.createElement('div');
      notification.className = `notification-item ${type}`;
      notification.innerHTML = `
        <i class="fas ${type === 'alert' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span class="message">${message}</span>
      `;
      notificationList.prepend(notification);
    }
  
    // Simulate periodic notifications
    setInterval(() => {
      if (Math.random() > 0.7) {
        createNotification('info', 'System update: New metrics available');
      }
    }, 15000);
  
    // Demo Data Initialization
    initializeDemoData();
  
    function initializeDemoData() {
      // Sample feedback
      const feedbacks = [
        { user: 'Sarah Connor', text: 'Need more support with deployment tasks', date: '2023-07-21' },
        { user: 'John Smith', text: 'Process improvements needed in QA stage', date: '2023-07-20' }
      ];
  
      const feedbackContainer = document.querySelector('.feedback-container');
      feedbacks.forEach(feedback => {
        const item = document.createElement('div');
        item.className = 'feedback-item';
        item.innerHTML = `
          <div class="feedback-meta">
            <span class="sender">${feedback.user}</span>
            <span class="date">${feedback.date}</span>
          </div>
          <p class="feedback-content">${feedback.text}</p>
          <div class="feedback-actions">
            <button class="acknowledge-btn"><i class="fas fa-check"></i> Acknowledge</button>
          </div>
        `;
        feedbackContainer.appendChild(item);
      });
  
      // Sample recommendations
      const recommendations = [
        'Team Frontend is at 120% capacity - suggest task redistribution',
        'UX team response time increased by 30% - recommend process review'
      ];
  
      const recList = document.querySelector('.suggestions-list');
      recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
      });
    }
  
    // Performance Charts (Dummy Implementation)
    // In real implementation, integrate with Chart.js or similar
    document.querySelectorAll('.chart-placeholder').forEach(chart => {
      chart.innerHTML = '<span>Chart placeholder - integrate visualization library</span>';
    });
  });

  