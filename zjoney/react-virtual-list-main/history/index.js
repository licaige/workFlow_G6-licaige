import React from 'react';
import ReactDOM from 'react-dom/client';
import FixedSizeList from './fixed-size-list';
import VariableSizeList from './variable-size-list';
import DynamicSizeList from './dynamic-size-list';
import Virtuoso from './Virtuoso'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DynamicSizeList />);