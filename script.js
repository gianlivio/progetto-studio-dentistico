// Gestione header trasparente/solido in base allo scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.remove('header-transparent');
        header.classList.add('header-solid');
    } else {
        header.classList.add('header-transparent');
        header.classList.remove('header-solid');
    }
});

// Toggle menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Slider testimonianze
const testimonialContainer = document.querySelector('.testimonial-container');
const sliderDots = document.querySelectorAll('.slider-dot');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');
let currentSlide = 0;
const totalSlides = 3; // Aggiorna questo numero in base al numero effettivo di testimonianze

// Array di testimonianze dinamiche
const testimonials = [
    {
        image: '/api/placeholder/200/200',
        name: 'Maria C.',
        role: 'Paziente dal 2019',
        quote: 'Dopo anni di paura del dentista, ho trovato nello Studio Angilletti un ambiente accogliente e professionale. Il Dott. Angilletti ha risolto i miei problemi dentali con grande competenza e umanità.'
    },
    {
        image: '/api/placeholder/200/200',
        name: 'Andrea B.',
        role: 'Paziente dal 2021',
        quote: 'Mia figlia ha sempre avuto timore delle visite dentistiche, ma il team dello Studio Angilletti è riuscito a metterla a suo agio. L\'approccio con i bambini è davvero speciale!'
    },
    {
        image: '/api/placeholder/200/200',
        name: 'Giuseppe M.',
        role: 'Paziente dal 2020',
        quote: 'Ho completato un trattamento di implantologia con risultati eccellenti. Tutto il processo è stato spiegato chiaramente e la qualità del lavoro è stata impeccabile. Consiglio vivamente!'
    }
];

// Funzione per cambiare slide
function showSlide(index) {
    if (index >= totalSlides) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - 1;
    }
    
    // Aggiorna il contenuto della testimonianza
    const testimonial = testimonials[index];
    const testimonialCard = document.querySelector('.testimonial-card');
    const image = testimonialCard.querySelector('.testimonial-image img');
    const quote = testimonialCard.querySelector('.testimonial-quote');
    const author = testimonialCard.querySelector('.testimonial-author');
    const role = testimonialCard.querySelector('.testimonial-role');
    
    image.src = testimonial.image;
    image.alt = testimonial.name;
    quote.textContent = testimonial.quote;
    author.textContent = testimonial.name;
    role.textContent = testimonial.role;
    
    // Aggiorna la classe attiva del dot
    sliderDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    currentSlide = index;
}

// Event listeners per i controlli dello slider
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

if (prevArrow && nextArrow) {
    prevArrow.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextArrow.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Cambio automatico delle slide ogni 5 secondi
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Smooth scrolling per i link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
            
            // Chiudi il menu mobile se aperto
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Gestione form di contatto
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Raccogli i dati del form
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Qui inseriresti la logica per inviare i dati a un server
        // Per ora mostriamo un alert di conferma
        alert('La tua richiesta è stata inviata! Ti contatteremo presto per confermare l\'appuntamento.');
        
        // Reset del form
        this.reset();
    });
}

// Animazioni al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza il carosello testimonianze
    showSlide(0);
    
    // Animazione per le card dei servizi e chi siamo
    const serviceCards = document.querySelectorAll('.service-card');
    const chiSiamoCards = document.querySelectorAll('.chi-siamo-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    if (chiSiamoCards.length > 0) {
        chiSiamoCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * index);
        });
    }
});

// Animazioni allo scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva elementi per animazioni allo scroll
document.querySelectorAll('.about-image, .about-content, .team-card, .technology-item, .chi-siamo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Effetto parallasse per il video di "Chi Siamo"
window.addEventListener('scroll', () => {
    const chiSiamoSection = document.getElementById('chi-siamo');
    if (chiSiamoSection) {
        const teamVideo = document.getElementById('team-video');
        const scrollPosition = window.scrollY;
        const chiSiamoPosition = chiSiamoSection.offsetTop;
        
        // Calcolo della posizione per l'effetto parallasse
        if (scrollPosition > chiSiamoPosition - window.innerHeight && 
            scrollPosition < chiSiamoPosition + chiSiamoSection.offsetHeight) {
            const parallaxValue = (scrollPosition - (chiSiamoPosition - window.innerHeight)) * 0.15;
            teamVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${parallaxValue}px))`;
        }
    }
});

// Aggiunge la classe in-view agli elementi quando appaiono nel viewport
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.in-view').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});