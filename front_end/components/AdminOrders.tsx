import { adminTabPanelOrder, orderObj } from "@/constant/Constant";
import Image from "next/image";
import BtnPaginations from "./BtnPaginations";

const AdminOrders = () => {
  const orders = orderObj;

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-custom-green dark:border-zinc-800 shadow-xl">
        <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 border-collapse">
          <thead className="text-xs text-zinc-700 uppercase border-b border-custom-green">
            <tr>
              {adminTabPanelOrder.map((tab, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-4 font-bold tracking-wider whitespace-nowrap"
                >
                  {tab}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="">
            {orders && orders.length > 0 ? (
              orders.map((order, i) => {
                const {
                  PaymentId,
                  Img,
                  Title,
                  Price,
                  Category,
                  Name,
                  Address,
                  Pincode,
                  PhoneNumber,
                  Email,
                  Date,
                } = order;

                return (
                  <tr key={i} className="transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-300 whitespace-nowrap">
                      {PaymentId}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-custom-green">
                        <Image
                          fill
                          src={Img?.src || "/placeholder-product.png"}
                          alt={Title || "product"}
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white max-w-46 truncate">
                      {Title}
                    </td>

                    <td className="px-6 py-4 font-bold text-custom-green whitespace-nowrap">
                      ${Price}
                    </td>

                    <td className="px-6 py-4 max-w-32 truncate">{Category}</td>

                    <td className="px-6 py-4 font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                      {Name}
                    </td>

                    <td className="px-6 py-4 max-w-38 truncate">{Address}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                      {Pincode}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {PhoneNumber}
                    </td>

                    <td className="px-6 py-4 max-w-46 truncate text-zinc-400 dark:text-zinc-500">
                      {Email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400 dark:text-zinc-500">
                      {Date}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={adminTabPanelOrder.length}
                  className="text-center py-12 text-zinc-500 font-medium"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <BtnPaginations totalPage={1} page={1} />
      </div>
    </div>
  );
};

export default AdminOrders;
