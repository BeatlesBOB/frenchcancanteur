import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Error from "../../components/01 - Atoms/Error/Error";
import Form from "../../components/03 - Organisms/Form/Form";
import Form__Control from "../../components/02 - Molecules/Form__Control/Form__Control";
import Form__Actions from "../../components/02 - Molecules/Form__Actions/Form__Actions";
import Label from "../../components/01 - Atoms/Label/Label";
import Input from "../../components/01 - Atoms/Input/Input";
import Link from "../../components/01 - Atoms/Link/Link";
import Button from "../../components/01 - Atoms/Button/Button";

export default function Login() {
    const {login,error} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email =  e.currentTarget.email.value
        const password = e.currentTarget.password.value
        await login({email,password})
        if(!error){
            navigate('/home')
        }
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
            <Form__Actions>
                <Link href="/register">Besoin d'un compte ?</Link>
                <Button type="submit" style="primary">Se connecter</Button>
           </Form__Actions>
        </Form>
    )
}
