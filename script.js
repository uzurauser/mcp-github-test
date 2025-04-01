// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  })
})

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('nav ul li a')

  let currentSection = ''

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active')
    }
  })
})

// Add scroll animation for elements
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements to animate
document.addEventListener('DOMContentLoaded', () => {
  // Add .fade-in class to elements we want to animate
  const cardsToAnimate = document.querySelectorAll('.feature-card, .mcp-card, .use-case-card, .resource-card')
  cardsToAnimate.forEach(card => {
    card.classList.add('fade-in')
    observer.observe(card)
  })

  // Add CSS for animations
  const style = document.createElement('style')
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav a.active {
            color: var(--primary-color);
        }
        
        nav a.active::after {
            width: 100%;
        }
    `
  document.head.appendChild(style)
}) 