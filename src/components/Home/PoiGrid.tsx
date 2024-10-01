'use client';
import React, { useEffect } from 'react'
import { NewPoi, PoI } from '@/app/home/page'
import PoiCard from './PoiCard'
import instance from '@/constants/axios';
import { helveticaBold, helveticaLight } from '@/fonts';
import LoadingPoiCard from './LoadingPoiCard';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

const PoiGrid = ({NewPoiList} : {NewPoiList : NewPoi[]}) => {
  const [poiList, setPoiList] = React.useState<PoI[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const { user } = useUser();
  const router = useRouter();



  function getPoIList() {
    instance.get('/poi').then(response => {
      setPoiList(response.data.pois)
        setIsLoading(false)
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
    <div className="relative w-full -translate-y-8 glass-effect " id='Chat'>
    
    {/* Person Grid with Live Filtering */}
    
    <div className="flex flex-col items-center gap-5 md:gap-0 md:flex-row justify-between my-2 p-7">
      {/* Title */}
      <p className={`text-[34px] text-white ml-1 ${helveticaBold.className}`}>Our Minds</p>
      {/* Search bar */}
      <div className={`bg-background rounded-full w-[90%] sm:w-[400px] md:mr-10 ${helveticaLight.className}`}>
        <input type="text" placeholder="Search for a person" className="py-3 px-4 rounded-full w-full  text-white bg-background border-none outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-5 p-10 1.5xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
    {isLoading && Array.from({ length: 6 }).map((_, index) => (
            <LoadingPoiCard key={`${index}_${isLoading}`} />
          ))}
    {filteredPoiList.map((poi, index) => (
  <PoiCard
    key={`${index}_${poi.name}`}
    id={poi.id}
    name={poi.name}
    image={poi.image}
    profession={poi.type}
    isNew={NewPoiList.map((newPoi) => newPoi.poi.name).includes(poi.name)}
    disableDefaultClick={!user}
    onClick={!user ? () => router.push('/authenticate') : undefined} 
  />
))}

    </div>
    </div>

  )
}

export default PoiGrid