import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import axios from 'axios'
import Cotizacion from './components/Cotizacion'
import Spiner from './components/Spinner/Spiner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top:5rem;
`

const Heading = styled.h1`
  font-family:'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [moneda, setMoneda] = useState('')
  const [cryptomoneda, setCryptomoneda] = useState('')
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    const cotizarCryptomoneda = async () =>{
      if(!moneda) return

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`
      const res = await axios.get(url)

      setCargando(true)
      
      setTimeout(() => {
        setCargando(false)
        setResultado(res.data.DISPLAY[cryptomoneda][moneda])
      }, 1500)
    }

    cotizarCryptomoneda()

  }, [moneda, cryptomoneda])

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          atl="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCryptomoneda={setCryptomoneda}
        />
        {
          cargando ? <Spiner/> : <Cotizacion resultado={resultado}/>
        }
        
      </div>
    </Contenedor>
  );
}

export default App;
