import { useShow, useOne } from "@refinedev/core";
import { Product } from "src/types/interface";

export const ShowProduct: React.FC = () => {
  // const { data, isLoading } = useOne({
  //   resource: "products",
  //   id: "12",
  // });

  const { query } = useShow();


  if (query.isLoading) return <h1>Loading...</h1>;

  const oneProduct: Product = query.data?.data.product;

  console.log(oneProduct)

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl mb-4">{oneProduct.id} - {oneProduct.name}</h1>
      <p className="mb-4">{oneProduct.description}</p>
      <p className="mb-4">{oneProduct.orderPrice} Price</p>
      <p className="mb-4">{oneProduct.rating} Raiting</p>
      {oneProduct.product_attachments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {oneProduct.product_attachments.map((attachment) => (
            <img
              key={attachment.id}
              src={attachment.external_url}
              alt={attachment.name}
              className="w-full h-auto"
            />
          ))}
        </div>
      )}
    </div>
  );
};
