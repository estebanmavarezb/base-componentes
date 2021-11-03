import React, { Fragment, useMemo } from 'react'
import styles from '../styles.css'

interface PropertiesI {
    properties: Property[]
}

interface Property {
    name: string,
    values: string
}
const Atributo = (props: PropertiesI) => {
    const {properties} = props
    return useMemo(() => {
        return (
            <div className={styles.ContenedorAtributo}>
                {properties && properties.length ? 
                    properties.map((e:Property) => (
                        <div className={styles.atributo}>
                            <span className={styles.nombreAtributo}>{e.name}</span>
                            <span className={styles.valorAtributo}>{e.values}</span>
                        </div>
                    ))
                : <Fragment/>}
            </div>
        )
    },[properties])
}

export default Atributo
