import './Range.scss'

export default function Range({name,handleChange}) {
  return (
    <input  type="range" className="form__input form__input--range" id={name} name={name} min={3} max={100} step={1} onChange={handleChange} />
  )
}
