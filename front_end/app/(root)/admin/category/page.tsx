import CompCreateAndUpdateCategory from "@/components/CompCreateAndUpdateCategory";
import { AxiosServer } from "@/lib/axios-server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Categories",
  description: "Manage E-commerce Categories",
};

const CategoriesPage = async () => {
  let data;
  try {
    data = await AxiosServer("get", "categories");
  } catch {
    data = { data: { data: [] } };
  }
  return (
    <div className="w-full min-h-screen mt-24 dark:bg-secondary dark:text-white bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-custom-green dark:border-custom-green shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-custom-green dark:border-custom-green">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-custom-green to-emerald-400 bg-clip-text text-transparent">
              Categories Management
            </h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
              Create, edit, and organize your product categories.
            </p>
          </div>
        </div>

        <CompCreateAndUpdateCategory categories={data?.data?.data || []} />
      </div>
    </div>
  );
};

export default CategoriesPage;
