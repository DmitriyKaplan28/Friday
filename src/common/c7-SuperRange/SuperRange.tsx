import React, { DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {Box, Slider} from "@mui/material";



type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRangePropsType = DefaultInputPropsType & {
    value1: number
    value2: number
    onChangeRange: (value: number) => void
    onChangeRange2: (value: number) => void
    minValue?: number
    maxValue?: number
    disabled?: boolean
};

const SuperRange: React.FC<SuperRangePropsType> = (
    {
        type,
        onChange, onChangeRange,
        className,
        value,value1,
        value2, onChangeRange2, minValue,
        maxValue, disabled,
        ...restProps
    }
) => {


    const onChangeCallback = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as number)
        if (value1 && value2 && value2 < value1 + 2 && value2 !== 100) {
            onChangeRange2 && onChangeRange2(value1)
        }
    }

    return (

        <Box sx={{width: 300}}>
            <Slider getAriaLabel={() => 'Temperature range'}
                    value={value1}
                    onChange={onChangeCallback}
                    disabled={disabled}
                    min={minValue ? minValue : 0}
                    max={maxValue ? maxValue : 100}
            />
        </Box>
    )
}

export default SuperRange
