import React, { useMemo, Fragment, useContext, useState } from 'react';
import {ProductContext} from 'vtex.product-context';
import styles from './styles.css'
import Titulo from './componentes/Titulo'
import Atributo from './componentes/Atributo';

interface PropsI {
    isShow: boolean,
    tituloAtributo: string,
    tamaño: string
}
interface OptionsI {
    IS_SHOW: boolean,
    TITULO_ATRIBUTO: string
    TAMAÑO: string
}
const OPTIONS:OptionsI = {
    IS_SHOW:true,
    TITULO_ATRIBUTO: 'Titulo del Bloque',
    TAMAÑO: '24px'
}

const Atributos = (props: PropsI) => {
    const {isShow, tituloAtributo, tamaño} = props
    const { product } = useContext(ProductContext);
    const properties = product.properties
    return useMemo(() =>{
        return (
            <>
                {isShow ? 
                    <div className={styles.ContenedorAtributos}>
                        <Titulo
                            tituloAtributo={tituloAtributo}
                            tamaño={tamaño}
                        />
                        <Atributo 
                            properties={properties}
                        />
                    </div>
                : <Fragment/>

                }
            </>
        )
    },[props])
}
Atributos.schema = {
    title: 'Componente Atributos',
    type: 'object',
    properties: {
        isShow:{
            title: "Ocultar el componente?",
            type: 'boolean',
            default: OPTIONS.IS_SHOW
        },
        tituloAtributo:{
            title: "Titulo del contenedor",
            type: 'string',
            default: OPTIONS.TITULO_ATRIBUTO
        },
        tamaño: {
            title: "Tamaño del titulo",
            type: "string",
            default: OPTIONS.TAMAÑO
        }
    }
}
Atributos.defaultProps = {
    isShow:OPTIONS.IS_SHOW,
    tituloAtributo: OPTIONS.TITULO_ATRIBUTO,
    tamaño:OPTIONS.TAMAÑO
}
export default Atributos