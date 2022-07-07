import React from 'react'
import  './SuperDoubleRange.css'
import {Box, Slider} from "@mui/material";

type SuperDoubleRangePropsType = {
    value: [number, number]
    onChangeRange: (value: [number, number]) => void
    minValue?: number
    maxValue?: number
    disabled?: boolean
    //valuetext: (value: number) => void
    // min, max, step, disable, ...

}

/*function valuetext(value: number) {
    return `${value}°C`;
}*/

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {onChangeRange, value, minValue,
        maxValue, disabled
    }
) => {
    // сделать самому, можно подключать библиотеки

    const onChangeCallback = (
        event: Event,
        newValue: number | number[],
    ) => {
        onChangeRange && onChangeRange(newValue as [number, number])
    }

    return (
        <Box sx={{ width: 300}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={onChangeCallback}
                disableSwap
                min={minValue ? minValue : 0}
                max={maxValue ? maxValue : 100}
                disabled={disabled}
            />
        </Box>
    )
}

export default SuperDoubleRange
