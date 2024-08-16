import React from "react";

interface DeliveryMethodProps {
  formData: {
    deliveryMethod: string;
  };
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({
  formData,
  handleRadioChange,
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">Delivery Methods</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="dhl"
              aria-describedby="dhl-text"
              type="radio"
              name="deliveryMethod"
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
              className="h-4 w-4 border-gray-300 bg-white"
              checked={formData.deliveryMethod === "fedex"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="ml-4 text-sm">
            <label htmlFor="fedex" className="font-medium text-gray-800">
              $20 - FedEx Standard Delivery
            </label>
            <p id="fedex-text" className="mt-1 text-xs text-gray-500">
              Get it by Next Week
            </p>
          </div>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="ups"
              aria-describedby="ups-text"
              type="radio"
              name="deliveryMethod"
              className="h-4 w-4 border-gray-300 bg-white"
              checked={formData.deliveryMethod === "ups"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="ml-4 text-sm">
            <label htmlFor="ups" className="font-medium text-gray-800">
              $25 - UPS Express Delivery
            </label>
            <p id="ups-text" className="mt-1 text-xs text-gray-500">
              Get it by Today
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeliveryMethod;
