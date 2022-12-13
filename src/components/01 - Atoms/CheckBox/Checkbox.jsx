import './Checkbox.scss'

export default function Checkbox({handleSelect,name,checked,label}) {
  return (
   <div className="checkbox">
        <input type="checkbox" name={name} id={name} onChange={handleSelect} checked={checked} className="form__input form__input--checkbox"/>
        <label htmlFor={name} className="checkbox__label">{label}</label>
   </div>
  )
}
