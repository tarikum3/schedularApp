// import LoginForm from "@/app/components/auth/LoginView";

// export default function LoginPage() {
//     const useStyles = makeStyles((theme) => ({
//         root: {
//           background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
//             theme.palette.primary.dark,
//             0.5
//           )} 100%)`,
//           color: theme.palette.primary.contrastText,
//         },
//         leftSection: {},
//         rightSection: {
//           background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
//             theme.palette.primary.dark,
//             0.5
//           )} 100%)`,
//           color: theme.palette.primary.contrastText,
//         },
//       }));
//   return (
//     <>
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
//           <div className="w-32 text-white md:w-36">

//           </div>
//         </div>
//         <LoginForm />
//       </div>
//     </main>
//     <div
//       className={clsx(
//         classes.root,
//         'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
//       )}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.6 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
//       >
//         <div
//           className={clsx(
//             classes.leftSection,
//             'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
//           )}
//           square
//         >

//         </div>

//         <div
//           className={clsx(
//             classes.rightSection,
//             'hidden md:flex flex-1 items-center justify-center p-64'
//           )}
//         >
//           <div className="max-w-320">
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
//             >
//               <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
//                 Welcome <br />
//                 to the <br /> Myap!
//               </Typography>
//             </motion.div>

//           </div>
//         </div>
//       </motion.div>
//     </div>
// </>
//   );
// }

// import LoginForm from "@/app/components/auth/LoginView";

// export default function LoginPage() {
//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gray-100 ">
//       <div className="relative mx-auto flex w-full max-w-md flex-col space-y-4 p-6">
//         <div className="flex h-20 w-full items-end rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 p-4 md:h-36 text-white">
//           <div className="w-32 md:w-36"></div>
//         </div>
//         <LoginForm />
//       </div>

//       <div className="flex flex-col items-center justify-center flex-auto p-8 md:p-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white min-h-screen">
//         <div className="flex w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden bg-white">
//           <div className="flex flex-col w-full max-w-sm items-center justify-center p-8 bg-gray-50">
//             {/* Left Section Content */}
//           </div>

//           <div className="hidden md:flex flex-1 items-center justify-center p-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
//             <div className="max-w-sm text-center">
//               <h3 className="text-3xl font-semibold leading-tight">
//                 Welcome <br /> to the <br /> Myapp!
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import LoginForm from "@/app/components/auth/LoginView";

export default function LoginPage() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="relative mx-auto flex w-full max-w-md flex-col space-y-4 p-6">
        <LoginForm />
      </div>

      <div className="hidden md:flex flex-col items-center justify-center flex-auto p-8 md:p-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white min-h-screen w-full md:w-auto">
        <h3 className="text-3xl font-semibold leading-tight text-center">
          Welcome <br /> to <br /> My app
        </h3>
      </div>
    </main>
  );
}
