const courses = [
    { name: "CSE 111", type: "CSE" },
    { name: "CSE 110", type: "CSE" },
    { name: "CSE 210", type: "CSE" },
    { name: "WDD 130", type: "WDD" },
    { name: "WDD 131", type: "WDD" },
    { name: "WDD 231", type: "WDD" }
];

document.addEventListener('DOMContentLoaded', function() {
    const courseList = document.querySelector('.course-list');
    const creditsInfo = document.querySelector('.credits-info');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const creditMap = {
        "CSE 110": 2,
        "CSE 111": 2,
        "CSE 210": 4,
        "WDD 130": 2,
        "WDD 131": 2,
        "WDD 231": 2
    };

    function renderCourses(filter) {
        courseList.innerHTML = '';
        const filtered = filter === 'All'
            ? courses
            : courses.filter(c => c.type === filter);

        let totalCredits = 0;

        filtered.forEach(course => {
            const div = document.createElement('div');
            div.classList.add('course-item');
            div.textContent = course.name;
            courseList.appendChild(div);
            totalCredits += creditMap[course.name] || 0;
        });

        creditsInfo.textContent = `The total credits for course listed above is ${totalCredits}`;
    }

    renderCourses('All');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderCourses(this.textContent);
        });
    });
});