import { BtnAddToCart, ProductSlider } from "@/components";
import BtnSeeMore from "@/components/BtnSeeMore";
import ImagesSlider from "@/components/ImagesSlider";
import { AxiosServer } from "@/lib/axios-server";
import { IProduct } from "@/types";
import { Metadata } from "next";
import { IoIosStar } from "react-icons/io";

export const metadata: Metadata = {
  title: "Products",
  description: "Ecommerce Products Page",
};

const ProductInfo = async ({ params }: { params: { productId: string } }) => {
  const { productId } = await params;

  let product: IProduct;
  let products: IProduct[];
  try {
    const { data } = await AxiosServer("get", `products/${productId}`);
    product = data?.data.product;
    products = data?.data.products;
  } catch {
    throw Error;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="w-full md:px-10 py-10 mt-10 grid items-start gap-5 grid-cols-5">
        <ImagesSlider
          images={[product.imageCover, ...(product?.images || [])]}
          productTitle={product?.title}
        />
        <div className="space-y-5 w-4/5 mx-auto md:col-span-3 col-span-5 flex-col flex gap-5">
          <h2 className="text-sm title-font tracking-widest text-custom-green">
            BRAND NAME
          </h2>
          <h1 className="text-3xl leading-norma font-medium mb-1">
            {product?.title}
          </h1>
          <span className="flex flex-col gap-3 border-b-2 mb-5 pb-5">
            <h1 className="text-xl font-semibold text-custom-green">
              PRODUCT DETAILS:
            </h1>
            <BtnSeeMore details={product?.desc} length={300} />
          </span>

          <div className="flex flex-wrap justify-between items-center xs:gap-0 gap-5">
            <div className="flex mb-4 items-center gap-10">
              <span className="title-font font-medium text-2xl">
                <span className="text-custom-green">$ </span>
                {product?.price}
              </span>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{product?.star}</span>
                <IoIosStar size={25} color="yellow" />
              </div>
            </div>
            <div className="flex items-center max-xs:w-full">
              <BtnAddToCart productId={product.id} isLiked={product.isLiked} />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <ProductSlider category={product.category} products={products} />
      </div>
    </div>
  );
};

export default ProductInfo;
