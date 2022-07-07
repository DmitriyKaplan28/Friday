import React, { DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {Box, Slider} from "@mui/material";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
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
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeRange,
        className,
        value,value1,
        value2, onChangeRange2, minValue,
        maxValue, disabled,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    /*const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        //onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange
    }*/

    const onChangeCallback = (event: Event, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as number)
        if (value1 && value2 && value2 < value1 + 2 && value2 !== 100) {
            onChangeRange2 && onChangeRange2(value1)
        }
    }

    /*const finalRangeClassName = `${s.range} ${className ? className : ''}`*/
   /* function valuetext(value: number) {
        return `${value}°C`;
    }*/

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
        /*<>
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
        </>*/
    )
}

export default SuperRange
