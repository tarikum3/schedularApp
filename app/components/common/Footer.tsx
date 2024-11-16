import { FC } from "react";
import Link from "next/link";
import { Github } from "@/app/components/icons";
import { Logo } from "@/app/components";

const links = [
  {
    name: "Privacy Policy",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/privacy-policy`,
  },
  {
    name: "About",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/about`,
  },
  {
    name: "Terms of use",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/terms-of-use`,
  },
  {
    name: "shipping ",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/shipping`,
  },
];

const Footer: FC = () => {
  return (
    <footer
      //className={rootClassName}
      className=" bg-primary-100 p-4 h-min-[50vh] "
    >
      <div className="  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:text-left h-full  ">
        <div className="  p-4 flex flex-col justify-center ">
          <Link
            href="/"
            className="  flex flex-initial items-center justify-center  font-bold  "
          >
            <span className="rounded-full border border-primary-900 mr-2">
              <Logo />
            </span>
            <span>Modalinda</span>
          </Link>
        </div>

        <div className="flex flex-col flex-initial items-center md:items-start  px-4  mt-20  ">
          <span className="font-semibold tracking-widest uppercase text-primary-900  text-sm ">
            platform
          </span>
          {/* {[...links, ...sitePages].map((page) => ( */}
          {[...links].map((page) => (
            <span key={page.url} className="mt-5 ">
              <Link
                href={page.url!}
                className="font-medium tracking-normal  text-primary-900 text-sm  hover:text-primary-500 transition ease-in-out duration-150"
              >
                {page.name}
              </Link>
            </span>
          ))}
        </div>

        <div className="flex flex-col flex-initial items-center md:items-start px-4 mt-20   ">
          <span className="font-bold tracking-widest uppercase text-primary-900  text-sm">
            contact
          </span>

          <span className="font-medium  text-primary-900 mt-5 text-sm ">
            tarikum3@gmail.com
          </span>
        </div>
        <div className="flex flex-col flex-initial  items-center md:items-start  px-4 mt-20   ">
          <span className="font-bold tracking-widest uppercase text-primary-900  text-sm">
            support
          </span>
          <a
            className="flex flex-initial justify-center items-center mt-5"
            aria-label="Github Repository"
            href="https://github.com/tarikum3/Shopify-typescript-tailwind.git"
          >
           
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
