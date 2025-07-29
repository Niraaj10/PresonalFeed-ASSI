import Header from '@/component/Header';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from './utils/renderWithStore';


describe('Header', () => {
    it('renders login button when user is not logged in', () => {
        renderWithStore(<Header />);
        expect(screen.getByText(/log in/i)).toBeInTheDocument();
    });

    it('shows user name and logout button when user is logged in', () => {
        const preloadedState = {
            user: {
                name: 'Test User',
                email: 'test@example.com',
                image: null,
                isLoggedIn: true,
                moviePreferences: [],
                newsPreferences: [],
                socialPreferences: [],
                lastUpdated: null,
            },
        };

        renderWithStore(<Header />, preloadedState);

        expect(screen.getByText('Test User')).toBeInTheDocument();

        const logoutButton = screen.getByTestId('logout-button');

        expect(logoutButton).toBeInTheDocument();
    });

    it('shows search overlay when clicking search button', () => {
        renderWithStore(<Header />);
        const searchButton = screen.getAllByRole('button').find(btn =>
            btn.textContent?.toLowerCase().includes('search')
        );

        expect(searchButton).toBeTruthy();
        if (searchButton) fireEvent.click(searchButton);

        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });
});
