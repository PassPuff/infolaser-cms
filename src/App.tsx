import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
//import { ShowProduct } from './pages/products/show';
//import { EditProduct } from './pages/products/edit';
import { ListProducts } from './pages/products/list';

function App() {
	return (
		<Refine dataProvider={dataProvider}>
			{/* <ShowProduct /> */}
			{/* <EditProduct /> */}
			<ListProducts />
		</Refine>
	);
}

export default App;
