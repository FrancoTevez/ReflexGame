import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [play, setPlay] = useState("jugar")
  const [contador, setContador] = useState(0)
  const [score, setScore] = useState(1)
  const [position, setPosition] = useState([])
  const [position2, setPosition2] = useState([])
  const [position3, setPosition3] = useState([])
  const [animation, setAnimation] = useState("aparece")
  const [animation2, setAnimation2] = useState("aparece")
  const [animation3, setAnimation3] = useState("aparece")
  const [colores, setColores] = useState("crimson")
  const [frase, setFrase] = useState("")
  const [dificultad, setDificultad] = useState("48px")

  function funcFrase(){
    if(Math.round((contador / 10) * 100) / 100 < 5){
      setFrase("¡Es casi imposible meter este tiempo!") 
    }else if(Math.round((contador / 10) * 100) / 100 >= 3 && Math.round((contador / 10) * 100) / 100 < 8){
      setFrase("Sos una bestia, !Mira el tiempo que metiste!")
    }else if(Math.round((contador / 10) * 100) / 100 >= 4 && Math.round((contador / 10) * 100) / 100 < 10){
      setFrase("Estás muy rápido, ¿No estás jugando desde el celu no?")
    }else if(Math.round((contador / 10) * 100) / 100 >= 5.5 && Math.round((contador / 10) * 100) / 100 < 14){
      setFrase("Metiste un buen tiempo, ¡Pero podés mejorarlo!")
    }else{
      setFrase("¡No es un buen tiempo, intentalo de nuevo!")
    }
  }
  
  useEffect(() => {
    let interval;
    if(play == "reiniciar"){
      if(score < 10){
        setFrase("Terminaste antes, este tiempo no cuenta.")
      }
    }
    if(play == "terminar"){ 
      setScore(1)
      for (let i = 1; i < 4; i++) {
        let top =  Math.floor(Math.random() * 100)
        let left = Math.floor(Math.random() * 100)
        if(top > 80){
          if(dificultad == "100px"){
            top -= 15
          }else{
            top -= 10
          }
        }
        if(left > 80){
          if(dificultad == "100px"){
            left -= 15
          }else{
            left -= 10
          }
        }  
        if(i == 1){
          setPosition([
           top, left
         ])
       }else if(i == 2){
         setPosition2([
           top, left
         ])
       }else{
         setPosition3([
           top, left
         ])
       }
      }
      setContador(0)
    }
    if(play == "terminar"){
      interval = setInterval(() => { setContador((prevContador) => prevContador +1)  }, 100);
    }

    return () => clearInterval(interval)
  }, [play, dificultad])
  
  function clickFigura(num) {
    setScore((prevScore) => prevScore + 1)
    let top =  Math.floor(Math.random() * 100)
    let left = Math.floor(Math.random() * 100)
    if(top > 80){
      if(dificultad == "100px"){
        top -= 15
      }else{
        top -= 10
      }
    }
    if(left > 80){
      if(dificultad == "100px"){
        left -= 15
      }else{
        left -= 10
      }
    }  
    if(num == 1){
       setPosition([
        top, left
      ])
      animation == "aparece" ? setAnimation("aparece2") : setAnimation("aparece")
    }else if(num == 2){
      setPosition2([
        top, left
      ])
      animation == "aparece" ? setAnimation2("aparece2") : setAnimation2("aparece")
    }else{
      setPosition3([
        top, left
      ])
      animation == "aparece" ? setAnimation3("aparece2") : setAnimation3("aparece")
    }
   
    if(score == 30){
      funcFrase()
      setPlay("reiniciar")
    }
  }
  
  return (
    <div className='contenedor'>
      <span>{Math.round((contador / 10) * 100) / 100} segundos</span>
      <div className='contColores'>
        <div className='contDificultad'>
          <button type='button' className={`botonDificultad BDextreme ${dificultad == "15px" && "bActivo"}`} onClick={() => setDificultad("15px")} >EXTREME</button>
          <button type='button' className={`botonDificultad BDhard ${dificultad == "30px" && "bActivo"}`} onClick={() => setDificultad("30px")}>HARD</button>
          <button type='button' className={`botonDificultad BDmedium ${dificultad == "48px" && "bActivo"}`} onClick={() => setDificultad("48px")}>MEDIUM</button>
          <button type='button' className={`botonDificultad BDeasy ${dificultad == "100px" && "bActivo"}`} onClick={() => setDificultad("100px")}>EASY</button>
        </div>
        <div>
          <button type='button' className='botonColores crimson' onClick={() => setColores("crimson")} style={{width: `${colores == "crimson" ? 32 : 25}px`, height: `${colores == "crimson" ? 32 : 25}px`}}></button>
          <button type='button' className='botonColores white' onClick={() => setColores("white")} style={{width: `${colores == "white" ? 32 : 25}px`, height: `${colores == "white" ? 32 : 25}px`}}></button>
          <button type='button' className='botonColores yellow' onClick={() => setColores("yellow")} style={{width: `${colores == "yellow" ? 32 : 25}px`, height: `${colores == "yellow" ? 32 : 25}px`}}></button>
          <button type='button' className='botonColores sienna' onClick={() => setColores("sienna")} style={{width: `${colores == "sienna" ? 32 : 25}px`, height: `${colores == "sienna" ? 32 : 25}px`}}></button>
          <button type='button' className='botonColores skyblue' onClick={() => setColores("skyblue")} style={{width: `${colores == "skyblue" ? 32 : 25}px`, height: `${colores == "skyblue" ? 32 : 25}px`}}></button>
          <button type='button' className='botonColores violet' onClick={() => setColores("blueviolet")} style={{width: `${colores == "blueviolet" ? 32 : 25}px`, height: `${colores == "blueviolet" ? 32 : 25}px`}}></button>
        </div>
      </div>
      <div className='contenedorFigura'>
        {play == "reiniciar" && <h2>{frase}</h2>}
        {play == "jugar" && <h2>Hacé 30 clicks en el menor tiempo posible!</h2>}
        {play == "terminar" && <><figure onClick={() => clickFigura(1)} style={{top: `${position[0]}%`, left: `${position[1]}%`, height: `${dificultad}`, width: `${dificultad}`, animation: `${animation} 0.2s`, backgroundColor: `${colores}`}}></figure>
        <figure onClick={() => clickFigura(2)} style={{top: `${position2[0]}%`, left: `${position2[1]}%`, height: `${dificultad}`, width: `${dificultad}`, animation: `${animation2} 0.2s`, backgroundColor: `${colores}`}}></figure>
        <figure onClick={() => clickFigura(3)} style={{top: `${position3[0]}%`, left: `${position3[1]}%`, height: `${dificultad}`, width: `${dificultad}`, animation: `${animation3} 0.2s`, backgroundColor: `${colores}`}}></figure></> }
      </div>
      <div className='contToques'>
        <p>TOQUES: {score - 1}</p>
      </div>
      <div className='contBoton'>
        {play == "jugar" && <button onClick={() => setPlay("terminar")} type='button' className='botonJuego'>Jugar</button>}
        {play == "terminar" && <button onClick={() => setPlay("reiniciar")} type='button' className='botonJuego'>Terminar</button>}
        {play == "reiniciar" && <button onClick={() => setPlay("terminar")} type='button' className='botonJuego'>Reiniciar</button>}
      </div>
    </div>
  )
}

export default App
