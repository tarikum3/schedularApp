import Image from "next/image";
export default function Loading({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    //  page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <>
      <div className="m-12 text-xl text-transition ease-in duration-75 mx-auto md:mx-24">
        <>
          <span>
            Showing results{" "}
            {query && (
              <>
                for "<strong>{query}</strong>"
              </>
            )}
          </span>
        </>
      </div>

      <div className="flex justify-end items-end   mx-auto md:mx-24">
        <div className="relative "></div>
      </div>

      <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return (
              <Image
                quality="85"
                src={placeholderImg}
                alt={"Product Image"}
                width={540}
                height={540}
                className={
                  "w-full  object-cover rounded-lg  sm:col-span-2 lg:col-span-full"
                }
              />
            );
          })}
      </div>
    </>
  );
}
