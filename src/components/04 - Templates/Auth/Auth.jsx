import { Outlet } from "react-router-dom";
import "./Auth.scss"
import Illustration from "../../../assets/images/Oil_lamp-bro--primary.svg"

export default function Auth() {
    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__form">
                    <Outlet />
                </div>
                <div className="auth__illustration">
                    <img src={Illustration} alt="" />
                </div>
            </div>
        </div>
    )
}
