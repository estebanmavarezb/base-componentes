import React from 'react'
import styles from '../styles.css'
interface Title {
    tituloAtributo: string
    tamaño: string
}
const Titulo = (props: Title) => {
    const {tituloAtributo, tamaño} = props
    return (
       <h2 
        className={styles.TituloAtributos}
        style={{fontSize: tamaño}}
       >{tituloAtributo}</h2>
    )
}

export default Titulo

