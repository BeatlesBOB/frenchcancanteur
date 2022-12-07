import React from 'react'

export default function Suggestion({autocompletedAddress}) {
  return (
    <div className="suggestion">
      <div className="suggestion suggestion__container">
        { autocompletedAddress?.data &&
          <ul className="suggestion__list">
            {
              autocompletedAddress?.data.features.map((suggestion)=>{
                  return (
                    <li className="suggestion__item" key={suggestion.properties.id}>
                      <button className="suggestion__btn" type="button" onClick={()=>handleSelectedAddress(suggestion)}>
                        {suggestion.properties?.label}
                      </button>
                    </li>
                  )
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}
