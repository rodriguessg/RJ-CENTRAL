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

            section.style.background = "linear-gradient(135deg, #e3f2fd, #ffffff)"
            section.style.transition = "background 0.5s ease"

            setTimeout(() => {
              section.style.background = ""
            }, 2000)

            found = true
            return
          }
        })

        if (!found) {
          mostrarNotificacao("Termo não encontrado. Tente: SuperVia, malha, municípios, parceria", "info")
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

  const animatedElements = document.querySelectorAll(".info-card, .malha-item, .municipio-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })

  // Contador animado para números
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
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
          const number = Number.parseInt(numeroElement.textContent.replace(/\D/g, ""))

          if (number) {
            numeroElement.textContent = "0"
            animateCounter(numeroElement, number)
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

  // Destacar municípios ao hover
  const municipioCards = document.querySelectorAll(".municipio-card")

  municipioCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Remove destaque de outros cards
      municipioCards.forEach((c) => c.classList.remove("highlight-municipio"))

      // Adiciona destaque ao card atual
      card.classList.add("highlight-municipio")
    })

    card.addEventListener("mouseleave", () => {
      card.classList.remove("highlight-municipio")
    })
  })

  // Status da operação em tempo real (simulado)
  function atualizarStatusOperacao() {
    const agora = new Date()
    const hora = agora.getHours()

    let status = "Em operação"
    let cor = "#28a745"

    // Simular horários de menor movimento
    if (hora >= 0 && hora < 5) {
      status = "Operação reduzida"
      cor = "#ffc107"
    } else if (hora >= 22) {
      status = "Operação noturna"
      cor = "#17a2b8"
    }

    const operacaoCard = document.querySelector(".info-card.operacao")
    if (operacaoCard) {
      const existingStatus = operacaoCard.querySelector(".status-operacao")
      if (existingStatus) existingStatus.remove()

      const statusElement = document.createElement("div")
      statusElement.className = "status-operacao"
      statusElement.innerHTML = `
        <i class="fa-solid fa-circle" style="color: ${cor};"></i>
        ${status}
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

      operacaoCard.appendChild(statusElement)
    }
  }

  atualizarStatusOperacao()
  setInterval(atualizarStatusOperacao, 300000) // Atualiza a cada 5 minutos
})

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = "info") {
  const notificacao = document.createElement("div")
  notificacao.className = `notificacao ${tipo}`

  const cores = {
    success: "#28a745",
    error: "#dc3545",
    info: "#1976d2",
    warning: "#ffc107",
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

// CSS adicional para animações e efeitos
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
  
  .highlight-municipio {
    transform: translateY(-8px) scale(1.05) !important;
    box-shadow: 0 15px 30px rgba(25, 118, 210, 0.2) !important;
    border-top-color: #1976d2 !important;
  }
  
  .municipio-card.capital.highlight-municipio {
    border-top-color: #ffc107 !important;
    box-shadow: 0 15px 30px rgba(255, 193, 7, 0.2) !important;
  }
`
document.head.appendChild(style)
