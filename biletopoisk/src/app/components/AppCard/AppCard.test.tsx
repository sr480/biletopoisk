import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppCard, AppCardAvatar } from './AppCard';

describe('#AppCard', () => {
  const mockProps = {
    children: <div>Card content</div>,
    avatar: jest.fn(),
    header: jest.fn(),
    subHeader: jest.fn(),
  };

  it('should render avatar', () => {
    const mockAvatar = <div data-testid="avatar">Avatar content</div>;
    const { getByTestId } = render(<AppCard {...mockProps} avatar={() => mockAvatar} />);
    expect(getByTestId('avatar')).toBeInTheDocument();
  });

  it('should render header and subHeader', () => {
    const mockHeader = <div data-testid="header">Header content</div>;
    const mockSubHeader = <div data-testid="subheader">SubHeader content</div>;
    const { getByTestId } = render(<AppCard {...mockProps} header={() => mockHeader} subHeader={() => mockSubHeader} />);
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('subheader')).toBeInTheDocument();
  });

  it('should render card content', () => {
    const { getByText } = render(<AppCard {...mockProps}><p>Card content</p></AppCard>);
    expect(getByText('Card content')).toBeInTheDocument();
  });
});

describe('#AppCardAvatar', () => {
  const mockProps = {
    children: <div>Avatar content</div>,
    width: 100,
    height: 80,
  };

  it('should render avatar and style attributes', () => {
    const { container } = render(<AppCardAvatar {...mockProps} />);
    const avatarEl = container.firstChild as HTMLElement;
    expect(avatarEl).toHaveClass('avatar');
    expect(avatarEl).toHaveStyle('width: 100px;');
    expect(avatarEl).toHaveStyle('height: 80px;');
  });

  it('should render avatar content', () => {
    const { getByText } = render(<AppCardAvatar {...mockProps} />);
    expect(getByText('Avatar content')).toBeInTheDocument();
  });
});
