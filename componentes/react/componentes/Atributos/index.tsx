import React, { useMemo, Fragment, useContext} from 'react';
import {ProductContext} from 'vtex.product-context';
import styles from './styles.css'
import Titulo from './componentes/Titulo'
import Atributo from './componentes/Atributo';

interface PropsI {
    isShow: boolean,
    tituloAtributo: string,
    subTitleBoolean: boolean
    subTitle: string,
    backgroundContainer:any
    tamañoContenedor: number,
    flexDirectionContainer?:any,
    fontWeightTitulo: number,
    fontWeightAtributo: number,
    fontWeightValue:number,
    tamañoTitulo:number,
    tamañoAtributo:number
    tamañoValue:number
}

const Atributos = (props: PropsI) => {
    const {
        isShow, 
        tituloAtributo,
        subTitleBoolean,
        subTitle,
        tamañoContenedor,
        backgroundContainer,
        flexDirectionContainer,
        fontWeightTitulo,
        fontWeightAtributo,
        fontWeightValue,
        tamañoTitulo,
        tamañoAtributo,
        tamañoValue
    } = props;
    
    const { product } = useContext(ProductContext);
    const properties = product.properties
    const subTitleTrue = subTitle
    console.log(props)
    return useMemo(() =>{
        return (
            <>
            {isShow ? 
                <div 
                    className={styles.ContenedorAtributos}
                    style={{width: `${tamañoContenedor}%`, flexDirection: flexDirectionContainer, backgroundColor: backgroundContainer}}
                    >
                    <Titulo 
                        tituloAtributo={tituloAtributo}
                        fontWeightTitulo={fontWeightTitulo}
                        tamañoTitulo={tamañoTitulo}
                    />
                    {subTitleBoolean ? <span className={styles.textoSubTitle}>{subTitleTrue}</span> : <Fragment/>}
                    <Atributo
                        properties={properties}
                        fontWeightAtributo={fontWeightAtributo}
                        fontWeightValue={fontWeightValue}
                        tamañoAtributo={tamañoAtributo}
                        tamañoValue={tamañoValue}
                    />
                </div>
            : <Fragment/>}
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
            default: true
        },
        backgroundContainer:{
            title: 'Color de fondo contendor padre',
            type: 'string',
            widget: {
                'ui:widget': 'color'
            }
        },
        tamañoContenedor:{
            title: "Tamaño del contenedor padre",
            type: 'number',
            default: 100
        },
        tituloAtributo:{
            title: "Titulo del contenedor",
            type: 'string',
            default: "Titulo del bloque"
        },
        subTitleBoolean:{
            title: "Desea agregar un sub titulo?",
            type: 'boolean',
            default: false
        },
        subTitleTrue:{
            title: "Texto del sub titulo",
            type: 'string',
            default: ''
        },
        fontWeightTitulo:{
            title: "Font Weight Titulo",
            type: "string",
            description: 'Font Weight del Titulo',
            enum: [
                "100",
                "500",
                "700"
            ],
            enumNames: [
                "light",
                "Normal",
                "Bold"
            ]
        },
        tamañoTitulo:{
            title: "Tamaño del titulo",
            type: 'number',
            description: 'Puede ingresar un numero determinado para darle tamaño al texto',
            default: 22
        },
        flexDirectionContainer: {
            title: "Seleccionar posicion",
            type: "string",
            description: 'Alineacion del bloque',
            enum: [
                "row",
                "column"
            ],
            enumNames: [
                "Fila",
                "Columna"
            ]
        },
        fontWeightAtributo:{
            title: "Font Weight Atributo",
            type: "string",
            enum: [
                "100",
                "500",
                "700"
            ],
            enumNames: [
                "light",
                "Normal",
                "Bold"
            ]
        },
        tamañoAtributo:{
            title: "Tamaño del atributo",
            type: 'number',
            description: 'Puede ingresar un numero determinado para darle tamaño al texto',
            default: 22
        },
        fontWeightValue:{
            title: "Font Weight Valor Atributo",
            type: "string",
            enum: [
                "100",
                "500",
                "700"
            ],
            enumNames: [
                "light",
                "Normal",
                "Bold"
            ]
        },
        tamañoValue:{
            title: "Tamaño del valor de atributo",
            type: 'number',
            description: 'Puede ingresar un numero determinado para darle tamaño al texto',
            default: 22
        },
    }
} 
Atributos.defaultProps = {
    isShow:true,
    tituloAtributo: "Titulo del bloque",
    subTitleBoolean: false,
    subTitle: '',
    backgroundContainer: '#fff',
    tamañoContenedor: 100,
    flexDirectionContainer: 'row',
    fontWeightTitulo: '',
    fontWeightAtributo: '',
    fontWeightValue: '',
    tamañoTitulo: 22,
    tamañoAtributo: 18,
    tamañoValue:18
}
export default Atributos