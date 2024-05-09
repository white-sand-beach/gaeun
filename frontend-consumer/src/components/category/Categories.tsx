import { useEffect, useState } from "react";
import CategoryForm from "../../services/categories/CategoryService";
import { Category } from "../../types/CategoryType";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryForm();
        setCategories(data.categoryList);
      } catch (error) {
        console.error("카테고리를 불러오는 과정에서 에러 발생!!!!:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-x-4">
        {categories.map((category) => (
          <li key={category.id}>
            <div>
              <div className="center">
              <img
                className="w-14 h-14 object-cover"
                src={category.imageURL}
                alt={`카테고리 ${category.name}`}
              />
              </div>
              <div className="text-sm font-thin">{category.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
