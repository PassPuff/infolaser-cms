import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { Product } from "../../types/interface";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

export const EditProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    refineCore: { onFinish, queryResult },
  } = useForm();

  const record = queryResult?.data?.data.product as Product;

  const { autocompleteProps } = useAutocomplete({
    resource: "category",
    defaultValue: record?.categories?.map((cat) => cat.id) ?? [],
  });

  // Обработчик отправки формы
  const onSubmit = async (data: any) => {
    // Преобразуем категории в массив ID
    const transformedData = {
      ...data,
      categories: data.categories?.map((cat: any) => cat.id) ?? [],
    };

    // Если slug не изменился, удаляем его из данных
    if (transformedData.slug === record?.slug) {
      const { slug, ...dataWithoutSlug } = transformedData;
      return onFinish(dataWithoutSlug);
    }
    return onFinish(transformedData);
  };

  if (queryResult?.isLoading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl mb-8">Edit Product: {record?.name ?? ""}</h1>

      <Box
        component="form"
        className="grid gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("name", { required: "This field is required" })}
          label="Name"
          error={!!errors.name}
          defaultValue={record?.name ?? ""}
          helperText={errors.name?.message as string}
        />

        <TextField
          {...register("slug", { required: "This field is required" })}
          label="Slug"
          error={!!errors.slug}
          defaultValue={record?.slug ?? ""}
          helperText={errors.slug?.message as string}
        />

        <TextField
          {...register("description")}
          multiline
          rows={4}
          label="Description"
          error={!!errors.description}
          defaultValue={record?.description ?? ""}
          helperText={errors.description?.message as string}
        />

        <TextField
          {...register("orderPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          type="number"
          label="Order Price"
          error={!!errors.orderPrice}
          defaultValue={record?.orderPrice ?? ""}
          helperText={errors.orderPrice?.message as string}
        />

        <TextField
          {...register("stockPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          type="number"
          label="Stock Price"
          error={!!errors.stockPrice}
          defaultValue={record?.stockPrice ?? ""}
          helperText={errors.stockPrice?.message as string}
        />

        <TextField
          {...register("newPrice", { valueAsNumber: true })}
          type="number"
          label="New Price"
          error={!!errors.newPrice}
          defaultValue={record?.newPrice ?? ""}
          helperText={errors.newPrice?.message as string}
        />

        <TextField
          {...register("inStock", {
            required: "This field is required",
            valueAsNumber: true,
            min: { value: 0, message: "Must be 0 or 1" },
            max: { value: 1, message: "Must be 0 or 1" },
          })}
          type="number"
          label="In Stock (0 or 1)"
          inputProps={{ min: 0, max: 1 }}
          error={!!errors.inStock}
          defaultValue={record?.inStock ?? ""}
          helperText={errors.inStock?.message as string}
        />

        <TextField
          {...register("rating", {
            valueAsNumber: true,
            min: { value: 0, message: "Minimum rating is 0" },
            max: { value: 5, message: "Maximum rating is 5" },
          })}
          type="number"
          label="Rating"
          inputProps={{ step: 0.1, min: 0, max: 5 }}
          error={!!errors.rating}
          defaultValue={record?.rating ?? ""}
          helperText={errors.rating?.message as string}
        />

        <TextField
          {...register("guarantee", { valueAsNumber: true })}
          type="number"
          label="Guarantee (years)"
          error={!!errors.guarantee}
          defaultValue={record?.guarantee ?? ""}
          helperText={errors.guarantee?.message as string}
        />

        <TextField
          {...register("guaranteeContent")}
          multiline
          rows={2}
          label="Guarantee Content"
          error={!!errors.guaranteeContent}
          defaultValue={record?.guaranteeContent ?? ""}
          helperText={errors.guaranteeContent?.message as string}
        />

        <TextField
          {...register("order", {
            // required: "This field is required",
            valueAsNumber: true,
          })}
          type="number"
          label="Order Priority"
          error={!!errors.order}
          defaultValue={record?.order ?? ""}
          helperText={errors.order?.message as string}
        />

        <Controller
          control={control}
          name="categories"
          defaultValue={record?.categories ?? []}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              multiple
              onChange={(_, value) => field.onChange(value)}
              getOptionLabel={(item) => item?.name ?? ""}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  variant="outlined"
                  error={!!errors.categories}
                  helperText={errors.categories?.message as string}
                />
              )}
            />
          )}
        />

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </Button>
      </Box>
    </div>
  );
};
