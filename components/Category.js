import { useState } from "react";

const categories = [
  "business",
  "entertainment",
  "sports",
  "technology",
  "science",
  "health",
  "general",
];
export default function CategoryMenu({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCheckBoxChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
    onChange(category);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-start m-4 mt-6 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <h1 className="font-bold text-xl mb-4">Categories</h1>
        {categories.map((category) => (
          <div
            key={category}
            className="my-2 flex items-center justify-center text-center space-x-3"
          >
            <input
              type="checkbox"
              checked={selectedCategory.includes(category)}
              onChange={() => handleCheckBoxChange(category)}
            />
            <label key={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
