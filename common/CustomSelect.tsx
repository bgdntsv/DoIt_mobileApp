import { ColorPalette } from '../assets/colors'
import { Select } from 'native-base'
import React from 'react'
import { useGlobalStyles } from '../hooks/useUI'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { InterfaceSelectProps } from 'native-base/lib/typescript/components/primitives/Select/types'

interface PROP_TYPE extends InterfaceSelectProps {
    items: Array<{
        label: string
        value: string
    }>
}

export const CustomSelect = ({ items, ...prop }: PROP_TYPE) => {
    const globalStyles = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)

    return (
        <Select
            _item={{
                color: globalStyles.span.color,
                fontFamily: globalStyles.span.fontFamily,
                fontSize: globalStyles.span.fontSize,
            }}
            color={ColorPalette[theme].mainFont}
            fontSize={globalStyles.span.fontSize}
            fontFamily={globalStyles.span.fontFamily}
            paddingLeft={-1}
            _selectedItem={{ bg: ColorPalette[theme].third }}
            {...prop}
        >
            {items.map(({ label, value }, i) => (
                <Select.Item label={label} value={value} key={i} shouldRasterizeIOS={true}/>
            ))}
        </Select>
    )
}
