

const productData = {
  name: "White T-shirt",
  description: "A comfortable and stylish white T-shirt.",
  //descriptionHtml: "<p>A comfortable and stylish white T-shirt.</p>",
  sku: "TSHIRT-White",
  category: "Top",
  //slug: "white-t-shirt",
  //path: "/white-t-shirt",
  //vendor: "Fashion Co.",
  tags: ["clothing", "t-shirt", "white", "women"],
  images: [
    {
      url: "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/t-shirt-3.png",
    },
    // { url: "https://example.com/images/white-tshirt-back.jpg" },
  ],
  variants: [
    {
      name: "White T-shirt - Small",
      // sku: "TSHIRT-White-S",
      price: 19.99,
      quantity: 2,
    },
    {
      name: "White T-shirt - Medium",
      //sku: "TSHIRT-White-M",
      price: 19.99,
      quantity: 3,
    },
    {
      name: "White T-shirt - Large",
      //sku: "TSHIRT-White-L",
      price: 19.99,
      quantity: 1,
    },
  ],
  price: {
    amount: 19.99,
    currency: "ETB",
  },
  options: [{ name: "Size", values: ["S", "M", "L"] }],
};
const productData2 = {
  name: "Black T-shirt",
  description: "A comfortable and stylish black T-shirt.",
  //descriptionHtml: "<p>A comfortable and stylish black T-shirt.</p>",
  sku: "TSHIRT-black",
  category: "Top",
  //slug: "black-t-shirt",
  //path: "/black-t-shirt",
  //vendor: "Fashion Co.",
  tags: ["clothing", "t-shirt", "black", "men"],
  images: [
    {
      url: "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/0d6ae87c-5049-4a31-a279-55f4bad71e5e-t-shirt-1.png",
    },
    // { url: "https://example.com/images/black-tshirt-back.jpg" },
  ],
  variants: [
    {
      name: "Black T-shirt - Small",
      // sku: "TSHIRT-Black-S",
      price: 19.99,
      quantity: 2,
    },
    {
      name: "Black T-shirt - Medium",
      // sku: "TSHIRT-Black-M",
      price: 19.99,
      quantity: 3,
    },
    {
      name: "Black T-shirt - Large",
      // sku: "TSHIRT-Black-L",
      price: 19.99,
      quantity: 1,
    },
  ],
  price: {
    amount: 19.99,
    currency: "ETB",
  },
  options: [{ name: "Size", values: ["S", "M", "L"] }],
};
const products = [

];
products.push(productData2);
products.push(productData);
module.exports = {
products,
};
