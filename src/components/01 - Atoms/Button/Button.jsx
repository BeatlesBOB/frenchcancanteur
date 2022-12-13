import "./Button.scss"

export default function Button({type,children,style,handleCLick}) {
  return (
    <button type={type??"button"} className={`btn btn--${style}`} onClick={handleCLick??undefined}>
        {children}
    </button>
  )
}
