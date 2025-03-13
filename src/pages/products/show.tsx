import { useShow, useOne } from "@refinedev/core";
import { Product } from "src/types/interface";

export const ShowProduct: React.FC = () => {
  // const { data, isLoading } = useOne({
  //   resource: "products",
  //   id: "12",
  // });

  const { query } = useShow();


  if (query.isLoading) return <h1>Loading...</h1>;

  const oneProduct = query.data?.data.product as Product;

  return (
    <div>
      <h1>
        {oneProduct.id} - {oneProduct.name}
      </h1>
      <p>{oneProduct.description}</p>
      <p>{oneProduct.orderPrice} Price</p>
      <p>{oneProduct.rating} Raiting</p>
    </div>
  );
};
