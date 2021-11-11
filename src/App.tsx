import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import { LicenseManager } from '@ag-grid-enterprise/core';
LicenseManager.setLicenseKey(
	'CompanyName=Check Point Software Technologies Ltd,LicensedApplication=CloudGuard,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=1,AssetReference=AG-018094,ExpiryDate=25_August_2022_[v2]_MTY2MTM4MjAwMDAwMA==6d60e4ad1b5d816a69c2c5d6f912fa9b'
);

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Layout from './layout';
import Best from './components/Best';
import SlideA from './components/SlideA';

export default function App() {
	let routes: RouteObject[] = [
		{
			path: '/SlideA',
			element: <SlideA />,
		},
		{
			path: '/layout',
			element: <Layout />,
		},
		{
			path: '/best',
			element: <Best />,
		},
	];
	let element = useRoutes(routes);

	return <div className='theme theme-light bg-canvas absolute inset-0'>{element}</div>;
}
