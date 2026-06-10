"use client";
import { useUserContext } from "@/context/MyState";
import { FaPowerOff } from "react-icons/fa";
import { ROLE_ADMIN, validEmail } from "@/constant/api";
import { Avatar } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import AxiosClient from "@/lib/axios-client";
import { useRouter } from "next/navigation";

const NavLink = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await AxiosClient.post("auth/logout");
      setUser(null);
      router.refresh();
    } catch {
      toast.error("Sign Out Failed");
    }
    return;
  };

  return (
    <>
      <Link href="/products" className="font-medium hover:underline">
        Products
      </Link>
      {user?.name ? (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          {user?.role === ROLE_ADMIN ? (
            <div className="">
              <Link href="/admin" className="font-medium hover:underline">
                Admin
              </Link>
              <Link
                href="/admin/category"
                className="font-medium hover:underline max-sm:block ml-2"
              >
                Category
              </Link>
            </div>
          ) : (
            ""
          )}
          <span
            onClick={handleSignOut}
            className="font-medium hover:underline cursor-pointer"
          >
            <FaPowerOff size={25} color="red" />
          </span>
          <div className="flex items-center gap-1">
            Hi,
            {user?.name}
            <div className="w-7 h-7 object-contain flex items-center font-semibold justify-center bg-custom-green rounded-full">
              {user?.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          <Link href="/log-in" className="font-medium hover:underline">
            LogIn
          </Link>
          <Link href="/sign-up" className="font-medium hover:underline">
            SignUp
          </Link>
          <div className="flex items-center gap-2">
            Hi, Guest
            <Image
              width={32}
              height={32}
              src={Avatar}
              alt="avatar"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavLink;
