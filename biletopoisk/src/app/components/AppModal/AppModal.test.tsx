import { render, fireEvent, screen } from '@testing-library/react';
import { AppModal } from './AppModal';
import '@testing-library/jest-dom';

describe('#AppModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-portal"></div>'
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('should render the header and text', () => {
    const onClose = jest.fn();
    const headerText = 'Example Header';
    const modalText = 'Example Modal Text';
    const { getByText } = render(
      <AppModal header={headerText} text={modalText} onClose={onClose} />
    );
    expect(getByText(headerText)).toBeInTheDocument();
    expect(getByText(modalText)).toBeInTheDocument();
  });

  it('should call onClose with "cancel" when "Нет" clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <AppModal header="Example Header" text="Example Modal Text" onClose={onClose} />
    );
    fireEvent.click(getByText('Нет'));
    expect(onClose).toHaveBeenCalledWith('cancel');
  });

  it('should call onClose with "ok" when "Да" clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <AppModal header="Example Header" text="Example Modal Text" onClose={onClose} />
    );
    fireEvent.click(getByText('Да'));
    expect(onClose).toHaveBeenCalledWith('ok');
  });

  it('should render the modal inside a portal', () => {
    const onClose = jest.fn();
    render(
      <AppModal header="Example Header" text="Example Modal Text" onClose={onClose} />
    );
    expect(document.getElementById('modal-portal')).toBeInTheDocument();
    expect(document.getElementById('modal-portal')!.firstChild).toHaveClass('fallBack');
  });
});
