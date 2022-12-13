import React from 'react'
import { useState } from 'react'
import Input from '../../01 - Atoms/Input/Input'
import './Suggestion.scss'

export default function Suggestion({data,handleSelection,handleChange}) {
  const [showSuggestions,setShowSuggestion] = useState(false)
  const [value,setValue] = useState("")

  const handleSuggestion = (e) => {
    setValue(e.currentTarget.value)
    setShowSuggestion(true)
    handleChange(e.currentTarget.value)
  }

  const handleSelectedAddress = (suggestion) => {
    setValue(suggestion.properties.label)
    setShowSuggestion(false)
    handleSelection(suggestion)
  };

  return (
    <div className="suggestion">
      <Input type="search" name="suggestion" placeholder="Addresses" required={true} handleOnChange={handleSuggestion} value={value}/>
      {
        data?.data && value && showSuggestions &&
          <div className="suggestion suggestion__container">
            <ul className="suggestion__list">
              {
                data.data.features.map((suggestion,index)=>{
                  return (
                    <li key={suggestion.properties.id} className="suggestion__item" onClick={()=>handleSelectedAddress(suggestion)}>
                      {suggestion.properties?.label}
                    </li>
                  )
                })
              }
            </ul>
          </div>
      }
    </div>
  )
}
