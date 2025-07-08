document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-section button")
  const searchInput = document.querySelector(".search-section input")

  // Funcionalidade de busca
  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase()

      if (searchTerm) {
        const sections = document.querySelectorAll("section")
        let found = false

        sections.forEach((section) => {
          const sectionText = section.textContent.toLowerCase()
          if (sectionText.includes(searchTerm)) {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })

            section.style.background = "linear-gradient(135deg, #e8f5e8, #ffffff)"
            section.style.transition = "background 0.5s ease"

            setTimeout(() => {
              section.style.background = ""
            }, 2000)

            found = true
            return
          }
        })

        if (!found) {
          mostrarNotificacao("Termo não encontrado. Tente: teleférico, reativação, obras, CENTRAL", "info")
        }
      }
    })

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        searchButton.click()
      }
    })
  }

  // Smooth scroll para links internos
  const menuLinks = document.querySelectorAll("nav a[href^='#']")

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animação dos elementos ao scroll
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

  const animatedElements = document.querySelectorAll(".info-card, .reativacao-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })

  // Contador animado para números
  function animateCounter(element, target, duration = 2000, suffix = "") {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start) + suffix
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target + suffix
      }
    }

    updateCounter()
  }

  // Animar contadores quando visíveis
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numeroElement = entry.target.querySelector(".numero-destaque")
        if (numeroElement && !numeroElement.dataset.animated) {
          const text = numeroElement.textContent
          let number = 0
          let suffix = ""

          if (text.includes("km")) {
            number = Number.parseFloat(text.replace(/[^\d.]/g, ""))
            suffix = " km"
          } else if (text.includes("mil")) {
            number = Number.parseInt(text.replace(/\D/g, ""))
            suffix = " mil"
          } else {
            number = Number.parseInt(text.replace(/\D/g, ""))
          }

          if (number) {
            numeroElement.textContent = "0" + suffix
            animateCounter(numeroElement, number, 2000, suffix)
            numeroElement.dataset.animated = "true"
          }
        }
        counterObserver.unobserve(entry.target)
      }
    })
  })

  // Observar cards com números
  const numeroCards = document.querySelectorAll(".info-card")
  numeroCards.forEach((card) => {
    counterObserver.observe(card)
  })

  // Status do projeto em tempo real
  function atualizarStatusProjeto() {
    const statusCard = document.querySelector(".info-card.status")
    if (statusCard) {
      const agora = new Date()
      const hora = agora.getHours()

      let statusTexto = "Em Obras"
      let cor = "#ff9800"

      // Simular diferentes status baseado na hora
      if (hora >= 8 && hora < 18) {
        statusTexto = "Obras em Andamento"
        cor = "#4caf50"
      } else if (hora >= 18 && hora < 22) {
        statusTexto = "Obras Noturnas"
        cor = "#2196f3"
      } else {
        statusTexto = "Obras Pausadas"
        cor = "#ff9800"
      }

      const existingStatus = statusCard.querySelector(".status-projeto")
      if (existingStatus) existingStatus.remove()

      const statusElement = document.createElement("div")
      statusElement.className = "status-projeto"
      statusElement.innerHTML = `
        <i class="fa-solid fa-circle" style="color: ${cor};"></i>
        ${statusTexto}
      `
      statusElement.style.cssText = `
        margin-top: 8px;
        padding: 6px 10px;
        background: ${cor}20;
        border-radius: 8px;
        font-size: 0.8rem;
        font-family: 'Antenna Bold', sans-serif;
        color: ${cor};
        text-align: center;
      `

      statusCard.appendChild(statusElement)
    }
  }

  atualizarStatusProjeto()
  setInterval(atualizarStatusProjeto, 300000) // Atualiza a cada 5 minutos
})

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = "info") {
  const notificacao = document.createElement("div")
  notificacao.className = `notificacao ${tipo}`

  const cores = {
    success: "#4caf50",
    error: "#f44336",
    info: "#00796b",
    warning: "#ff9800",
  }

  const icones = {
    success: "check-circle",
    error: "exclamation-circle",
    info: "info-circle",
    warning: "exclamation-triangle",
  }

  notificacao.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${cores[tipo]};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
      font-family: 'Antenna Regular', sans-serif;
      font-size: 0.9rem;
    ">
      <i class="fa-solid fa-${icones[tipo]}" style="margin-right: 8px;"></i>
      ${mensagem}
    </div>
  `

  document.body.appendChild(notificacao)

  setTimeout(() => {
    notificacao.remove()
  }, 3000)
}

// CSS adicional para animações
const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)
