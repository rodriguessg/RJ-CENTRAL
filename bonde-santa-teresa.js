// Função para abrir visualização completa do monitoramento
function abrirVisualizacaoCompleta() {
  const url =
    "https://monitoramento.mobilesat.com.br/locator/index.html?t=4ebee7c35e2e2fbedde92f4b2611c141F0AA094FB415B295867B3BD93520050BB6566DD7"
  window.open(url, "_blank", "width=1200,height=800,scrollbars=yes,resizable=yes")
}

// Função para baixar PDF (placeholder)
function baixarPDF() {
  alert("Funcionalidade em desenvolvimento. Em breve você poderá baixar o guia completo do Bonde de Santa Teresa.")
}

// Simulação de dados em tempo real para o monitoramento
function atualizarDadosMonitoramento() {
  const composicoesElement = document.getElementById("composicoes-ativas")
  const proximaPartidaElement = document.getElementById("proxima-partida")
  const statusLinhaElement = document.getElementById("status-linha")
  const capacidadeElement = document.getElementById("capacidade-atual")

  if (composicoesElement) {
    // Simula número de composições ativas (1-3)
    const composicoes = Math.floor(Math.random() * 3) + 1
    composicoesElement.textContent = `${composicoes} ativa${composicoes > 1 ? "s" : ""}`
  }

  if (proximaPartidaElement) {
    // Simula próxima partida (5-20 minutos)
    const minutos = Math.floor(Math.random() * 16) + 5
    proximaPartidaElement.textContent = `${minutos} minutos`
  }

  if (statusLinhaElement) {
    // Status da linha (90% chance de estar operacional)
    const operacional = Math.random() > 0.1
    if (operacional) {
      statusLinhaElement.textContent = "Operacional"
      statusLinhaElement.className = "info-value status-operacional"
    } else {
      statusLinhaElement.textContent = "Manutenção"
      statusLinhaElement.className = "info-value status-manutencao"
    }
  }

  if (capacidadeElement) {
    // Capacidade atual
    const capacidades = ["Normal", "Moderada", "Alta"]
    const capacidade = capacidades[Math.floor(Math.random() * capacidades.length)]
    capacidadeElement.textContent = capacidade
  }
}

// Smooth scroll para âncoras
document.addEventListener("DOMContentLoaded", () => {
  // Atualizar dados de monitoramento a cada 30 segundos
  atualizarDadosMonitoramento()
  setInterval(atualizarDadosMonitoramento, 30000)

  // Smooth scroll para links de âncora
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animação de entrada para elementos quando ficam visíveis
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

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(".info-card, .galeria-item, .pratica-card, .contato-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Funcionalidade de busca simples
  const searchInput = document.querySelector('input[placeholder="Buscar informações..."]')
  const searchButton = document.querySelector("button")

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase().trim()
      if (searchTerm) {
        // Buscar por texto na página
        const allText = document.body.innerText.toLowerCase()
        if (allText.includes(searchTerm)) {
          // Destacar resultado (implementação básica)
          alert(`Encontrado: "${searchTerm}" na página. Use Ctrl+F para localizar.`)
        } else {
          alert(`Termo "${searchTerm}" não encontrado na página.`)
        }
      }
    })

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchButton.click()
      }
    })
  }
})

// Função para verificar se o iframe está carregado
function verificarIframeCarregado() {
  const iframe = document.getElementById("monitoramento-iframe")
  if (iframe) {
    iframe.addEventListener("load", () => {
      console.log("Monitoramento carregado com sucesso")
    })

    iframe.addEventListener("error", () => {
      console.log("Erro ao carregar monitoramento")
      // Mostrar mensagem de erro se necessário
    })
  }
}

// Verificar iframe quando a página carregar
document.addEventListener("DOMContentLoaded", verificarIframeCarregado)

// Função para atualizar horário da última atualização
function atualizarHorarioAtualizacao() {
  const agora = new Date()
  const horario = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const updateTimeElement = document.querySelector(".update-time span")
  if (updateTimeElement) {
    updateTimeElement.textContent = `Última atualização: ${horario}`
  }
}

// Atualizar horário a cada minuto
setInterval(atualizarHorarioAtualizacao, 60000)

// CSS adicional para status de manutenção
const style = document.createElement("style")
style.textContent = `
    .status-manutencao {
        color: #ff9800 !important;
    }
    
    .info-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .iframe-container {
        position: relative;
    }
    
    .iframe-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 49%, rgba(255, 193, 7, 0.1) 50%, transparent 51%);
        pointer-events: none;
        z-index: 1;
    }
`
document.head.appendChild(style)
