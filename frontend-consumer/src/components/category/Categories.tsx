import { useEffect, useState } from "react";
import CategoryForm from "../../services/categories/CategoryService";
import { Category } from "../../types/CategoryType";

interface CategoriesProps {
  onCategoryChange: (categoryId: string) => void;
}

const Categories = ({ onCategoryChange }: CategoriesProps) => {
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
      <ul className="flex flex-wrap justify-center w-[360px] h-[230px]">
        {categories.map((category) => (
          <li key={category.categoryId} onClick={() => onCategoryChange(String(category.categoryId))}>
            <div>
              <div className="center mx-4">
                <img
                  className="w-[45px] h-[45px] object-cover"
                  src={category.imageURL}
                  alt={`카테고리 ${category.name}`}
                />
              </div>
              <div className="text-xs font-bold text-center pt-2">
                {category.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
