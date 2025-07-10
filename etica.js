document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll('nav a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Highlight da seção ativa durante o scroll
  const sections = document.querySelectorAll(".compliance-section")
  const navItems = document.querySelectorAll('nav a[href^="#"]')

  function highlightActiveSection() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightActiveSection)

  // Animação de entrada das seções
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Funcionalidade de busca
  const searchInput = document.querySelector(".search-section input")
  const searchButton = document.querySelector(".search-section button")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Mostrar todas as seções
      sections.forEach((section) => {
        section.style.display = "block"
      })
      return
    }

    sections.forEach((section) => {
      const sectionText = section.textContent.toLowerCase()
      if (sectionText.includes(searchTerm)) {
        section.style.display = "block"
        // Destacar o termo encontrado
        section.style.backgroundColor = "#fef3c7"
        setTimeout(() => {
          section.style.backgroundColor = "white"
        }, 2000)
      } else {
        section.style.display = "none"
      }
    })
  }

  searchButton.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Limpar busca quando o campo estiver vazio
  searchInput.addEventListener("input", function () {
    if (this.value === "") {
      sections.forEach((section) => {
        section.style.display = "block"
        section.style.backgroundColor = "white"
      })
    }
  })
})
