import { PoI } from '@/app/home/page';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../firebase';
import instance from '@/constants/axios';
import { helveticaBold, helveticaLight, helveticaThinItalic } from '@/fonts';
import TextArea from '../Chat/TextArea';
import { BiTrash } from 'react-icons/bi';
import PoiCard from '../Home/PoiCard';
import { Alert, Snackbar } from '@mui/material';

const AddPoi = () => {
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
        const snapshot = await uploadBytesResumable(storageRef, image)
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
              })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
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
    
    const handleCancelImage = (type: string) => {
        type == 'image' ? setImage(null) : setChatImage(null)
    
        type === 'image' ? setNewPoi((prevPoi) => ({ ...prevPoi, image: "" })) : setNewPoi((prevPoi) => ({ ...prevPoi, chat_image: "" }));
      };
  return (
    <>
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
                disableDefaultClick={true}
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
  )
}

export default AddPoi