"use client";
import { useUserContext } from "@/context/MyState";
import { handleToogleCart } from "@/constant/api";
import { toast } from "react-toastify";
import { ICart } from "@/types";
import { SetStateAction, useState } from "react";

const BtnAddToCart = ({
  productId,
  isLiked,
  setCart,
}: {
  productId: string;
  isLiked: boolean;
  setCart?: React.Dispatch<SetStateAction<ICart>>;
}) => {
  const { user, setUser } = useUserContext();
  const [isLike, setIsLike] = useState<boolean>(isLiked || false);

  const handleToogleCartFun = async () => {
    if (!user) return toast.error("Sorry, your must login.");
    handleToogleCart(productId, setUser, setIsLike, setCart);
  };

  return (
    <button
      onClick={handleToogleCartFun}
      className="border-custom-green text-custom-green hover:shadow-custom-green hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-4 rounded-lg text-xl px-5 py-1.5 text-center mb-2 w-full"
    >
      {isLike ? "Delete" : "Add"} To Cart
    </button>
  );
};

export default BtnAddToCart;
