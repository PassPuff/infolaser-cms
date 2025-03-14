import { CircularProgress, Box } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Box
        sx={{
          color: "text.secondary",
          fontSize: "1.2rem",
          fontWeight: 500,
        }}
      >
        Загрузка...
      </Box>
    </Box>
  );
};
