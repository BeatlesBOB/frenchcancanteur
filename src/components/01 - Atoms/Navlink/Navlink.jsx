import { NavLink } from "react-router-dom"

export default function Navlink({href,children}) {
  return (
    <NavLink to={href} className="btn btn--link" activeClassName="btn--link--active">{children}</NavLink>
  )
}
