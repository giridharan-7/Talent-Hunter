import React from 'react'
import UpdateCountry from "../UpdateCountry.json"


const FlagSelection = ({setCountry,setShowDropDown}) => {
 
      // source https://api.first.org/data/v1/countries
   
      const handleClick = (country) => { 
        const countryName = country.name;
        const countryCode = country.code;
        setCountry({countryCode,countryName})
        setShowDropDown(false)
        localStorage.setItem("countryCode", country.code)
        localStorage.setItem("countryName", countryName)
    }

    return (
        < >
            {
                UpdateCountry.map((country, index) => { 
                    return (
                        <tr onClick={()=>handleClick(country)} ><td className=' '>
                            <img style={{ width: "33px" }} src={`https://flagsapi.com/${country.code}/flat/64.png`} alt={country.code} />
                        </td></tr>

                    )
                })
            }
           
        </>
    )
}

export default FlagSelection