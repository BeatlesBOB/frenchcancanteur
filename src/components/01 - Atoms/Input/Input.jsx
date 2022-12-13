import "./Input.scss"

export default function Input({type,name,placeholder,required,autoComplete,handleOnChange,value}) {
  return (
      <input 
        className={`form__input form__input--${type}`} 
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder} 
        required={required} 
        autoComplete={autoComplete}
        value={value ?? undefined}
        onChange = {handleOnChange ?? undefined}  
      />
   )
}
