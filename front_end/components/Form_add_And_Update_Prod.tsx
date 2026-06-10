"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { addProduct, updateProduct } from "@/constant/api";
import { Loader_icon, file_upload } from "@/public/assets";
import { adminAddData } from "@/constant/Constant";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IPartialProduct, IProduct } from "@/types";
import Image from "next/image";
import { useUserContextAdmin } from "@/context/AdminMyState";
import AxiosClient from "@/lib/axios-client";

const obj = {
  title: "",
  price: "",
  star: "",
  discount: "",
  category: {
    id: "",
    category: "",
  },
  desc: "",
};

const Form_add_And_Update_Prod = ({
  title,
  product,
}: {
  title: "Update" | "Add";
  product_id?: string;
  product?: IPartialProduct;
}) => {
  const { setProducts, category, setCategory, setAdminCounts } =
    useUserContextAdmin();
  const router = useRouter();

  const [disableBtn, setDisableBtn] = useState(false);
  const [productObj, setProductObj] = useState<IPartialProduct>(obj);
  const [images, setImages] = useState<(File | string)[]>([]);

  const [_dragItem, set_DragItem] = useState<number | null>(null);
  const [_dragOverItem, set_DragOverItem] = useState<number | null>(null);
  const [isDraggingOverZone, setIsDraggingOverZone] = useState(false);

  useEffect(() => {
    if (title === "Update") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductObj(product || {});
      setImages([product?.imageCover || "", ...(product?.images || [])]);
    }
  }, [product, title]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const _images = [...images];
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];
    _images.splice(dragOverItem.current, 0, draggedItemContent);
    setImages(_images);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleDeleteProduct = (img: string | File) =>
    setImages(images.filter((arr) => arr !== img));

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "Update") {
      return await updateProduct(
        router,
        images,
        productObj,
        setDisableBtn,
        setProducts,
      );
    }
    return await addProduct(
      router,
      images as File[],
      productObj,
      setDisableBtn,
      setProducts,
      setAdminCounts,
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await AxiosClient.get("categories");
        setCategory(data?.data || []);
      } catch {
        setCategory([]);
      }
    };

    if (category.length > 0) return;
    fetchUser();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adminAddData?.map((add) => (
              <div
                key={add.name}
                className={`flex flex-col gap-1.5 ${
                  add.name === "title" ? "sm:col-span-2" : "col-span-1"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
                  {add.name}
                </span>
                {!add.select ? (
                  <input
                    autoFocus={add.auto}
                    type={add.type}
                    name={add.name}
                    onChange={(e) =>
                      setProductObj((pre: IPartialProduct) => ({
                        ...pre,
                        [add.name]: e.target.value,
                      }))
                    }
                    value={productObj[add?.name as keyof IProduct] as string}
                    className="dark:bg-custom-gray border border-custom-green outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
                    placeholder={`Enter ${add.name}`}
                  />
                ) : (
                  <select
                    aria-label="select category"
                    value={productObj.category?.id || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedId = e.target.value;

                      if (!selectedId) {
                        setProductObj((pre: IPartialProduct) => ({
                          ...pre,
                          [add.name]: null,
                        }));
                        return;
                      }

                      const foundCategory = category.find(
                        (cat) => cat.id === selectedId,
                      );

                      if (foundCategory) {
                        setProductObj((pre: IPartialProduct) => ({
                          ...pre,
                          [add.name]: {
                            id: foundCategory.id,
                            category: foundCategory.category,
                          },
                        }));
                      }
                    }}
                    className="dark:bg-custom-gray border border-custom-green  outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
                  >
                    <option value="">All Category</option>
                    {category?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
              Description
            </span>
            <textarea
              value={productObj?.desc}
              cols={30}
              rows={6}
              name="desc"
              onChange={(e) =>
                setProductObj((pre: IPartialProduct) => ({
                  ...pre,
                  desc: e.target.value,
                }))
              }
              className="min-h-36 max-h-64 dark:bg-custom-gray border border-custom-green  outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
              placeholder="Write a detailed product description..."
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-zinc-50/50 dark:bg-custom-gray p-5 rounded-2xl border border-zinc-200 dark:border-custom-gray space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1 block">
            Product Media ({images.length}/4)
          </span>

          <label
            onDragEnter={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault();
              setIsDraggingOverZone(true);
            }}
            onDragLeave={() => setIsDraggingOverZone(false)}
            onDragOver={(e: React.DragEvent<HTMLLabelElement>) =>
              e.preventDefault()
            }
            onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault();
              setIsDraggingOverZone(false);
              if (e.dataTransfer.files && images.length < 4) {
                setImages((pre) =>
                  [...pre, ...e.dataTransfer.files].slice(0, 4),
                );
              } else {
                toast.error("Max Length 4");
              }
            }}
            htmlFor="fillImage"
            className={`h-48 w-full border-2 border-dashed rounded-xl items-center justify-center flex-col flex gap-3 cursor-pointer transition-all duration-300 ${
              isDraggingOverZone
                ? "border-custom-green bg-custom-green/10 scale-[0.99]"
                : "border-zinc-300 dark:border-zinc-700 hover:border-custom-green dark:hover:border-custom-green bg-white dark:bg-zinc-950/40 shadow-2xs"
            }`}
          >
            <div className="p-3 bg-zinc-100 dark:bg-custom-gray rounded-xl shadow-xs border border-zinc-200 dark:border-custom-gray">
              <Image
                width={36}
                height={36}
                src={file_upload}
                alt="file_upload"
                className="opacity-80"
                unoptimized
              />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-medium">
                Drag & drop files here, or{" "}
                <span className="text-custom-green underline">Browse</span>
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Supports PNG, JPG, SVG or WEBP (Max 4 images)
              </p>
            </div>

            <input
              disabled={images.length >= 4}
              id="fillImage"
              type="file"
              multiple
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && images.length < 4) {
                  const newFiles = Array.from(e.target.files).slice(
                    0,
                    4 - images.length,
                  );
                  setImages((pre) => [...pre, ...newFiles]);
                } else {
                  toast.error("Max Length 4");
                }
              }}
              className="sr-only"
            />
          </label>

          <div className="grid grid-cols-3 gap-4">
            {images?.map((img, i) => {
              const imgFilter =
                typeof img == "string" ? img : URL.createObjectURL(img);

              return (
                <div
                  draggable
                  onDragStart={() => {
                    dragItem.current = i;
                    set_DragItem(i);
                  }}
                  onDragEnter={() => {
                    dragOverItem.current = i;
                    set_DragOverItem(i);
                  }}
                  onDragEnd={() => {
                    handleSort();
                    set_DragItem(null);
                    set_DragOverItem(null);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  key={i}
                  className={`${i == 0 ? "col-span-3 h-52" : "col-span-1 h-24"} ${
                    _dragItem == i ? "opacity-30 scale-95" : ""
                  } flex items-center justify-center w-full relative border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs group transition-all duration-200`}
                >
                  <Image
                    fill
                    src={imgFilter}
                    alt="Product preview"
                    className="object-cover cursor-grab active:cursor-grabbing transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />

                  {i === 0 && (
                    <span className="absolute top-3 left-3 bg-custom-green text-zinc-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
                      Cover Image
                    </span>
                  )}

                  {_dragOverItem == i && _dragItem != i && (
                    <div className="absolute inset-0 bg-custom-green/70 flex items-center justify-center font-bold text-white text-3xl">
                      +
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(img)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-red-400 hover:text-red-500 hover:bg-black/80 backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <MdDeleteForever size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          disabled={disableBtn}
          type="submit"
          className={`${
            disableBtn
              ? "cursor-not-allowed opacity-50"
              : "hover:scale-[1.01] hover:shadow-custom-green/20"
          } border-b-4 border-emerald-700 bg-custom-green text-zinc-950 font-bold text-md rounded-xl shadow-md text-center transition-all duration-200 w-full sm:w-52 px-6 py-3 flex items-center gap-3 justify-center`}
        >
          {disableBtn && (
            <Image
              src={Loader_icon}
              alt="loader icon"
              width={18}
              height={18}
              className="animate-spin"
              unoptimized
            />
          )}
          {title} Product
        </button>
      </div>
    </form>
  );
};

export default Form_add_And_Update_Prod;
