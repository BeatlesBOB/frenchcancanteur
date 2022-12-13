import React from 'react'
import LogoSrc from '../../../assets/images/Logo.svg'
import './Logo.scss'

export default function Logo({hasImg}) {
  return (
    <div className="logo">
        {
            hasImg && <img src={LogoSrc} alt="Logo de l'application" className="logo__img"/>
        }
        <h1 className="logo__text">FrenchCancanteur</h1>   
    </div>
  )
}
