import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";
import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";

import { Login } from "./pages/login";
import { Header } from "./components/header";

function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        <Header />
        {/* <ShowProduct /> */}
        {/*<EditProduct />*/}
        {/* <CreateProduct /> */}
         <ListProducts />
      </Authenticated>
    </Refine>
  );
}

export default App;
