"use client";
import { ICategory } from "@/types";
import CategoryForm from "./CategoryForm";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import AxiosClient from "@/lib/axios-client";
import { toast } from "react-toastify";
import BtnEditCategory from "./BtnEditCategory";

const CompCreateAndUpdateCategory = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  const [_categories, setCategories] = useState<ICategory[]>(categories || []);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [formTitle, setFormTitle] = useState<"Add" | "Update">("Add");

  const handleDelete = async (id: string) => {
    try {
      await AxiosClient.delete(`categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed, reverted changes");
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
        <CategoryForm
          title={formTitle}
          category={category}
          setCategories={setCategories}
          resetForm={() => setFormTitle("Add")}
        />
      </div>

      <div className="lg:col-span-8 border border-custom-green rounded-2xl overflow-hidden dark:bg-secondary shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-custom-green text-black dark:text-custom-green font-semibold uppercase tracking-wider text-xs">
                <th className="p-4">Category Name</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom-green">
              {_categories?.map((cat: ICategory) => (
                <tr
                  key={cat.id}
                  className="hover:bg-custom-green/50 transition-colors"
                >
                  <td className="p-4 font-medium">{cat.category}</td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setCategory(cat);
                          setFormTitle("Update");
                        }}
                        aria-label="Edit category"
                        className="p-2 rounded-lg border border-custom-green hover:text-custom-gray transition-all cursor-pointer"
                      >
                        <MdModeEdit size={18} />
                      </button>
                      <BtnEditCategory
                        handleDelete={() => handleDelete(cat.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompCreateAndUpdateCategory;
