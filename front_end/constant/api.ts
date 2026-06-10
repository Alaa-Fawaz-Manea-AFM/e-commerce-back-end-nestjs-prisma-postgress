import {
  IAdminDashboard,
  IAdminDashboardCounts,
  ICart,
  IForm,
  IPartialProduct,
  IUser,
} from "@/types";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import AxiosClient from "../lib/axios-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

export const validEmail = process.env.NEXT_PUBLIC_EMAIL_KEY;
export const ROLE_ADMIN = process.env.NEXT_PUBLIC_ROLE_ADMIN;

export const getUserData = async () => {
  const { data } = await AxiosClient.get("auth/me");
  return data?.data || null;
};

export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
export const addProduct = async (
  router: AppRouterInstance,
  images: File[],
  productObj: IPartialProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>,
  setProducts: React.Dispatch<SetStateAction<IAdminDashboard>>,
  setAdminCounts: React.Dispatch<SetStateAction<IAdminDashboardCounts | null>>,
) => {
  if (
    !productObj.title ||
    !productObj.price ||
    !productObj.star ||
    images.length === 0 ||
    !productObj.category?.id ||
    !productObj.desc
  )
    return toast.error("Please fill all fields");

  try {
    setDisableBtn(true);

    const imgFormData = new FormData();
    imgFormData.append("folderName", "products");

    if (images[0]) {
      imgFormData.append("coverFileName", images[0]?.name);
    }

    images.forEach((file) => {
      imgFormData.append("file", file);
    });

    const uploadRes = await axios.post("/api/fileupload", imgFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (uploadRes.status !== 200 || !uploadRes.data.images) {
      throw new Error(
        uploadRes.data?.msg || "Failed to upload images to Cloudinary",
      );
    }
    const finalImages = uploadRes.data.images.map(
      (img: { url: string }) => img.url,
    );

    const imageCover = finalImages.splice(0, 1)?.[0];

    const finalProductObj = {
      ...productObj,
      categoryId: productObj.category.id,

      imageCover: imageCover,
      images: finalImages,
    };

    const { data } = await AxiosClient.post("products", finalProductObj);

    setProducts((pre: IAdminDashboard) => {
      if (!pre || !pre.products) {
        return {
          ...pre,
          products: [data?.data],
        };
      }

      return {
        ...pre,
        products: [data?.data, ...(pre.products || [])].slice(0, 10),
      };
    });
    setAdminCounts((pre) => {
      if (!pre) return pre;

      return {
        ...pre,
        productCounts: pre.productCounts + 1,
      };
    });
    toast.success("Product added successfully");
    router.push("/admin");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Oops, Please try again");
    } else {
      toast.error("Oops, Please try again");
    }
  } finally {
    setDisableBtn(false);
  }
};

export const updateProduct = async (
  router: AppRouterInstance,
  images: (string | File)[],
  productObj: IPartialProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>,
  setProducts: React.Dispatch<SetStateAction<IAdminDashboard>>,
) => {
  if (
    !productObj.title ||
    !productObj.price ||
    productObj.star === undefined ||
    images.length === 0 ||
    !productObj.category?.id ||
    !productObj.desc
  ) {
    return toast.error("Please fill all fields");
  }

  try {
    setDisableBtn(true);
    const oldUrls = images.filter((img) => typeof img === "string") as string[];
    const convertedOldImages = oldUrls.map((url) => url);

    const newFiles = images.filter((img) => img instanceof File) as File[];
    let finalImages = [...convertedOldImages];

    if (newFiles.length > 0) {
      const imgFormData = new FormData();
      imgFormData.append("folderName", "products");
      imgFormData.append("coverFileName", newFiles[0].name);

      newFiles.forEach((file) => {
        imgFormData.append("file", file);
      });

      const uploadRes = await axios.post("/api/fileupload", imgFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadRes.status === 200 && uploadRes.data?.images) {
        const uploadedNewImages = uploadRes.data.images.map(
          (img: { url: string }) => img.url,
        );

        finalImages = [...finalImages, ...uploadedNewImages];
      } else {
        throw new Error("Failed to upload new images");
      }
    }

    const imageCover = finalImages.splice(0, 1)?.[0];
    const finalProductObj = {
      ...productObj,
      categoryId: productObj.category?.id,
      imageCover,
      images: finalImages,
    };

    await AxiosClient.patch(`products/${productObj.id}`, finalProductObj);
    setProducts((pre: IAdminDashboard) => {
      if (!pre) return pre;
      return {
        ...pre,
        products: pre.products?.map((prod) =>
          prod.id === productObj.id ? { ...prod, ...finalProductObj } : prod,
        ),
      };
    });

    toast.success("Product Updated successfully");
    router.push("/admin");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Oops, Please try again");
    } else {
      toast.error("Oops, Please try again");
    }
  } finally {
    setDisableBtn(false);
  }
};

export const handleToogleCart = async (
  productId: string,
  setUser: Dispatch<SetStateAction<IUser | null>>,
  setIsLike: Dispatch<SetStateAction<boolean>>,
  setCart?: Dispatch<SetStateAction<ICart>>,
) => {
  try {
    const { data } = await AxiosClient.post(`/carts/${productId}`);

    if (setCart) {
      setCart((pre) => {
        if (!pre?.carts) return pre;

        return {
          ...pre,
          carts: pre.carts?.filter((i) => i.product.id !== productId),
        };
      });
    }

    setIsLike(data.data);
    setUser((pre) => {
      if (!pre) return pre;

      return {
        ...pre,
        cartCounts: data.data ? pre.cartCounts + 1 : pre.cartCounts - 1,
      };
    });
    toast.success(data.message);
  } catch {
    toast.error("Failed to delete product");
  }
};
export const handle_LogIn_And_SignUp = async (
  form: IForm,
  router: AppRouterInstance,
  setDisable: React.Dispatch<SetStateAction<boolean>>,
  setUser: React.Dispatch<SetStateAction<IUser | null>>,
  title: string,
) => {
  try {
    setDisable(true);
    const { data } = await AxiosClient.post(
      `auth/${title.replace(" ", "").toLowerCase()}`,
      form,
    );

    setUser(data?.data || null);
    router.push("/");
    toast.success("Sign up Succesfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || `${title} Failed, Please try again.`,
      );
    } else {
      toast.error(`${title} Failed, Please try again.`);
    }
  } finally {
    setDisable(false);
  }
};
