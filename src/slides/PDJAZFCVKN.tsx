import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { render } from 'react-dom';
import { useState } from 'react';

function PDJAZFCVKN() {
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
	const [rowData, setRowData] = useState(null);

	const onGridReady = (params: any) => {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);

		const updateData = (data: any) => {
			setRowData(data);
		};

		fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.then((resp) => resp.json())
			.then((data) => updateData(data));
	};

	return (
		<div className='ag-theme-alpine absolute inset-0'>
			<div id='myGrid' className='ag-theme-alpine absolute inset-10'>
				<AgGridReact
					defaultColDef={{
						width: 170,
						sortable: true,
					}}
					onGridReady={onGridReady}
					rowData={rowData}
				>
					<AgGridColumn field='athlete' sort='desc' />
					<AgGridColumn field='age' width={90} />
					<AgGridColumn field='country' />
					<AgGridColumn field='year' width={90} unSortIcon={true} />
					<AgGridColumn field='date' comparator={dateComparator} />
					<AgGridColumn field='sport' />
					<AgGridColumn field='gold' />
					<AgGridColumn field='silver' />
					<AgGridColumn field='bronze' />
					<AgGridColumn field='total' />
				</AgGridReact>
			</div>
		</div>
	);

	function dateComparator(date1: any, date2: any) {
		var date1Number = monthToComparableNumber(date1);
		var date2Number = monthToComparableNumber(date2);
		if (date1Number === null && date2Number === null) {
			return 0;
		}
		if (date1Number === null) {
			return -1;
		}
		if (date2Number === null) {
			return 1;
		}
		return date1Number - date2Number;
	}
	function monthToComparableNumber(date: any) {
		if (date === undefined || date === null || date.length !== 10) {
			return null;
		}
		var yearNumber = date.substring(6, 10);
		var monthNumber = date.substring(3, 5);
		var dayNumber = date.substring(0, 2);
		var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
		return result;
	}
}

export default PDJAZFCVKN;
