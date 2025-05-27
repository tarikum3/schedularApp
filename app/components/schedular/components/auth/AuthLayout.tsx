// import { ReactNode } from "react";

// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Decorative elements - using your theme colors */}
//           <div className="relative h-2 bg-gradient-to-r from-primary-700 to-primary-900"></div>

//           {/* Floating card effect */}
//           <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
//             {/* Subtle pattern in background */}
//             <div className="absolute -z-10 inset-0 overflow-hidden opacity-5"></div>

//             {children}

//             {/* Footer */}
//             <div className="mt-8 text-center text-sm text-primary-500">
//               <p>
//                 By continuing, you agree to our Terms of Service and Privacy
//                 Policy
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Branding/attribution */}
//         {/* <div className="mt-8 text-center text-sm text-primary-400">
//           © {new Date().getFullYear()} Your Company. All rights reserved.
//         </div> */}
//       </div>
//     </main>
//   );
// }
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Slimmer decorative line */}
          <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          {/* Cleaner card with less intense effects */}
          <div className="bg-white p-6 sm:p-8 rounded-lg">
            {children}

            {/* Simpler footer */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>

        {/* Optional branding - uncomment if needed */}
        {/* <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} App Name
        </div> */}
      </div>
    </main>
  );
}
