"use client";

import React, { useState } from "react";
import PhoneInput from "@/app/components/PhoneInput";
import Select from "@/app/components/Select";
import { updateCartAction } from "@lib/actions/actions";

import { useFormState, useFormStatus } from "react-dom";
import { Button, Input } from "@/app/components";
import prisma, { Cart } from "@lib/prisma";
const Delivery = ({ cart }: { cart: Cart | undefined }) => {
  const [formData, setFormData] = useState({
    firstName: cart?.firstName ?? "",
    lastName: cart?.lastName ?? "",
    postalCode: cart?.postalCode ?? "",
    email: cart?.email ?? "",
    companyName: cart?.companyName ?? "",
    address: cart?.address ?? "",
    phone: cart?.phone ?? "",
    country: cart?.country ?? "",
    city: cart?.city ?? "",
    paymentMethod: cart?.paymentMethod ?? "",
    deliveryMethod: cart?.deliveryMethod ?? "",
    billingName: cart?.billingName ?? "",
    billingEmail: cart?.billingEmail ?? "",
    billingCompanyName: cart?.billingCompanyName ?? "",
    billingAddress: cart?.billingAddress ?? "",
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
  const [errorMessage, dispatch] = useFormState(updateCartAction, {} as any);
  console.log("checkouterrorMessage", errorMessage);
  console.log("checkoutformData", formData);
  return (
    <form action={dispatch}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Delivery Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              // placeholder="Bonnie Green"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["firstName"] && (
              <div className="text-red-800 ">
                {errorMessage?.errors?.["firstName"][0]}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              // placeholder="Bonnie Green"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["lastName"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["lastName"][0]}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"

              value={formData.email}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["email"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["email"][0]}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Postal Code
            </label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"

              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["postalCode"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["postalCode"][0]}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Company name
            </label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              // placeholder="Flowbite LLC"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["companyName"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["companyName"][0]}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
              // placeholder="DE42313253"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["address"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["address"][0]}
              </div>
            )}
          </div>
          <div>
            {/* <PhoneInput
              phoneCodes={[
                { code: "+1", countryName: "United States" },
                { code: "+49", countryName: "Germany" },
                { code: "+44", countryName: "United Kingdom" },
              ]}
              label="Phone Number"
              name="phone"
              onSelect={(code) => handleSelectChange("phone", code)}
            /> */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Phone
              </label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errorMessage?.errors?.["phone"] && (
                <div className="text-red-800">
                  {errorMessage?.errors?.["phone"][0]}
                </div>
              )}
            </div>
          </div>
          <div>
            <Select
              label="Country"
              name="country"
              options={countries}
              defaultValue={cart?.country ?? ""}
              onSelect={(value) => handleSelectChange("country", value)}
            />
            {errorMessage?.errors?.["country"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["country"][0]}
              </div>
            )}
          </div>
          <div>
            {/* <Select
              label="City"
              options={cities}
              onSelect={(value) => handleSelectChange("city", value)}
            /> */}
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              City
            </label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errorMessage?.errors?.["city"] && (
              <div className="text-red-800">
                {errorMessage?.errors?.["city"][0]}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Billing Address</h2>
        <div className="flex items-center">
          <Input
            type="checkbox"
            id="sameAsDelivery"
            name="sameAsDelivery"
            checked={isBillingSame}
            onChange={(e) => {
              handleBillingSameChange(e);
            }}
            className="mr-2 h-4 w-4"
          />
          <label
            htmlFor="sameAsDelivery"
            className="text-sm font-medium text-gray-800"
          >
            Same as Delivery Addresssss
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
                  Name
                </label>
                <Input
                  type="text"
                  id="billingName"
                  name="billingName"
                  // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  // placeholder="Bonnie Green"
                  value={formData.billingName}
                  onChange={handleChange}
                />
                {errorMessage?.errors?.["billingName"] && (
                  <div className="text-red-800">
                    {errorMessage?.errors?.["billingName"][0]}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="billingEmail"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Your email
                </label>
                <Input
                  type="email"
                  id="billingEmail"
                  name="billingEmail"
                  // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"

                  value={formData.billingEmail}
                  onChange={handleChange}
                />
                {errorMessage?.errors?.["billingEmail"] && (
                  <div className="text-red-800">
                    {errorMessage?.errors?.["billingEmail"][0]}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="billingCompanyName"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Company name
                </label>
                <Input
                  type="text"
                  id="billingCompanyName"
                  name="billingCompanyName"
                  // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  // placeholder="Flowbite LLC"
                  value={formData.billingCompanyName}
                  onChange={handleChange}
                />

                {errorMessage?.errors?.["billingCompanyName"] && (
                  <div className="text-red-800">
                    {errorMessage?.errors?.["billingCompanyName"][0]}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="billingAddress"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Address
                </label>
                <Input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  // className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800"
                  // placeholder="DE42313253"
                  value={formData.billingAddress}
                  onChange={handleChange}
                />
                {errorMessage?.errors?.["billingAddress"] && (
                  <div className="text-red-800">
                    {errorMessage?.errors?.["billingAddress"][0]}
                  </div>
                )}
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
                  $15 - DHL
                </label>
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
                  $10 - FedEx
                </label>
              </div>
            </div>
          </div>
        </div>
        {errorMessage?.errors?.["deliveryMethod"] && (
          <div className="text-red-800">
            {errorMessage?.errors?.["deliveryMethod"][0]}
          </div>
        )}
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
                {/* <p id="creditCard-text" className="mt-1 text-xs text-gray-500">
                  Pay securely using your credit card.
                </p> */}
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
                {/* <p id="paypal-text" className="mt-1 text-xs text-gray-500">
                  Pay easily and securely via PayPal.
                </p> */}
              </div>
            </div>
          </div>
        </div>
        {errorMessage?.errors?.["paymentMethod"] && (
          <div className="text-red-800">
            {errorMessage?.errors?.["paymentMethod"][0]}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end my-4 ">
        <SubmitButton />
      </div>
    </form>
  );
};

export default Delivery;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} disabled={pending}>
      Submit
    </Button>
  );
}
