let lightmode = localStorage.getItem('lightmode');
const mudarTema = document.getElementById('change-theme');
const nav = document.getElementById('nav-bar');

// TEMA CLARO OU ESCURO COM SALVAMENTO NO LOCAL STORAGE
if (lightmode === 'ativo') {
    mudarClaro();
}

mudarTema.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode');
    lightmode !== 'ativo' ? mudarClaro() : manterEscuro();
});

function mudarClaro() {
    document.body.classList.add("lightmode");
    localStorage.setItem('lightmode', 'ativo');
    
    nav.classList.remove("navbar-dark");
    nav.classList.add("navbar-light");

}

function manterEscuro() {
    document.body.classList.remove('lightmode');
    nav.classList.add("navbar-dark");

    localStorage.setItem('lightmode', 'desativado');
}

