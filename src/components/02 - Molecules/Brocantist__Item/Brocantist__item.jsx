import "./Brocantist__item.scss"
import Modal from "../Modal/Modal"
import Button from "../../01 - Atoms/Button/Button"
import { useEffect, useState } from "react"

export default function Brocantist__Item({lastname,firstname,email,distance,id}) {
  const [modalIsOpen,setModalIsOpen] = useState(false)

  return (
    <>
      <div className="brocantist__item" onClick={()=>{setModalIsOpen(!modalIsOpen)}}>
        <p className="brocantist__text">Nom : {lastname}</p>
        <p className="brocantist__text">Prénom : {firstname}</p>
        <p className="brocantist__text">Email : {email}</p>
        <p className="brocantist__text">Distance : {distance} m</p>
      </div>
      {
        modalIsOpen && <Modal open={modalIsOpen} brocantistId={id} setModalIsOpen={setModalIsOpen}></Modal>
      }
    </>
    
  )
}
