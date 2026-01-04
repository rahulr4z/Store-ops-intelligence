// Page Navigation
function showLanding() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('landing-page').classList.add('active');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    initializeCharts(pageId);
    animateMetrics();
}

// Role Selection - will be set up in DOMContentLoaded

// Platform Explanation and Publishing Process Toggles - will be set up in DOMContentLoaded

// API Health Toggle (Business Leader)
const apiHealthToggle = document.getElementById('api-health-toggle');
const apiHealthContent = document.getElementById('api-health-content');

if (apiHealthToggle) {
    apiHealthToggle.addEventListener('click', function() {
        const isCollapsed = apiHealthContent.classList.contains('collapsed');
        if (isCollapsed) {
            apiHealthContent.classList.remove('collapsed');
            this.classList.remove('collapsed');
            // Initialize charts when expanded
            setTimeout(() => {
                initializeAPITrendChart('api-trend-1');
                initializeAPITrendChart('api-trend-2');
                initializeAPITrendChart('api-trend-3');
            }, 100);
        } else {
            apiHealthContent.classList.add('collapsed');
            this.classList.add('collapsed');
        }
    });
}

// Detailed Summary Toggle (Business Leader)
function toggleDetailedSummary(suffix = '') {
    const detailedSummaryContent = document.getElementById(`detailed-summary-content${suffix}`);
    const widget = detailedSummaryContent?.closest('.agent-submissions-widget');
    const button = widget?.querySelector('.btn-detailed-summary');
    
    if (detailedSummaryContent) {
        const isCollapsed = detailedSummaryContent.classList.contains('collapsed');
        if (isCollapsed) {
            detailedSummaryContent.classList.remove('collapsed');
            if (button) {
                button.textContent = 'Hide Detailed Summary';
            }
            // Animate metrics when expanded
            setTimeout(() => {
                animateDetailedMetrics(suffix);
                // Initialize flow-volume trend chart
                initializeFlowVolumeTrendChart(suffix);
                // Initialize latency trend chart
                initializeLatencyTrendChart(suffix);
                // Initialize rejection average trend chart
                initializeRejectionAverageTrendChart(suffix);
            }, 100);
        } else {
            detailedSummaryContent.classList.add('collapsed');
            if (button) {
                button.textContent = 'Detailed Summary';
            }
        }
    }
}

// Navigate to Rejection Reasons Dashboard
function navigateToRejectionReasons(suffix = '') {
    // Find the rejection reasons widget in the current page
    const pageId = suffix === '-eng' ? 'engineering-page' : suffix === '-prod' ? 'product-page' : 'business-leader-page';
    const page = document.getElementById(pageId);
    if (page) {
        const rejectionWidget = page.querySelector('.rejection-reasons-widget');
        if (rejectionWidget) {
            // Scroll to the widget with smooth behavior
            rejectionWidget.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add a highlight effect
            rejectionWidget.style.transition = 'box-shadow 0.3s ease';
            rejectionWidget.style.boxShadow = '0 0 0 4px rgba(14, 165, 233, 0.3)';
            setTimeout(() => {
                rejectionWidget.style.boxShadow = '';
            }, 2000);
        }
    }
}

// Ecosystem Trend Data
const ecosystemTrendData = {
    submission: [
        { cohort: 'Startups (<10 Developers)', week1: '45', week2: { value: '48', change: '+6.7%', type: 'positive' }, week3: { value: '52', change: '+8.3%', type: 'positive' }, week4: { value: '55', change: '+5.8%', type: 'positive' }, health: { text: 'Uptrend +22.2%', type: 'uptrend' } },
        { cohort: 'Mid-sized startups (10 to 50 developers)', week1: '120', week2: { value: '128', change: '+6.7%', type: 'positive' }, week3: { value: '135', change: '+5.5%', type: 'positive' }, week4: { value: '142', change: '+5.2%', type: 'positive' }, health: { text: 'Uptrend +18.3%', type: 'uptrend' } },
        { cohort: 'Established startups (50 to 100 developers)', week1: '280', week2: { value: '295', change: '+5.4%', type: 'positive' }, week3: { value: '310', change: '+5.1%', type: 'positive' }, week4: { value: '325', change: '+4.8%', type: 'positive' }, health: { text: 'Uptrend +16.1%', type: 'uptrend' } },
        { cohort: 'MNC (>100 developers)', week1: '450', week2: { value: '465', change: '+3.3%', type: 'positive' }, week3: { value: '478', change: '+2.8%', type: 'positive' }, week4: { value: '490', change: '+2.5%', type: 'positive' }, health: { text: 'Uptrend +8.9%', type: 'uptrend' } }
    ],
    rejection: [
        { cohort: 'Startups (<10 Developers)', week1: '3', week2: { value: '3', change: '0%', type: 'neutral' }, week3: { value: '4', change: '+33.3%', type: 'negative' }, week4: { value: '4', change: '0%', type: 'neutral' }, health: { text: 'Downtrend +33.3%', type: 'downtrend' } },
        { cohort: 'Mid-sized startups (10 to 50 developers)', week1: '8', week2: { value: '9', change: '+12.5%', type: 'negative' }, week3: { value: '10', change: '+11.1%', type: 'negative' }, week4: { value: '10', change: '0%', type: 'neutral' }, health: { text: 'Downtrend +25.0%', type: 'downtrend' } },
        { cohort: 'Established startups (50 to 100 developers)', week1: '18', week2: { value: '19', change: '+5.6%', type: 'negative' }, week3: { value: '20', change: '+5.3%', type: 'negative' }, week4: { value: '20', change: '0%', type: 'neutral' }, health: { text: 'Downtrend +11.1%', type: 'downtrend' } },
        { cohort: 'MNC (>100 developers)', week1: '28', week2: { value: '29', change: '+3.6%', type: 'negative' }, week3: { value: '30', change: '+3.4%', type: 'negative' }, week4: { value: '30', change: '0%', type: 'neutral' }, health: { text: 'Downtrend +7.1%', type: 'downtrend' } }
    ],
    approval: [
        { cohort: 'Startups (<10 Developers)', week1: '40', week2: { value: '43', change: '+7.5%', type: 'positive' }, week3: { value: '46', change: '+7.0%', type: 'positive' }, week4: { value: '49', change: '+6.5%', type: 'positive' }, health: { text: 'Uptrend +22.5%', type: 'uptrend' } },
        { cohort: 'Mid-sized startups (10 to 50 developers)', week1: '108', week2: { value: '115', change: '+6.5%', type: 'positive' }, week3: { value: '121', change: '+5.2%', type: 'positive' }, week4: { value: '128', change: '+5.8%', type: 'positive' }, health: { text: 'Uptrend +18.5%', type: 'uptrend' } },
        { cohort: 'Established startups (50 to 100 developers)', week1: '255', week2: { value: '268', change: '+5.1%', type: 'positive' }, week3: { value: '282', change: '+5.2%', type: 'positive' }, week4: { value: '297', change: '+5.3%', type: 'positive' }, health: { text: 'Uptrend +16.5%', type: 'uptrend' } },
        { cohort: 'MNC (>100 developers)', week1: '410', week2: { value: '424', change: '+3.4%', type: 'positive' }, week3: { value: '436', change: '+2.8%', type: 'positive' }, week4: { value: '448', change: '+2.8%', type: 'positive' }, health: { text: 'Uptrend +9.3%', type: 'uptrend' } }
    ],
    latency: [
        { cohort: 'Startups (<10 Developers)', week1: '2.5', week2: { value: '2.4', change: '-4.0%', type: 'positive' }, week3: { value: '2.3', change: '-4.2%', type: 'positive' }, week4: { value: '2.2', change: '-4.3%', type: 'positive' }, health: { text: 'Uptrend -12.0%', type: 'uptrend' } },
        { cohort: 'Mid-sized startups (10 to 50 developers)', week1: '2.3', week2: { value: '2.2', change: '-4.3%', type: 'positive' }, week3: { value: '2.1', change: '-4.5%', type: 'positive' }, week4: { value: '2.0', change: '-4.8%', type: 'positive' }, health: { text: 'Uptrend -13.0%', type: 'uptrend' } },
        { cohort: 'Established startups (50 to 100 developers)', week1: '2.1', week2: { value: '2.0', change: '-4.8%', type: 'positive' }, week3: { value: '1.9', change: '-5.0%', type: 'positive' }, week4: { value: '1.8', change: '-5.3%', type: 'positive' }, health: { text: 'Uptrend -14.3%', type: 'uptrend' } },
        { cohort: 'MNC (>100 developers)', week1: '1.9', week2: { value: '1.8', change: '-5.3%', type: 'positive' }, week3: { value: '1.7', change: '-5.6%', type: 'positive' }, week4: { value: '1.6', change: '-5.9%', type: 'positive' }, health: { text: 'Uptrend -15.8%', type: 'uptrend' } }
    ],
    escalation: [
        { cohort: 'Startups (<10 Developers)', week1: '2', week2: { value: '2', change: '0%', type: 'neutral' }, week3: { value: '3', change: '+50.0%', type: 'negative' }, week4: { value: '3', change: '0%', type: 'neutral' }, health: { text: 'Downtrend +50.0%', type: 'downtrend' } },
        { cohort: 'Mid-sized startups (10 to 50 developers)', week1: '5', week2: { value: '6', change: '+20.0%', type: 'negative' }, week3: { value: '6', change: '0%', type: 'neutral' }, week4: { value: '7', change: '+16.7%', type: 'negative' }, health: { text: 'Downtrend +40.0%', type: 'downtrend' } },
        { cohort: 'Established startups (50 to 100 developers)', week1: '8', week2: { value: '9', change: '+12.5%', type: 'negative' }, week3: { value: '9', change: '0%', type: 'neutral' }, week4: { value: '10', change: '+11.1%', type: 'negative' }, health: { text: 'Downtrend +25.0%', type: 'downtrend' } },
        { cohort: 'MNC (>100 developers)', week1: '12', week2: { value: '13', change: '+8.3%', type: 'negative' }, week3: { value: '13', change: '0%', type: 'neutral' }, week4: { value: '14', change: '+7.7%', type: 'negative' }, health: { text: 'Downtrend +16.7%', type: 'downtrend' } }
    ]
};

// Switch Ecosystem Trend
function switchEcosystemTrend(trend, suffix = '') {
    const table = document.getElementById(`ecosystem-trend-table${suffix}`);
    if (!table) return;
    const tbody = table.querySelector('tbody');
    const widget = table.closest('.detailed-summary-content');
    const buttons = widget ? widget.querySelectorAll('.ecosystem-trend-btn') : [];
    
    if (!tbody || !ecosystemTrendData[trend]) return;
    
    // Update active button
    buttons.forEach(btn => {
        if (btn.dataset.trend === trend) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Clear and rebuild table body
    tbody.innerHTML = '';
    
    ecosystemTrendData[trend].forEach(row => {
        const tr = document.createElement('tr');
        
        // Cohort label
        const cohortCell = document.createElement('td');
        cohortCell.className = 'ecosystem-cohort-label';
        cohortCell.textContent = row.cohort;
        tr.appendChild(cohortCell);
        
        // Week 1 (absolute value only)
        const week1Cell = document.createElement('td');
        week1Cell.textContent = row.week1;
        tr.appendChild(week1Cell);
        
        // Week 2 (value + change)
        const week2Cell = document.createElement('td');
        week2Cell.innerHTML = `
            <span class="ecosystem-value">${row.week2.value}</span>
            <span class="ecosystem-change ${row.week2.type}">${row.week2.change}</span>
        `;
        tr.appendChild(week2Cell);
        
        // Week 3 (value + change)
        const week3Cell = document.createElement('td');
        week3Cell.innerHTML = `
            <span class="ecosystem-value">${row.week3.value}</span>
            <span class="ecosystem-change ${row.week3.type}">${row.week3.change}</span>
        `;
        tr.appendChild(week3Cell);
        
        // Week 4 (value + change)
        const week4Cell = document.createElement('td');
        week4Cell.innerHTML = `
            <span class="ecosystem-value">${row.week4.value}</span>
            <span class="ecosystem-change ${row.week4.type}">${row.week4.change}</span>
        `;
        tr.appendChild(week4Cell);
        
        // Health
        const healthCell = document.createElement('td');
        healthCell.innerHTML = `<span class="ecosystem-health ${row.health.type}">${row.health.text}</span>`;
        tr.appendChild(healthCell);
        
        tbody.appendChild(tr);
    });
}

// Update Flow and Volume Metrics based on filters
function updateFlowVolumeMetrics(suffix = '') {
    const creatorFilter = document.getElementById(`flow-volume-creator-filter${suffix}`)?.value || 'all';
    const weekFilter = document.getElementById(`flow-volume-week-filter${suffix}`)?.value || '1w';
    
    const detailedSummaryContent = document.getElementById(`detailed-summary-content${suffix}`);
    if (!detailedSummaryContent) return;
    
    // Generate randomized data based on filters
    const baseMultiplier = creatorFilter === 'microsoft' ? 1.2 : creatorFilter === 'third-party' ? 0.8 : 1.0;
    const weekMultiplier = weekFilter === '1w' ? 1.0 : weekFilter === '2w' ? 1.9 : weekFilter === '1m' ? 4.2 : 12.5;
    
    // Update New Submissions metrics
    const newSubmissionsApprovals = Math.round(785 * baseMultiplier * weekMultiplier);
    const newSubmissionsRejections = Math.round(40 * baseMultiplier * weekMultiplier);
    const newSubmissionsData = {
        agentSubmissions: Math.round(892 * baseMultiplier * weekMultiplier),
        pendingReview: Math.round(67 * baseMultiplier * weekMultiplier),
        approvals: newSubmissionsApprovals,
        rejections: newSubmissionsRejections,
        approvalRejectionRatio: newSubmissionsRejections > 0 ? (newSubmissionsApprovals / newSubmissionsRejections).toFixed(1) : '0'
    };
    
    // Update Updates metrics
    const updatesApprovals = Math.round(304 * baseMultiplier * weekMultiplier);
    const updatesRejections = Math.round(29 * baseMultiplier * weekMultiplier);
    const updatesData = {
        agentSubmissions: Math.round(355 * baseMultiplier * weekMultiplier),
        pendingReview: Math.round(22 * baseMultiplier * weekMultiplier),
        approvals: updatesApprovals,
        rejections: updatesRejections,
        approvalRejectionRatio: updatesRejections > 0 ? (updatesApprovals / updatesRejections).toFixed(1) : '0'
    };
    
    // Update New Submissions values
    const newSubmissionsContainer = detailedSummaryContent.querySelector('.flow-volume-category:first-child');
    if (newSubmissionsContainer) {
        const metrics = newSubmissionsContainer.querySelectorAll('.flow-volume-metric-value[data-value]');
        if (metrics[0]) {
            metrics[0].dataset.value = newSubmissionsData.agentSubmissions;
            metrics[0].textContent = newSubmissionsData.agentSubmissions;
        }
        if (metrics[1]) {
            metrics[1].dataset.value = newSubmissionsData.pendingReview;
            metrics[1].textContent = newSubmissionsData.pendingReview;
        }
        if (metrics[2]) {
            metrics[2].dataset.value = newSubmissionsData.approvals;
            metrics[2].textContent = newSubmissionsData.approvals;
        }
        if (metrics[3]) {
            metrics[3].dataset.value = newSubmissionsData.rejections;
            metrics[3].textContent = newSubmissionsData.rejections;
        }
        if (metrics[4]) {
            metrics[4].dataset.value = newSubmissionsData.approvalRejectionRatio;
            metrics[4].textContent = newSubmissionsData.approvalRejectionRatio;
        }
    }
    
    // Update Updates values
    const updatesContainer = detailedSummaryContent.querySelector('.flow-volume-category:last-child');
    if (updatesContainer) {
        const metrics = updatesContainer.querySelectorAll('.flow-volume-metric-value[data-value]');
        if (metrics[0]) {
            metrics[0].dataset.value = updatesData.agentSubmissions;
            metrics[0].textContent = updatesData.agentSubmissions;
        }
        if (metrics[1]) {
            metrics[1].dataset.value = updatesData.pendingReview;
            metrics[1].textContent = updatesData.pendingReview;
        }
        if (metrics[2]) {
            metrics[2].dataset.value = updatesData.approvals;
            metrics[2].textContent = updatesData.approvals;
        }
        if (metrics[3]) {
            metrics[3].dataset.value = updatesData.rejections;
            metrics[3].textContent = updatesData.rejections;
        }
        if (metrics[4]) {
            metrics[4].dataset.value = updatesData.approvalRejectionRatio;
            metrics[4].textContent = updatesData.approvalRejectionRatio;
        }
    }
    
    // Update chart
    const chartKey = `flowVolumeTrendChart${suffix}`;
    if (window[chartKey]) {
        updateFlowVolumeChart(creatorFilter, weekFilter, suffix);
    }
}

// Update Flow Volume Chart based on filters
function updateFlowVolumeChart(creatorFilter, weekFilter, suffix = '') {
    const chartKey = `flowVolumeTrendChart${suffix}`;
    if (!window[chartKey]) return;
    
    const baseMultiplier = creatorFilter === 'microsoft' ? 1.2 : creatorFilter === 'third-party' ? 0.8 : 1.0;
    // For time ranges, we'll show the last N weeks of data
    const weekCount = weekFilter === '1w' ? 1 : weekFilter === '2w' ? 2 : weekFilter === '1m' ? 4 : 12;
    
    // Generate labels based on time range
    const labels = [];
    for (let i = weekCount; i > 0; i--) {
        labels.push(`Week ${i}`);
    }
    labels.reverse();
    
    // Generate data based on filter - take last N weeks
    const allWeeks = 8;
    const startIndex = Math.max(0, allWeeks - weekCount);
    const baseDataNew = [820, 850, 870, 860, 880, 875, 890, 892];
    const baseDataUpdates = [310, 325, 340, 335, 345, 350, 352, 355];
    const basePendingNew = [70, 68, 69, 67, 66, 67, 67, 67];
    const basePendingUpdates = [25, 24, 23, 22, 22, 22, 22, 22];
    const baseApprovalsNew = [720, 750, 770, 765, 780, 775, 785, 785];
    const baseApprovalsUpdates = [280, 295, 305, 300, 302, 304, 304, 304];
    const baseRejectionsNew = [30, 32, 31, 28, 34, 33, 38, 40];
    const baseRejectionsUpdates = [5, 6, 12, 13, 21, 24, 24, 29];
    const baseRatioNew = [24.0, 23.4, 24.8, 27.3, 22.9, 23.5, 20.7, 19.6];
    const baseRatioUpdates = [56.0, 49.2, 25.4, 23.1, 14.4, 12.7, 12.7, 10.5];
    
    const agentSubmissionsNew = baseDataNew.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const agentSubmissionsUpdates = baseDataUpdates.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const pendingReviewNew = basePendingNew.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const pendingReviewUpdates = basePendingUpdates.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const approvalsNew = baseApprovalsNew.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const approvalsUpdates = baseApprovalsUpdates.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const rejectionsNew = baseRejectionsNew.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const rejectionsUpdates = baseRejectionsUpdates.slice(startIndex).map(v => Math.round(v * baseMultiplier));
    const approvalRejectionRatioNew = baseRatioNew.slice(startIndex);
    const approvalRejectionRatioUpdates = baseRatioUpdates.slice(startIndex);
    
    // Update chart data
    if (window[chartKey]) {
        window[chartKey].data.labels = labels;
        window[chartKey].data.datasets[0].data = agentSubmissionsNew;
        window[chartKey].data.datasets[1].data = agentSubmissionsUpdates;
        window[chartKey].data.datasets[2].data = pendingReviewNew;
        window[chartKey].data.datasets[3].data = pendingReviewUpdates;
        window[chartKey].data.datasets[4].data = approvalsNew;
        window[chartKey].data.datasets[5].data = approvalsUpdates;
        window[chartKey].data.datasets[6].data = rejectionsNew;
        window[chartKey].data.datasets[7].data = rejectionsUpdates;
        window[chartKey].data.datasets[8].data = approvalRejectionRatioNew;
        window[chartKey].data.datasets[9].data = approvalRejectionRatioUpdates;
        
        window[chartKey].update();
    }
}

// Update Latency Metrics based on filters
function updateLatencyMetrics(suffix = '') {
    const creatorFilter = document.getElementById(`latency-creator-filter${suffix}`)?.value || 'all';
    const weekFilter = document.getElementById(`latency-week-filter${suffix}`)?.value || '1w';
    
    const detailedSummaryContent = document.getElementById(`detailed-summary-content${suffix}`);
    if (!detailedSummaryContent) return;
    
    // Generate randomized data based on filters
    const baseMultiplier = creatorFilter === 'microsoft' ? 0.95 : creatorFilter === 'third-party' ? 1.05 : 1.0;
    const weekMultiplier = weekFilter === '1w' ? 1.0 : weekFilter === '2w' ? 1.05 : weekFilter === '1m' ? 1.1 : 1.15;
    
    const latencyData = {
        submissionToApproval: (2.3 * baseMultiplier * weekMultiplier).toFixed(1),
        timePerStep: (0.4 * baseMultiplier * weekMultiplier).toFixed(1),
        updateReviewTime: (1.8 * baseMultiplier * weekMultiplier).toFixed(1)
    };
    
    // Update metric values - find latency section (2nd detailed-section)
    const latencySection = detailedSummaryContent.querySelectorAll('.detailed-section')[1];
    if (latencySection) {
        const metrics = latencySection.querySelectorAll('.detailed-metric-value[data-value]');
        if (metrics[0]) {
            metrics[0].dataset.value = latencyData.submissionToApproval;
            metrics[0].textContent = latencyData.submissionToApproval;
        }
        if (metrics[1]) {
            metrics[1].dataset.value = latencyData.timePerStep;
            metrics[1].textContent = latencyData.timePerStep;
        }
        if (metrics[2]) {
            metrics[2].dataset.value = latencyData.updateReviewTime;
            metrics[2].textContent = latencyData.updateReviewTime;
        }
    }
    
    // Update chart
    const chartKey = `latencyTrendChart${suffix}`;
    if (window[chartKey]) {
        updateLatencyChart(creatorFilter, weekFilter, suffix);
    }
}

// Update Latency Chart based on filters
function updateLatencyChart(creatorFilter, weekFilter, suffix = '') {
    const chartKey = `latencyTrendChart${suffix}`;
    if (!window[chartKey]) return;
    
    const baseMultiplier = creatorFilter === 'microsoft' ? 0.95 : creatorFilter === 'third-party' ? 1.05 : 1.0;
    const weekCount = weekFilter === '1w' ? 1 : weekFilter === '2w' ? 2 : weekFilter === '1m' ? 4 : 12;
    
    // Generate labels based on time range
    const labels = [];
    for (let i = weekCount; i > 0; i--) {
        labels.push(`Week ${i}`);
    }
    labels.reverse();
    
    // Take last N weeks of data
    const allWeeks = 8;
    const startIndex = Math.max(0, allWeeks - weekCount);
    const baseSubmissionToApproval = [2.8, 2.6, 2.5, 2.4, 2.3, 2.3, 2.3, 2.3];
    const baseTimePerStep = [0.5, 0.45, 0.42, 0.41, 0.4, 0.4, 0.4, 0.4];
    const baseUpdateReviewTime = [2.2, 2.0, 1.9, 1.85, 1.8, 1.8, 1.8, 1.8];
    
    const submissionToApprovalData = baseSubmissionToApproval.slice(startIndex).map(v => parseFloat((v * baseMultiplier).toFixed(1)));
    const timePerStepData = baseTimePerStep.slice(startIndex).map(v => parseFloat((v * baseMultiplier).toFixed(1)));
    const updateReviewTimeData = baseUpdateReviewTime.slice(startIndex).map(v => parseFloat((v * baseMultiplier).toFixed(1)));
    
    window[chartKey].data.labels = labels;
    window[chartKey].data.datasets[0].data = submissionToApprovalData;
    window[chartKey].data.datasets[1].data = timePerStepData;
    window[chartKey].data.datasets[2].data = updateReviewTimeData;
    
    window[chartKey].update();
}

// Update Quality and Risk Metrics based on filters
function updateQualityRiskMetrics(suffix = '') {
    const creatorFilter = document.getElementById(`quality-risk-creator-filter${suffix}`)?.value || 'all';
    const weekFilter = document.getElementById(`quality-risk-week-filter${suffix}`)?.value || '1w';
    
    const detailedSummaryContent = document.getElementById(`detailed-summary-content${suffix}`);
    if (!detailedSummaryContent) return;
    
    // Generate randomized data based on filters
    const baseMultiplier = creatorFilter === 'microsoft' ? 0.9 : creatorFilter === 'third-party' ? 1.1 : 1.0;
    const weekMultiplier = weekFilter === '1w' ? 1.0 : weekFilter === '2w' ? 1.05 : weekFilter === '1m' ? 1.1 : 1.15;
    
    const qualityRiskData = {
        rejectionsBeforeFirst: (1.2 * baseMultiplier * weekMultiplier).toFixed(1),
        rejectionsForUpdate: (0.8 * baseMultiplier * weekMultiplier).toFixed(1)
    };
    
    // Update metric values - find quality and risk section (3rd detailed-section)
    const qualityRiskSection = detailedSummaryContent.querySelectorAll('.detailed-section')[2];
    if (qualityRiskSection) {
        const metrics = qualityRiskSection.querySelectorAll('.detailed-metric-value[data-value]');
        if (metrics[0]) {
            metrics[0].dataset.value = qualityRiskData.rejectionsBeforeFirst;
            metrics[0].textContent = qualityRiskData.rejectionsBeforeFirst;
        }
        if (metrics[1]) {
            metrics[1].dataset.value = qualityRiskData.rejectionsForUpdate;
            metrics[1].textContent = qualityRiskData.rejectionsForUpdate;
        }
    }
    
    // Update chart
    const chartKey = `rejectionAverageTrendChart${suffix}`;
    if (window[chartKey]) {
        updateRejectionAverageChart(creatorFilter, weekFilter, suffix);
    }
}

// Update Rejection Average Chart based on filters
function updateRejectionAverageChart(creatorFilter, weekFilter, suffix = '') {
    const chartKey = `rejectionAverageTrendChart${suffix}`;
    if (!window[chartKey]) return;
    
    const baseMultiplier = creatorFilter === 'microsoft' ? 0.9 : creatorFilter === 'third-party' ? 1.1 : 1.0;
    const weekCount = weekFilter === '1w' ? 1 : weekFilter === '2w' ? 2 : weekFilter === '1m' ? 4 : 12;
    
    // Generate labels based on time range
    const labels = [];
    for (let i = weekCount; i > 0; i--) {
        labels.push(`Week ${i}`);
    }
    labels.reverse();
    
    // Take last N weeks of data
    const allWeeks = 8;
    const startIndex = Math.max(0, allWeeks - weekCount);
    const baseRejectionsBeforeFirst = [1.8, 1.6, 1.5, 1.4, 1.3, 1.25, 1.2, 1.2];
    const baseRejectionsForUpdate = [1.2, 1.1, 1.0, 0.95, 0.9, 0.85, 0.8, 0.8];
    
    const rejectionsBeforeFirstPublishData = baseRejectionsBeforeFirst.slice(startIndex).map(v => parseFloat((v * baseMultiplier).toFixed(1)));
    const rejectionsForUpdatePublishData = baseRejectionsForUpdate.slice(startIndex).map(v => parseFloat((v * baseMultiplier).toFixed(1)));
    
    window[chartKey].data.labels = labels;
    window[chartKey].data.datasets[0].data = rejectionsBeforeFirstPublishData;
    window[chartKey].data.datasets[1].data = rejectionsForUpdatePublishData;
    
    window[chartKey].update();
}

// Animate detailed metrics
function animateDetailedMetrics(suffix = '') {
    const detailedSummaryContent = document.getElementById(`detailed-summary-content${suffix}`);
    if (!detailedSummaryContent) return;
    
    // Animate detailed metric values
    detailedSummaryContent.querySelectorAll('.detailed-metric-value[data-value]').forEach(metric => {
        const targetValue = parseFloat(metric.dataset.value);
        const duration = 1500;
        const startTime = Date.now();
        const startValue = 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic(progress);
            
            if (targetValue % 1 === 0) {
                metric.textContent = Math.round(currentValue).toLocaleString();
            } else {
                metric.textContent = currentValue.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    });
    
    // Animate flow-volume metric values
    detailedSummaryContent.querySelectorAll('.flow-volume-metric-value[data-value]').forEach(metric => {
        const targetValue = parseFloat(metric.dataset.value);
        const duration = 1500;
        const startTime = Date.now();
        const startValue = 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic(progress);
            
            if (targetValue % 1 === 0) {
                metric.textContent = Math.round(currentValue).toLocaleString();
            } else {
                metric.textContent = currentValue.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    });
}

// Initialize Flow Volume Trend Chart
function initializeFlowVolumeTrendChart(suffix = '') {
    const canvas = document.getElementById(`flow-volume-trend-chart${suffix}`);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const chartKey = `flowVolumeTrendChart${suffix}`;
    if (window[chartKey]) {
        window[chartKey].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    
    // Generate trend data comparing New Submissions vs Updates for each metric
    // Agent Submissions
    const agentSubmissionsNew = [820, 850, 870, 860, 880, 875, 890, 892];
    const agentSubmissionsUpdates = [310, 325, 340, 335, 345, 350, 352, 355];
    
    // Pending for Review
    const pendingReviewNew = [70, 68, 69, 67, 66, 67, 67, 67];
    const pendingReviewUpdates = [25, 24, 23, 22, 22, 22, 22, 22];
    
    // Approvals
    const approvalsNew = [720, 750, 770, 765, 780, 775, 785, 785];
    const approvalsUpdates = [280, 295, 305, 300, 302, 304, 304, 304];
    
    // Rejections
    const rejectionsNew = [30, 32, 31, 28, 34, 33, 38, 40];
    const rejectionsUpdates = [5, 6, 12, 13, 21, 24, 24, 29];
    
    // Approval/Rejection Ratio
    const approvalRejectionRatioNew = [24.0, 23.4, 24.8, 27.3, 22.9, 23.5, 20.7, 19.6];
    const approvalRejectionRatioUpdates = [56.0, 49.2, 25.4, 23.1, 14.4, 12.7, 12.7, 10.5];
    
    window[chartKey] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Agent Submissions - New',
                    data: agentSubmissionsNew,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#0ea5e9',
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone'
                },
                {
                    label: 'Agent Submissions - Updates',
                    data: agentSubmissionsUpdates,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.05)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#0ea5e9',
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone'
                },
                {
                    label: 'Pending for Review - New',
                    data: pendingReviewNew,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#f59e0b',
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Pending for Review - Updates',
                    data: pendingReviewUpdates,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#f59e0b',
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Approvals - New',
                    data: approvalsNew,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#22c55e',
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Approvals - Updates',
                    data: approvalsUpdates,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#22c55e',
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Rejections - New',
                    data: rejectionsNew,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#ef4444',
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Rejections - Updates',
                    data: rejectionsUpdates,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#ef4444',
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    hidden: true
                },
                {
                    label: 'Approval/Rejection Ratio - New',
                    data: approvalRejectionRatioNew,
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#7c3aed',
                    pointBackgroundColor: '#7c3aed',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    yAxisID: 'y1',
                    hidden: true
                },
                {
                    label: 'Approval/Rejection Ratio - Updates',
                    data: approvalRejectionRatioUpdates,
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(124, 58, 237, 0.05)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#7c3aed',
                    pointBackgroundColor: '#7c3aed',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone',
                    yAxisID: 'y1',
                    hidden: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        color: '#64748b',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: 12,
                    titleFont: {
                        size: 13,
                        weight: '600',
                        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    },
                    bodyFont: {
                        size: 12,
                        weight: '500',
                        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 6,
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label.includes('Approval/Rejection Ratio')) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ':1';
                            }
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        padding: 10
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        padding: 10,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Count',
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#7c3aed',
                        font: {
                            size: 11,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        padding: 10,
                        callback: function(value) {
                            return value.toFixed(1) + ':1';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Ratio',
                        color: '#7c3aed',
                        font: {
                            size: 12,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize Latency Trend Chart
function initializeLatencyTrendChart(suffix = '') {
    const canvas = document.getElementById(`latency-trend-chart${suffix}`);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const chartKey = `latencyTrendChart${suffix}`;
    if (window[chartKey]) {
        window[chartKey].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    
    // Generate trend data for latency metrics
    const submissionToApprovalData = [2.8, 2.6, 2.5, 2.4, 2.3, 2.3, 2.3, 2.3];
    const timePerStepData = [0.5, 0.45, 0.42, 0.41, 0.4, 0.4, 0.4, 0.4];
    const updateReviewTimeData = [2.2, 2.0, 1.9, 1.85, 1.8, 1.8, 1.8, 1.8];
    
    window[chartKey] = new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
                datasets: [
                    {
                    label: 'New Submission to Approval Time',
                    data: submissionToApprovalData,
                        borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        borderWidth: 3,
                        tension: 0.5,
                    fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#0ea5e9',
                        pointBackgroundColor: '#0ea5e9',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                    label: 'Time per Publishing Step',
                    data: timePerStepData,
                        borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderWidth: 3,
                        tension: 0.5,
                    fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#22c55e',
                        pointBackgroundColor: '#22c55e',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                    label: 'Agent Update Submission to Approval Time',
                    data: updateReviewTimeData,
                        borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        tension: 0.5,
                    fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#f59e0b',
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                            color: '#64748b',
                            boxWidth: 8,
                            boxHeight: 8
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: {
                            size: 13,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        bodyFont: {
                            size: 12,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        boxPadding: 6,
                        titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' days';
                        }
                    }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                            padding: 10
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                        padding: 10,
                        callback: function(value) {
                            return value.toFixed(1) + ' days';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time (days)',
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
// Initialize Rejection Average Trend Chart
function initializeRejectionAverageTrendChart(suffix = '') {
    const canvas = document.getElementById(`rejection-average-trend-chart${suffix}`);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    const chartKey = `rejectionAverageTrendChart${suffix}`;
    if (window[chartKey]) {
        window[chartKey].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    
    // Generate trend data for rejection averages
    const rejectionsBeforeFirstPublishData = [1.8, 1.6, 1.5, 1.4, 1.3, 1.25, 1.2, 1.2];
    const rejectionsForUpdatePublishData = [1.2, 1.1, 1.0, 0.95, 0.9, 0.85, 0.8, 0.8];
    
    window[chartKey] = new Chart(ctx, {
        type: 'line',
            data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average number of rejections before first publish',
                    data: rejectionsBeforeFirstPublishData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#ef4444',
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone'
                },
                {
                    label: 'Average number of rejections for update publish',
                    data: rejectionsForUpdatePublishData,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    tension: 0.5,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#f59e0b',
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    cubicInterpolationMode: 'monotone'
                }
            ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
                plugins: {
                    legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        color: '#64748b',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: 12,
                    titleFont: {
                        size: 13,
                        weight: '600',
                        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    },
                    bodyFont: {
                        size: 12,
                        weight: '500',
                        family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 6,
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1);
                        }
                    }
                    }
                },
                scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        padding: 10
                    }
                },
                    y: {
                        beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        padding: 10,
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Average Rejections',
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
                }
            }
        });
    }
    
// View Toggle (Numbers/Charts)
document.querySelectorAll('.view-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const widget = this.closest('.widget');
        const numbersView = widget.querySelector('[id^="submissions-numbers"]');
        const chartsView = widget.querySelector('[id^="submissions-charts"]');
        const viewType = this.dataset.view;
        
        widget.querySelectorAll('.view-toggle').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        if (viewType === 'numbers') {
            if (numbersView) numbersView.style.display = 'grid';
            if (chartsView) chartsView.style.display = 'none';
        } else {
            if (numbersView) numbersView.style.display = 'none';
            if (chartsView) chartsView.style.display = 'block';
            initializeTrendChart(widget);
        }
    });
});

// Animate Metrics
function animateMetrics() {
    document.querySelectorAll('.metric-value[data-value]').forEach(metric => {
        const targetValue = parseFloat(metric.dataset.value);
        const duration = 1500;
        const startTime = Date.now();
        const startValue = 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic(progress);
            
            if (targetValue % 1 === 0) {
                metric.textContent = Math.round(currentValue).toLocaleString();
            } else {
                metric.textContent = currentValue.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    });
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Initialize Charts
function initializeCharts(pageId) {
    // Submissions Trend Chart
    const trendChartIds = {
        'business-leader-page': 'submissions-trend-chart',
        'engineering-page': 'submissions-trend-chart-eng',
        'product-page': 'submissions-trend-chart-prod'
    };
    
    if (trendChartIds[pageId]) {
        initializeTrendChartById(trendChartIds[pageId]);
    }
    
    // API Trend Charts
    const apiChartIds = {
        'business-leader-page': ['api-trend-1', 'api-trend-2', 'api-trend-3'],
        'engineering-page': ['api-trend-eng-1', 'api-trend-eng-2', 'api-trend-eng-3'],
        'product-page': ['api-trend-prod-1', 'api-trend-prod-2', 'api-trend-prod-3']
    };
    
    if (apiChartIds[pageId]) {
        apiChartIds[pageId].forEach(id => initializeAPITrendChart(id));
    }
    
    // Rejection Reasons Chart
    const rejectionChartIds = {
        'business-leader-page': 'rejection-reasons-chart',
        'engineering-page': 'rejection-reasons-chart-eng',
        'product-page': 'rejection-reasons-chart-prod'
    };
    
    if (rejectionChartIds[pageId]) {
        initializeRejectionChart(rejectionChartIds[pageId]);
    }
    
    // Initialize detailed summary charts for product view (open by default)
    if (pageId === 'product-page') {
        const productDetailedSummary = document.getElementById('detailed-summary-content-prod');
        if (productDetailedSummary && !productDetailedSummary.classList.contains('collapsed')) {
            setTimeout(() => {
                animateDetailedMetrics('-prod');
                initializeFlowVolumeTrendChart('-prod');
                initializeLatencyTrendChart('-prod');
                initializeRejectionAverageTrendChart('-prod');
            }, 100);
        }
    }
}

function initializeTrendChart(widget) {
    const chartId = widget.querySelector('canvas[id^="submissions-trend"]')?.id;
    if (chartId) {
        initializeTrendChartById(chartId);
    }
}

function initializeTrendChartById(chartId, useRandomData = false) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Generate random data if filtering
    let submissionsData = [120, 190, 300, 250, 280, 200, 180];
    let approvalsData = [100, 150, 250, 220, 240, 180, 160];
    let rejectionsData = [10, 15, 20, 18, 15, 12, 10];
    
    if (useRandomData) {
        submissionsData = labels.map(() => getRandomValue(80, 350, 200));
        approvalsData = labels.map(() => getRandomValue(70, 300, 180));
        rejectionsData = labels.map(() => getRandomValue(5, 25, 15));
    }
    
    window[chartId + '_chart'] = new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
                datasets: [
                    {
                        label: 'Submissions',
                    data: submissionsData,
                        borderColor: '#0ea5e9',
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
                            gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
                            gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
                            return gradient;
                        },
                        borderWidth: 3,
                        tension: 0.5,
                        fill: true,
                    pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#0ea5e9',
                        pointBackgroundColor: '#0ea5e9',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Approvals',
                    data: approvalsData,
                        borderColor: '#22c55e',
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, 'rgba(34, 197, 94, 0.25)');
                            gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
                            gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                            return gradient;
                        },
                        borderWidth: 3,
                        tension: 0.5,
                        fill: true,
                    pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#22c55e',
                        pointBackgroundColor: '#22c55e',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Rejections',
                    data: rejectionsData,
                        borderColor: '#ef4444',
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
                            gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.1)');
                            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
                            return gradient;
                        },
                        borderWidth: 3,
                        tension: 0.5,
                        fill: true,
                    pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#ef4444',
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                            color: '#64748b',
                            boxWidth: 8,
                            boxHeight: 8
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        padding: 12,
                        titleFont: {
                            size: 13,
                            weight: '600',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        bodyFont: {
                            size: 12,
                            weight: '500',
                            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                        },
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        boxPadding: 6,
                        titleColor: '#ffffff',
                        bodyColor: '#e2e8f0',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                            padding: 10
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                size: 11,
                                weight: '500',
                                family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                            },
                            padding: 10,
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

function initializeAPITrendChart(chartId) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    const labels = Array.from({length: 24}, (_, i) => i + ':00');
    
    // Generate random latency data
    const baseLatency = chartId.includes('1') ? 145 : chartId.includes('2') ? 203 : 89;
    const data = labels.map(() => baseLatency + Math.random() * 50 - 25);
    
    window[chartId + '_chart'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Latency (ms)',
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        }
    });
}

function initializeRejectionChart(chartId) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    window[chartId + '_chart'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Insufficient security documentation',
                'Connector scope mismatch',
                'Data handling policy violation',
                'Incomplete tenant admin consent',
                'Invalid API endpoint configuration',
                'Agent naming convention violation',
                'Insufficient error handling documentation',
                'Missing privacy policy compliance',
                'Inadequate user authentication setup',
                'Unsupported connector type usage'
            ],
            datasets: [{
                data: [23, 18, 15, 5, 4, 3, 2, 2, 1, 1],
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#ec4899',
                    '#14b8a6',
                    '#f97316',
                    '#a855f7',
                    '#06b6d4',
                    '#84cc16',
                    '#22c55e'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Chatbot
function openChatbot() {
    const modal = document.getElementById('chatbot-modal');
    modal.classList.add('active');
    // Reset state when opening chatbot
    isFirstQuery = true;
    // Restore input if it was replaced
    const inputContainer = document.getElementById('chatbot-input-container');
    if (inputContainer && inputContainer.querySelector('.coming-soon-message')) {
        inputContainer.innerHTML = '<input type="text" placeholder="Enter a ticket ID" id="chatbot-input-field"><button onclick="sendChatbotMessage()">Send</button>';
        // Reattach enter key handler
        attachEnterKeyHandler();
    }
}

function closeChatbot() {
    const modal = document.getElementById('chatbot-modal');
    modal.classList.remove('active');
}

// Escalation Urgency Agent State
let isFirstQuery = true;

function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input-field');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.querySelector('.chatbot-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user';
    userMessage.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
    messagesContainer.appendChild(userMessage);
    
    input.value = '';
    
    // Handle first query with detailed explanation
    if (isFirstQuery) {
        isFirstQuery = false;
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.innerHTML = `<div class="message-content">${getAgentIntroduction()}</div>`;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Replace input with "Coming soon" message
            replaceInputWithComingSoon();
        }, 500);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return;
    }
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAgentIntroduction() {
    return `
        <div class="agent-introduction">
            <p><strong>My role:</strong> A research and analysis agent which can access ticket systems to identify volume of same type of escalation and it's frequency. Based on the found information I will be able to share the urgency levels to you.</p>
            
            <p><strong>Prerequisites for me to work:</strong> All the escalation ticket data is embedded and stored in vector db in realtime with client names and date/time of the ticket.</p>
            
            <p><strong>How I function:</strong></p>
            <ol>
                <li>I would take natural language as input (Ticket ID)</li>
                <li>I would find the embedded information of the ticket in the vector DB</li>
                <li>I would then identify similar escalations based on their scores</li>
                <li>I would then identify how many clients have raised those escalations</li>
                <li>I would then find the frequency of such escalation global and per client</li>
                <li>I would then classify if the issue is technical or training related</li>
                <li>At last I would determine urgency levels based on below logic:
                    <ul>
                        <li><strong>High:</strong> Multiple clients + frequent + technical issue</li>
                        <li><strong>Moderate:</strong>
                            <ul>
                                <li>Multiple clients + one-time technical issue</li>
                                <li>Single client + repeated technical issue</li>
                            </ul>
                        </li>
                        <li><strong>Low:</strong>
                            <ul>
                                <li>Single client + one-time issue</li>
                                <li>Client training issue</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Now using LLM generation I would respond to you with all the details including the urgency level</li>
            </ol>
            
            <p><strong>Tools:</strong></p>
            <ul>
                <li>Ticket system db</li>
            </ul>
        </div>
    `;
}

function replaceInputWithComingSoon() {
    const inputContainer = document.getElementById('chatbot-input-container');
    if (inputContainer) {
        inputContainer.innerHTML = '<div class="coming-soon-message">Coming soon</div>';
    }
}

// Chatbot Enter Key Handler
function attachEnterKeyHandler() {
    const chatbotInput = document.getElementById('chatbot-input-field');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }
}

// Attach handler on page load
attachEnterKeyHandler();

// Stop Alert
function stopAlert(button) {
    const alertItem = button.closest('.alert-item');
    const alertStatus = alertItem.querySelector('.alert-status');
    
    if (confirm('Are you sure you want to stop this alert?')) {
        alertStatus.textContent = 'Stopped';
        alertStatus.style.color = '#ef4444';
        button.textContent = 'Start';
        button.classList.remove('btn-stop');
        button.classList.add('btn-start');
        button.style.background = '#10b981';
        button.onclick = function() { startAlert(this); };
    }
}

function startAlert(button) {
    const alertItem = button.closest('.alert-item');
    const alertStatus = alertItem.querySelector('.alert-status');
    
    alertStatus.textContent = 'Active';
    alertStatus.style.color = '#10b981';
    button.textContent = 'Stop';
    button.classList.remove('btn-start');
    button.classList.add('btn-stop');
    button.style.background = '#ef4444';
    button.onclick = function() { stopAlert(this); };
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// Default Values
const DEFAULT_METRICS = {
    submissions: 1247,
    pending: 89,
    approvals: 1089,
    rejections: 69,
    latency: 2.3
};

const DEFAULT_REJECTION_REASONS = [
    { name: 'Insufficient security documentation', count: 23 },
    { name: 'Connector scope mismatch', count: 18 },
    { name: 'Data handling policy violation', count: 15 },
    { name: 'Incomplete tenant admin consent', count: 5 },
    { name: 'Invalid API endpoint configuration', count: 4 },
    { name: 'Agent naming convention violation', count: 3 },
    { name: 'Insufficient error handling documentation', count: 2 },
    { name: 'Missing privacy policy compliance', count: 2 },
    { name: 'Inadequate user authentication setup', count: 1 },
    { name: 'Unsupported connector type usage', count: 1 }
];

// Filter Functions with Randomization
function getRandomValue(min, max, baseValue, canExceedBase = false) {
    // Generate a random value within ±30% of base value
    const variation = baseValue * 0.3;
    let random = baseValue + (Math.random() * 2 - 1) * variation;
    
    // If cannot exceed base, cap at base value (only decrease or stay same)
    if (!canExceedBase && random > baseValue) {
        random = baseValue - Math.random() * variation; // Only decrease from base
    }
    
    return Math.max(min, Math.round(random));
}

function isDefaultFilters(suffix = '') {
    const submissionTypeFilter = document.getElementById(`submission-type-filter${suffix}`);
    const creatorFilter = document.getElementById(`creator-filter${suffix}`);
    const timeRangeFilter = document.getElementById(`time-range-filter${suffix}`);
    const agentUserFilter = document.getElementById(`agent-user-filter${suffix}`);
    
    return (submissionTypeFilter?.value === 'all' || !submissionTypeFilter?.value) &&
           (creatorFilter?.value === 'all' || !creatorFilter?.value) &&
           (timeRangeFilter?.value === '1w' || !timeRangeFilter?.value) &&
           (agentUserFilter?.value === 'all' || !agentUserFilter?.value);
}

function restoreDefaultAgentMetrics(suffix = '') {
    const metrics = DEFAULT_METRICS;
    
    // Update metric values
    const metricElements = {
        submissions: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(1) .metric-value`),
        pending: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(2) .metric-value`),
        approvals: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(3) .metric-value`),
        rejections: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(4) .metric-value`),
        latency: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(5) .metric-value`)
    };
    
    if (metricElements.submissions) {
        metricElements.submissions.dataset.value = metrics.submissions;
        metricElements.submissions.textContent = metrics.submissions.toLocaleString();
    }
    if (metricElements.pending) {
        metricElements.pending.dataset.value = metrics.pending;
        metricElements.pending.textContent = metrics.pending.toLocaleString();
    }
    if (metricElements.approvals) {
        metricElements.approvals.dataset.value = metrics.approvals;
        metricElements.approvals.textContent = metrics.approvals.toLocaleString();
    }
    if (metricElements.rejections) {
        metricElements.rejections.dataset.value = metrics.rejections;
        metricElements.rejections.textContent = metrics.rejections.toLocaleString();
    }
    if (metricElements.latency) {
        metricElements.latency.dataset.value = metrics.latency;
        metricElements.latency.textContent = metrics.latency;
    }
    
    // Restore default chart
    const chartId = suffix === '' ? 'submissions-trend-chart' : 
                   suffix === '-eng' ? 'submissions-trend-chart-eng' : 
                   'submissions-trend-chart-prod';
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    initializeTrendChartById(chartId, false);
}

function updateAgentPublishingMetrics(suffix = '', filterType = 'time-range') {
    // Check if all filters are back to default
    if (isDefaultFilters(suffix)) {
        restoreDefaultAgentMetrics(suffix);
        return;
    }
    
    // Only time-range filter can exceed default values
    const canExceedBase = filterType === 'time-range';
    
    // Apply randomization
    const metrics = {
        submissions: getRandomValue(800, 2000, DEFAULT_METRICS.submissions, canExceedBase),
        pending: getRandomValue(50, 150, DEFAULT_METRICS.pending, canExceedBase),
        approvals: getRandomValue(700, 1500, DEFAULT_METRICS.approvals, canExceedBase),
        rejections: getRandomValue(30, 120, DEFAULT_METRICS.rejections, canExceedBase),
        latency: canExceedBase 
            ? (DEFAULT_METRICS.latency + (Math.random() * 0.6 - 0.3)).toFixed(1)
            : Math.max(0.1, (DEFAULT_METRICS.latency - Math.random() * 0.3)).toFixed(1)
    };
    
    // Update metric values
    const metricElements = {
        submissions: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(1) .metric-value`),
        pending: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(2) .metric-value`),
        approvals: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(3) .metric-value`),
        rejections: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(4) .metric-value`),
        latency: document.querySelector(`#submissions-numbers${suffix} .metric-card:nth-child(5) .metric-value`)
    };
    
    if (metricElements.submissions) {
        metricElements.submissions.dataset.value = metrics.submissions;
        metricElements.submissions.textContent = metrics.submissions.toLocaleString();
    }
    if (metricElements.pending) {
        metricElements.pending.dataset.value = metrics.pending;
        metricElements.pending.textContent = metrics.pending.toLocaleString();
    }
    if (metricElements.approvals) {
        metricElements.approvals.dataset.value = metrics.approvals;
        metricElements.approvals.textContent = metrics.approvals.toLocaleString();
    }
    if (metricElements.rejections) {
        metricElements.rejections.dataset.value = metrics.rejections;
        metricElements.rejections.textContent = metrics.rejections.toLocaleString();
    }
    if (metricElements.latency) {
        metricElements.latency.dataset.value = metrics.latency;
        metricElements.latency.textContent = metrics.latency;
    }
    
    // Update trend chart with random data
    const chartId = suffix === '' ? 'submissions-trend-chart' : 
                   suffix === '-eng' ? 'submissions-trend-chart-eng' : 
                   'submissions-trend-chart-prod';
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    initializeTrendChartById(chartId, true);
}

function isDefaultRejectionFilters(suffix = '') {
    const rejectionCreatorFilter = document.getElementById(`rejection-creator-filter${suffix}`);
    const rejectionTimeRangeFilter = document.getElementById(`rejection-time-range-filter${suffix}`);
    
    return (rejectionCreatorFilter?.value === 'all' || !rejectionCreatorFilter?.value) &&
           (rejectionTimeRangeFilter?.value === '1w' || !rejectionTimeRangeFilter?.value);
}

function restoreDefaultRejectionReasons(suffix = '') {
    const reasons = DEFAULT_REJECTION_REASONS;
    const totalRejections = reasons.reduce((sum, r) => sum + r.count, 0);
    const maxCount = reasons[0]?.count || 0;
    
    // Find the widget
    const filterElement = document.getElementById(`rejection-time-range-filter${suffix}`) || 
                         document.getElementById(`rejection-creator-filter${suffix}`);
    if (!filterElement) return;
    
    const widget = filterElement.closest('.rejection-reasons-widget');
    if (!widget) return;
    
    // Update total rejections
    const totalElement = widget.querySelector('.summary-value');
    if (totalElement) {
        totalElement.textContent = totalRejections;
    }
    
    // Update rejection cards
    const cards = widget.querySelectorAll('.rejection-card');
    cards.forEach((card, index) => {
        if (reasons[index]) {
            const reason = reasons[index];
            const statValue = card.querySelector('.stat-value');
            const progressBar = card.querySelector('.progress-bar');
            const rankElement = card.querySelector('.rejection-rank');
            
            if (statValue) statValue.textContent = reason.count;
            if (progressBar) {
                const percentage = maxCount > 0 ? (reason.count / maxCount) * 100 : 0;
                progressBar.style.width = percentage + '%';
            }
            if (rankElement) rankElement.textContent = `#${index + 1}`;
        }
    });
    
    // Restore default chart
    const chartId = suffix === '' ? 'rejection-reasons-chart' : 
                   suffix === '-eng' ? 'rejection-reasons-chart-eng' : 
                   'rejection-reasons-chart-prod';
    
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    window[chartId + '_chart'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: reasons.map(r => r.name),
            datasets: [{
                data: reasons.map(r => r.count),
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#ec4899',
                    '#14b8a6',
                    '#f97316',
                    '#a855f7',
                    '#06b6d4',
                    '#84cc16',
                    '#22c55e'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function updateRejectionReasons(suffix = '', filterType = 'time-range') {
    // Check if all filters are back to default
    if (isDefaultRejectionFilters(suffix)) {
        restoreDefaultRejectionReasons(suffix);
        return;
    }
    
    // Only time-range filter can exceed default values
    const canExceedBase = filterType === 'time-range';
    
    // Randomize counts
    const randomizedReasons = DEFAULT_REJECTION_REASONS.map(reason => ({
        ...reason,
        count: getRandomValue(0, reason.count * 2, reason.count, canExceedBase)
    })).sort((a, b) => b.count - a.count);
    
    const totalRejections = randomizedReasons.reduce((sum, r) => sum + r.count, 0);
    const maxCount = randomizedReasons[0]?.count || 0;
    
    // Find the widget by finding the filter element and traversing up
    const filterElement = document.getElementById(`rejection-time-range-filter${suffix}`) || 
                         document.getElementById(`rejection-creator-filter${suffix}`);
    if (!filterElement) return;
    
    const widget = filterElement.closest('.rejection-reasons-widget');
    if (!widget) return;
    
    // Update total rejections
    const totalElement = widget.querySelector('.summary-value');
    if (totalElement) {
        totalElement.textContent = totalRejections;
    }
    
    // Update rejection cards
    const cards = widget.querySelectorAll('.rejection-card');
    cards.forEach((card, index) => {
        if (randomizedReasons[index]) {
            const reason = randomizedReasons[index];
            const statValue = card.querySelector('.stat-value');
            const progressBar = card.querySelector('.progress-bar');
            const rankElement = card.querySelector('.rejection-rank');
            
            if (statValue) statValue.textContent = reason.count;
            if (progressBar) {
                const percentage = maxCount > 0 ? (reason.count / maxCount) * 100 : 0;
                progressBar.style.width = percentage + '%';
            }
            if (rankElement) rankElement.textContent = `#${index + 1}`;
        }
    });
    
    // Update chart with new data
    const chartId = suffix === '' ? 'rejection-reasons-chart' : 
                   suffix === '-eng' ? 'rejection-reasons-chart-eng' : 
                   'rejection-reasons-chart-prod';
    
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    if (window[chartId + '_chart']) {
        window[chartId + '_chart'].destroy();
    }
    
    const ctx = canvas.getContext('2d');
    window[chartId + '_chart'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: randomizedReasons.map(r => r.name),
            datasets: [{
                data: randomizedReasons.map(r => r.count),
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#ec4899',
                    '#14b8a6',
                    '#f97316',
                    '#a855f7',
                    '#06b6d4',
                    '#84cc16',
                    '#22c55e'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Setup filter event listeners
// Update Churn Risk based on time range filter
function updateChurnRisk(suffix = '') {
    const timeRangeFilter = document.getElementById(`churn-time-range-filter${suffix}`);
    if (!timeRangeFilter) return;
    
    const timeRange = timeRangeFilter.value || '1w';
    
    // Find the churn risk widget
    const widget = timeRangeFilter.closest('.churn-risk-widget');
    if (!widget) return;
    
    // Generate multipliers based on time range
    const weekMultiplier = timeRange === '1w' ? 1.0 : timeRange === '2w' ? 1.9 : timeRange === '1m' ? 4.2 : 12.5;
    
    // Update all churn items
    const churnItems = widget.querySelectorAll('.churn-item');
    churnItems.forEach(item => {
        // Update baseline metrics with randomized values based on time range
        const baselineElement = item.querySelector('.churn-baseline');
        if (baselineElement) {
            const currentText = baselineElement.textContent;
            // Extract numbers from baseline text and update them
            const match = currentText.match(/Baseline: (\d+) submissions, ([\d.]+)% approval, ([\d.]+)% rejection, ([\d.]+) days latency/);
            if (match) {
                const submissions = Math.round(parseInt(match[1]) * weekMultiplier);
                const approval = parseFloat(match[2]);
                const rejection = parseFloat(match[3]);
                const latency = parseFloat(match[4]);
                
                // Slight randomization for variety
                const newApproval = Math.max(70, Math.min(95, approval + (Math.random() - 0.5) * 2));
                const newRejection = Math.max(3, Math.min(15, rejection + (Math.random() - 0.5) * 1));
                const newLatency = Math.max(1.5, Math.min(3.5, latency + (Math.random() - 0.5) * 0.3));
                
                baselineElement.textContent = `Baseline: ${submissions} submissions, ${newApproval.toFixed(0)}% approval, ${newRejection.toFixed(1)}% rejection, ${newLatency.toFixed(1)} days latency`;
            }
        }
        
        // Update vitals metrics
        const vitals = item.querySelectorAll('.churn-vital');
        vitals.forEach(vital => {
            const valueElement = vital.querySelector('.churn-vital-value');
            const changeElement = vital.querySelector('.churn-vital-change');
            
            if (valueElement) {
                const currentValue = parseFloat(valueElement.textContent.replace(/[^\d.]/g, ''));
                if (!isNaN(currentValue)) {
                    // Randomize value slightly based on time range
                    const multiplier = 0.9 + (Math.random() * 0.2);
                    const newValue = currentValue * weekMultiplier * multiplier;
                    
                    if (valueElement.textContent.includes('%')) {
                        valueElement.textContent = `${newValue.toFixed(1)}%`;
                    } else if (valueElement.textContent.includes('days')) {
                        valueElement.textContent = `${newValue.toFixed(1)} days`;
                    } else {
                        valueElement.textContent = Math.round(newValue).toLocaleString();
                    }
                }
            }
            
            if (changeElement) {
                // Randomize change percentage
                const changeValue = -15 + Math.random() * 30;
                const changeText = changeValue >= 0 ? `+${changeValue.toFixed(1)}%` : `${changeValue.toFixed(1)}%`;
                changeElement.textContent = changeText;
                changeElement.className = 'churn-vital-change ' + (changeValue >= 0 ? 'positive' : 'negative');
            }
        });
    });
}

// Update API Health based on time range filter
function updateAPIHealth(suffix = '') {
    const timeRangeFilter = document.getElementById(`api-health-time-range-filter${suffix}`);
    if (!timeRangeFilter) return;
    
    const timeRange = timeRangeFilter.value || '1w';
    
    // Find the API health widget
    const widget = timeRangeFilter.closest('.api-health-widget');
    if (!widget) return;
    
    // Generate multipliers based on time range
    const weekMultiplier = timeRange === '1w' ? 1.0 : timeRange === '2w' ? 1.05 : timeRange === '1m' ? 1.1 : 1.15;
    
    // Update table values with randomized data based on time range
    const tableRows = widget.querySelectorAll('.api-table tbody tr');
    tableRows.forEach((row, index) => {
        // Base values for each API
        const baseValues = [
            { success: 99.2, latency: 145, error: 0.8 },
            { success: 98.7, latency: 203, error: 1.3 },
            { success: 99.5, latency: 89, error: 0.5 }
        ];
        
        const base = baseValues[index];
        if (!base) return;
        
        // Randomize values slightly based on time range
        const successRate = Math.max(95, Math.min(100, base.success + (Math.random() - 0.5) * 2 * weekMultiplier));
        const latency = Math.max(50, Math.round(base.latency + (Math.random() - 0.5) * 30 * weekMultiplier));
        const errorRate = Math.max(0.1, Math.min(5, base.error + (Math.random() - 0.5) * 0.5 * weekMultiplier));
        
        // Update success rate
        const successCell = row.querySelector('td:nth-child(2) .table-value');
        if (successCell) {
            successCell.textContent = successRate.toFixed(1) + '%';
        }
        
        // Update latency
        const latencyCell = row.querySelector('td:nth-child(3) .table-value');
        if (latencyCell) {
            latencyCell.textContent = latency + 'ms';
        }
        
        // Update error rate
        const errorCell = row.querySelector('td:nth-child(4) .table-value');
        if (errorCell) {
            errorCell.textContent = errorRate.toFixed(1) + '%';
        }
        
        // Update chart data
        const chartCanvas = row.querySelector('canvas');
        if (chartCanvas && window[chartCanvas.id + '_chart']) {
            const chart = window[chartCanvas.id + '_chart'];
            const baseLatency = chartCanvas.id.includes('1') ? 145 : chartCanvas.id.includes('2') ? 203 : 89;
            const weekCount = timeRange === '1w' ? 7 : timeRange === '2w' ? 14 : timeRange === '1m' ? 30 : 90;
            
            // Generate labels based on time range
            const labels = [];
            if (timeRange === '1w') {
                labels.push(...['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
            } else if (timeRange === '2w') {
                labels.push(...['W1 Mon', 'W1 Tue', 'W1 Wed', 'W1 Thu', 'W1 Fri', 'W1 Sat', 'W1 Sun',
                               'W2 Mon', 'W2 Tue', 'W2 Wed', 'W2 Thu', 'W2 Fri', 'W2 Sat', 'W2 Sun']);
            } else if (timeRange === '1m') {
                for (let i = 1; i <= 30; i++) {
                    labels.push(`Day ${i}`);
                }
            } else {
                for (let i = 1; i <= 90; i++) {
                    labels.push(`Day ${i}`);
                }
            }
            
            // Generate data based on time range
            const data = labels.map(() => baseLatency * weekMultiplier + Math.random() * 50 - 25);
            
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }
    });
}

function setupFilters() {
    // Agent Publishing Overview filters
    const filterSuffixes = ['', '-eng', '-prod'];
    
    filterSuffixes.forEach(suffix => {
        const submissionTypeFilter = document.getElementById(`submission-type-filter${suffix}`);
        const creatorFilter = document.getElementById(`creator-filter${suffix}`);
        const timeRangeFilter = document.getElementById(`time-range-filter${suffix}`);
        const agentUserFilter = document.getElementById(`agent-user-filter${suffix}`);
        
        if (submissionTypeFilter) {
            submissionTypeFilter.addEventListener('change', () => 
                updateAgentPublishingMetrics(suffix, 'submission-type'));
        }
        if (creatorFilter) {
            creatorFilter.addEventListener('change', () => 
                updateAgentPublishingMetrics(suffix, 'creator'));
        }
        if (timeRangeFilter) {
            timeRangeFilter.addEventListener('change', () => 
                updateAgentPublishingMetrics(suffix, 'time-range'));
        }
        if (agentUserFilter) {
            agentUserFilter.addEventListener('change', () => 
                updateAgentPublishingMetrics(suffix, 'agent-user'));
        }
    });
    
    // Rejection Reasons filters
    const rejectionSuffixes = ['', '-eng', '-prod'];
    
    rejectionSuffixes.forEach(suffix => {
        const rejectionCreatorFilter = document.getElementById(`rejection-creator-filter${suffix}`);
        const rejectionTimeRangeFilter = document.getElementById(`rejection-time-range-filter${suffix}`);
        
        if (rejectionCreatorFilter) {
            rejectionCreatorFilter.addEventListener('change', () => 
                updateRejectionReasons(suffix, 'creator'));
        }
        if (rejectionTimeRangeFilter) {
            rejectionTimeRangeFilter.addEventListener('change', () => 
                updateRejectionReasons(suffix, 'time-range'));
        }
    });
    
    // Detailed Summary Filters - Business Leader, Engineering, and Product views
    // Reuse filterSuffixes from above
    filterSuffixes.forEach(suffix => {
        // Flow and Volume Metrics filters
        const flowVolumeCreatorFilter = document.getElementById(`flow-volume-creator-filter${suffix}`);
        const flowVolumeWeekFilter = document.getElementById(`flow-volume-week-filter${suffix}`);
        
        if (flowVolumeCreatorFilter) {
            flowVolumeCreatorFilter.addEventListener('change', () => updateFlowVolumeMetrics(suffix));
        }
        if (flowVolumeWeekFilter) {
            flowVolumeWeekFilter.addEventListener('change', () => updateFlowVolumeMetrics(suffix));
        }
        
        // Latency Metrics filters
        const latencyCreatorFilter = document.getElementById(`latency-creator-filter${suffix}`);
        const latencyWeekFilter = document.getElementById(`latency-week-filter${suffix}`);
        
        if (latencyCreatorFilter) {
            latencyCreatorFilter.addEventListener('change', () => updateLatencyMetrics(suffix));
        }
        if (latencyWeekFilter) {
            latencyWeekFilter.addEventListener('change', () => updateLatencyMetrics(suffix));
        }
        
        // Quality and Risk Metrics filters
        const qualityRiskCreatorFilter = document.getElementById(`quality-risk-creator-filter${suffix}`);
        const qualityRiskWeekFilter = document.getElementById(`quality-risk-week-filter${suffix}`);
        
        if (qualityRiskCreatorFilter) {
            qualityRiskCreatorFilter.addEventListener('change', () => updateQualityRiskMetrics(suffix));
        }
        if (qualityRiskWeekFilter) {
            qualityRiskWeekFilter.addEventListener('change', () => updateQualityRiskMetrics(suffix));
        }
    });
    
    // Churn Risk Filters
    const churnTimeRangeFilter = document.getElementById('churn-time-range-filter');
    const churnTimeRangeFilterProd = document.getElementById('churn-time-range-filter-prod');
    
    if (churnTimeRangeFilter) {
        churnTimeRangeFilter.addEventListener('change', () => updateChurnRisk(''));
    }
    if (churnTimeRangeFilterProd) {
        churnTimeRangeFilterProd.addEventListener('change', () => updateChurnRisk('-prod'));
    }
    
    // API Health Filters
    const apiHealthTimeRangeFilter = document.getElementById('api-health-time-range-filter');
    const apiHealthTimeRangeFilterEng = document.getElementById('api-health-time-range-filter-eng');
    const apiHealthTimeRangeFilterProd = document.getElementById('api-health-time-range-filter-prod');
    
    if (apiHealthTimeRangeFilter) {
        apiHealthTimeRangeFilter.addEventListener('change', () => updateAPIHealth(''));
    }
    if (apiHealthTimeRangeFilterEng) {
        apiHealthTimeRangeFilterEng.addEventListener('change', () => updateAPIHealth('-eng'));
    }
    if (apiHealthTimeRangeFilterProd) {
        apiHealthTimeRangeFilterProd.addEventListener('change', () => updateAPIHealth('-prod'));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Role Selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            if (role === 'business-leader') {
                showPage('business-leader-page');
            } else if (role === 'engineering') {
                showPage('engineering-page');
            } else if (role === 'product') {
                showPage('product-page');
            }
        });
    });
    
    // Initialize landing page animations
    animateMetrics();
    // Setup filter listeners
    setupFilters();
    
    // Initialize product view detailed summary (open by default)
    const productDetailedSummary = document.getElementById('detailed-summary-content-prod');
    if (productDetailedSummary) {
        // If it's collapsed, open it
        if (productDetailedSummary.classList.contains('collapsed')) {
            productDetailedSummary.classList.remove('collapsed');
        }
        // Initialize charts and animations for product view (always initialize since it's open by default)
        setTimeout(() => {
            animateDetailedMetrics('-prod');
            initializeFlowVolumeTrendChart('-prod');
            initializeLatencyTrendChart('-prod');
            initializeRejectionAverageTrendChart('-prod');
        }, 100);
    }
});

