"use client";

import React, { useState } from "react";
import PhoneInput from "@/app/components/PhoneInput";
import Select from "@/app/components/Select";

const Delivery: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    vatNumber: "",
    phone: "",
    country: "",
    city: "",
    paymentMethod: "",
    deliveryMethod: "",
    billingName: "",
    billingEmail: "",
    billingCompanyName: "",
    billingVatNumber: "",
  });

  const [isBillingSame, setIsBillingSame] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingSameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBillingSame(e.target.checked);
  };

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
    <form>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Delivery Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              placeholder="Bonnie Green"
              value={formData.name}
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
              placeholder="name@flowbite.com"
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
              htmlFor="vatNumber"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              VAT number
            </label>
            <input
              type="text"
              id="vatNumber"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              placeholder="DE42313253"
              value={formData.vatNumber}
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

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Billing Address</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sameAsDelivery"
            checked={isBillingSame}
            onChange={handleBillingSameChange}
            className="mr-2 h-4 w-4"
          />
          <label
            htmlFor="sameAsDelivery"
            className="text-sm font-medium text-gray-800"
          >
            Same as Delivery Address
          </label>
        </div>

        {!isBillingSame && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="billingName"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="billingName"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  placeholder="Bonnie Green"
                  value={formData.billingName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="billingEmail"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="billingEmail"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  placeholder="name@flowbite.com"
                  value={formData.billingEmail}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="billingCompanyName"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Company name
                </label>
                <input
                  type="text"
                  id="billingCompanyName"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  placeholder="Flowbite LLC"
                  value={formData.billingCompanyName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="billingVatNumber"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  VAT number
                </label>
                <input
                  type="text"
                  id="billingVatNumber"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  placeholder="DE42313253"
                  value={formData.billingVatNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Delivery Methods
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="dhl"
                  aria-describedby="dhl-text"
                  type="radio"
                  name="deliveryMethod"
                  value="dhl"
                  className="h-4 w-4 border-gray-300 bg-white"
                  checked={formData.deliveryMethod === "dhl"}
                  onChange={handleRadioChange}
                />
              </div>
              <div className="ml-4 text-sm">
                <label htmlFor="dhl" className="font-medium text-gray-800">
                  $15 - DHL Fast Delivery
                </label>
                <p id="dhl-text" className="mt-1 text-xs text-gray-500">
                  Get it by Tomorrow
                </p>
              </div>
            </div>
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="fedex"
                  aria-describedby="fedex-text"
                  type="radio"
                  name="deliveryMethod"
                  value="fedex"
                  className="h-4 w-4 border-gray-300 bg-white"
                  checked={formData.deliveryMethod === "fedex"}
                  onChange={handleRadioChange}
                />
              </div>
              <div className="ml-4 text-sm">
                <label htmlFor="fedex" className="font-medium text-gray-800">
                  $10 - FedEx Ground Delivery
                </label>
                <p id="fedex-text" className="mt-1 text-xs text-gray-500">
                  Get it by Friday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="creditCard"
                  aria-describedby="creditCard-text"
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  className="h-4 w-4 border-gray-300 bg-white"
                  checked={formData.paymentMethod === "creditCard"}
                  onChange={handleRadioChange}
                />
              </div>
              <div className="ml-4 text-sm">
                <label
                  htmlFor="creditCard"
                  className="font-medium text-gray-800"
                >
                  Credit Card
                </label>
                <p id="creditCard-text" className="mt-1 text-xs text-gray-500">
                  Pay securely using your credit card.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="paypal"
                  aria-describedby="paypal-text"
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  className="h-4 w-4 border-gray-300 bg-white"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleRadioChange}
                />
              </div>
              <div className="ml-4 text-sm">
                <label htmlFor="paypal" className="font-medium text-gray-800">
                  PayPal
                </label>
                <p id="paypal-text" className="mt-1 text-xs text-gray-500">
                  Pay easily and securely via PayPal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Delivery;
