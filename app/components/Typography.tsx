// import React from "react";

// interface TypographyProps {
//   variant?:
//     | "h1"
//     | "h2"
//     | "h3"
//     | "h4"
//     | "h5"
//     | "h6"
//     | "p"
//     | "body"
//     | "small"
//     | "caption";
//   className?: string;
//   sm?: string;
//   md?: string;
//   lg?: string;
//   xl?: string;
//   children: React.ReactNode;
// }

// const baseStyles = "font-sans";

// const variants: Record<string, string> = {
//   h1: "text-4xl  text-primary-900 ",
//   h2: "text-3xl text-primary-100 ",
//   h3: "text-2xl text-primary-900 ",
//   h4: "text-xl  text-primary-900 ",
//   h5: "text-lg text-primary-900 ",
//   h6: "text-base  text-primary-900 ",
//   p: "text-base text-primary-900 ",
//   body: "text-base text-primary-900 ",
//   small: "text-sm text-primary-900 ",
//   caption: "text-xs text-primary-900 ",
// };

// const Typography: React.FC<TypographyProps> = ({
//   variant = "body",
//   className = "",
//   sm,
//   md,
//   lg,
//   xl,
//   children,
// }) => {
//   const Component =
//     variant.startsWith("h") || variant.startsWith("p") ? variant : "span";
//   const variantClasses = variants[variant] || "";

//   const responsiveClasses = `${sm ? `sm:${sm} ` : ""}${md ? `md:${md} ` : ""}${
//     lg ? `lg:${lg} ` : ""
//   }${xl ? `xl:${xl} ` : ""}`;

//   return (
//     <Component
//       className={` ${variantClasses} ${responsiveClasses} ${className}`}
//     >
//       {children}
//     </Component>
//   );
// };

// export default Typography;



import React from "react";
import { cn } from "lib/helper";

interface TypographyProps {
  tag?: React.ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "body"
    | "small"
    | "caption";
  className?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  children: React.ReactNode;
}

const baseStyles = "font-sans";

const variants: Record<string, string> = {
  h1: "text-4xl text-primary-900",
  h2: "text-3xl text-primary-100",
  h3: "text-2xl text-primary-900",
  h4: "text-xl text-primary-900",
  h5: "text-lg text-primary-900",
  h6: "text-base text-primary-900",
  p: "text-base text-primary-900",
  body: "text-base text-primary-900",
  small: "text-sm text-primary-900",
  caption: "text-xs text-primary-900",
};

const Typography: React.FC<TypographyProps> = ({
  tag,
  variant = "body",
  className = "",
  sm,
  md,
  lg,
  xl,
  children,
}) => {
  const Component = tag || (variant.startsWith("h") ? variant : "span");
  const variantClasses = variants[variant] || "";

  const responsiveClasses = cn(
    sm && `sm:${variants[sm]}`,
    md && `md:${variants[md]}`,
    lg && `lg:${variants[lg]}`,
    xl && `xl:${variants[xl]}`
  );

  return (
    <Component className={cn(baseStyles, variantClasses, responsiveClasses, className)}>
      {children}
    </Component>
  );
};

export default Typography;
