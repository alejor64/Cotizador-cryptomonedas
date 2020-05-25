import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Error from './Error'
import useMoneda from '../hooks/useMoneda'
import useCryptomoneda from '../hooks/useCryptomoneda'

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Formulario = ({setMoneda, setCryptomoneda}) => {

    const [listaCriptomonedas, setListaCriptomonedas] = useState([])
    const [error, setError] = useState(false)

    const MONEDAS= [
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    const [ moneda, SeleccionMoneda ] = useMoneda('Elige tu Moneda', '', MONEDAS)
    const [ cryptomoneda, SelectCrypto ] = useCryptomoneda('Elige tu Cryptomoneda', '', listaCriptomonedas)

    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const res = await axios.get(url)

            setListaCriptomonedas(res.data.Data)
        }

        consultarAPI()
    }, [])

    const cotizarMoneda = (e) => {
        e.preventDefault()

        if(!moneda || !cryptomoneda){
            setError(true)
            return
        }

        setError(false)
        setMoneda(moneda)
        setCryptomoneda(cryptomoneda)
        
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {
                error && <Error mensaje="Todos los campos son obligatorios"/>
            }
            <SeleccionMoneda />
            <SelectCrypto/>
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario
