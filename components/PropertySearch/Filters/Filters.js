import { Input } from "components/Input"
import { useEffect, useState } from "react"
import queryString from 'query-string'
export const Filters = ({onSearch}) => {
          const [petFriendly,setPetFriendly] = useState(false)
          const [hasParking,setHasParking] = useState(false)
          const [minPrice,setMinPrice] = useState("")
          const [maxPrice,setMaxPrice] = useState("")

          const handleSearch = () => {
                     onSearch({
                              petFriendly,
                              hasParking,
                              minPrice,
                              maxPrice
                     })
          }
          useEffect(() => {
            const {
              petFriendly:petFriendlyInitial,
              hasParking:hasParkingInitial,
              minPrice:minPriceInitial,
              maxPrice:maxPriceInitial,
            } = queryString.parse(
              window.location.search
            );
            setPetFriendly(petFriendlyInitial === "true")
            setHasParking(hasParkingInitial === "true")
            setMaxPrice(maxPriceInitial || "" )
            setMinPrice(minPriceInitial || "")
          }, [])
          
  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
          <div className="flex-1">
                    <div>
                              <lable className="cursor-pointer">
                                        <input type="checkbox" chacked={hasParking} onChange={()=> setHasParking(value => !value)}/>
                                        <span className="pl-2">
                                                  has parking
                                        </span>
                              </lable>
                    </div>
                    <div>
                              <lable className="cursor-pointer">
                                        <input type="checkbox"chacked={petFriendly} onChange={()=> setPetFriendly(value => !value)}/>
                                        <span className="pl-2">
                                                  pet friendly
                                        </span>
                              </lable>
                    </div>
          </div>
          <div className="flex-1">
                    <span>Min price</span>
                    <Input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}/>
          </div>
          <div className="flex-1">
                    <span>Max price</span>
                    <Input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}/>
          </div>
          <div className="btn" onClick={handleSearch}>
                    Search
          </div>
    </div>
  )
}
