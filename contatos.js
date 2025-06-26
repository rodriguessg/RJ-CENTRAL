document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-section button")
  const searchInput = document.querySelector(".search-section input")
  const contatoCards = document.querySelectorAll(".contato-card")

  // Funcionalidade de busca
  function realizarBusca() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Limpar highlights se busca estiver vazia
      contatoCards.forEach((card) => {
        card.classList.remove("highlight")
        card.style.display = "block"
      })
      return
    }

    let encontrados = 0

    contatoCards.forEach((card) => {
      const searchData = card.getAttribute("data-search") || ""
      const cardText = card.textContent.toLowerCase()

      if (searchData.includes(searchTerm) || cardText.includes(searchTerm)) {
        card.classList.add("highlight")
        card.style.display = "block"
        encontrados++

        // Scroll suave para o primeiro resultado
        if (encontrados === 1) {
          setTimeout(() => {
            card.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }, 300)
        }
      } else {
        card.classList.remove("highlight")
        card.style.display = "none"
      }
    })

    // Mostrar mensagem se nenhum resultado for encontrado
    if (encontrados === 0) {
      mostrarMensagemNaoEncontrado()
    } else {
      removerMensagemNaoEncontrado()
    }
  }

  function mostrarMensagemNaoEncontrado() {
    // Remove mensagem anterior se existir
    removerMensagemNaoEncontrado()

    const mensagem = document.createElement("div")
    mensagem.className = "no-results-message"
    mensagem.innerHTML = `
      <div style="text-align: center; padding: 40px; background: white; border-radius: 15px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <i class="fa-solid fa-search" style="font-size: 3rem; color: #64748b; margin-bottom: 20px;"></i>
        <h3 style="color: #1e293b; font-family: 'Antenna Bold', sans-serif; margin-bottom: 10px;">Nenhum resultado encontrado</h3>
        <p style="color: #64748b; font-family: 'Antenna Regular', sans-serif;">Tente buscar por nome, cargo, departamento ou sigla.</p>
      </div>
    `

    document.querySelector(".contatos-container").appendChild(mensagem)
  }

  function removerMensagemNaoEncontrado() {
    const mensagem = document.querySelector(".no-results-message")
    if (mensagem) {
      mensagem.remove()
    }
  }

  // Event listeners para busca
  if (searchButton && searchInput) {
    searchButton.addEventListener("click", realizarBusca)

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        realizarBusca()
      }
    })

    // Busca em tempo real (opcional)
    searchInput.addEventListener("input", () => {
      // Debounce para evitar muitas chamadas
      clearTimeout(searchInput.searchTimeout)
      searchInput.searchTimeout = setTimeout(realizarBusca, 300)
    })
  }

  // Funcionalidade de clique nos cards para destacar
  contatoCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove highlight de outros cards
      contatoCards.forEach((c) => c.classList.remove("highlight"))

      // Adiciona highlight ao card clicado
      card.classList.add("highlight")

      // Remove highlight após 3 segundos
      setTimeout(() => {
        card.classList.remove("highlight")
      }, 3000)
    })
  })

  // Funcionalidade de filtro por seção (opcional)
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

        // Destacar seção temporariamente
        targetSection.style.background = "linear-gradient(135deg, #f0f9ff, #ffffff)"
        setTimeout(() => {
          targetSection.style.background = "white"
        }, 2000)
      }
    })
  })

  // Funcionalidade para copiar informações de contato
  const contatoInfos = document.querySelectorAll(".contato-info p")

  contatoInfos.forEach((info) => {
    info.addEventListener("click", () => {
      const texto = info.textContent.trim()

      // Extrair apenas o número de telefone ou email
      let textoParaCopiar = texto
      if (texto.includes("@")) {
        textoParaCopiar = texto.split(" ").find((part) => part.includes("@"))
      } else if (texto.includes("(21)")) {
        textoParaCopiar = texto.replace(/.*($$21$$.*)/g, "$1").trim()
      }

      navigator.clipboard
        .writeText(textoParaCopiar)
        .then(() => {
          // Feedback visual
          const originalBg = info.style.background
          info.style.background = "linear-gradient(135deg, #10b981, #059669)"
          info.style.color = "white"
          info.style.borderRadius = "8px"
          info.style.padding = "5px 10px"
          info.style.transition = "all 0.3s ease"

          setTimeout(() => {
            info.style.background = originalBg
            info.style.color = ""
            info.style.borderRadius = ""
            info.style.padding = ""
          }, 1000)
        })
        .catch(() => {
          console.log("Erro ao copiar para área de transferência")
        })
    })
  })

  // Tooltip para informar sobre a funcionalidade de cópia
  contatoInfos.forEach((info) => {
    info.title = "Clique para copiar"
    info.style.cursor = "pointer"
  })
})
