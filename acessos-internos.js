document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-section button")
  const searchInput = document.querySelector(".search-section input")
  const sistemaCards = document.querySelectorAll(".sistema-card")

  // Funcionalidade de busca
  function realizarBusca() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Limpar highlights se busca estiver vazia
      sistemaCards.forEach((card) => {
        card.classList.remove("highlight")
        card.style.display = "block"
      })
      return
    }

    let encontrados = 0

    sistemaCards.forEach((card) => {
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
        <h3 style="color: #1e293b; font-family: 'Antenna Bold', sans-serif; margin-bottom: 10px;">Nenhum sistema encontrado</h3>
        <p style="color: #64748b; font-family: 'Antenna Regular', sans-serif;">Tente buscar por nome do sistema, categoria ou funcionalidade.</p>
      </div>
    `

    document.querySelector(".acessos-container").appendChild(mensagem)
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

    // Busca em tempo real
    searchInput.addEventListener("input", () => {
      clearTimeout(searchInput.searchTimeout)
      searchInput.searchTimeout = setTimeout(realizarBusca, 300)
    })
  }

  // Funcionalidade de clique nos cards
  sistemaCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Se não clicou no botão, simula clique no botão
      if (!e.target.closest(".btn-acesso")) {
        const botao = card.querySelector(".btn-acesso")
        if (botao) {
          botao.click()
        }
      }
    })
  })
})

// Função para acessar sistemas
function acessarSistema(sistema) {
  // Aqui você pode adicionar lógica específica para cada sistema
  switch (sistema) {
    case "contracheque-rendimentos":
      console.log("Acessando sistema de contra cheque e informe de rendimentos...")
      // window.location.href = 'https://contracheque.central.rj.gov.br'
      break
    case "catalogo-materiais":
      console.log("Acessando catálogo de materiais...")
      // window.location.href = 'https://catalogo.central.rj.gov.br'
      break
    case "solicitacao-materiais":
      console.log("Acessando solicitação de materiais...")
      // window.location.href = 'https://solicitacao.central.rj.gov.br'
      break
    case "credenciamento":
      console.log("Acessando credenciamento...")
      // window.location.href = 'https://credenciamento.central.rj.gov.br'
      break
    default:
      console.log("Sistema não encontrado:", sistema)
  }

  // Feedback visual temporário
  if (event && event.target) {
    const originalContent = event.target.innerHTML
    const originalBackground = event.target.style.background

    event.target.style.background = "linear-gradient(135deg, #10b981, #059669)"
    event.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Carregando...'

    setTimeout(() => {
      event.target.style.background = originalBackground
      event.target.innerHTML = originalContent
    }, 2000)
  }
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = "info") {
  const notificacao = document.createElement("div")
  notificacao.className = `notificacao ${tipo}`
  notificacao.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${tipo === "success" ? "#10b981" : tipo === "error" ? "#dc2626" : "#3b82f6"};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    ">
      <i class="fa-solid fa-${tipo === "success" ? "check" : tipo === "error" ? "times" : "info"}"></i>
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
