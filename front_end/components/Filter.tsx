"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ICategory } from "@/types";
import { useUserContext } from "@/context/MyState";
import AxiosClient from "@/lib/axios-client";

const Filter = () => {
  const { category, setCategory } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );

  const MAX_PRICE = 10000;
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 1,
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || MAX_PRICE,
  );

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();

    updateFilters({
      search: search.trim(),
      categoryId: selectedCategory,
      minPrice: String(minPrice),
      maxPrice: String(maxPrice),
    });
  };

  const handleClearSearch = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetAllFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    router.push(pathname);
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
    <div className="border border-custom-green dark:border-custom-green p-6 rounded-2xl shadow-xl max-w-2xl mx-auto mt-5 bg-primary dark:bg-secondary transition-all">
      <form onSubmit={handleApplyFilters}>
        <div className="border border-custom-green text-custom-green w-full p-2.5 rounded-xl font-medium bg-primary dark:bg-transparent items-center flex transition-all focus-within:ring-2 focus-within:ring-custom-green">
          <CiSearch size={28} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type product name..."
            type="text"
            className="w-full outline-none border-none p-2 font-medium bg-transparent text-black dark:text-white"
          />
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="cursor-pointer mr-1"
            >
              <IoMdClose
                size={22}
                className="text-custom-gray hover:text-black dark:hover:text-custom-gray"
              />
            </button>
          )}
        </div>

        <div className="mt-10 grid grid-cols-2 max-xs:grid-cols-1 gap-6">
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCategory(val);
              }}
              className="border border-custom-green dark:border-custom-gray dark:bg-custom-gray px-4 py-3.5 w-full rounded-xl outline-0 text-sm font-medium cursor-pointer bg-transparent text-black dark:text-white"
            >
              <option
                value=""
                className="bg-primary dark:bg-custom-gray text-black dark:text-white"
              >
                All Categories
              </option>
              {category?.map((cate: ICategory) => (
                <option
                  key={cate.id}
                  value={cate.id}
                  className="bg-primary dark:bg-custom-gray text-black dark:text-white"
                >
                  {cate.category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="w-fit mx-auto text-xs font-bold text-custom-green bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-md">
              ${minPrice} - ${maxPrice}
            </span>

            <div className="pt-2 px-1 relative w-full h-16">
              <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full bottom-2 outline-hidden">
                <div
                  className="absolute h-full bg-custom-green rounded-full"
                  style={{
                    left: `${(minPrice / MAX_PRICE) * 100}%`,
                    right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                  }}
                />

                <input
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
                  }
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none cursor-pointer outline-none left-0 top-0 accent-custom-green"
                  style={{ zIndex: minPrice > MAX_PRICE / 2 ? 5 : 3 }}
                />

                <input
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
                  }
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none cursor-pointer outline-none left-0 top-0 accent-custom-green"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={resetAllFilters}
            className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors px-4 py-3 rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>

          <button
            type="submit"
            className="bg-custom-green hover:bg-custom-green/90 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Apply Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
