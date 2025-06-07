import React, { useEffect, useState } from "react";
import type { ICategoryWiseData, IProduct } from "../types";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCategoryWiseData, setLoadingCategoryWiseDate] = useState<boolean>(false);

  const [categoryWiseData, setCategoryWiseData] = useState<ICategoryWiseData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");

        const categories = await res.json();
        setCategories(categories);
        setSelectedCategory(categories[0]);
      } catch (error) {
        console.error("Error Fetching Categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const loadCategoryWiseData = async () => {
      if (!categories.length) {
        setCategoryWiseData([]);
        return;
      }

      try {
        setLoadingCategoryWiseDate(true);

        const promiseUrls = categories.map((cat) => `https://fakestoreapi.com/products/category/${cat}`);
        const responses = await Promise.all(promiseUrls.map(async (url) => await fetch(url)));
        const newCatWiseData = await Promise.all(responses.map(async (res) => await res.json()));

        setCategoryWiseData(
          newCatWiseData.map((catProducts: IProduct[]) => {
            return {
              category: catProducts[0].category,
              products: catProducts,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching category-wise products: ", error);
        setCategoryWiseData([]);
      } finally {
        setLoadingCategoryWiseDate(false);
      }
    };

    loadCategoryWiseData();
  }, [categories]);

  useEffect(() => {
    navigate(`/categories/${selectedCategory}`.replace(" ", "-"));
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="page-container">
        <h3>All Categories</h3>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
          {loading && <span>Loading...</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h3>All Categories</h3>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "2rem" }}>
        {categories.map((category) => (
          <button
            onClick={() => setSelectedCategory(category)}
            key={`category-btn-${category}`}
            style={{ textTransform: "capitalize", backgroundColor: category === selectedCategory ? "#ceaf24" : "" }}
          >
            {category}
          </button>
        ))}
      </div>

      {categoryWiseData.length && (
        <div>
          {categoryWiseData
            .filter((cat) => cat.category.toLowerCase() === selectedCategory?.toLowerCase())
            .map((selectedCatData) => (
              <div key={`filtered-prod-section-${selectedCatData.category}`}>
                <h3 style={{ textTransform: "capitalize", marginBottom: "8px" }}>{selectedCatData.category}</h3>

                <div className="grid-container" style={{ padding: "2px" }}>
                  {selectedCatData.products.map((product) => (
                    <ProductCard key={`cat-wise-prod-${selectedCatData.category}-${product.id}`} {...product} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {loadingCategoryWiseData && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Categories;
