import { AgGridColumn, AgGridReact } from 'ag-grid-react';
const rowData = [
	{make: "Toyota", model: "Celica", price: 35000},
	{make: "Ford", model: "Mondeo", price: 32000},
	{make: "Porsche", model: "Boxter", price: 72000}
];
function Best() {
	return (
		<div className="ag-theme-alpine absolute inset-0">
		<AgGridReact
			rowData={rowData}>
			<AgGridColumn field="make" flex={1}></AgGridColumn>
			<AgGridColumn field="model" flex={1}></AgGridColumn>
			<AgGridColumn field="price" flex={1}></AgGridColumn>
		</AgGridReact>
	</div>
	);
}
  
export default Best; 