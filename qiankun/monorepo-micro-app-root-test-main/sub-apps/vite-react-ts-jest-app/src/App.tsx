import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { WrapRoutes } from '@/router/index';

const App: React.FC<any> = (): JSX.Element => {
	console.log('react-pathname:', location.pathname);
	return (
		// <BrowserRouter forceRefresh={!supportsHistory}>
		<Router basename={import.meta.env.APP_BASE_ROUTER}>
			<WrapRoutes />
		</Router>
	);
};

export default App;
