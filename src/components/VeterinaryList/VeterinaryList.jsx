import { useState } from "react"

export default function VeterinaryList() {
    const [search,setSearch] = useState(null)
    const [veterinary,setVeterinary] = useState(null)

    const handleSearch = () => {

    }

    return (
        <div className="veterinary">
            <input type="search" name="search" id="search" className="veterinary__search" onChange={handleSearch}/>
            <div className="veterinary__list">

            </div>
        </div>
    )
}
