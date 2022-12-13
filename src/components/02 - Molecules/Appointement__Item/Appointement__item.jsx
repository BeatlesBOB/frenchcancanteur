import "./Appointement__item.scss"
import Modal from "../Modal/Modal"
import Button from "../../01 - Atoms/Button/Button"
import { useEffect, useState } from "react"


export default function Appointement__item({date,hour}) {
  return (
    <div className="appointement__item">
      <p className="appointement__text">{date}</p>
      <p className="appointement__text">{hour}</p>
    </div>
  )
}

