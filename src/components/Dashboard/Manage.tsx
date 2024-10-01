import { PoI } from '@/app/home/page';
import instance from '@/constants/axios';
import { helveticaBold } from '@/fonts'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LoadingPoiCard from '../Home/LoadingPoiCard';
import PoiCard from '../Home/PoiCard';
import { BiTrash } from 'react-icons/bi';

const Manage = () => {
    const [pois, setPois] = useState<PoI[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this POI?"
      );
      if (!confirm) {
        return;
      }
      await instance.delete(`/poi/${id}`);
      setPois(pois.filter((poi) => poi.id !== id));
    } catch (err) {
      console.error("Failed to delete POI", err);
    }
  };

    useEffect(() => {
          // Fetch all POIs from the backend when the "All POIs" tab is active
          const fetchPOIs = async () => {
            try {
              const response = await instance.get("/poi");
              setPois(response.data.pois);
              setIsLoading(false);
            } catch (err) {
              console.error("Failed to fetch POIs", err);
            }
          };
    
          fetchPOIs();
      }, []);
  return (
    <Box sx={{ mt: 2 }}>
          <p
            className={`text-center text-[50px] mx-auto ${helveticaBold.className}`}
          >
            Manage POIs
          </p>
          <Box>
            <div className="relative w-full " id="Chat">
              {/* Person Grid with Live Filtering */}

              <div className="flex flex-col items-center gap-5 md:gap-0 md:flex-row justify-between my-2 p-7">
                {/* Title */}
              </div>

              <div className="grid grid-cols-2 gap-5 p-10 1.5xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <LoadingPoiCard key={`${index}_${isLoading}`} />
                    ))
                  : pois.map((poi: PoI, index) => (
                      <div className="relative" key={`${index}_${poi.name}`}>
                        <PoiCard
                          id={poi.id}
                          name={poi.name}
                          image={poi.image}
                          profession={poi.type}
                          disableDefaultClick={true}
                          imageUrl={true}
                        />
                        <button className="absolute bg-white p-2 rounded-lg z-40 text-red top-5 right-5 cursor-pointer hover:scale-105">
                          <BiTrash
                            size={15}
                            color="red"
                            onClick={() => handleDelete(poi.id)}
                          />
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          </Box>
        </Box>
  )
}

export default Manage