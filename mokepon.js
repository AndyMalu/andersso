const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
sectionReiniciar.style.display ="none"

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById ("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas =document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa =document.getElementById("mapa")

let jugadorId = null
let andymalus = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeAndymalus
let inputHipoye 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesAndymalu
let ataquesAndymaluEnemigo
let botonFuego 
let botonAgua  
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image ()
mapaBackground.src = "./mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



class Andymalu {
constructor (nombre, foto, vida, fotoMapa, id = null) {
  this.id = id
  this.nombre = nombre
  this.foto = foto
  this.vida = vida
  this.ataques = []
  this.ancho = 40
  this.alto = 40
  this.x = aleatorio (0, mapa.width - this.ancho)
  this.y = aleatorio (0, mapa.height - this.alto) 
  this.mapaFoto = new Image ()
  this.mapaFoto.src = fotoMapa
  this.velocidadX = 0
  this.velocidadY = 0
  
}
pintarAndymalu (){
  lienzo.drawImage(
    this.mapaFoto,
    this.x,
    this.y,
    this.ancho,
    this.alto
  )
  
}
}

let hipoye = new Andymalu("Hipoye", "./munecos_andymalu/hipoye.jpg", 5, "./hipoye.png")

let capipepo = new Andymalu("Capipepo", "./munecos_andymalu/capipepo.jpg", 5, "./capipepo.png")

let ratigueya = new Andymalu("Ratigueya", "./munecos_andymalu/ratigueya.jpg", 5, "./ratigueya.webp")



const HIPOYE_ATAQUES = [
  { nombre: "💧", id:"boton-agua"},
{ nombre: "💧", id:"boton-agua"},
{ nombre: "💧", id:"boton-agua"},
{ nombre: "🔥", id:"boton-fuego"},
{ nombre: "❤", id:"boton-tierra"},
]
hipoye.ataques.push(...HIPOYE_ATAQUES)


const CAPIPEPO_ATAQUES = [
  { nombre: "❤", id:"boton-tierra"},
  { nombre: "❤", id: "boton-tierra"},
  { nombre: "❤", id: "boton-tierra"},
  { nombre: "💧", id: "boton-agua"},
  { nombre: "🔥", id: "boton-fuego"},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
  { nombre: "🔥",id: "boton-fuego"},
    { nombre: "🔥",id: "boton-fuego"},
    { nombre: "🔥",id: "boton-fuego"},
    { nombre: "💧",id: "boton-agua"},
    { nombre: "❤",id: "boton-tierra"},
]
  ratigueya.ataques.push(...RATIGUEYA_ATAQUES)



  andymalus.push(hipoye, capipepo, ratigueya)

function iniciarJuego(){

sectionSeleccionarAtaque.style.display ="none"
sectionVerMapa.style.display = "none"

andymalus.forEach((andymalu) => {
opcionDeAndymalus = `
<input type="radio"name="mascota"id=${andymalu.nombre} />
            <label class ="tarjeta-de-andymalu"for=${andymalu.nombre}>
                <p>${andymalu.nombre}</p>   
                <img src=${andymalu.foto} alt=${andymalu.nombre}>    
            </label>
            
`
contenedorTarjetas.innerHTML += opcionDeAndymalus

   inputHipoye = document.getElementById("Hipoye")
   inputCapipepo = document.getElementById("Capipepo")
   inputRatigueya = document.getElementById("Ratigueya")
})

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    
  botonReiniciar.addEventListener("click", reiniciarJuego)

  unirseAlJuego() 

  }

  function unirseAlJuego (){
    fetch("http://localhost:8080/unirse")
    .then(function (res) {
       if(res.ok) {
        res.text()
         .then(function (respuesta) {
          console.log(respuesta)
          jugadorId = respuesta
         })
      }

    })
  }

  function seleccionarMascotaJugador() {

   sectionSeleccionarMascota.style.display ="none"

   

   if (inputHipoye.checked) {
    spanMascotaJugador.innerHTML = inputHipoye.id
    mascotaJugador = inputHipoye.id
 } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaJugador = inputCapipepo.id
    }
    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else {
            alert("selecciona una mascota")
        }

        seleccionarAndymalu(mascotaJugador)
  
extraerAtaques(mascotaJugador)
sectionVerMapa.style.display = "flex"
   iniciarMapa()
     
}

function seleccionarAndymalu(mascotaJugador) {
  fetch(`http://localhost:8080/andymalu/${jugadorId}`, {
method: "post",
headers: {
  "Content-Type": "application/json"
},
body: JSON.stringify({
  andymalu: mascotaJugador
})

  })
}

function extraerAtaques (mascotaJugador){
let ataques
for (let i = 0; i <andymalus.length; i++) {
  if (mascotaJugador === andymalus[i].nombre) {
ataques = andymalus[i].ataques
  }}

mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
ataques.forEach((ataque) => {
  ataquesAndymalu = `
  <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
  `
  contenedorAtaques.innerHTML += ataquesAndymalu
})

 botonFuego = document.getElementById("boton-fuego")
 botonAgua  = document.getElementById("boton-agua")
 botonTierra = document.getElementById("boton-tierra")
 botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque (){
botones.forEach((boton)=> {
  boton.addEventListener ("click", (e) => {
    if (e.target.textContent === "🔥") {
     ataqueJugador.push("FUEGO")
     console.log(ataqueJugador)
     boton.style.backgroound = "#112f58"
     boton.disabled = true
    } else if (e.target.textContent === "💧") {
      ataqueJugador.push("AGUA")
      console.log(ataqueJugador)
      boton.style.backgroound = "#112f58"
      boton.disabled = true
      } else {
        ataqueJugador.push("TIERRA")
     console.log(ataqueJugador)
     boton.style.backgroound = "#112f58"
     boton.disabled = true
      }
      ataqueAleatorioEnemigo()
})
})
      

}

 function  seleccionarMascotaEnemigo(enemigo){
        
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesAndymaluEnemigo = enemigo.ataques
        secuenciaAtaque ()
}

    

  function ataqueAleatorioEnemigo(){
    console.log("Ataques enemigo", ataquesAndymaluEnemigo);
  let ataqueAleatorio = aleatorio(0,ataquesAndymaluEnemigo.length -1)

  if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
    ataqueEnemigo.push("FUEGO")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA")
  } else {
    ataqueEnemigo.push("TIERRA")
  }
   console.log(ataqueEnemigo)
    iniciarPelea()
  }

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate()
  }
}

function indexAmbosOponentes (jugador,enemigo) {
indexAtaqueJugador = ataqueJugador[jugador]
indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

    function combate() {

     for (let index = 0; index < ataqueJugador.length; index++) {
     if(ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes (index, index)
      crearMensaje("EMPATE")
} else if (ataqueJugador[index]=== "FUEGO" && ataqueEnemigo
           [index] === "TIERRA") {
          indexAmbosOponentes(index, index)
          crearMensaje("Ganaste")
          victoriasJugador++
          spanVidasJugador.innerHTML = victoriasJugador
 } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo
           [index] === "FUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje ("GANASTE") 
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
           
}  else if (ataqueJugador [index] === "TIERRA" && ataqueEnemigo
            [index] === "AGUA") {
            indexAmbosOponentes (index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador 
}      else {
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
}
}     
 
      
    revisarvidas ()
    }

    

    function revisarvidas(){
      if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate") 
      } else if (victoriasJugador > victoriasEnemigo) {
          crearMensajeFinal ("FELICITACIONES, GANASTE") 
      } else {
        crearMensajeFinal("Perdiste, Vuelve a intentar")
      }
    }

    function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
  }

  function crearMensajeFinal(ResultadoFinal) {
    
    
  sectionMensajes.innerHTML = ResultadoFinal

    
   sectionReiniciar.style.display ="block"

}
  function reiniciarJuego (){
   location.reload()
}
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
    function pintarCanvas(){
     mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
      mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
      lienzo.clearRect(0,0, mapa.width, mapa.height)
      lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
      )
     mascotaJugadorObjeto.pintarAndymalu()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
     hipoyeEnemigo.pintarAndymalu()
     capipepoEnemigo.pintarAndymalu()
     ratigueyaEnemigo.pintarAndymalu()
     if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.
      velocidadY !== 0) {
        revisarColicion(hipoyeEnemigo)
        revisarColicion(capipepoEnemigo)
        revisarColicion(ratigueyaEnemigo)
}
}
        
    function enviarPosicion(x, y){
    fetch(`http://localhost:8080/andymalu/${jugadorId}/posicion`, {
    method: "post",
    headers: {
    "Content-Type": "application/json"
},
     body: JSON.stringify({
     x,
     y
})
})
     .then(function (res) {
      if (res.ok) {
      res.json()
      .then(function({enemigos}){
      console.log(enemigos)
      enemigos.forEach(function(enemigo){
        let andymaluEnemigo = null
        const andymaluNombre =enemigo.andymalu.nombre || ""
        if (andymaluNombre ==="Hipoye"){
          andymaluEnemigo = new Andymalu("Hipoye", "./munecos_andymalu/hipoye.jpg", 5, "./hipoye.png")
        } else if (andymaluNombre === "Capipepo") {
           andymaluEnemigo = new Andymalu("Capipepo", "./munecos_andymalu/capipepo.jpg", 5, "./capipepo.png")
        } else if (andymaluNombre ==="Ratigueya")  {
           andymaluEnemigo = new Andymalu("Ratigueya", "./munecos_andymalu/ratigueya.jpg", 5, "./ratigueya.webp")
        }
        andymaluEnemigo.x = enemigo.x
        andymaluEnemigo.y = enemigo.y
        andymaluEnemigo.pintarAndymalu()

      })
      

     

     
    })
  }
})


}

    function moverDerecha () {
      mascotaJugadorObjeto.velocidadX = 5
    }

    function moverIzquierda () {
      mascotaJugadorObjeto.velocidadX = -5
    }

    function moverAbajo() {
      mascotaJugadorObjeto.velocidadY = 5
    }

    function moverArriba() {
      mascotaJugadorObjeto.velocidadY = -5
    }

    function detenerMovimiento() {
      mascotaJugadorObjeto.velocidadX = 0
      mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
  switch (event.key) {
    case "ArrowUp":
      moverArriba()
      break
      case "ArrowDown":
      moverAbajo()
      break
      case "ArrowLeft":
      moverIzquierda()
      break
      case "ArrowRight":
      moverDerecha()
      break

    default:
      break;
  }
  
}

     function iniciarMapa (){
      
      mascotaJugadorObjeto = obtenerObjetoMascota (mascotaJugador)
      console.log(mascotaJugadorObjeto, mascotaJugador)
      intervalo = setInterval(pintarCanvas, 50)
    
      window.addEventListener("keydown", sePresionoUnaTecla)

     window.addEventListener("keyup", detenerMovimiento)
     }
 function obtenerObjetoMascota (){
  let ataques
for (let i = 0; i <andymalus.length; i++) {
  if (mascotaJugador === andymalus[i].nombre) {
return andymalus[i]
  }}

 }

 function revisarColicion (enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho 
  const izquierdaEnemigo = enemigo.x 

  const arribaMascota = 
  mascotaJugadorObjeto.y
  const abajoMascota = 
  mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = 
  mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho 
  const izquierdaMascota = 
  mascotaJugadorObjeto.x  

  if ( 
    abajoMascota < arribaEnemigo || 
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota < derechaEnemigo
) {
  return 
  }
  detenerMovimiento ()
  clearInterval (intervalo)
  console.log("Se detecto una colision")
  sectionSeleccionarAtaque.style.display = "flex"
  sectionVerMapa.style.display = "none"
  seleccionarMascotaEnemigo(enemigo)
 
 }

    window.addEventListener("load", iniciarJuego)