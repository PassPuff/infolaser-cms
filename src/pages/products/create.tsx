import { useForm, useSelect } from "@refinedev/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm();

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
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-4xl">Create Product</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block">
              Slug
            </label>
            <Input
              type="text"
              id="slug"
              name="slug"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block">
              Description
            </label>
            <Input
              id="description"
              name="description"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="orderPrice" className="block">
              Order Price
            </label>
            <Input
              type="number"
              id="orderPrice"
              name="orderPrice"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="stockPrice" className="block">
              Stock Price
            </label>
            <Input
              type="number"
              id="stockPrice"
              name="stockPrice"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="newPrice" className="block">
              New Price
            </label>
            <Input
              type="number"
              id="newPrice"
              name="newPrice"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="inStock" className="block">
              In Stock (1 - yes, 0 - no)
            </label>
            <Input
              type="number"
              id="inStock"
              name="inStock"
              min="0"
              max="1"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="isAccessory" className="block">
              Is Accessory (1 - yes, 0 - no)
            </label>
            <Input
              type="number"
              id="isAccessory"
              name="isAccessory"
              min="0"
              max="1"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="guarantee" className="block">
              Guarantee (years)
            </label>
            <Input
              type="number"
              id="guarantee"
              name="guarantee"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="guaranteeContent" className="block">
              Guarantee Description
            </label>
            <Input
              id="guaranteeContent"
              name="guaranteeContent"
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block">
              Rating
            </label>
            <Input
              type="number"
              id="rating"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="order" className="block">
              Order Priority
            </label>
            <Input
              type="number"
              id="order"
              name="order"
              required
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="labels" className="block">
              Labels (comma separated)
            </label>
            <Input
              type="text"
              id="labels"
              name="labels"
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="product_attachments" className="block">
              Product Attachments (URLs comma separated)
            </label>
            <Input
              type="text"
              id="product_attachments"
              name="product_attachments"
              className="border block w-full"
            />
          </div>

          <div>
            <label htmlFor="categories" className="block">
              Category
            </label>
            <select
              id="categories"
              name="categories"
              className="border block w-full"
            >
              <option value="">Select category</option>

              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {mutation.isSuccess && (
          <span className="text-green-600">Successfully submitted!</span>
        )}
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
