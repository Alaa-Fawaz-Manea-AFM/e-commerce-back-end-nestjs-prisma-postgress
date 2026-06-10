"use client";
import { ICart } from "@/types";
import Link from "next/link";
import ProductDiv from "./ProductDiv";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import BtnPaginations from "./BtnPaginations";

const Comp_cart = ({ carts, page }: { carts: ICart; page: number }) => {
  const [cart, setCart] = useState<ICart>(carts);

  const { totalAmount = 0, totalDisc = 0 } = cart.carts?.reduce(
    (acc, item) => {
      acc.totalAmount += +(item.product.price || 0);
      acc.totalDisc += +(item.product.discount || 0);
      return acc;
    },
    { totalAmount: 0, totalDisc: 0 },
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(carts);
  }, [page]);

  const finalTotal = totalAmount - totalDisc;

  return (
    <div className="min-h-screen pt-32 pb-16 dark:bg-secondary bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart?.carts?.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center max-w-md mx-auto space-y-6">
            <div className="p-6 bg-zinc-900/50 rounded-full border border-zinc-800 text-zinc-500 animate-bounce">
              <FaShoppingBag size={50} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold dark:text-white">
                Your cart is empty
              </h2>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Looks like you haven&apost added any products to your cart yet.
              </p>
            </div>
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-custom-green text-white font-semibold text-sm hover:bg-[#6c64df] transition-all duration-200 active:scale-95 shadow-md shadow-[#877eff]/10"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 pb-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-end">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-zinc-950">
                  Shopping Cart
                </h1>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                  Review your selected products and checkout.
                </p>
              </div>
              <span className="bg-custom-green/10 text-custom-green text-xs font-bold px-3 py-1.5 rounded-lg border border-custom-green/20">
                {cart?.carts?.length} Items
              </span>
            </div>

            <div className="w-full">
              <div className="my-10 mx-auto overflow-hidden w-full">
                <div className="flex flex-wrap gap-5 justify-center">
                  {cart?.carts?.map((car) => (
                    <div key={car.product.id}>
                      <ProductDiv
                        prod={car.product}
                        cart={true}
                        setCart={setCart}
                      />
                    </div>
                  ))}
                </div>
                <BtnPaginations
                  totalPage={cart?.meta?.totalPages || 0}
                  page={page}
                />
              </div>

              <aside className="lg:col-span-4 w-full lg:sticky lg:top-36">
                <div className="backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-900 p-6 shadow-xl space-y-4">
                  <h3 className="text-lg font-bold dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-900">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    <div className="flex justify-between items-center">
                      <p>Subtotal</p>
                      <span className="dark:text-white text-zinc-900 font-bold">
                        ${totalAmount}
                      </span>
                    </div>

                    {totalDisc > 0 && (
                      <div className="flex justify-between items-center text-emerald-500">
                        <p>Discount</p>
                        <span className="font-bold">-${totalDisc}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <p>Shipping</p>
                      <span className="text-custom-green text-xs font-bold bg-custom-green/10 px-2 py-0.5 rounded">
                        Free
                      </span>
                    </div>
                  </div>

                  <hr className="border-zinc-100 dark:border-zinc-900 my-2" />

                  <div className="flex justify-between items-end mb-4">
                    <p className="text-base font-bold dark:text-white">
                      Order Total
                    </p>
                    <span className="text-2xl font-black text-custom-red">
                      ${finalTotal}
                    </span>
                  </div>

                  <button className="w-full py-3.5 rounded-xl bg-custom-green hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg shadow-custom-green/20">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/products"
                    className="block text-center text-xs font-bold text-zinc-400 hover:text-white transition-colors pt-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comp_cart;
