import React, {Fragment, useContext, useMemo, createContext} from 'react'
import {ProductContext} from 'vtex.product-context'
import styles from './style.css'

interface PropsI {
    isShow: boolean,
    lowerUnitsTitle: string
    lastUnitTitle: string
    higherUnitsRange: number
    lowerUnitsRange: number
    lastUnit: number
}

const stockContext = createContext<PropsI | null>(null);
const StockProvider = stockContext.Provider;
export const useContact = () => useContext(stockContext);

const StockAlertPrueba = ({isShow, lowerUnitsTitle, lastUnitTitle, higherUnitsRange, lowerUnitsRange, lastUnit}: PropsI) => {

    const {selectedItem} = useContext<ProductContext | any>(ProductContext);
    let productos = selectedItem?.sellers[0]?.commertialOffer?.AvailableQuantity;

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

    const context: PropsI = useMemo(() => ({
        isShow,
        lowerUnitsTitle,
        lastUnitTitle,
        higherUnitsRange,
        lowerUnitsRange,
        lastUnit
    }), [isShow, lowerUnitsTitle, lastUnitTitle, higherUnitsRange, lowerUnitsRange, lastUnit])

    return(
            isShow ? 
                <StockProvider value={context}>
                    <div className={styles.DescriptionStock}>
                        {stock()}
                    </div>
                </StockProvider>
                
            :
            <Fragment/>
    )
}

StockAlertPrueba.schema = {
    title: 'StockAlert',
        type: 'object',
        properties: {
            isShow: {
                title: 'Is Show?',
                type: 'boolean',
                default: true
            },
            lowerUnitsTitle: {
                title: 'Lower Units Title',
                type: 'string',
                default: '¡Últimas unidades!'
            },
            lastUnitTitle: {
                title: 'Last Unit Title',
                type: 'string',
                default: '¡Última unidad!'
            },
            higherUnitsRange:{
                title: 'Higher Units Range',
                type: 'number',
                default: 5
            },
            lowerUnitsRange:{
                title: 'Lower Units Range',
                type: 'number',
                default: 2
            },
            lastUnit: {
                title: 'Last Unit',
                type: 'number',
                default: 1
            }
        }
}

/// ACA ENVIAMOS EL DEFAULT A LAS PROPS QUE PUEDEN SER MODIFICABLES DESDE LA CARPETA DONDE SE APLIQUE EL COMPONENTE
StockAlertPrueba.defaultProps = {
    lowerUnitsTitle: 'Últimas unidades!',
    lastUnitTitle: '¡Última unidad!',
    higherUnitsRange: 5,
    lowerUnitsRange: 2,
    lastUnit: 1
}



export default StockAlertPrueba