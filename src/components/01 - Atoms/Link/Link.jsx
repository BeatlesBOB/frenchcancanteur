import { Link as A } from "react-router-dom"
import './Link.scss'

export default function Link({href,children}) {
  return (
    <A to={href} className="btn btn--link">{children}</A>
  )
}
