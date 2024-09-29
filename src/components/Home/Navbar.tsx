import { helveticaBold, helveticaLight } from "@/app/fonts";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { GlitchHandle, useGlitch } from "react-powerglitch";

const Navbar = () => {
  const { user, logout } = useUser();
  const navitems = ["Home", "Chat"];
  const [openMenu, setOpenMenu] = React.useState(false);
  const router = useRouter();
  const glitchText: GlitchHandle = useGlitch({
    hideOverflow: false,
    timing: {
      duration: 5000
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.15,
      amplitudeY: 0.15
    },
    slice: {
      count: 1
    }
  });
  console.log(user);

  return (
    <nav className={`relative text-white p-5 ${helveticaBold.className}`}>
      <p className="text-[50px] ml-4">Talking Time Machine</p>
      <div
        className={`flex justify-between ${
          openMenu ? "" : "items-center"
        } absolute right-4 text-lg top-6 w-[20%] mr-5 z-50`}
      >
        {navitems.map((item, index) => (
          <Link href={`#${item}`} key={index} className="relative group cursor-pointer">
            {item}
            <span className="absolute h-[3px] bg-white -bottom-1 left-1/2 transform -translate-x-1/2 w-0 transition-all origin-center group-hover:w-full"></span>
          </Link>
        ))}
        {user ? (
          <div
            className="w-10 min-h-10 h-fit bg-white text-black rounded-2xl shadow-xl flex flex-col items-center justify-center transition-all duration-500 group hover:w-32 hover:h-fit"
            onMouseEnter={() =>
              setTimeout(() => {
                setOpenMenu(true);
              }, 300)
            }
            onMouseLeave={() => setOpenMenu(false)}
          >
            <div className="flex flex-col items-center h-0 p-4 justify-center transition-all duration-500 delay-300 group-hover:h-fit">
            <div className="relative text-sm mr-[1px] transition-all duration-300 ease-in-out w-fit">
        <p
          className={`h-fit relative flex text-sm items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 group-hover:h-0 ${helveticaBold.className}`}
        >
          {user.username.charAt(0).toUpperCase() + user.username.charAt(1).toUpperCase()}
        </p>

        <p
          className={`h-0 relative  text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-300 w-fit group-hover:h-fit ${helveticaBold.className}`}
        >
          {user.username.slice(0, 13)}{user.username.length > 13 ? ".." : ""}
        </p>
      </div>
              <div
              className={`h-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:h-fit ${helveticaLight.className}`}
            >
              {openMenu ? (
                <div className="px-3">
                  <p className=" gap-3 flex items-center m-3 hover:scale-105 cursor-pointer">
                    <CgProfile /> Account
                  </p>{" "}
                  {user.role === "user" ? (
                  <p className="gap-3 flex items-center m-3 hover:scale-105 cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <RiAdminFill />
                    Dashboard
                  </p>) : ''}
                  <p className="gap-3 flex items-center m-3 hover:scale-105 cursor-pointer" onClick={() => router.push('/logout')}>
                    <BiLogOut />
                    Logout
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            </div>
            
          </div>
        ) : (
          <button onClick={() => router.push("/authenticate")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
