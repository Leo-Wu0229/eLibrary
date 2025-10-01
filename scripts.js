document.addEventListener('DOMContentLoaded', function() {
    
    // --- SEMESTER (OUTER) ACCORDION LOGIC ---
    // Note: The toggleSemester function is usually defined in the HTML for simple use,
    // but the functionality is integrated here for a unified JS file.
    
    // Helper function to toggle semester content
    window.toggleSemester = function(button) {
        const content = button.nextElementSibling;
        const statusIcon = button.querySelector('.folder-status i');
        
        // Toggle the max-height style
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            statusIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            // Set height to content's scroll height plus a buffer (e.g., 50px)
            content.style.maxHeight = content.scrollHeight + 50 + "px";
            statusIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
    };


    // --- SUBJECT (INNER) ACCORDION LOGIC ---
    const subjectToggles = document.querySelectorAll('.accordion-toggle');

    subjectToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const statusIcon = this.querySelector('.folder-status i');
            const isActive = content.style.maxHeight;
            const semesterContent = this.closest('.semester-content');

            // 1. Close all other SUBJECT accordion contents in the same SEMESTER container
            semesterContent.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content) {
                    c.style.maxHeight = null;
                    c.previousElementSibling.querySelector('.folder-status i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });

            // 2. Toggle the current subject content
            if (!isActive) {
                // Set height to scrollHeight + a little extra padding (e.g., 30px)
                content.style.maxHeight = content.scrollHeight + 30 + "px"; 
                statusIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                content.style.maxHeight = null;
                statusIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
            
            // 3. Crucial Step: Recalculate and adjust the parent semester's height
            if (semesterContent && semesterContent.style.maxHeight) {
                 // A short delay ensures the browser registers the subject height change first
                setTimeout(() => { 
                    semesterContent.style.maxHeight = semesterContent.scrollHeight + 50 + "px";
                }, 500); 
            }
        });
    });


    // --- 4. Scroll Reveal Animation Logic ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of element must be visible
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});