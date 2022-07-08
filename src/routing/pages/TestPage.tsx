import React, {ChangeEvent, useState} from 'react'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../common/c7-SuperRange/SuperRange";
import SuperDoubleRange from "../../common/c8-SuperDoubleRange/SuperDoubleRange";


function TestPage() {

    //input, button, checkbox
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'
    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }
    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    //editable span
    const [valueSpan, setValueSpan] = useState<string>('')

    //select, radio
    const arr = ['x', 'y', 'z']
    const [valueForSelectAndRadio, onChangeOption] = useState(arr[1])

    //ranges
    const min = 0
    const max = 100
    const [valueRange1, setValueRange1] = useState<number>(min)
    const [valueRange2, setValueRange2] = useState<number>(max)
    const [valueRange, setValueRange] = useState<number[]>([valueRange1, valueRange2]);
    const handleChange = ([value1, value2]: [number, number]) => {
        setValueRange1(value1)
        setValueRange2(value2)
    }

    return (
        <div>
            {/*input, button, checkbox*/}
            <SuperInputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                error={error}
            />
            <SuperButton
                red // пропсу с булевым значением не обязательно указывать true
                onClick={showAlert}
            >
                delete {/*// название кнопки попадёт в children*/}
            </SuperButton>

            <SuperCheckbox
                checked={checked}
                onChangeChecked={setChecked}
            >
                some text {/*// этот текст попадёт в children*/}
            </SuperCheckbox>

            {/*// onChange тоже должен работать*/}
            <SuperCheckbox checked={checked} onChange={testOnChange}/>
            <hr/>

            {/*editable span*/}

            <SuperEditableSpan
                value={valueSpan}
                onChangeText={setValueSpan}
                spanProps={{children: valueSpan ? undefined : 'enter text...'}}
            />
            <hr/>

            {/*select, radio*/}
            <div>
                <SuperSelect
                    options={arr}
                    value={valueForSelectAndRadio}
                    onChangeOption={onChangeOption}
                />
            </div>
            <div>
                <SuperRadio
                    name={'radio'}
                    options={arr}
                    value={valueForSelectAndRadio}
                    onChangeOption={onChangeOption}
                />
            </div>
            <hr/>

            {/*ranges*/}
            {/*<div>
                <span>{valueRange1}</span>
                <SuperRange value1={valueRange1}
                            value2={valueRange2}
                            onChangeRange={setValueRange1}
                            onChangeRange2={setValueRange2}
                />
            </div>
            <div>
                <span>{valueRange1}</span>
                <SuperDoubleRange value={[valueRange1, valueRange2]}
                                  onChangeRange={handleChange}
                />
                <span>{valueRange2}</span>
            </div>*/}
        </div>
    )
}

export default TestPage

// сделайте по аналогии пустые страницы джун и джун+
// туда будут добавляться следующие дз