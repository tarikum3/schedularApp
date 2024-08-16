import React from "react";

interface PaymentProps {
  formData: {
    paymentMethod: string;
  };
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Payment: React.FC<PaymentProps> = ({ formData, handleRadioChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">Payment</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="credit-card"
              aria-describedby="credit-card-text"
              type="radio"
              name="paymentMethod"
              className="h-4 w-4 border-gray-300 bg-white"
              checked={formData.paymentMethod === "credit-card"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="ml-4 text-sm">
            <label htmlFor="credit-card" className="font-medium text-gray-800">
              Credit Card
            </label>
            <p id="credit-card-text" className="mt-1 text-xs text-gray-500">
              Pay with your credit card
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
              Pay with your PayPal account
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Payment;
