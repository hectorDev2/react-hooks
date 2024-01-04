import { act, fireEvent, render, screen } from '@testing-library/react'
import { MultipleCustomHooks } from '../../../src/03-examples'
import { useFetch } from '../../../src/hooks/useFetch'
import { useCounter } from '../../../src/hooks/useCounter'

jest.mock('../../../src/hooks/useFetch')
jest.mock('../../../src/hooks/useCounter')

describe('Test multiple hooks', () => {
  const initialQuotes = [
    {
      author: 'Juan',
      quote: 'quotes of juan'
    }
  ]

  const incrementMock = jest.fn()
  useCounter.mockReturnValue({
    counter: 1,
    increment: incrementMock
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('test initial state hook', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null
    })

    render(<MultipleCustomHooks />)
    expect(screen.getByText('Loading...')).toBeTruthy()
    const buttonInitial = screen.getByRole('button', { name: 'Next quote' })

    expect(
      screen.getByRole('heading', { name: 'BreakingBad Quotes' })
    ).toBeTruthy()
    expect(buttonInitial.disabled).toBeTruthy()
  })

  test('test useFetch hook', () => {
    useFetch.mockReturnValue({
      data: initialQuotes,
      isLoading: false,
      hasError: null
    })

    render(<MultipleCustomHooks />)
    expect(screen.getByText('quotes of juan')).toBeTruthy()
  })

  test('test useCounter hook', () => {
    useFetch.mockReturnValue({
      data: initialQuotes,
      isLoading: false,
      hasError: null
    })

    render(<MultipleCustomHooks />)
    const buttonNext = screen.getByRole('button', { name: 'Next quote' })
    fireEvent.click(buttonNext)
    expect(incrementMock).toHaveBeenCalled()
  })
})
