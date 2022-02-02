import React, {Fragment, useContext, useMemo} from 'react'
import {ProductContext} from 'vtex.product-context'
import styles from'./style.css'
import { pathOr } from 'ramda';

interface PropsI {
    isShow: boolean,
    lowerUnitsTitle: string,
    lastUnitTitle: string,
    higherUnitsRange: number,
    lowerUnitsRange: number,
    lastUnit: number
}
interface PropsOptionsI {
    IS_SHOW: boolean,
    LOWER_UNITS_TITLE: string,
    LAST_UNIT_TITLE: string,
    HIGHER_UNITS_RANGE: number,
    LOWER_UNITS_RANGE: number,
    LAST_UNIT: number
}

const OPTIONS:PropsOptionsI = {
    IS_SHOW:true,
    LOWER_UNITS_TITLE: '¡Últimas unidades!',
    LAST_UNIT_TITLE: 'Last Unit Title',
    HIGHER_UNITS_RANGE: 5,
    LOWER_UNITS_RANGE: 2,
    LAST_UNIT: 1
}

const StockAlert = ({isShow, lowerUnitsTitle, lastUnitTitle, higherUnitsRange, lowerUnitsRange, lastUnit}: PropsI) => {
    // const {isShow, lowerUnitsTitle, lastUnitTitle, higherUnitsRange, lowerUnitsRange, lastUnit} = props

    const {selectedItem} = useContext<ProductContext | any>(ProductContext);
    // const productos = selectedItem?.sellers[0]?.commertialOffer?.AvailableQuantity;
    const productos = pathOr(0,['sellers', 0, 'commertialOffer', 'AvailableQuantity'], selectedItem)

    const stock = () => {
        /// ACA CREAMOS ESTE IF DONDE SE LE AGREGA UN RANGO DE PRECIOS PARA AVISARNOS CUANDO QUEDEN LAS ULTIMAS UNIDADES / TAMBIEN PARA QUE NOS IMPRIMA CUANDO QUEDE LA ULTIMA UNIDAD
       if(productos >= lowerUnitsRange && productos <= higherUnitsRange) {
            return <span className={styles.DescriptionStock__text}>{lowerUnitsTitle}</span>
       } else if (productos === lastUnit) {
            return <span className={styles.DescriptionStock__textLastUnit}>{lastUnitTitle}</span>
       } else {
            return ''
       }
    }
    return useMemo(() => {
        return(

            //// EN ESTE IF ESTAMOS PIDIENDO QUE SI isShow ES TRUE SE MUESTRE EL COMPONENTE SINO NO HACE NADA
            <>
                { isShow ? 
                    <div className={styles.DescriptionStock}>{stock()}</div>
                    :
                    <Fragment/>
                }
            </>
        )
    },[selectedItem, productos, isShow, lowerUnitsTitle, lastUnitTitle, higherUnitsRange, lowerUnitsRange, lastUnit])
}

StockAlert.schema = {
    title: 'StockAlert',
    type: 'object',
    properties: {
        isShow: {
            title: 'Is Show?',
            type: 'boolean',
            default: OPTIONS.IS_SHOW
        },
        lowerUnitsTitle: {
            title: 'Lower Units Title',
            type: 'string',
            default: OPTIONS.LOWER_UNITS_TITLE
        },
        lastUnitTitle: {
            title: 'Last Unit Title',
            type: 'string',
            default: OPTIONS.LAST_UNIT_TITLE
        },
        higherUnitsRange:{
            title: 'Higher Units Range',
            type: 'number',
            default: OPTIONS.HIGHER_UNITS_RANGE
        },
        lowerUnitsRange:{
            title: 'Lower Units Range',
            type: 'number',
            default: OPTIONS.LOWER_UNITS_RANGE
        },
        lastUnit: {
            title: 'Last Unit',
            type: 'number',
            default: OPTIONS.LAST_UNIT
        }
    }
}

/// ACA ENVIAMOS EL DEFAULT A LAS PROPS QUE PUEDEN SER MODIFICABLES DESDE LA CARPETA DONDE SE APLIQUE EL COMPONENTE
StockAlert.defaultProps = {
    lowerUnitsTitle: OPTIONS.LOWER_UNITS_TITLE,
    lastUnitTitle: OPTIONS.LAST_UNIT_TITLE,
    higherUnitsRange: OPTIONS.HIGHER_UNITS_RANGE,
    lowerUnitsRange: OPTIONS.LOWER_UNITS_RANGE,
    lastUnit: OPTIONS.LAST_UNIT
}
export default StockAlert