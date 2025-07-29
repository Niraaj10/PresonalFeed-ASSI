import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/app/login/page';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Login Page', () => {
  it('renders Sign in title and button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument();
  });

  it('calls signIn with Google provider and callbackUrl when button is clicked', () => {
    render(<Login />);
    const button = screen.getByRole('button', { name: /Sign in with Google/i });
    fireEvent.click(button);
    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
  });
});
