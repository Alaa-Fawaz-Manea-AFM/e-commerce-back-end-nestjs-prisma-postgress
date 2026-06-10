"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Loader_icon } from "@/public/assets";
import { toast } from "react-toastify";
import Image from "next/image";
import AxiosClient from "@/lib/axios-client";
import { ICategory } from "@/types";

interface ICategoryFormProps {
  title: "Add" | "Update";
  category?: ICategory | null;
  setCategories?: React.Dispatch<React.SetStateAction<ICategory[]>>;
  resetForm?: () => void;
}

const CategoryForm = ({
  title,
  category,
  setCategories,
  resetForm,
}: ICategoryFormProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [disableBtn, setDisableBtn] = useState(
    title === "Update" ? false : true,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title === "Update" && category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategoryName(category.category);
    } else {
      setCategoryName("");
    }
  }, [category, title]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setDisableBtn(true);
      setLoading(true);
      if (title === "Add") {
        const { data } = await AxiosClient.post("categories", {
          category: categoryName,
        });
        setCategories?.((prev) => [data?.data, ...prev]);
        toast.success("Added!");
        setCategoryName("");
      } else {
        if (!category) return;

        await AxiosClient.patch(`categories/${category.id}`, {
          category: categoryName,
        });
        setCategories?.((prev) =>
          prev.map((c) =>
            c.id === category.id ? { ...c, category: categoryName } : c,
          ),
        );
        toast.success("Updated!");
        resetForm?.();
      }
    } catch {
      toast.error("Operation failed");
    } finally {
      setDisableBtn(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex justify-between items-center border-b border-custom-green pb-2">
        <h2 className="text-lg font-semibold">
          {title === "Add" ? "Create New Category" : "Edit Category"}
        </h2>
        {title === "Update" && (
          <button
            type="button"
            onClick={resetForm}
            className="text-xs text-red-400 hover:underline cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="categoryName"
          className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1"
        >
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
            setDisableBtn(e.target.value.trim().length === 0);
          }}
          className="border border-custom-green dark:focus:border-custom-green outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs text-black dark:text-white"
          placeholder="e.g. Home Appliances"
        />
      </div>

      <button
        disabled={disableBtn}
        type="submit"
        className={`${
          disableBtn
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-[1.01] hover:shadow-custom-green cursor-pointer"
        } w-full border-b-4 border-emerald-700 bg-custom-green text-zinc-950 font-bold text-sm rounded-xl shadow-md text-center transition-all duration-200 px-4 py-3 flex items-center gap-2 justify-center`}
      >
        {loading && (
          <Image
            src={Loader_icon}
            alt="loader icon"
            width={16}
            height={16}
            className="animate-spin"
            unoptimized
          />
        )}
        {title === "Add" ? "Save Category" : "Update Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
