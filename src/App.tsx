import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { SlidesRoutes } from './slides/RoutesList';
import { useHotkeys } from 'react-hotkeys-hook';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { LicenseManager } from '@ag-grid-enterprise/core';
LicenseManager.setLicenseKey(
	'CompanyName=Check Point Software Technologies Ltd,LicensedApplication=CloudGuard,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=1,AssetReference=AG-018094,ExpiryDate=25_August_2022_[v2]_MTY2MTM4MjAwMDAwMA==6d60e4ad1b5d816a69c2c5d6f912fa9b'
);

export default function App() {
	useHotkeys('shift+e', () => {
		window.parent.postMessage('shift+e', '*');
	});
	useHotkeys('shift+f', () => {
		window.parent.postMessage('shift+f', '*');
	});
	useHotkeys('shift+z', () => {
		window.parent.postMessage('shift+z', '*');
	});
	useHotkeys('shift+b', () => {
		window.parent.postMessage('shift+b', '*');
	});

	let navigate = useNavigate();

	React.useEffect(() => {
		window.addEventListener('message', (event) => {
			if (event.data.type === 'navigation') {
				navigate(event.data.route);
			}
		});
	}, []);

	let element = useRoutes(SlidesRoutes());
	return <div className='theme theme-light bg-canvas absolute inset-0'>{element}</div>;
}
