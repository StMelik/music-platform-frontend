import React, { useState } from "react"


export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const name = target.name
        const valueInput = target.value

        setValue({
            ...value,
            [name]: valueInput
        })
    }

    return { value, onChange }
}