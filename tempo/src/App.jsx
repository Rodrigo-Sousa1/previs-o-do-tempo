import { useState, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Lupa from './assets/imagens/lupa.png'
import Wind from './assets/imagens/vento.png'
import Celsius from './assets/imagens/celsius.png'
import Umid from './assets/imagens/umidade.png'
import './App.css'

const EstiloGlobal = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;   
}
`

const Container = styled.section`
   display:flex;
   justify-content:center;
  align-items:center;
  height:100vh;
`
const Display = styled.section`
   display:flex;
    flex-direction:column;
    background-color: #5c54ed;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 2rem;
    color: #fdfdfd;
    border-radius: 1rem;
    max-width: 400px;
`
const Pesquisa = styled.section`
  display:flex;
  justify-content:center;
  align-items:center;
  

  input{
    padding: 0.8rem;
        border: none;
        flex: 1;
        border-radius: 4px;
  }

  button{ 
    padding: 0.5rem;
        margin-left: 8px;
        background-color: #8dd0f5;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 4px;}
        

   img{
      width:23px;
      height:23px;
    }
`
const InforPrincipal = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:9vh;
 
`
const Graus = styled.section`
  display:flex;
  justify-content:center;
  padding:0.5rem;

  p{ color:black;
    font-size:30px;
    font-family:Arial, Helvetica, sans-serif;
  }

  img{
    width:20px;
    height:20px;}
`
const InforSeg = styled.section`

 display:flex;
 width:100%;
 justify-content:center;
 justify-content:space-evenly;

 img{
  width:20px;
  height:20px;
 }

 div{
  display:flex;

 }
  
`
function App() {
  const [count, setCount] = useState(0)
  const [previsao, setPrevisao] = useState('')
  const [previsao5Days, setPrevisao5Days] = useState('')
  const [Temp, setTemp] = useState(0)
  const [Temp5Days, setTemp5Days] = useState(0)
  const [Umidade, setUmidade] = useState(0)
  const [Desc, setDesc] = useState('')
  const [Vento, setVento] = useState(0)
  const InputRef = useRef(0)

  async function searchCity() {
    const city = InputRef.current.values
    const apiKey = "d494c0de78949baae419cee593979595"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
    const apiInfor = await axios.get(url)
    setPrevisao(apiInfor.data)
    // setDesc(apiInfor.data.weather[0].description)
    setTemp(apiInfor.data.main.temp)
    // setUmidade(apiInfor.data.main.humidity)
    // setVento(apiInfor.data.wind.speed)

    console.log(apiInfor.data)
  }

  return (
    <>
      <EstiloGlobal />
      <Container>
        <Display>
          <Pesquisa>
            {/* busca de cidade */}
            <input ref={InputRef} type="text" placeholder='Digite a Cidade' />
            <button onClick={searchCity}><img src={Lupa} /></button>
          </Pesquisa>

          {/* tela de informação de tempo */}

          <InforPrincipal>
            <h2>{previsao.name}</h2>
            {/* <p>{Desc}</p> */}
          </InforPrincipal>

          <Graus>
            <p>{Math.round(Temp)}</p>
            <img src={Celsius} />
          </Graus>

          <InforSeg>
            {/* <div>
              <img src={Wind} />
              <p>Velocidade do vento:</p>
              <p>{Math.round(Vento)}</p>
              <p>km/h</p>
            </div>

            <div>
              <img src={Umid} />
              <p>Umidade:</p>
              <p>{Umidade}</p>
              <p>%</p>
            </div> */}

          </InforSeg>
        </Display>

        {/* <section>
        <h2>Proximos 5 Dias </h2>

        </section> */}

      </Container>
    </>
  )
}

export default App
