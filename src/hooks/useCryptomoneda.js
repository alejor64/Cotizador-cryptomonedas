import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%; 
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
`

const useCryptomoneda = (label, stateInicial, opciones) => {

    const [state, setState] = useState(stateInicial)

    const SelectCrypto = () => {
        return (
            <Fragment>
                <Label>{label}</Label>
                <Select
                    onChange={(e)=> setState(e.target.value)}
                    value={state}
                >
                    <option value=''>-- Seleccione --</option>
                    {opciones.map(cryptomoneda => (
                        <option key={cryptomoneda.CoinInfo.Id} value={cryptomoneda.CoinInfo.Name}>{cryptomoneda.CoinInfo.FullName}</option>
                    ))}
                </Select>
            </Fragment>
        )
    }

    return [state, SelectCrypto, setState]
}

export default useCryptomoneda