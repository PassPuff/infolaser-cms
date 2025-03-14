import { Refine, Authenticated } from "@refinedev/core";
import routerProvider,  { NavigateToResource } from "@refinedev/react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";

import { Login } from "./pages/login";
import { Header } from "./components/header";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { RefineThemes, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Green}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "products",
            list: "/products",
            create: "/products/create",
            edit: "/products/:id/edit",
            show: "/products/:id",
            meta: { label: "Продукты" },
          }
        ]}
      >
        <Routes>
          // =================== защищенные маршруты ====================
          <Route
            element={
              // Мы оборачиваем наши маршруты компонентом `<Authenticated />`.
              // Мы опускаем реквизит `fallback`, чтобы перенаправить пользователей на страницу входа, если они не прошли аутентификацию.
              // Если пользователь аутентифицирован, мы отобразим компонент `<Header />` и компонент `<Outlet />` для отображения внутренних маршрутов.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <ThemedLayoutV2
                  Title={(props) => (
                    <ThemedTitleV2 {...props} text="Infolser CMS"  />
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }>
            <Route index element={<NavigateToResource resource="/products" />} />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />

            </Route>
          </Route>

          // =================== маршруты аутентификации ====================
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                <Navigate to="/products" />
              </Authenticated>
            }>
            <Route path="/login" element={<Login />} />
          </Route>



        </Routes>
      </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
