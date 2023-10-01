import React, { useEffect, useState } from 'react'
import './style.css'
import WheatherCard from './WheatherCard';

const Temp = () => {
  const [searchValue ,setSearchValue] = useState("islampur");
  const [tempInfo,setTempInfo]= useState({})

  const getWheatherInfo = async ( )=>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a3006a59a6504a4d0744cbbe7a3d9bd6
      `

      const res =  await fetch(url)
      const data = await res.json()

      // console.log(data)

      const {temp,humidity,pressure}=data.main;
      const {main:weathermood}= data.weather[0];
      const {name}=data
      const {speed}= data.wind;
      const {country,sunset}=data.sys;
      // console.log(temp)


      const myNewWheatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset

      };
      setTempInfo(myNewWheatherInfo)
    }catch(error){
        console.log(error)
    }

  }


    useEffect(()=>{
      getWheatherInfo()
    },[])
  
  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type='search'
            placeholder='search...' autoFocus
            id='search' className='searchTerm' value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}></input>

            <button className='searchButton' type='button' onClick={getWheatherInfo}>Search</button>
        </div>
      </div>

      {/* our temp card 
       */}
       <WheatherCard tempInfo={tempInfo} />

       
    </>
  )
}

export default Temp
