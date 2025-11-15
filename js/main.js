window.addEventListener("DOMContentLoaded", () => {

    // --- 1. Hamburger Menu ---
    const menu_btn = document.querySelector(".hamburger");
    const mobile_menu = document.querySelector(".nav-menu");

    menu_btn.addEventListener("click", function () {
        menu_btn.classList.toggle("is-active");
        mobile_menu.classList.toggle("is-active");
    });

    // Close menu when a link is clicked
    mobile_menu.querySelectorAll('.nav-link a').forEach(link => {
        link.addEventListener('click', () => {
            menu_btn.classList.remove("is-active");
            mobile_menu.classList.remove("is-active");
        });
    });

    // --- 2. Advanced: Typing Effect ---
    const typingText = document.getElementById("typing-effect");
    const phrases = [
        "a Cybersecurity Analyst.",
        "a Cloud Security Trainee.",
        "a Python Developer.",
        "a Vulnerability Researcher."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return; // Stop if element doesn't exist

        const currentPhrase = phrases[phraseIndex];
        let typeSpeed = 150;

        if (isDeleting) {
            // Deleting
            typingText.textContent = currentPhrase.substring(0, charIndex--);
            typeSpeed = 50;
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        } else {
            // Typing
            typingText.textContent = currentPhrase.substring(0, charIndex++);
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Wait after finishing typing
                return;
            }
        }
        setTimeout(type, typeSpeed);
    }

    // Start typing on load
    setTimeout(type, 500);


    // --- 3. Advanced: Scroll-in Animations ---
    const hiddenElements = document.querySelectorAll(".hidden-anim");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-anim");
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% is visible
    });

    hiddenElements.forEach((el) => observer.observe(el));


    // --- 4. Advanced: Active Nav Link on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    // Check if the link's href matches the section's id
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px', // Triggers when the section is at the vertical center
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

});