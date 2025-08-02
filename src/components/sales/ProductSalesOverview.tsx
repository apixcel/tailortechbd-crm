"use client";

import { useState } from "react";
import { Button } from "@/components";

const categories = ["Clothing", "Electronics", "Home", "Beauty", "Others"];

const data = [
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

const priorityColors: Record<string, string> = {
  "Very High": "bg-cyan-100 text-cyan-800",
  High: "bg-rose-100 text-rose-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const ProductSalesOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState("Clothing");

  const filtered = data.filter((item) => item.category === selectedCategory);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Product Sales Overview</h2>

      <div className="mb-4 flex gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            // variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Budget</th>
              <th className="p-2">Profit</th>
              <th className="p-2">Progress</th>
              <th className="p-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.product} className="border-b hover:bg-gray-50">
                <td className="flex items-center gap-3 p-2">
                  <img
                    src={item.image}
                    alt={item.product}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {item.product}
                </td>
                <td className="p-2">${(item.budget / 1000).toFixed(1)}K</td>
                <td className="p-2">${(item.profit / 1000).toFixed(1)}K</td>
                <td className="p-2">{item.progress}%</td>
                <td className="p-2">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${priorityColors[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSalesOverview;
