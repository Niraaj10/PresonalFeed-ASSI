import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HomeSection from '@/component/sections/HomeSection'
import { Provider } from 'react-redux'
import { store } from '@/store'

jest.mock("@/component/NewsTab", () => {
  const MockNewsTab = () => <div data-testid="news-tab">News Content</div>;
  MockNewsTab.displayName = "MockNewsTab";
  return MockNewsTab;
});

jest.mock("@/component/MovieTab", () => {
  const MockMovieTab = () => <div data-testid="movie-tab">Movie Content</div>;
  MockMovieTab.displayName = "MockMovieTab";
  return MockMovieTab;
});

jest.mock("@/component/SocialsTab", () => {
  const MockSocialsTab = () => <div data-testid="socials-tab">Social Content</div>;
  MockSocialsTab.displayName = "MockSocialsTab";
  return MockSocialsTab;
});

describe('HomeSection', () => {
  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <HomeSection />
      </Provider>
    )

  it('renders SocialsTab by default', () => {
    renderWithProviders()
    expect(screen.getByTestId('socials-tab')).toBeInTheDocument()
  })

  it('switches to News tab when News button is clicked', () => {
    renderWithProviders()
    const newsBtn = screen.getByRole('button', { name: /news/i })
    fireEvent.click(newsBtn)
    expect(screen.getByTestId('news-tab')).toBeInTheDocument()
  })

  it('switches to Movies tab when Movies button is clicked', () => {
    renderWithProviders()
    const moviesBtn = screen.getByRole('button', { name: /movies/i })
    fireEvent.click(moviesBtn)
    expect(screen.getByTestId('movie-tab')).toBeInTheDocument()
  })
})
