import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ProductForm } from "../../components/product-form/product-form";
import { ProductsAdminList } from "../../components/products-admin-list/products-admin-list";
import { adminActions } from "../../store/actions/admin-actions";
import { fetchCategories, fetchProducts } from "../../store/actions";
import {
  addCategoryToServer,
  addProductToServer,
  deleteProductFromServer,
  updateProductToServer,
} from "../../store/actions/admin-async";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { CategoryForm } from "../../components/category-form/category-form";

const AdminPanelContainer = ({ className }) => {
  const {
    items: products,
    categories = [],
    editProduct,
  } = useSelector((state) => state.products);

  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(adminActions.setEditProduct(null));
    setShowProductForm(true);
  };

  const handleAddCategory = () => {
    setShowCategoryForm(true);
  };

  const handleCancelCategoryForm = () => {
    setShowCategoryForm(false);
  };

  const handleSubmitCategory = async (categoryData) => {
    try {
      setIsLoading(true);
      await dispatch(addCategoryToServer(categoryData));
      await dispatch(fetchCategories());
      setShowCategoryForm(false);
    } catch (error) {
      console.log("Ошибка при добавлении категории:", error.message);
    } finally {
      setIsLoading(false);
      navigate("/admin");
    }
  };

  const handleEdit = (product) => {
    dispatch(adminActions.setEditProduct(product));
    setShowProductForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      setIsLoading(true);
      await dispatch(deleteProductFromServer(productId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowProductForm(false);
    dispatch(adminActions.setEditProduct(null));
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);

      await dispatch(
        editProduct
          ? updateProductToServer({ ...editProduct, ...formData })
          : addProductToServer({
              ...formData,
              created: new Date().toISOString(),
            })
      );
      await dispatch(fetchProducts());
      setShowProductForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/admin");
    }
  };

  return (
    <div className={className}>
      <h2>Админ панель</h2>

      {showProductForm ? (
        <ProductForm
          product={editProduct}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      ) : showCategoryForm ? (
        <CategoryForm
          onSubmit={handleSubmitCategory}
          onCancel={handleCancelCategoryForm}
          isLoading={isLoading}
        />
      ) : (
        <ProductsAdminList
          products={products}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddProduct={handleAddProduct}
          onAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export const AdminPanel = styled(AdminPanelContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
  width: 100%;
`;
