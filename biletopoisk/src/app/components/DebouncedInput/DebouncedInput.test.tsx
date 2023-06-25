import { render, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom';
import { DebouncedInput } from './DebouncedInput'

jest.useFakeTimers()

describe('#DebouncedInput', () => {
  xit('should render placeholder', () => {
    const placeholder = 'Placeholer!!!';
    const { container } = render(<DebouncedInput placeholder={placeholder} onChange={() => { }} />);
    expect(container.querySelector(`input[placeholder='${placeholder}']`)).toBeInTheDocument();
  });

  it('should call onChange after debounce', async () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(<DebouncedInput onChange={mockOnChange} />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'a' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'ab' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'abc' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(500);
    })
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith('abc'));
  });

  it('should call onChange with the initial value at mount time', () => {
    const initialValue = 'Hello world!'
    const mockOnChange = jest.fn()
    render(<DebouncedInput initial={initialValue} onChange={mockOnChange} />)
    expect(mockOnChange).toHaveBeenCalledWith(initialValue)
  })
})
