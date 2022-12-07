import "./Label.scss"
export default function Label({htmlFor,children}) {
  return (
    <label htmlFor={htmlFor} className="form__label">{children}</label> 
  )
}
