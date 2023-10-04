import { renderHook } from '@testing-library/react-hooks';
import useApiData from '../../../../../../src/screens/Dashboard/Admin/PmRequests/interval';
import api from '../../../../../../src/network/api'; // Import your API module here
import "@testing-library/jest-dom";

// Mock the Axios instance from your API module
jest.mock('../../../../../../src/network/api');

describe('useApiData Hook', () => {
  it('fetches data and updates state correctly', async () => {
    const mockData = [
      { accessRequestId: 1 },
      { accessRequestId: 2 },
    ];

    // Mock the Axios instance's get method
    api.get.mockResolvedValue({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useApiData());

    expect(result.current.data).toEqual([]);
    expect(result.current.Loading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.Loading).toEqual(false);

    const newItem = { accessRequestId: 3 };
  expect(result.current.data.some((item) => item.accessRequestId === newItem.accessRequestId)).toBe(false);
  });

  it('handles errors gracefully', async () => {
    // Mock the Axios instance's get method to throw an error
    api.get.mockRejectedValue(new Error('Failed to fetch data'));

    const { result } = renderHook(() => useApiData());

    expect(result.current.data).toEqual([]);
    expect(result.current.Loading).toEqual(true);

  

    expect(result.current.data).toEqual([]);
    expect(result.current.Loading).toEqual(true);
  });
});
