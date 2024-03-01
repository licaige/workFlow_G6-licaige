import { act, renderHook } from '@testing-library/react';
import { useCounter } from '@/storehooks/useCounter';

describe('useCounter', () => {
	it('should increment counter', () => {
		const { result } = renderHook(() => useCounter(0));
		act(() => {
			result.current.increment();
		});
		expect(result.current.count).toBe(1);
	});
});
