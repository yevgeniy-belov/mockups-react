import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Component } from 'react';

class SlideA extends Component {
	rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxter', price: 72000 },
	];
	render() {
		return (
			<div className='absolute inset-0 flex'>
				<div className='ag-theme-alpine flex-1'>
					<AgGridReact rowData={this.rowData} defaultColDef={{ flex: 1 }}>
						<AgGridColumn resizable={true} field='make'></AgGridColumn>
						<AgGridColumn resizable={true} field='model'></AgGridColumn>
						<AgGridColumn resizable={true} field='price'></AgGridColumn>
					</AgGridReact>
				</div>
			</div>
		);
	}
}

export default SlideA;
