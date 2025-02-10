document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".search-section button");
  const searchInput = document.querySelector(".search-section input");

  searchButton.addEventListener("click", function () {
    alert("Você pesquisou por: " + searchInput.value);
  });

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });
});

// Variáveis para o controle do carrossel
let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

// Função para mover o carrossel
function moveSlide(direction) {
  // Calcula o próximo índice baseado na direção
  currentIndex += direction;

  // Se estiver no final, vai para o início
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  // Atualiza a posição do carrossel
  const newTransformValue = -currentIndex * 100;
  document.querySelector(
    ".carousel-container"
  ).style.transform = `translateX(${newTransformValue}%)`;
}

// Adicionando os eventos para as setas de navegação
document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
document.querySelector(".next").addEventListener("click", () => moveSlide(1));



document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelector(".carrossel-destaque-slides");
  const totalSlides = document.querySelectorAll(".carrossel-destaque-slide").length;
  const navContainer = document.querySelector(".carrossel-destaque-nav");
  let index = 0;

  // Criar botões de navegação
  for (let i = 0; i < totalSlides; i++) {
      let button = document.createElement("button");
      button.setAttribute("data-index", i);
      button.addEventListener("click", function() {
          index = parseInt(this.getAttribute("data-index"));
          updateSlide();
      });
      navContainer.appendChild(button);
  }

  function updateSlide() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll(".carrossel-destaque-nav button").forEach((btn, idx) => {
          btn.classList.toggle("active", idx === index);
      });
  }

  // Ativar primeiro botão
  document.querySelectorAll(".carrossel-destaque-nav button")[0].classList.add("active");
});