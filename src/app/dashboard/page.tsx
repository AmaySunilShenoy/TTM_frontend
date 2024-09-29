"use client";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { BiTrash } from "react-icons/bi";
import instance from "@/constants/axios"; // Make sure this axios instance is correctly set up
import { helveticaBold, helveticaLight, helveticaThinItalic } from "../fonts";
import PoiCard from "@/components/Home/PoiCard";
import { PoI } from "../home/page";
import LoadingPoiCard from "@/components/Home/LoadingPoiCard";
import TextArea from "@/components/Chat/TextArea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/firebase";
import Image from "next/image";
import { Alert, Snackbar } from "@mui/material";
import { RiHomeFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [value, setValue] = useState(1);
  const [pois, setPois] = useState<PoI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [chatImage, setChatImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<{open: boolean, type: "success" | "error", message: string}>({open: false, type:"success", message: ""});
  const [newPoi, setNewPoi] = useState<PoI>({
    id: "",
    name: "",
    description: "",
    image: "",
    type: "",
    field: "",
    contributions: "",
    period: "",
    chat_image: ""
  });
  const router = useRouter();

  useEffect(() => {
    if (value === 1) {
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
    }
  }, [value]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      type == 'image' ? setImage(file) : setChatImage(file)

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        type == 'image' ? setNewPoi((prevPoi) => ({
          ...prevPoi,
          image: reader.result as string,
        })) :
        setNewPoi((prevPoi) => ({
          ...prevPoi,
          chat_image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfilePic = async (image: File, type: string) => {
    if (!image) return;
    const storageUrl = type === "image" ? "profile_pics" : "chat_pics";

    const storageRef = ref(storage, `${storageUrl}/${Date.now()}_${image.name}`);
    uploadBytesResumable(storageRef, image)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            return type === "image" ? setNewPoi((prevPoi) => ({
              ...prevPoi,
              image: downloadURL,
            })) : setNewPoi((prevPoi) => ({
              ...prevPoi,
              chat_image: downloadURL,
            }));
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleCancelImage = (type: string) => {
    type == 'image' ? setImage(null) : setChatImage(null)

    type === 'image' ? setNewPoi((prevPoi) => ({ ...prevPoi, image: "" })) : setNewPoi((prevPoi) => ({ ...prevPoi, chat_image: "" }));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        // Upload the images to Firebase Storage
        if (image) {
          await handleUpdateProfilePic(image, 'image');
        }
        if (chatImage) {
          await handleUpdateProfilePic(chatImage, 'chat_image');
        }
      
      const response = await instance.post("/poi", newPoi);
      if (response.status !== 201) {
        console.error("Failed to create POI", response.data);
        setAlert({open: true, type: "error", message: "Failed to create POI"})
      } else {
      console.log("Created POI", response.data);
      setPois((prevPois) => [...prevPois, newPoi]);
      setNewPoi({
        id: "",
        name: "",
        description: "",
        image: "",
        type: "",
        field: "",
        contributions: "",
        period: "",
        chat_image: ""
      });
      setImage(null);
      setChatImage(null);
      setAlert({open: true, type: "success", message: "Poi created Successfully"})
    }
    } catch (err) {
      console.error("Failed to create POI", err);
    }
    }

  return (
    <>
    <RiHomeFill className="text-white text-3xl absolute z-50 top-5 right-5 cursor-pointer" onClick={() => router.push('/home')} />
    <Box
      sx={{ width: "100%", typography: "body1", padding: 2, text: "white" }}
      className="bg-background"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="POI tabs"
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab value={1} label="Manage POIs" />
        <Tab value={2} label="Add POI" />
      </Tabs>

      {value === 1 && (
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
                      <LoadingPoiCard key={index} />
                    ))
                  : pois.map((poi: PoI, index) => (
                      <div className="relative">
                        <PoiCard
                          key={index}
                          id={poi.id}
                          name={poi.name}
                          image={poi.image}
                          profession={poi.type}
                          disableOnClick={true}
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
      )}

      {value === 2 && (
        <div className="text-white">
          <p
            className={`text-center text-[50px] mx-auto ${helveticaBold.className}`}
          >
            Add a POI
          </p>
          <div className="flex gap-5 justify-between">
          <div className="flex-[2] flex p-4 justify-center">
            <form
              className="flex-col w-[80%] p-5 justify-center"
              onSubmit={handleSubmit}
            >
              <p
                className={`text-[35px] mx-auto my-3 ${helveticaBold.className}`}
              >
                POI Attributes
              </p>
              <div className="flex gap-3 my-5 items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 rounded-lg bg-[rgb(15,15,15)] text-white"
                  value={newPoi.name}
                  onChange={(e) =>
                    setNewPoi({ ...newPoi, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type (Profession)"
                  className="w-full p-2 rounded-lg bg-[rgb(15,15,15)] text-white"
                  value={newPoi.type}
                  onChange={(e) =>
                    setNewPoi({ ...newPoi, type: e.target.value })
                  }
                />
              </div>
              <div>
                <TextArea
                  placeholder="Description"
                  value={newPoi.description}
                  setValue={(newText) =>
                    setNewPoi((prevPoi) => ({
                      ...prevPoi,
                      description: newText,
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border-none bg-[rgb(15,15,15)] text-white resize-none ${helveticaLight.className} outline-none border-0`}
                  onSubmit={() => {}}
                />
              </div>
              <p
                className={`text-[35px] mx-auto my-3 ${helveticaBold.className}`}
              >
                POI Image
              </p>
              <div className="relative flex flex-col justify-around">
                <div className="relative flex my-5 items-center text-white p-4 w-fit bg-lightBlack">
                  <p className={`${image ? "text-slate-500" : ""}`}>
                    Upload Main Picture
                  </p>
                  {image ? (
                    <div className="p-2 mx-4 flex gap-5 items-center justify-between bg-slate-600">
                      {image.name}{" "}
                      <BiTrash
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleCancelImage('image')}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {image ? (
                    ""
                  ) : (
                    <input
                      className="opacity-0 absolute inset-0 w-full h-full"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'image')}
                    />
                  )}
                </div>
                <div className="relative flex my-5 items-center text-white p-4 w-fit bg-lightBlack">
                  <p className={`${image ? "text-slate-500" : ""}`}>
                    Upload Chat Picture
                  </p>
                  {chatImage ? (
                    <div className="p-2 mx-4 flex gap-5 items-center justify-between bg-slate-600">
                      {chatImage.name}{" "}
                      <BiTrash
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleCancelImage('chat_image')}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {chatImage ? (
                    ""
                  ) : (
                    <input
                      className="opacity-0 absolute inset-0 w-full h-full"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'chat_image')}
                    />
                  )}
                </div>
              </div>
              <p
                className={`text-[35px] mx-auto my-3 ${helveticaBold.className}`}
              >
                Chat Prompt Requirements
              </p>
              <div className="flex gap-3 my-5 items-center">
                <input
                  type="text"
                  name="field"
                  placeholder="Field"
                  className="w-full p-2 rounded-lg bg-[rgb(15,15,15)] text-white"
                  value={newPoi.field}
                  onChange={(e) =>
                    setNewPoi({ ...newPoi, field: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="period"
                  placeholder="Period"
                  className="w-full p-2 rounded-lg bg-[rgb(15,15,15)] text-white"
                  value={newPoi.period}
                  onChange={(e) =>
                    setNewPoi({ ...newPoi, period: e.target.value })
                  }
                />
              </div>
              <div>
                <TextArea
                  placeholder="Contributions"
                  value={newPoi.contributions}
                  setValue={(newText) =>
                    setNewPoi((prevPoi) => ({
                      ...prevPoi,
                      contributions: newText,
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border-none bg-[rgb(15,15,15)] text-white resize-none ${helveticaLight.className} outline-none border-0`}
                  onSubmit={() => {}}
                />
              </div>
            <div className="w-full mt-4 flex justify-center items-center">
              <button
                type="submit"
                className="bg-slate-600 text-white w-fit py-3 px-10 rounded-lg"
              >
                Create POI
              </button>
            </div>

            </form>
          </div>
          <div className="flex-1 flex flex-col gap-5 items-center">
          <p
                className={`text-[35px] mx-auto my-3 ${helveticaBold.className}`}
              >
                Previews
              </p>
            {newPoi && (
              <PoiCard
                id={newPoi.id}
                name={newPoi.name}
                image={newPoi.image}
                profession={newPoi.type}
                imageUrl={true}
                disableOnClick={true}
              />
            )}
            <div className="relative bg-lightBlack rounded-full pt-20 overflow-hidden w-[300px] h-[300px] flex justify-center items-center">
              {/* Einstein Image */}
              {newPoi.chat_image ? <img
                src={newPoi.chat_image}
                alt="Albert Einstein"
                width="0"
                height="0"
                sizes="100vw"
                className="z-20 w-full h-full object-cover rounded-full"
              /> : <div className="w-full h-full bg-black rounded-full"></div>}
            </div>
            <div className={`p-5 text-base mx-16 ${helveticaThinItalic.className}`}>
          <p>
           {newPoi.description}
          </p>
        </div>
          </div>
          </div>
        </div>
      )}
    </Box>
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({open: false, type: "success", message: ""})}>
    <Alert
      onClose={() => setAlert({open: false, type: "success", message: ""})}
      severity={alert.type}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {alert.message}
    </Alert>
  </Snackbar>
  </>
  );
};

export default Dashboard;
