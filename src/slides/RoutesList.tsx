
import type { RouteObject } from 'react-router-dom';

import TMBGEMGFUA from './TMBGEMGFUA';
import Best from './Best';
import PDJAZFCVKN from './PDJAZFCVKN';
import RACMBUKZAO from './RACMBUKZAO';

export function SlidesRoutes() {		
	
	let routes: RouteObject[] =[
		{ path: "TMBGEMGFUA", element: <TMBGEMGFUA /> },
		{ path: "Best", element: <Best /> },
		{ path: "PDJAZFCVKN", element: <PDJAZFCVKN /> },
		{ path: "RACMBUKZAO", element: <RACMBUKZAO /> },
	];

	return routes;
}

