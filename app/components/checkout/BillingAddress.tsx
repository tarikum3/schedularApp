import React from "react";

interface BillingAddressProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isBillingSame: boolean;
}

const BillingAddress: React.FC<BillingAddressProps> = ({
  formData,
  handleChange,
  isBillingSame,
}) => {
  if (isBillingSame) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Billing Address</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="billingName" className="mb-2 block text-sm font-medium text-gray-800">
            Your name
          </label>
          <input
            type="text"
            id="billingName"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 focus:outline-none"
            placeholder="Bonnie Green"
            value={formData.billingName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="billingEmail" className="mb-2 block text-sm font-medium text-gray-800">
            Your email
          </label>
          <input
            type="email"
            id="billingEmail"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 focus:outline-none"
            placeholder="name@flowbite.com"
            value={formData.billingEmail}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="billingCompanyName" className="mb-2 block text-sm font-medium text-gray-800">
            Company name
          </label>
          <input
            type="text"
            id="billingCompanyName"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 focus:outline-none"
            placeholder="Flowbite LLC"
            value={formData.billingCompanyName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="billingVatNumber" className="mb-2 block text-sm font-medium text-gray-800">
            VAT number
          </label>
          <input
            type="text"
            id="billingVatNumber"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-800 focus:outline-none"
            placeholder="DE42313253"
            value={formData.billingVatNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
