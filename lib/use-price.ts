import { useMemo } from "react";

export default function usePrice(
  data?: {
    amount: number;
    // baseAmount?: number
    currencyCode: string;
  } | null
) {
  const { amount, currencyCode } = data ?? {};
  const locale = "en-us";
  const value = useMemo(() => {
    if (typeof amount !== "number" || !currencyCode) return "";
    const formatCurrency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });

    return formatCurrency.format(amount);
  }, [amount, currencyCode]);

  return typeof value === "string" ? { price: value } : value;
}
