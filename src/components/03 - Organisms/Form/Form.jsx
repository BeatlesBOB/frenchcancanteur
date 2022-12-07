import "./Form.scss"

export default function Form({handleSubmit,className,children}) {
  return (
    <form onSubmit={handleSubmit} className={`form form__${className}`}>
        {children}
    </form>
  )
}
