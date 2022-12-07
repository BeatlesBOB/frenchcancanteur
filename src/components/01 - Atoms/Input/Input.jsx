import "./Input.scss"

export default function Input({type,name,placeholder,required,autoComplete}) {
  return (
    <input className="form__input" type={type} name={name} id={name} placeholder={placeholder} required={required} autoComplete={autoComplete}/>
   )
}
