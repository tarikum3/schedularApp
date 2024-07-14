"use client";
import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import type { LineItem } from "@lib/types";
import usePrice from "@lib/hooks/use-price";

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
    baseAmount: item.variant.price?.retailPrice ?? 1 * item.quantity,
    currencyCode,
  });

  const options = (item as any).options;
  console.log("optionsoptions", options);
  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
  }, [item.quantity]);

  return (
    <li
      className={`flex flex-col  md:flex-row md:items-center md:justify-between  py-4 ${
        removing ? "opacity-50 pointer-events-none" : ""
      }`}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-30 h-30 bg-secondary relative overflow-hidden cursor-pointer">
          <Link href={`/product/${item.path}`}>
            <Image
              //onClick={() => closeSidebarIfPresent()}
              // className={s.productImage}
              className="w-full h-full object-cover"
              width={64}
              height={64}
              src={item.variant.image?.url || placeholderImg}
              alt={item.variant.image?.alt || "Product Image"}
            />
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-secondary">
          <Link href={`/product/${item.path}`}>
            <span
              // className={s.productName}
              className="font-medium cursor-pointer pb-1 mt-[-4px]"
            >
              {item.name}
            </span>
          </Link>

          <div className="text-sm tracking-wider">{quantity}x</div>
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price}</span>
        </div>
      </div>

      <div className="flex flex-row h-9 space-x-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            // onClick={() => increaseQuantity(-1)}
            className="flex p-1  items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
            // className={s.actions}
            // style={{ marginLeft: "-1px" }}
            disabled={quantity <= 1}
          >
            <EditItemQuantityButton item={item} type="minus" />
          </button>
          <span className="px-4 flex justify-center items-center  m-2">
            {quantity}
          </span>

          <button
            type="button"
            // onClick={() => increaseQuantity(1)}
            className="flex p-1  items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
            // className={cn(s.actions)}
            style={{ marginLeft: "-1px" }}
            disabled={quantity < 1 || quantity >= max}
          >
            <EditItemQuantityButton item={item} type="plus" />
          </button>
        </div>
        <button
          //className={s.actions}
          className="flex  items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
          // onClick={handleRemove}
        >
          <DeleteItemButton item={item} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
