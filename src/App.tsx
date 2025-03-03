import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
	ErrorComponent,
	ThemedLayoutV2,
	ThemedSiderV2,
	useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
	CatchAllNavigate,
	DocumentTitleHandler,
	NavigateToResource,
	UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { ShoppingCartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
	ProductCreate,
	ProductEdit,
	ProductsList,
	ProductShow,
} from "./pages/products";
import {
	CategoryCreate,
	CategoryEdit,
	CategoryList,
	CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<ColorModeContextProvider>
					<AntdApp>
						<DevtoolsProvider>
							<Refine
								dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
								notificationProvider={useNotificationProvider}
								authProvider={authProvider}
								routerProvider={routerBindings}
								resources={[
									{
										name: "Products",
										list: "/products",
										create: "/products/create",
										edit: "/products/edit/:id",
										show: "/products/show/:id",
										meta: {
											canDelete: true,
											icon: <ShoppingCartOutlined />, // Иконка для продуктов
											label: "Товары", // Отображаемый заголовок в меню
										},
									},
									{
										name: "Categories",
										list: "/categories",
										create: "/categories/create",
										edit: "/categories/edit/:id",
										show: "/categories/show/:id",
										meta: {
											canDelete: true,
											icon: <AppstoreOutlined />, // Иконка для категорий
											label: "Категории", // Отображаемый заголовок в меню

										},
									},
								]}
								options={{
									syncWithLocation: true,
									warnWhenUnsavedChanges: true,
									useNewQueryKeys: true,
									projectId: "i1bYxm-ZQRTC8-dMqNxr",
									title: { text: "Infolaser", icon: <AppIcon /> },
								}}
							>
								<Routes>
									<Route
										element={
											<Authenticated
												key="authenticated-inner"
												fallback={<CatchAllNavigate to="/login" />}
											>
												<ThemedLayoutV2
													Header={Header}
													Sider={(props) => <ThemedSiderV2 {...props} fixed />}
												>
													<Outlet />
												</ThemedLayoutV2>
											</Authenticated>
										}
									>

										<Route path="/products">
											<Route index element={<ProductsList />} />
											<Route path="create" element={<ProductCreate />} />
											<Route path="edit/:id" element={<ProductEdit />} />
											<Route path="show/:id" element={<ProductShow />} />
										</Route>

										<Route path="/categories">
											<Route index element={<CategoryList />} />
											<Route path="create" element={<CategoryCreate />} />
											<Route path="edit/:id" element={<CategoryEdit />} />
											<Route path="show/:id" element={<CategoryShow />} />
										</Route>

										<Route path="*" element={<ErrorComponent />} />
									</Route>
									<Route
										element={
											<Authenticated
												key="authenticated-outer"
												fallback={<Outlet />}
											>
												<NavigateToResource />
											</Authenticated>
										}
									>


										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Register />} />
										<Route
											path="/forgot-password"
											element={<ForgotPassword />}
										/>
									</Route>
								</Routes>

								<RefineKbar />
								<UnsavedChangesNotifier />
								<DocumentTitleHandler />
							</Refine>
							<DevtoolsPanel />
						</DevtoolsProvider>
					</AntdApp>
				</ColorModeContextProvider>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
