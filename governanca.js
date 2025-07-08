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
  const sections = document.querySelectorAll("section[id]")
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

  // Animação de entrada para as tabelas
  const tables = document.querySelectorAll(".members-table table")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0"
        entry.target.style.transform = "translateY(20px)"

        setTimeout(() => {
          entry.target.style.transition = "all 0.6s ease"
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, 100)

        tableObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  tables.forEach((table) => {
    tableObserver.observe(table)
  })

  // Funcionalidade de busca
  const searchInput = document.querySelector(".search-section input")
  const searchButton = document.querySelector(".search-section button")

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Reset highlight
      document.querySelectorAll(".highlight-search").forEach((el) => {
        el.classList.remove("highlight-search")
      })
      return
    }

    // Remove highlights anteriores
    document.querySelectorAll(".highlight-search").forEach((el) => {
      el.classList.remove("highlight-search")
    })

    // Busca e destaca o termo
    const textElements = document.querySelectorAll(
      ".section-content p, .section-content li, .members-table td, .committee-card p, .committee-card h5",
    )

    textElements.forEach((element) => {
      const text = element.textContent.toLowerCase()
      if (text.includes(searchTerm)) {
        element.classList.add("highlight-search")

        // Scroll para o primeiro resultado
        if (!document.querySelector(".highlight-search.scrolled")) {
          element.classList.add("scrolled")
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
    })
  }

  searchButton.addEventListener("click", performSearch)

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Tooltip para links de documentos
  const documentLinks = document.querySelectorAll(".document-link")

  documentLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip-doc"
      tooltip.textContent = "Clique para acessar o documento"
      tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `

      document.body.appendChild(tooltip)

      const rect = this.getBoundingClientRect()
      tooltip.style.left = rect.left + "px"
      tooltip.style.top = rect.top - 40 + "px"

      setTimeout(() => {
        tooltip.style.opacity = "1"
      }, 100)

      this.addEventListener(
        "mouseleave",
        () => {
          tooltip.remove()
        },
        { once: true },
      )
    })
  })

  // Contador animado para tabelas (simula dados dinâmicos)
  function animateNumbers() {
    const numberElements = document.querySelectorAll(".members-table tbody tr")

    numberElements.forEach((row, index) => {
      setTimeout(() => {
        row.style.opacity = "0.5"
        setTimeout(() => {
          row.style.opacity = "1"
        }, 100)
      }, index * 50)
    })
  }

  // Executa a animação após 2 segundos
  setTimeout(animateNumbers, 2000)

  // Adiciona classe ativa ao menu baseado na URL
  const currentPath = window.location.pathname
  const menuLinks = document.querySelectorAll("nav a")

  menuLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath.split("/").pop()) {
      link.classList.add("current-page")
    }
  })
})

// CSS adicional para highlights de busca
const searchStyles = document.createElement("style")
searchStyles.textContent = `
    .highlight-search {
        background: linear-gradient(120deg, #fef08a 0%, #facc15 100%) !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
        animation: highlightPulse 2s ease-in-out infinite !important;
    }
    
    @keyframes highlightPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    nav a.active {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
        color: white !important;
        border-radius: 8px !important;
        transform: scale(1.05) !important;
    }
    
    nav a.current-page {
        border-bottom: 3px solid #3b82f6 !important;
        font-weight: bold !important;
    }
`

document.head.appendChild(searchStyles)
