import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppSelect, AppSelectOption } from './AppSelect';

const options: AppSelectOption[] = [
  { value: '1', name: 'Option 1' },
  { value: '2', name: 'Option 2' },
  { value: '3', name: 'Option 3' },
  { value: undefined, name: 'Option 4' },
];

describe('#AppSelect', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="drop-down-portal"></div>'
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('should render placeholder when selected value is undefined', () => {
    const { getByText } = render(<AppSelect options={options} placeholder="Placeholder" onSelect={() => { }} />);
    expect(getByText('Placeholder')).toBeInTheDocument();
  });

  it('should render selected option name', () => {
    const container = render(<AppSelect options={options} onSelect={() => { }} />);
    fireEvent.click(container.container.firstChild as HTMLElement);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should show and hide the dropdown when clicked', () => {
    const container = render(<AppSelect options={options} onSelect={() => { }} />);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    fireEvent.click(container.container.firstChild as HTMLElement);
    expect(screen.queryByText('Option 1')).toBeInTheDocument();
    fireEvent.click(container.getByText('Option 1'));
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('should call the onSelect function', () => {
    const handleSelect = jest.fn();
    const container = render(<AppSelect options={options} onSelect={handleSelect} />);
    fireEvent.click(container.container.firstChild as HTMLElement);
    fireEvent.click(screen.getByText('Option 3'));
    expect(handleSelect).toHaveBeenCalledWith('3');
  });
});
