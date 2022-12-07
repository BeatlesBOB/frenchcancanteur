import "./Button.scss"

export default function Button({type,children,style}) {
  return (
    <button type={type??"button"} className={`btn btn--${style}`}>
        {children}
    </button>
  )
}
