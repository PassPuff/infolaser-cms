import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";

export const CreateProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "category",
  });

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <h1 className="text-4xl">Create Product</h1>

      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />

      <TextField
        {...register("slug")}
        label="Slug"
        error={!!errors.slug}
        helperText={errors.slug?.message as string}
      />

      <TextField
        {...register("description")}
        multiline
        rows={4}
        label="Description"
        error={!!errors.description}
        helperText={errors.description?.message as string}
      />

      <TextField
        {...register("orderPrice")}
        label="Order Price"
        type="number"
        error={!!errors.orderPrice}
        helperText={errors.orderPrice?.message as string}
      />

      <TextField
        {...register("stockPrice")}
        label="Stock Price"
        type="number"
        error={!!errors.stockPrice}
        helperText={errors.stockPrice?.message as string}
      />

      <TextField
        {...register("newPrice")}
        label="New Price"
        type="number"
        error={!!errors.newPrice}
        helperText={errors.newPrice?.message as string}
      />

      <TextField
        {...register("inStock")}
        label="In Stock (1 - yes, 0 - no)"
        type="number"
        inputProps={{ min: 0, max: 1 }}
        error={!!errors.inStock}
        helperText={errors.inStock?.message as string}
      />

      <TextField
        {...register("isAccessory")}
        label="Is Accessory (1 - yes, 0 - no)"
        type="number"
        inputProps={{ min: 0, max: 1 }}
        error={!!errors.isAccessory}
        helperText={errors.isAccessory?.message as string}
      />

      <TextField
        {...register("guarantee")}
        label="Guarantee (years)"
        type="number"
        error={!!errors.guarantee}
        helperText={errors.guarantee?.message as string}
      />

      <TextField
        {...register("guaranteeContent")}
        label="Guarantee Description"
        error={!!errors.guaranteeContent}
        helperText={errors.guaranteeContent?.message as string}
      />

      <TextField
        {...register("rating")}
        label="Rating"
        type="number"
        inputProps={{ step: 0.1, min: 0, max: 5 }}
        error={!!errors.rating}
        helperText={errors.rating?.message as string}
      />

      <TextField
        {...register("order")}
        label="Order Priority"
        type="number"
        error={!!errors.order}
        helperText={errors.order?.message as string}
      />

      <TextField
        {...register("labels")}
        label="Labels (comma separated)"
        error={!!errors.labels}
        helperText={errors.labels?.message as string}
      />

      <TextField
        {...register("product_attachments")}
        label="Product Attachments (URLs comma separated)"
        error={!!errors.product_attachments}
        helperText={errors.product_attachments?.message as string}
      />

      <Controller
        control={control}
        name="categories"
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

      <SaveButton {...saveButtonProps} />
    </Box>
  );
};
