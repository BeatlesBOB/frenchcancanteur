import './Modal.scss'
import Form from '../../03 - Organisms/Form/Form'
import Form__Control from '../Form__Control/Form__Control'
import Label from '../../01 - Atoms/Label/Label'
import Input from '../../01 - Atoms/Input/Input'
import { useEffect } from 'react'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useState } from 'react'
import useFirebase from '../../../hooks/useFirebase'
import Appointement__item from '../Appointement__Item/Appointement__item'
import Button from '../../01 - Atoms/Button/Button'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Heading from "../../01 - Atoms/Heading/Heading"
import Error from '../../01 - Atoms/Error/Error'

export default function Modal({open,brocantistId,setModalIsOpen}) {
    const [appointements,setAppointements] = useState([])
    const [date,setDate] = useState(new Date().toISOString().substring(0,10))
    const [hour,setHour] = useState(new Date().getHours()+':'+new Date().getMinutes())

    const {db} = useFirebase();
    const {currentUser} = useContext(AuthContext)
    const [error,setError] = useState(null)
     

    useEffect(()=>{
        const q = query(collection(db, "appointements"), where("brocantist__id", "==", brocantistId), where("date","==",date));
        getDocs(q).then((docs)=>{
            docs.forEach((doc) => {
                setAppointements([...appointements,doc.data()])
            });
        });
    },[date])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isAvailable = appointements.filter((appointement)=>{
            appointement.date === date && appointement.hour === hour
        })
        if(isAvailable !== -1){
            console.log(currentUser)
            const doc = await addDoc(collection(db, "appointements"), {
                date,
                hour: e.currentTarget.hour.value,
                brocantist__id:brocantistId,
                user__id:currentUser.id
            });
            setAppointements([...appointements,doc])
        } else {
            setError("Crénaux déjà pris")
        }
    }


  return (
    <div className={`modal ${open && "modal--open"}`}>
        <dialog open={open} className="modal__content">
            <div className="modal__header">
                <Button style="secondary" handleCLick={()=>{setModalIsOpen(!open)}}>X</Button>
                {
                    error && <Error>{error}</Error>
                }
            </div>
            <div className="modal__container">
                <div className="modal__list">
                    <Heading Tag="h3" type="tertiary" >Les rendez vous de la journée</Heading>
                    {
                        appointements.map((appointement)=>{
                            return <Appointement__item date={appointement.date} hour={appointement.hour} /> 
                        })
                    }
                </div>
                <Form handleSubmit={handleSubmit} className="appointement">
                    <Input value={brocantistId} type="hidden" />
                    <Form__Control>
                        <Label>Date du rendez vous </Label>
                        <Input type="date" name="date" required={true} handleOnChange={(e)=>{setDate(e.currentTarget.value)}}></Input>
                    </Form__Control>
                    <Form__Control>
                        <Label>Heure du rendez vous</Label>
                        <Input type="time" name="hour" required={true} handleOnChange={(e)=>{setHour(e.currentTarget.value)}}></Input>
                    </Form__Control>
                    <Button style="primary" type="submit">Prendre un rendez vous</Button>
                </Form>
            </div>
        </dialog>
    </div>
  )
}
