import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { WrapRoutes } from '@/router/index';

const App: React.FC<any> = (): JSX.Element => {
	return (
		// <BrowserRouter forceRefresh={!supportsHistory}>
		<Router basename={import.meta.env.APP_BASE_ROUTER}>
			<WrapRoutes />
		</Router>
		//   <Routes>
		//   <Route path="/screenfull" element={<LayoutScreen />} />
		//   <Route path="/" element={<Navigate to="/home" replace />} />
		//   <Route path="/home" element={<Home />} />
		//   <Route path='/*' element={<Navigate to="/error" replace />} />
		// </Routes>
	);
};

export default App;
