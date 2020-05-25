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

const useMoneda = (label, stateInicial, opciones) => {

    const [state, setState] = useState(stateInicial)

    const SeleccionarMoneda = () => {
        return (
            <Fragment>
                <Label>{label}</Label>
                <Select
                    onChange={(e)=>setState(e.target.value)}
                    value={state}
                >
                    <option value=''>-- Seleccione --</option>
                    {opciones.map(moneda => (
                        <option key={moneda.codigo} value={moneda.codigo}>{moneda.nombre}</option>
                    ))}
                </Select>
            </Fragment>
        )
    }

    return [state, SeleccionarMoneda, setState]
}

export default useMoneda