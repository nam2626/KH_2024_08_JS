function showCalendar() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);

    if (!year || !month || month < 1 || month > 12) {
        alert('올바른 년도와 월을 입력해주세요.');
        return;
    }

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

    let calendarHTML = `<h2>${year}년 ${monthNames[month-1]}</h2>`;
    calendarHTML += `
        <table>
            <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
    `;

    let day = 1;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Calendar rows
    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';
        
        // Calendar columns
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDay) {
                // Previous month days
                const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
                const prevDay = prevMonthLastDay - (startingDay - j - 1);
                calendarHTML += `<td class="other-month">${prevDay}</td>`;
            } else if (day > daysInMonth) {
                // Next month days
                calendarHTML += `<td class="other-month">${day - daysInMonth}</td>`;
                day++;
            } else {
                // Current month days
                let classes = [];
                if (j === 0) classes.push('weekend');
                if (year === currentYear && month === currentMonth && day === currentDay) {
                    classes.push('today');
                }
                
                calendarHTML += `<td class="${classes.join(' ')}">${day}</td>`;
                day++;
            }
        }
        
        calendarHTML += '</tr>';
        if (day > daysInMonth && i !== 0) break;
    }

    calendarHTML += '</table>';
    document.getElementById('calendar').innerHTML = calendarHTML;
}

// 페이지 로드 시 현재 년도와 월로 달력 표시
window.onload = function() {
    const now = new Date();
    document.getElementById('year').value = now.getFullYear();
    document.getElementById('month').value = now.getMonth() + 1;
    showCalendar();
}
