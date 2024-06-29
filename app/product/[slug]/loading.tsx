import Image from "next/image";

import { Button } from "@/app/components";

export default function Loading() {
  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <div className=" min-h-[500px]  mx-auto grid grid-cols-1  lg:gap-x-20 lg:grid-cols-2">
        <div className="  col-start-1  row-start-1 sm:mb-6  lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 ">
          <Image
            quality="85"
            src={placeholderImg}
            alt={"Product Image"}
            height={320}
            width={320}
            className={
              "w-full  object-cover rounded-lg  sm:col-span-2 lg:col-span-full"
            }
          />
        </div>

        <div className="mt-4 col-start-1   lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
          <h3 className={"py-4 px-6 bg-primary text-secondary font-bold"}>
            <span
              className={""}
              style={{
                fontSize: `${32}px`,
                lineHeight: `${32}px`,
              }}
            >
              {""}
            </span>
          </h3>
          <div className="pt-2 px-6 pb-4 text-sm bg-primary text-secondary font-semibold inline-block tracking-wide">
            {""}
          </div>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={"w-5/6 py-2 px-6 rounded-lg"}
            ></Button>
          </div>
        </div>
        <p className="mt-4 px-6  text-xl  col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
          {""}
        </p>
      </div>
    </div>
  );
}
