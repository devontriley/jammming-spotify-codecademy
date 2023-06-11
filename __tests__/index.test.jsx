import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserEvent from '@testing-library/user-event'
import Home from '../app/page'
import SearchBar from '@/components/SearchBar/SearchBar'

describe( 'Home', () => {
    // let component

    // beforeEach(() => {
    //     component = render(<Home />)
    // })

    // afterEach(() => {
    //     component.unmount()
    // })

    // it('fetches user data', async () => {
    //     expect(await screen.findByText('Devon Riley'))
    // })

    // it('does nothing when clicking submit when the input is empty', () => {
    //     const mockFunction = jest.fn()

    //     render(<Home onSearchSubmit={mockFunction} />)

    //     const submitButton = screen.getByLabelText('Search for songs')

    //     UserEvent.click(submitButton)

    //     expect(mockFunction).not.toHaveBeenCalled()
    // })

    it('populates search results when clicking submit if there is a search term', async () => {
        const user = UserEvent.setup()

        render(<Home />)

        const searchForm = screen.getByTestId('searchForm')
        const searchInput = screen.getByLabelText('Enter a search keyword or phrase')
        const submitButton = screen.getByLabelText('Search for songs')

        user.type(searchInput, 'Smells like')
        fireEvent.submit(searchForm)

        // Expect search results to become populated
        const test = await screen.findByTestId('track');
        console.log(test)
        // expect( screen.getByTestId('searchResults') ).toContainElement( screen.getByTestId('track') )
    })

    // it('renders a heading', () => {
    //     const heading = screen.getByRole('heading', {
    //         level: 1,
    //         name: 'Jammming'
    //     })
    //     expect(heading).toBeInTheDocument()
    // })

    // it('renders a search box', () => {
    //     const searchBox = screen.getByLabelText('Enter a search keyword or phrase')
    //     expect(searchBox).toBeInTheDocument()
    // })

    // it('renders a search box submit button', () => {
    //     const button = screen.getByLabelText('Search for songs')
    //     expect(button).toBeInTheDocument()
    // })

    // it('renders a search results container', () => {
    //     const searchResultsContainer = screen.getByTestId('searchResults')
    //     expect(searchResultsContainer).toBeInTheDocument()
    // })

    // it('renders a playlist name input field', () => {
    //     const nameInput = screen.getByPlaceholderText('Enter a playlist name')
    //     expect(nameInput).toBeInTheDocument()
    // })

    // it('renders a save playlist button', () => {
    //     const savePlaylist = screen.getByRole('button', { name: 'Save to Spotify' })
    //     expect(savePlaylist).toBeInTheDocument()
    // })
})