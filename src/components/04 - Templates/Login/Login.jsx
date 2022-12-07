import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Error from "../../02 - Atoms/Error/Error";
import Form from "../../04 - Organisms/Form/Form";
import Form__Control from "../../03 - Molecules/Form__Control/Form__Control";
import Form__Actions from "../../03 - Molecules/Form__Actions/Form__Actions";
import Label from "../../02 - Atoms/Label/Label";
import Input from "../../02 - Atoms/Input/Input";
import Link from "../../02 - Atoms/Link/Link";
import Button from "../../01 - Ions/Button/Button";

export default function Login() {
    const {setCurrentUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const [error,setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const email =  e.currentTarget.email.value
        const password = e.currentTarget.password.value

        //login
    }

    return (
        <Form handleSubmit={handleSubmit} className="login">
            {
                error && <Error>{error}</Error>
            }
            <Form__Control>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" placeholder="Email..." required={true} autoComplete="email" />
            </Form__Control>
            <Form__Control>
                <Label htmlFor="password">Mot de passe</Label>
                <Input type="password" name="password" placeholder="Mot de passe..." required={true} autoComplete="current-password" />
            </Form__Control>
            <Form__Control>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" placeholder="Email..." required={true} autoComplete="email" />
            </Form__Control>
            <Form__Actions>
                <Link href="/register">Besoin d'un compte ?</Link>
                <Button style="primary">Se connecter</Button>
           </Form__Actions>
        </Form>
    )
}
