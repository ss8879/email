"use client";
import { motion } from "framer-motion";
import style from "./header.module.css";
import { IoReorderThree } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "@/app/redux/slices/userslice";
import { useDispatch } from "react-redux";
import { ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({ settoggle, togglev }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function togglefunction(togglev) {
    settoggle((p) => !p);
  }

  function logoutfunction() {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <header className={style.container}>
      <div className={style.lcon}>
        <Image
          src="/logo.png"
          width={35}
          height={35}
          className={style.pc}
          alt="Logo"
        />
        <div onClick={() => togglefunction(togglev)}>
          <IoReorderThree className={style.mobile} />
        </div>
      </div>
      <button onClick={logoutfunction} className={style.logout}>
        Logout
        <ExitIcon className={style.logoutIcon} />
      </button>
    </header>
  );
};

export default Header;
