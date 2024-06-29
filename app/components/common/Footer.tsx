import { FC } from "react";
import Link from "next/link";
import { Github } from "@/app/components/icons";
import { Logo } from "@/app/components";

const links = [
  {
    name: "Privacy Policy",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}en-US/privacy-policy`,
  },
  {
    name: "About",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}en-US/about`,
  },
  {
    name: "Terms of use",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}en-US/terms-of-use`,
  },
  {
    name: "shipping ",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}en-US/shipping`,
  },
];

const Footer: FC = () => {
  return (
    <footer
      //className={rootClassName}
      className="border-t border-primary-2 bg-gray-100 p-4 h-min-[50vh] "
    >
      <div className="flex flex-wrap flex-grow  md:text-left h-full  ">
        <div className="w-full lg:w-1/4 md:w-1/2 p-4 ">
          <Link
            href="/"
            className="flex flex-initial items-center justify-center  font-bold h-full "
          >
            <span className="rounded-full border border-secondary-3 mr-2">
              <Logo />
            </span>
            <span>Modalinda</span>
          </Link>
        </div>

        <div className="flex flex-col flex-initial items-center md:items-start w-full px-4 lg:w-1/4 md:w-1/2  mt-20  ">
          <span className="font-bold tracking-widest uppercase text-secondary text-2xl">
            platform
          </span>
          {/* {[...links, ...sitePages].map((page) => ( */}
          {[...links].map((page) => (
            <span key={page.url} className="mt-5 ">
              <Link
                href={page.url!}
                className="font-medium tracking-widest  text-secondary-3 text-2xl hover:text-secondary-3 transition ease-in-out duration-150"
              >
                {page.name}
              </Link>
            </span>
          ))}
        </div>

        <div className="flex flex-col flex-initial items-center md:items-start w-full px-4 mt-20 lg:w-1/4 md:w-1/2  ">
          <span className="font-bold tracking-widest uppercase text-secondary text-2xl">
            contact
          </span>

          <span className="font-medium  text-secondary-3 mt-5 text-2xl ">
            gmail: tarikum3@gmail.com
          </span>
        </div>
        <div className="flex flex-col flex-initial items-center md:items-start w-full px-4 mt-20 lg:w-1/4 md:w-1/2  ">
          <span className="font-bold tracking-widest uppercase text-secondary text-2xl">
            support
          </span>
          <a
            className="flex flex-initial items-center mt-5"
            aria-label="Github Repository"
            href="https://github.com/tarikum3/Shopify-typescript-tailwind.git"
          >
            <span className="font-medium  text-secondary-3 pr-2 text-2xl ">
              source code:
            </span>
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
