import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('#Footer', () => {
  it('should render links in footer', () => {
    const container = render(<Footer />);
    const faqLink = container.getByText(/Вопросы-ответы/i);
    const aboutLink = container.getByText(/О нас/i);

    expect(faqLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    expect(faqLink.getAttribute('href')).toEqual('faq');
    expect(aboutLink.getAttribute('href')).toEqual('about');
  });
});
