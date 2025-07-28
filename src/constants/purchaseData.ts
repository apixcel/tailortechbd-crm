import { IPurchase } from "@/types";

export const mockPurchases = [
  {
    _id: "1",
    purchaseTitle: "Winter Jackets Bulk Order",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Padded Jacket",
        price: 2800,
        category: "Outerwear",
        images: ["https://example.com/images/jacket1.jpg"],
        colors: [
          {
            color: "Black",
            sizes: [
              { size: "M", quantity: 20 },
              { size: "L", quantity: 15 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    purchaseTitle: "Formal Pants Restock",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Formal Pant",
        price: 1450,
        category: "Bottoms",
        images: ["https://example.com/images/pant1.jpg"],
        colors: [
          {
            color: "Navy Blue",
            sizes: [
              { size: "32", quantity: 10 },
              { size: "34", quantity: 8 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    purchaseTitle: "Summer T-Shirts - Bulk",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Graphic Tee",
        price: 800,
        category: "Tops",
        images: ["https://example.com/images/tee1.jpg"],
        colors: [
          {
            color: "White",
            sizes: [
              { size: "M", quantity: 25 },
              { size: "L", quantity: 25 },
            ],
          },
        ],
      },
      {
        name: "Plain Tee",
        price: 600,
        category: "Tops",
        images: ["https://example.com/images/tee2.jpg"],
        colors: [
          {
            color: "Gray",
            sizes: [{ size: "S", quantity: 20 }],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    purchaseTitle: "Monsoon Raincoats",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Raincoat",
        price: 1800,
        category: "Rainwear",
        images: ["https://example.com/images/raincoat.jpg"],
        colors: [
          {
            color: "Yellow",
            sizes: [{ size: "L", quantity: 18 }],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    purchaseTitle: "Denim Jeans Collection",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Slim Fit Jeans",
        price: 2200,
        category: "Bottoms",
        images: ["https://example.com/images/jeans1.jpg"],
        colors: [
          {
            color: "Blue",
            sizes: [
              { size: "30", quantity: 10 },
              { size: "32", quantity: 10 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "6",
    purchaseTitle: "Kids Collection April",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Kids Hoodie",
        price: 950,
        category: "Kids",
        images: ["https://example.com/images/kids-hoodie.jpg"],
        colors: [
          {
            color: "Green",
            sizes: [
              { size: "4Y", quantity: 15 },
              { size: "6Y", quantity: 12 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "7",
    purchaseTitle: "Footwear Restock",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Running Shoes",
        price: 3200,
        category: "Shoes",
        images: ["https://example.com/images/shoes1.jpg"],
        colors: [
          {
            color: "Black",
            sizes: [
              { size: "41", quantity: 10 },
              { size: "42", quantity: 10 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "8",
    purchaseTitle: "Ladies Kurti March",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    purchasedProducts: [
      {
        name: "Floral Kurti",
        price: 1700,
        category: "Women",
        images: ["https://example.com/images/kurti.jpg"],
        colors: [
          {
            color: "Pink",
            sizes: [{ size: "M", quantity: 25 }],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "9",
    purchaseTitle: "Sportswear New Arrival",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Gym Shorts",
        price: 700,
        category: "Activewear",
        images: ["https://example.com/images/gym-shorts.jpg"],
        colors: [
          {
            color: "Black",
            sizes: [
              { size: "M", quantity: 15 },
              { size: "L", quantity: 15 },
            ],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "10",
    purchaseTitle: "Luxury Saree Consignment",
    supplier: {
      name: "Arctic Clothing Co.",
      address: "123 Frost Lane, Dhaka",
      phoneNumber: "+8801723456789",
      email: "sales@arcticclothing.com",
      logo: "https://example.com/logos/arctic.png",
      invoiceNumber: "INV-123456",
    },
    products: [
      {
        name: "Silk Saree",
        price: 4500,
        category: "Traditional Wear",
        images: ["https://example.com/images/saree.jpg"],
        colors: [
          {
            color: "Maroon",
            sizes: [{ size: "Free", quantity: 10 }],
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
];
