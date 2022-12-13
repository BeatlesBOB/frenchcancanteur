import Range from "../../01 - Atoms/Range/Range"
import Logo from "../../01 - Atoms/Logo/Logo"
import Button from "../../01 - Atoms/Button/Button"
import { AuthContext } from "../../../contexts/AuthContext"
import './Sidebar.scss'
import { useContext } from "react"

export default function Sidebar({handleDistance}) {
    const {logout} = useContext(AuthContext)

    return (
        <aside className="sidebar">
            <Logo hasImg={true} />
            <Range name="distance" handleChange={handleDistance}/>
            <Button style="secondary" handleCLick={logout}>Se deconnecter</Button>
        </aside>
    )
}
