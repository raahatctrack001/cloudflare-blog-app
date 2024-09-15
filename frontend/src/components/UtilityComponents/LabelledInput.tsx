import { ChangeEvent } from "react";

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void,
    id: string,
    type?: string,
}
export default function LabelledInput({label, placeholder, onChange, type, id}: LabelledInputType){
    return <div className='my-2 border-2 p-1 rounded-lg'>
        <p className='font-semibold text-lg'> { label } </p>
        <input 
            className=' py-2 px-1 w-full'
            type={ type||"text" }
            placeholder={ placeholder }
            onChange={ onChange }
            id={ id }
            required           
        />
    </div>
}