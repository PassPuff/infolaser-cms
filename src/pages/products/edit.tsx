import { useForm, useSelect } from "@refinedev/core";
import { Product } from "../../types/interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export const EditProduct = () => {
  const { onFinish, mutation, query } = useForm();

  const record = query.data?.data.product as Product;

  const { options } = useSelect({
    resource: "category",
    optionLabel: "name", // Указываем, какое поле использовать как label
    optionValue: "id", // Указываем, какое поле использовать как value
  });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );

    onFinish({
      ...data,
      inStock: Number(data.inStock),
      isAccessory: Number(data.isAccessory),
      orderPrice: Number(data.orderPrice),
      stockPrice: Number(data.stockPrice),
      newPrice: Number(data.newPrice),
      guarantee: Number(data.guarantee),
      rating: Number(data.rating),
      order: Number(data.order),
      labels: data.labels ? data.labels.split(",") : [],
      categories: data.categories ? [data.categories] : [],
    });
  };

  return (
    <div>
      <h1>Edit Products</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={record?.name}
          />
        </div>

        <div>
          <label htmlFor="slug">Slug</label>
          <Input
            type="text"
            id="slug"
            name="slug"
            defaultValue={record?.slug}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            name="description"
            defaultValue={record?.description}
          />
        </div>

        <div>
          <label htmlFor="orderPrice">Order Price</label>
          <Input
            type="number"
            id="orderPrice"
            name="orderPrice"
            defaultValue={record?.orderPrice}
          />
        </div>

        <div>
          <label htmlFor="stockPrice">Stock Price</label>
          <Input
            type="number"
            id="stockPrice"
            name="stockPrice"
            defaultValue={record?.stockPrice}
          />
        </div>

        <div>
          <label htmlFor="newPrice">New Price</label>
          <Input
            type="number"
            id="newPrice"
            name="newPrice"
            defaultValue={record?.newPrice}
          />
        </div>

        <div>
          <label htmlFor="inStock">In Stock (1 - да, 0 - нет)</label>
          <Input
            type="number"
            id="inStock"
            name="inStock"
            min="0"
            max="1"
            defaultValue={record?.inStock}
          />
        </div>

        {/*<div>*/}
        {/*  <label htmlFor="isAccessory">Is Accessory (1 - да, 0 - нет)</label>*/}
        {/*  <input*/}
        {/*    type="number"*/}
        {/*    id="isAccessory"*/}
        {/*    name="isAccessory"*/}
        {/*    min="0"*/}
        {/*    max="1"*/}
        {/*    defaultValue={record?.isAccessory}*/}
        {/*  />*/}
        {/*</div>*/}

        <div>
          <label htmlFor="guarantee">Guarantee (гарантия в годах)</label>
          <Input
            type="number"
            id="guarantee"
            name="guarantee"
            defaultValue={record?.guarantee}
          />
        </div>

        <div>
          <label htmlFor="guaranteeContent">Guarantee Description</label>
          <Input
            id="guaranteeContent"
            name="guaranteeContent"
            defaultValue={record?.guaranteeContent}
          />
        </div>

        <div>
          <label htmlFor="rating">Rating</label>
          <Input
            type="number"
            id="rating"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            defaultValue={record?.rating}
          />
        </div>

        <div>
          <label htmlFor="order">Order Priority</label>
          <Input
            type="number"
            id="order"
            name="order"
            defaultValue={record?.order}
          />
        </div>

        <div>
          <label htmlFor="labels">Labels (разделяй запятой)</label>
          <Input
            type="text"
            id="labels"
            name="labels"
            defaultValue={record?.labels}
          />
        </div>

        <div>
          <label htmlFor="product_attachments">
            Product Attachments (URLs через запятую)
          </label>
          <Input
            type="text"
            id="product_attachments"
            name="product_attachments"
            defaultValue={record?.product_attachments}
          />
        </div>

        <div>
          <label htmlFor="categories">Category</label>
          <select
            id="categories"
            name="categories"
            defaultValue={
              record?.categories?.length > 0 ? record.categories[0].id : ""
            }
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {mutation.isSuccess && <span>Successfully submitted!</span>}
        <Button type="submit"> Submit</Button>
      </form>
    </div>
  );
};
