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

            section.style.background = "linear-gradient(135deg, #fff8e1, #ffffff)"
            section.style.transition = "background 0.5s ease"

            setTimeout(() => {
              section.style.background = ""
            }, 2000)

            found = true
            return
          }
        })

        if (!found) {
          mostrarNotificacao("Termo não encontrado. Tente: horários, tarifas, trajeto, galeria", "info")
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

  // Modal da galeria
  const fotoCards = document.querySelectorAll(".foto-card")
  const modal = document.createElement("div")
  modal.className = "modal-galeria"
  modal.innerHTML = `
    <div class="modal-content-galeria">
      <span class="close-modal">&times;</span>
      <img class="modal-img" src="/placeholder.svg" alt="">
      <div class="modal-caption"></div>
    </div>
  `
  document.body.appendChild(modal)

  const modalImg = modal.querySelector(".modal-img")
  const modalCaption = modal.querySelector(".modal-caption")
  const closeModal = modal.querySelector(".close-modal")

  fotoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector(".foto-img")
      const overlay = card.querySelector(".foto-overlay")

      modalImg.src = img.src
      modalCaption.innerHTML = overlay.innerHTML
      modal.style.display = "block"
    })
  })

  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
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

  const animatedElements = document.querySelectorAll(".foto-card, .info-bloco")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })

  // Status em tempo real
  function atualizarStatus() {
    const agora = new Date()
    const hora = agora.getHours()
    const diaSemana = agora.getDay()

    let funcionando = false

    if (diaSemana >= 1 && diaSemana <= 5) {
      if (hora >= 8 && hora < 17) funcionando = true
    } else {
      if (hora >= 9 && hora < 16) funcionando = true
    }

    const horariosBloco = document.querySelector(".info-bloco.horarios")
    if (horariosBloco) {
      const existingStatus = horariosBloco.querySelector(".status-atual")
      if (existingStatus) existingStatus.remove()

      const status = document.createElement("div")
      status.className = "status-atual"
      status.innerHTML = `
        <i class="fa-solid fa-circle" style="color: ${funcionando ? "#28a745" : "#dc3545"};"></i>
        ${funcionando ? "Em funcionamento" : "Fora de funcionamento"}
      `
      status.style.cssText = `
        margin-top: 10px;
        padding: 8px 12px;
        background: ${funcionando ? "#d4edda" : "#f8d7da"};
        border-radius: 10px;
        font-size: 0.8rem;
        font-family: 'Antenna Bold', sans-serif;
        color: ${funcionando ? "#155724" : "#721c24"};
        text-align: center;
      `

      horariosBloco.appendChild(status)
    }
  }

  atualizarStatus()
  setInterval(atualizarStatus, 60000)
})

// Função para baixar PDF
function baixarPDF() {
  mostrarNotificacao("Preparando download do guia...", "info")

  setTimeout(() => {
    mostrarNotificacao("Download iniciado! Verifique sua pasta de downloads.", "success")

    const btn = event.target
    const originalText = btn.innerHTML
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Download Iniciado!'
    btn.style.background = "linear-gradient(135deg, #28a745, #20c997)"

    setTimeout(() => {
      btn.innerHTML = originalText
      btn.style.background = ""
    }, 3000)
  }, 1000)
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = "info") {
  const notificacao = document.createElement("div")
  notificacao.className = `notificacao ${tipo}`

  const cores = {
    success: "#28a745",
    error: "#dc3545",
    info: "#17a2b8",
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

// CSS para animação da notificação
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
