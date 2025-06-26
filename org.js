// Dados dos funcionários
const funcionariosData = {
  "diretoria-executiva": {
    nome: "Fabrício Abílio Duarte de Moura",
    cargo: "Diretor Executivo",
    departamento: "Diretoria Executiva",
    sigla: "DIREXE",
    email: "fabricio.moura@central.rj.gov.br",
    telefone: "(21) 2334-5000",
    descricao:
      "Responsável pela gestão executiva geral da empresa, coordenando todas as diretorias e definindo estratégias corporativas.",
    equipe: ["Assessor Executivo", "Coordenador Geral", "Secretária Executiva"],
  },
  "diretoria-planejamento": {
    nome: "Diretor de Planejamento",
    cargo: "Diretor",
    departamento: "Diretoria de Planejamento",
    sigla: "DIRPLA",
    email: "planejamento@central.rj.gov.br",
    telefone: "(21) 2334-5100",
    descricao: "Responsável pelo planejamento estratégico e operacional da empresa.",
    equipe: ["Coordenador de Projetos", "Analista de Planejamento", "Assistente Técnico"],
  },
  "diretoria-engenharia": {
    nome: "Diretor de Engenharia",
    cargo: "Diretor",
    departamento: "Diretoria de Engenharia e Operação",
    sigla: "DIREO",
    email: "engenharia@central.rj.gov.br",
    telefone: "(21) 2334-5200",
    descricao: "Responsável pelas operações técnicas e de engenharia da empresa.",
    equipe: ["Engenheiro Chefe", "Coordenador de Operações", "Supervisor Técnico"],
  },
  "planejamento-orcamento": {
    nome: "Superintendente de Planejamento",
    cargo: "Superintendente",
    departamento: "Planejamento e Orçamento",
    sigla: "SUPLAN",
    email: "suplan@central.rj.gov.br",
    telefone: "(21) 2334-5110",
    descricao: "Coordena as atividades de planejamento e elaboração orçamentária.",
    equipe: ["Analista de Orçamento", "Coordenador de Planejamento", "Assistente Administrativo"],
  },
  "tecnologia-informacao": {
    nome: "Superintendente de TI",
    cargo: "Superintendente",
    departamento: "Tecnologia da Informação",
    sigla: "SUPTIN",
    email: "suptin@central.rj.gov.br",
    telefone: "(21) 2334-5120",
    descricao: "Gerencia toda a infraestrutura tecnológica e sistemas da empresa.",
    equipe: ["Analista de Sistemas", "Técnico em Informática", "Suporte Técnico"],
  },
  "material-rodante": {
    nome: "Superintendente de Material",
    cargo: "Superintendente",
    departamento: "Material Rodante e Sistemas Eletroeletrônicos",
    sigla: "SUPMRS",
    email: "supmrs@central.rj.gov.br",
    telefone: "(21) 2334-5210",
    descricao: "Responsável pela manutenção e operação do material rodante.",
    equipe: ["Engenheiro Mecânico", "Técnico em Eletrônica", "Operador de Sistemas"],
  },
  "via-permanente": {
    nome: "Superintendente de Via",
    cargo: "Superintendente",
    departamento: "Via Permanente, Obras Civis e Manutenção Predial",
    sigla: "SUPVIP",
    email: "supvip@central.rj.gov.br",
    telefone: "(21) 2334-5220",
    descricao: "Coordena a manutenção da via permanente e obras civis.",
    equipe: ["Engenheiro Civil", "Técnico em Edificações", "Supervisor de Obras"],
  },
  // Gerências
  orcamento: {
    nome: "Gerente de Orçamento",
    cargo: "Gerente",
    departamento: "Orçamento",
    sigla: "GERORT",
    email: "gerort@central.rj.gov.br",
    telefone: "(21) 2334-5111",
    descricao: "Responsável pela elaboração e controle orçamentário.",
    equipe: ["Analista Orçamentário", "Assistente Financeiro"],
  },
  "planejamento-ger": {
    nome: "Gerente de Planejamento",
    cargo: "Gerente",
    departamento: "Planejamento",
    sigla: "GERPLA",
    email: "gerpla@central.rj.gov.br",
    telefone: "(21) 2334-5112",
    descricao: "Coordena os projetos e planejamento estratégico.",
    equipe: ["Analista de Projetos", "Coordenador de Planejamento"],
  },
  "tecnologia-ger": {
    nome: "Gerente de Tecnologia",
    cargo: "Gerente",
    departamento: "Tecnologia da Informação",
    sigla: "GERTIN",
    email: "gertin@central.rj.gov.br",
    telefone: "(21) 2334-5121",
    descricao: "Gerencia os sistemas e infraestrutura de TI.",
    equipe: ["Desenvolvedor", "Administrador de Rede"],
  },
  "sistemas-eletroeletronicos": {
    nome: "Gerente de Sistemas",
    cargo: "Gerente",
    departamento: "Sistemas Eletroeletrônicos",
    sigla: "GERSIS",
    email: "gersis@central.rj.gov.br",
    telefone: "(21) 2334-5211",
    descricao: "Responsável pelos sistemas eletroeletrônicos dos trens.",
    equipe: ["Técnico Eletrônico", "Especialista em Sistemas"],
  },
  "material-rodante-ger": {
    nome: "Gerente de Material",
    cargo: "Gerente",
    departamento: "Material Rodante",
    sigla: "GERMAR",
    email: "germar@central.rj.gov.br",
    telefone: "(21) 2334-5212",
    descricao: "Gerencia a manutenção do material rodante.",
    equipe: ["Mecânico Ferroviário", "Inspetor de Qualidade"],
  },
  "via-permanente-ger": {
    nome: "Gerente de Via",
    cargo: "Gerente",
    departamento: "Via Permanente e Obras Civis",
    sigla: "GERVIP",
    email: "gervip@central.rj.gov.br",
    telefone: "(21) 2334-5221",
    descricao: "Coordena a manutenção da via permanente.",
    equipe: ["Técnico em Ferrovias", "Operador de Máquinas"],
  },
  "manutencao-predial": {
    nome: "Gerente de Manutenção",
    cargo: "Gerente",
    departamento: "Manutenção Predial",
    sigla: "GERMAP",
    email: "germap@central.rj.gov.br",
    telefone: "(21) 2334-5222",
    descricao: "Responsável pela manutenção predial e instalações.",
    equipe: ["Técnico em Edificações", "Eletricista", "Encanador"],
  },
  "operacao-transportes": {
    nome: "Gerente de Operação",
    cargo: "Gerente",
    departamento: "Operação de Transportes",
    sigla: "GEROPT",
    email: "geropt@central.rj.gov.br",
    telefone: "(21) 2334-5223",
    descricao: "Coordena as operações de transporte ferroviário.",
    equipe: ["Controlador de Tráfego", "Operador de Trem", "Supervisor de Operações"],
  },
}

document.addEventListener("DOMContentLoaded", () => {
  const funcionarioCards = document.querySelectorAll(".funcionario-card")
  const modal = document.getElementById("modal-detalhes")
  const modalTitulo = document.getElementById("modal-titulo")
  const modalCorpo = document.getElementById("modal-corpo")
  const closeModal = document.querySelector(".close")
  const tooltip = document.getElementById("tooltip")

  // Event listeners para cada funcionário
  funcionarioCards.forEach((card) => {
    const funcionarioId = card.getAttribute("data-funcionario")

    // Hover para tooltip
    card.addEventListener("mouseenter", (e) => {
      const data = funcionariosData[funcionarioId]
      if (data) {
        tooltip.innerHTML = `
          <strong>${data.nome}</strong><br>
          <em>${data.cargo}</em><br>
          ${data.departamento}
        `
        tooltip.classList.add("show")
      }
    })

    card.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.pageX + 10 + "px"
      tooltip.style.top = e.pageY + 10 + "px"
    })

    card.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show")
    })

    // Click para modal
    card.addEventListener("click", () => {
      const data = funcionariosData[funcionarioId]
      if (data) {
        modalTitulo.textContent = data.nome
        modalCorpo.innerHTML = `
          <div style="margin-bottom: 20px; text-align: center;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #64748b, #475569); margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
              ${data.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
            <h3 style="color: #1e293b; margin-bottom: 5px;">${data.cargo}</h3>
            <p style="color: #64748b; margin-bottom: 15px;">${data.departamento} (${data.sigla})</p>
          </div>
          <div style="margin-bottom: 20px;">
            <h4 style="color: #1e293b; margin-bottom: 10px;">Contato:</h4>
            <p style="margin-bottom: 5px;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin-bottom: 15px;"><strong>Telefone:</strong> ${data.telefone}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <h4 style="color: #1e293b; margin-bottom: 10px;">Descrição:</h4>
            <p style="margin-bottom: 15px;">${data.descricao}</p>
          </div>
          <div>
            <h4 style="color: #1e293b; margin-bottom: 10px;">Equipe:</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              ${data.equipe.map((membro) => `<li style="margin-bottom: 5px;">${membro}</li>`).join("")}
            </ul>
          </div>
        `
        modal.style.display = "block"
      }
    })
  })

  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })

  // Funcionalidade de busca
  const searchButton = document.querySelector(".search-section button")
  const searchInput = document.querySelector(".search-section input")

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase()
      funcionarioCards.forEach((card) => {
        const funcionarioId = card.getAttribute("data-funcionario")
        const data = funcionariosData[funcionarioId]

        if (
          data &&
          (data.nome.toLowerCase().includes(searchTerm) ||
            data.cargo.toLowerCase().includes(searchTerm) ||
            data.departamento.toLowerCase().includes(searchTerm) ||
            data.sigla.toLowerCase().includes(searchTerm))
        ) {
          card.style.border = "3px solid #10b981"
          card.style.transform = "translateY(-10px) scale(1.05)"
          setTimeout(() => {
            card.style.border = ""
            card.style.transform = ""
          }, 3000)
        }
      })
    })

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        searchButton.click()
      }
    })
  }
})
