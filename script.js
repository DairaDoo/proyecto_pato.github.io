document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.getElementById("carousel");
  const prevBtnOriginalClass = document.getElementById("prevBtn").className;
  const nextBtnOriginalClass = document.getElementById("nextBtn").className;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indice_guia = document.getElementById("indice-guia");
  const Duck1Btn = document.getElementById("Duck1");
  const Duck2Btn = document.getElementById("Duck2");
  
  function chooseStartingDuck() {
    
    prevBtn.className = "bg-violet-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
    nextBtn.className = "bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
    indice_guia.style.opacity = 0.5;
    carousel.style.opacity = 0.5;
    document.getElementById('duck1Container').style.opacity = '1';
    document.getElementById('duck2Container').style.opacity = '1';
    nextBtn.setAttribute("disabled", "disabled");

  }

  chooseStartingDuck();

  const duckImages = [
    [
      "./imgs/pato1/1_1x.png",
      "./imgs/pato1/2_1x.png",
      "./imgs/pato1/3_1x.png",
      "./imgs/pato1/4_1x.png",
      "./imgs/pato1/5_1x.png",
      "./imgs/pato1/6_1x.png",
      "./imgs/pato1/7_1x.png",
      "./imgs/pato1/8_1x.png",
      "./imgs/pato1/9_1x.png"
    ],
    [
      "./imgs/pato2/1_1x.png",
      "./imgs/pato2/2_1x.png",
      "./imgs/pato2/3_1x.png",
      "./imgs/pato2/4_1x.png",
      "./imgs/pato2/5_1x.png",
      "./imgs/pato2/6_1x.png",
      "./imgs/pato2/7_1x.png",
      "./imgs/pato2/8_1x.png",
      "./imgs/pato2/9_1x.png"
    ]
  ];


  let currentDuckType = 0;
  let currentIndex = 0;

  async function preLoadImages() {
    let imagesToLoad = duckImages.flat();
    let loadPromises = imagesToLoad.map(imageSrc => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageSrc;
      });
    });
    await Promise.all(loadPromises); // Espera a que todas las imágenes se carguen.
  }

  // Carga todas las imágenes antes de habilitar la funcionalidad del carrusel.
  preLoadImages().then(() => {
    showSlide(currentIndex); // Muestra el primer slide solo después de cargar todas las imágenes.
  }).catch(error => {
    console.error("Error loading images", error);
  });


  function incrementGuideCounter() {

    let indice = Number(indice_guia.innerHTML);

    if (indice >= 9) {
      indice = 1;
      indice_guia.innerHTML = indice;
      return chooseStartingDuck();
    } 

    else if ( indice_guia.innerHTML <= 1) {
      prevBtn.className = prevBtnOriginalClass;
      prevBtn.removeAttribute("disabled");
    }

    indice += 1;

    indice_guia.innerHTML = indice;
    console.log("Indice: " , indice);
  }

  function decrementGuideCounter() {

    let indice = Number(indice_guia.innerHTML);
    
    indice -= 1;
    indice_guia.innerHTML = indice;

    console.log("Indice: " , indice);
  }

  function showSlide(index) {
    updateButtonStates();
    carousel.innerHTML = "";
    const img = document.createElement("img");
    img.src = duckImages[currentDuckType][index];
    img.classList.add("w-full", "flex-shrink-0", "border-4", "border-blue-400", "h-full");
    carousel.appendChild(img);
    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % duckImages[currentDuckType].length;
    showSlide(currentIndex);
    incrementGuideCounter();
    console.log("Current index: ", currentIndex);
    
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + duckImages[currentDuckType].length) % duckImages[currentDuckType].length;
    showSlide(currentIndex);
    decrementGuideCounter();
    console.log("Current index: ", currentIndex);
  }

  

  // Duck 1 function.
  Duck1Btn.addEventListener("click", function() {
    currentDuckType = 0;
    currentIndex = 0;
    showSlide(currentIndex);
    indice_guia.innerHTML = 1; // Reset the guide counter when duck changes
    document.getElementById('duck1Container').style.opacity = '1';
    document.getElementById('duck2Container').style.opacity = '0.33';
    nextBtn.className = nextBtnOriginalClass;
    indice_guia.style.opacity = 1;
    carousel.style.opacity = 1;
    nextBtn.removeAttribute("disabled");
    console.log("Current index: ", currentIndex);
  });

  function updateButtonStates() {
    // If the current index is 0, disable the previous button.
    if (currentIndex === 0) {
        prevBtn.setAttribute("disabled", "disabled");
        prevBtn.className = "bg-violet-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
    }
}

  // Duck 2 function.
  Duck2Btn.addEventListener("click", function() {
    currentDuckType = 1;
    currentIndex = 0;
    showSlide(currentIndex);
    indice_guia.innerHTML = 1; // Reset the guide counter when duck changes
    document.getElementById('duck1Container').style.opacity = '0.33';
    document.getElementById('duck2Container').style.opacity = '1';
    nextBtn.className = nextBtnOriginalClass;
    indice_guia.style.opacity = 1;
    carousel.style.opacity = 1;
    nextBtn.removeAttribute("disabled");
    console.log("Current Index: " , currentIndex)
  });

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);


});
