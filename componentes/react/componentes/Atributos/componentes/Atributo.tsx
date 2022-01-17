import React, {Fragment, useMemo} from 'react';
import styles from '../styles.css'

interface PropertiesI {
    properties: Property[],
    fontWeightAtributo: number,
    fontWeightValue:number,
    tamañoAtributo: number,
    tamañoValue: number
}
interface Property {
    name: string,
    values: string
}
const Atributo = (props: PropertiesI) => {
    const {
        properties,
        fontWeightAtributo,
        fontWeightValue,
        tamañoAtributo,
        tamañoValue
    } = props
    return useMemo(() => {
        console.log(properties)
        return(
            <div className={styles.ContenedorAtributo}>
                {properties && properties.length ?
                    properties.map(e => (
                        <div className={styles.atributo}>
                            <span 
                                className={styles.nombreAtributo}
                                style={{fontWeight: fontWeightAtributo, fontSize: `${tamañoAtributo}px`}}
                            >{e.name}:</span>
                            <span 
                                className={styles.valorAtributo}
                                style={{fontWeight: fontWeightValue, fontSize: `${tamañoValue}px`}}
                            >{e.values}</span>
                        </div>
                    ))
                
                : <Fragment/>
                }
            </div>
        )
    },[props, properties])
}

export default Atributo