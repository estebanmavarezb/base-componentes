import React from 'react';
import styles from '../styles.css'
interface Title {
    tituloAtributo: string,
    fontWeightTitulo: number,
    tamañoTitulo: number
}
const Titulo = (props: Title) => {
    const {tituloAtributo, fontWeightTitulo, tamañoTitulo} = props
    return (
        <h2 
            className={styles.TituloAtributos}
            style={{fontWeight: fontWeightTitulo, fontSize:`${tamañoTitulo}px`}}
        >{tituloAtributo}</h2>
    )
}
export default Titulo