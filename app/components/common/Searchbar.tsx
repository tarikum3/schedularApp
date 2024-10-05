"use client";
import { FC, memo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Searchbar: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.prefetch("/search");
  }, [router]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (e.key === "Enter") {
      const q = e.currentTarget.value;
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
      router.push(`/search?${params.toString()}`, { scroll: true });
    }
  };

  return (
    <div className="relative pr-3 flex  justify-between border border-primary-300 rounded-xl items-center text-2xl bg-primary-100text-primary-900  w-full transition-colors duration-150 ">
      <label className="hidden" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        className="placeholder-primary-500 text-sm bg-transparent px-3 py-2 appearance-none w-full transition duration-150 ease-in-out pr-10  focus:outline-none "
        placeholder="Search for products..."
        defaultValue={searchParams.get("q")?.toString()}
        onKeyUp={handleKeyUp}
      />

      <svg
        className="size-5 text-primary-500 hidden sm:block"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        />
      </svg>
      {/* </div> */}
    </div>
  );
};

export default memo(Searchbar);
