'use client';
import React, { useEffect } from 'react'
import { PoI } from '@/app/home/page'
import PoiCard from './PoiCard'
import instance from '@/constants/axios';
import { helveticaBold, helveticaLight } from '@/app/fonts';

const PoiGrid = () => {
  const [poiList, setPoiList] = React.useState<PoI[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  const NewPoiList = [
    {name: 'Albert Einstein', image: 'albert-bg1.png', desc: 'The visionary physicist who redefined our understanding of space, time, and energy'},
    {name: 'MLK', image: 'martin-bg.png', desc: 'The civil rights leader who championed equality and justice through nonviolence'},
    {name: 'Isaac Newton', image: 'newton-bg.png', desc: 'The groundbreaking physicist and mathematician who laid the foundation for classical mechanics'},
  ]

  function getPoIList() {
    instance.get('/poi').then(response => {
      setPoiList(response.data.pois)
    }).catch(err => {
      console.log(err)
    })
  }
  
  const filteredPoiList = poiList ? poiList.filter(poi =>
    poi.name.toLowerCase().includes(searchQuery)
  ) : [];

  useEffect(() => {
    getPoIList()
  },[])

  return (
    <div className="absolute w-[98%] -top-2 glass-effect">
    
    {/* Person Grid with Live Filtering */}
    
    <div className="flex justify-between my-2 p-7">
      {/* Title */}
      <p className={`text-[34px] text-white ml-1 ${helveticaBold.className}`}>Our Minds</p>
      {/* Search bar */}
      <div className={`bg-background rounded-full mr-10 ${helveticaLight.className}`}>
        <input type="text" placeholder="Search for a person" className="py-3 px-4 rounded-full w-[400px] text-white bg-background border-none outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>

    {/* Person Grid */}
    <div className="grid grid-cols-6 gap-3 p-10">
     {filteredPoiList.map((poi, index) => (
       <PoiCard key={index} id={poi.id} name={poi.name} image={poi.image} profession={poi.type} isNew={NewPoiList.map(poi => poi.name).includes(poi.name)}/>
      ))}
    </div> 
    </div>

  )
}

export default PoiGrid