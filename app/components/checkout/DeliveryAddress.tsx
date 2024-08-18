import React from "react";
import PhoneInput from "@/app/components/PhoneInput";
// import Select from "./Select";
import Select from "@/app/components/Select";
interface DeliveryAddressProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    address: string;
    phone: string;
    country: string;
    city: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
  formData,
  handleChange,
  handleSelectChange,
}) => {
  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "DE", label: "Germany" },
  ];

  const cities = [
    { value: "NY", label: "New York" },
    { value: "TO", label: "Toronto" },
    { value: "BE", label: "Berlin" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Delivery Details</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Company name
          </label>
          <input
            type="text"
            id="companyName"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
            placeholder="Flowbite LLC"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
            placeholder="DE42313253"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <PhoneInput
            phoneCodes={[
              { code: "+1", countryName: "United States" },
              { code: "+49", countryName: "Germany" },
              { code: "+44", countryName: "United Kingdom" },
            ]}
            label="Phone Number"
            onSelect={(code) => handleSelectChange("phone", code)}
          />
        </div>

        <div>
          <Select
            label="Country"
            options={countries}
            onSelect={(value) => handleSelectChange("country", value)}
          />
        </div>

        <div>
          <Select
            label="City"
            options={cities}
            onSelect={(value) => handleSelectChange("city", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
