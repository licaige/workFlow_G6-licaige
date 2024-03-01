// App.test.tsx
import { beforeEach, describe, expect, test, it, vi } from 'vitest';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '@/App';

// import React from 'react';
// test('App.tsx', () => {
//   render(<App />);
//   expect(screen.getByRole('heading').textContent).toBe('Vite + Vitest + React');
// });

describe('App test', () => {
	beforeEach(() => {
		render(<App initNum={1} />);
	});

	test('counter is visible', () => {
		// render(<App title='Vite + Vitest + React'><p>Content</p></App>);
		render(<App initNum={0} />);
		expect(screen.getByText('count is: 0')).toBeInTheDocument();
		// 通过debug来查看组件的HTML可见输出
		screen.debug();
	});

	it('should start with custom counter', () => {
		render(<App initNum={2} />);
		expect(screen.getByText(/count is: 2/)).toBeInTheDocument();
	});

	it('should increment counter on click', async () => {
		expect(screen.getByText('count is: 1')).toBeInTheDocument();
		// userEvent.click(screen.getByRole('counter'));
		fireEvent.click(screen.getByRole('button', { name: '+' }));
		// expect(screen.getByText("count is: 1")).toBeInTheDocument();
		expect(await screen.findByText(/count is: 2/i)).toBeInTheDocument();
	});
});
