"use client";
import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import type { LineItem } from "@lib/types";
import usePrice from "@/lib/use-price";

import { EditItemQuantityButton } from "./EditCart";
import { DeleteItemButton } from "./DeleteButton";
type ItemOption = {
  name: string;
  nameId: number;
  value: string;
  valueId: number;
};

const placeholderImg = "/product-img-placeholder.svg";

const CartItem = ({
  item,
  currencyCode,
  ...rest
}: {
  item: LineItem;
  currencyCode: string;
}) => {
  const max = 6;
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const { price } = usePrice({
    amount: item.variant.price?.value ?? 1 * item.quantity,
    currencyCode,
  });

  const options = (item as any).options;

  useEffect(() => {
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
  }, [item.quantity]);

  return (
    <li
      className={`flex flex-col md:flex-row md:items-center md:justify-between py-4 ${
        removing ? "opacity-50 pointer-events-none" : ""
      }`}
      {...rest}
    >
      <div className="flex space-x-4 py-4">
        <div className="w-[80px] h-[80px] bg-primary-200 rounded-lg overflow-hidden cursor-pointer">
          <Link href={`/product/${(item as any).path}`}>
            <Image
              className="w-full h-full object-cover"
              width={80}
              height={80}
              src={
                (item as any).variant?.product?.images[0]?.url || placeholderImg
              }
              alt={item.variant.image?.alt || "Product Image"}
            />
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <Link href={`/product/${(item as any).path}`}>
            <span className="font-medium text-primary-900 cursor-pointer hover:underline">
              {(item as any).name}
            </span>
          </Link>
          <div className="text-sm text-primary-600">{quantity}x</div>
        </div>
        <div className="text-sm font-medium text-primary-900">{price}</div>
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
            disabled={quantity <= 1}
            // onClick={() => increaseQuantity(-1)}
          >
            <EditItemQuantityButton item={item} type="minus" />
          </button>
          <span className="px-3 text-sm font-medium">{quantity}</span>
          <button
            type="button"
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
            disabled={quantity >= max}
            // onClick={() => increaseQuantity(1)}
          >
            <EditItemQuantityButton item={item} type="plus" />
          </button>
        </div>

        <button
          className="p-2 bg-red-500 text-primary-100 rounded-md hover:bg-red-600 disabled:bg-gray-100"
          // onClick={handleRemove}
        >
          <DeleteItemButton item={item} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
