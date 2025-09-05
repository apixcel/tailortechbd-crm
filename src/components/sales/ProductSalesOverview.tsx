"use client";

import { useState } from "react";

type Priority = "Very High" | "High" | "Medium" | "Low";

const categories = ["Clothing", "Electronics", "Home", "Beauty", "Others"];

const data: Array<{
  category: string;
  product: string;
  image: string;
  budget: number;
  profit: number;
  progress: number;
  priority: Priority;
}> = [
  {
    category: "Electronics",
    product: "iPhone 14 Pro",
    image: "/products/iphone.jpg",
    budget: 24500,
    profit: 10200,
    progress: 82.3,
    priority: "Very High",
  },
  {
    category: "Clothing",
    product: "Nike Air Max 90",
    image: "/products/nike.jpg",
    budget: 5200,
    profit: 2100,
    progress: 65.0,
    priority: "Medium",
  },
  {
    category: "Home",
    product: "Sofa Set",
    image: "/products/sofa.jpg",
    budget: 12800,
    profit: 3700,
    progress: 48.5,
    priority: "Low",
  },
  {
    category: "Beauty",
    product: "SkinCare Kit",
    image: "/products/skincare.jpg",
    budget: 2400,
    profit: 900,
    progress: 73.2,
    priority: "High",
  },
];

const priorityColors: Record<Priority, string> = {
  "Very High": "bg-cyan-100 text-cyan-800",
  High: "bg-rose-100 text-rose-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const ProductSalesOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState("Clothing");
  const filtered = data.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Product Sales Overview</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-primary text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } focus:ring-2 focus:ring-primary focus:outline-none`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="p-3 font-semibold">Product</th>
              <th className="p-3 font-semibold">Budget</th>
              <th className="p-3 font-semibold">Profit</th>
              <th className="p-3 font-semibold">Progress</th>
              <th className="p-3 font-semibold">Priority</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-gray-400" colSpan={5}>
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.product}
                  className="border-b border-gray-200 transition hover:bg-gray-50"
                >
                  <td className="flex items-center gap-3 p-3">
                    <img
                      src={item.image}
                      alt={item.product}
                      className="h-9 w-9 rounded-full border object-cover"
                    />
                    <span className="font-medium text-gray-900">{item.product}</span>
                  </td>
                  <td className="p-3 font-mono text-gray-700">
                    ${(item.budget / 1000).toFixed(1)}K
                  </td>
                  <td className="p-3 font-mono text-gray-700">
                    ${(item.profit / 1000).toFixed(1)}K
                  </td>
                  <td className="p-3 text-gray-700">{item.progress}%</td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${priorityColors[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSalesOverview;
