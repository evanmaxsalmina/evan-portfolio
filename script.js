document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const indicator = document.querySelector('.nav-indicator');
    const preloader = document.getElementById('preloader');
    
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        preloader.classList.add('hide');
        document.body.style.overflow = 'auto';
        
        const typingText = document.querySelector('.typing-text');
        if(typingText) {
            typingText.style.animation = 'none';
            typingText.offsetHeight; 
            typingText.style.animation = 'typing 6s steps(70, end) infinite';
        }

    }, 3800); 

    function moveIndicator(element) {
        const linkRect = element.getBoundingClientRect();
        const wrapper = element.closest('.nav-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const left = linkRect.left - wrapperRect.left;
        const width = linkRect.width;
        
        indicator.style.transform = `translateY(-50%) translateX(${left}px)`; 
        indicator.style.left = '0'; 
        indicator.style.width = width + 'px';
    }

    const firstLink = navLinks[0];
    if (firstLink) {
        firstLink.classList.add('active');
        moveIndicator(firstLink);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            moveIndicator(this);
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                moveIndicator(link);
            }
        });
    });

    window.addEventListener('resize', function() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            moveIndicator(activeLink);
        }
    });

    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const seeDetailsButtons = document.querySelectorAll('.see-details-btn');

    const projectsData = {
        'kmotors': {
            title: 'KMotors',
            image: 'assets/images/Application.png',
            tags: ['Flutter', 'Firebase', 'Dart', 'Laravel', 'MySQL'],
            overview: 'KMotors is a comprehensive motorcycle workshop management application designed to streamline the booking process for both customers and workshop staff. The app features real-time appointment scheduling, service tracking, inventory management, and payment integration. Built with Flutter for cross-platform compatibility, it provides a seamless user experience on both iOS and Android devices.',
            features: [
                'Real-time appointment booking and management',
                'Service history tracking for customers',
                'Inventory management system for spare parts',
                'Push notifications for appointment reminders',
                'Integrated payment gateway',
                'Workshop staff dashboard for managing bookings',
                'Customer feedback and rating system'
            ]
        },
        'talking-ai': {
            title: 'Talking AI',
            image: 'assets/images/TalkAI.png',
            tags: ['React', 'Python', 'Flask', 'TensorFlow', 'OpenCV'],
            overview: 'Talking AI is an AI-powered web application that transforms static photos into realistic talking videos. Users can upload a photo, select a preferred voice (for example, Indonesian or English), and input custom text. The system then generates a lifelike video where the person in the image moves their lips and speaks naturally according to the provided script.',
            features: [
                'Upload photos and turn them into talking videos instantly',
                'AI-generated lip-sync and facial movements',
                'Multiple language and voice options (including Indonesian)',
                'Custom text-to-speech input for personalized messages',
                'High-quality video generation with natural expressions',
                'Download or share your created videos easily',
                'Fast cloud-based rendering for smooth performance'
            ]
        },
        'weather-checker': {
            title: 'Weather Checker',
            image: 'assets/images/weather.png',
            tags: ['Flutter', 'Dart', 'BLoC', 'REST API', 'OpenWeather'],
            overview: 'Weather Checker is a simple and elegant mobile application that provides real-time weather information for any location worldwide. Built with Flutter and implementing the BLoC pattern for state management, the app offers a clean and intuitive interface for checking current weather conditions, forecasts, and detailed meteorological data.',
            features: [
                'Real-time weather data from OpenWeather API',
                'Search weather by city name or current location',
                'Display temperature, humidity, wind speed, and pressure',
                'Beautiful weather icons and animations',
                '7-day weather forecast',
                'Clean and responsive UI design',
                'BLoC pattern for efficient state management'
            ]
        }
    };

    seeDetailsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalOverview').textContent = project.overview;
                
                const tagsContainer = document.getElementById('modalTags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'tag';
                    tagEl.textContent = tag;
                    tagsContainer.appendChild(tagEl);
                });
                
                const featuresContainer = document.getElementById('modalFeatures');
                featuresContainer.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresContainer.appendChild(li);
                });
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    const filterIndicator = document.querySelector('.filter-indicator');

    function moveFilterIndicator(element) {
        const btnRect = element.getBoundingClientRect();
        const containerRect = element.closest('.skills-filter').getBoundingClientRect();
        
        const left = btnRect.left - containerRect.left;
        const width = btnRect.width;
        
        filterIndicator.style.left = left + 'px';
        filterIndicator.style.width = width + 'px';
    }

    const activeFilterBtn = document.querySelector('.filter-btn.active');
    if (activeFilterBtn) {
        setTimeout(() => {
            moveFilterIndicator(activeFilterBtn);
        }, 100);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            moveFilterIndicator(this);
            
            skillItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateX(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9) translateX(-20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                moveFilterIndicator(activeFilter);
            }
        }, 250);
    });

    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                    moveIndicator(link);
                }
            });
        });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    const mobileNavLinks = document.querySelectorAll('.nav-menu-wrapper .nav-link, .nav-menu-wrapper .nav-cv-btn');

    if (navToggle && navMenuWrapper) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenuWrapper.classList.toggle('active');
            
            if (navMenuWrapper.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenuWrapper.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenuWrapper.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});