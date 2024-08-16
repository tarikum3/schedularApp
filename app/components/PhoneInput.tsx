// import React, { useState } from "react";

// interface PhoneCode {
//   code: string;
//   countryName: string;
// }

// interface PhoneInputProps {
//   phoneCodes: PhoneCode[];
//   label: string;
//   onSelect?: (selectedCode: string) => void;
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   phoneCodes,
//   label,
//   onSelect,
// }) => {
//   const [selectedCode, setSelectedCode] = useState<string>(phoneCodes[0].code);

//   const handleSelect = (code: string) => {
//     setSelectedCode(code);
//     if (onSelect) {
//       onSelect(code);
//     }
//   };

//   return (
//     <div>
//       <label
//         htmlFor="phone-input-3"
//         className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//       >
//         {label}
//       </label>
//       <div className="flex items-center">
//         <button
//           id="dropdown-phone-button-3"
//           className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//           type="button"
//         >
//           {selectedCode}
//         </button>
//         <div className="relative w-full">
//           <select
//             onChange={(e) => handleSelect(e.target.value)}
//             className="absolute z-10 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
//           >
//             {phoneCodes.map(({ code, countryName }) => (
//               <option key={code} value={code}>
//                 {countryName} ({code})
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             id="phone-input"
//             className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
//             pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//             placeholder="123-456-7890"
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhoneInput;
import React, { useState } from "react";

interface PhoneCode {
  code: string;
  countryName: string;
}

interface PhoneInputProps {
  phoneCodes: PhoneCode[];
  label: string;
  onSelect?: (selectedCode: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneCodes,
  label,
  onSelect,
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(phoneCodes[0].code);

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    if (onSelect) {
      onSelect(code);
    }
  };

  return (
    <div>
      <label
        htmlFor="phone-input-3"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="flex items-center bg-gray-50 rounded-lg">
        <div className="relative">
          <select
            onChange={(e) => handleSelect(e.target.value)}
            className="block h-full min-w-[80px] max-w-[120px] bg-gray-100 border border-gray-300 text-sm text-gray-900 rounded-l-lg p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {phoneCodes.map(({ code, countryName }) => (
              <option key={code} value={code}>
                {code} - {countryName}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          id="phone-input"
          className="block h-full w-full max-w-[200px] min-w-[150px] bg-gray-100 border border-gray-300 text-sm text-gray-900 rounded-r-lg p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
        />
      </div>
    </div>
  );
};

export default PhoneInput;
