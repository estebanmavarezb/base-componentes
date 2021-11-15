import React, { useMemo, useContext, useCallback, Fragment, ReactElement, cloneElement} from 'react'
import {ProductContext} from 'vtex.product-context';
import styles from './styles.css'
interface PropsI {
    isShow: boolean,
    nameAtributo: string,
    children: ReactElement[]
}
const DestaqueContainer = (props: PropsI) => {
    const { product } = useContext(ProductContext);
    const properties = product?.properties
    const atributoName = props.nameAtributo
    const getProperty = useCallback((prop: string, propertiesArray: any[]) => {
        const property = propertiesArray.find((p:any) => p.name.toLowerCase() === prop.toLocaleLowerCase().trim());
        return property
    },[]);
    const nameProperty = useMemo(() => atributoName.trim() !== '' && properties.length ? getProperty(atributoName, properties) : {}, [atributoName,properties])

    return useMemo(() =>{
        return (
               props.isShow ?
                nameProperty && nameProperty.values[0] !== '' ?

                    <div className={styles.destaqueContainer}>
                        {
                            props?.children?.length ? props?.children.map((element:any) => (cloneElement(element))) : <Fragment/>
                        }
                    </div> : <Fragment/>
               : <Fragment/>
        )
    },[props, nameProperty])
}
DestaqueContainer.schema = {
    title: 'Componente Destaque Container ',
    type: 'object',
    properties: {
        isShow: {
            title: 'is Show?',
            type: 'boolean',
            default: true
        },
        nameAtributo: {
            title: 'Nombre del atributo',
            type: 'string',
            default: ''
        }
    }
}
DestaqueContainer.defaultProps = {
    isShow: true,
    nameAtributo: ''
}
export default DestaqueContainer