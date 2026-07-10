const courses = [
    { name: "CSE 111", type: "CSE", credits: 2, completed: true },
    { name: "CSE 110", type: "CSE", credits: 2, completed: false },
    { name: "CSE 210", type: "CSE", credits: 2, completed: false },
    { name: "WDD 130", type: "WDD", credits: 2, completed: true },
    { name: "WDD 131", type: "WDD", credits: 2, completed: false },
    { name: "WDD 231", type: "WDD", credits: 2, completed: false }
];

document.addEventListener('DOMContentLoaded', function () {
    const courseList = document.querySelector('.course-list');
    const creditsInfo = document.querySelector('.credits-info');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderCourses(filter) {
        courseList.innerHTML = '';
        const filtered = filter === 'All'
            ? courses
            : courses.filter(c => c.type === filter);

        const totalCredits = filtered.reduce((sum, course) => sum + (course.credits || 0), 0);

        filtered.forEach(course => {
            const div = document.createElement('div');
            div.classList.add('course-item');
            if (course.completed) {
                div.classList.add('completed');
            }
            div.innerHTML = `
                <span class="course-name">${course.name}</span>
                ${course.completed ? '<span class="course-status">Completed</span>' : ''}
            `;
            courseList.appendChild(div);
        });

        creditsInfo.textContent = `The total credits for course listed above is ${totalCredits}`;
    }

    renderCourses('All');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderCourses(this.textContent);
        });
    });
});