import { useCounter } from '../../src/hooks/useCounter'
import { act, renderHook } from '@testing-library/react'
describe('test useCounter', () => {
  test('test te counter is 10', () => {
    const { result } = renderHook(() => useCounter(10))

    const { increment, decrement, reset, counter } = result.current
    expect(counter).toBe(10)
    expect(increment).toEqual(expect.any(Function))
    expect(decrement).toEqual(expect.any(Function))
    expect(reset).toEqual(expect.any(Function))
  })

  test('check increment + 3', () => {
    const { result } = renderHook(() => useCounter(10))

    const { increment } = result.current

    act(() => {
      increment()
      increment()
      increment()
    })
    expect(result.current.counter).toBe(13)
  })
  test('check decrement - 2', () => {
    const { result } = renderHook(() => useCounter(10))

    const { decrement } = result.current

    act(() => {
      decrement(2)
    })
    expect(result.current.counter).toBe(8)
  })

  test('check reset to initial state', () => {
    const { result } = renderHook(() => useCounter(10))
    const { decrement, increment, reset } = result.current

    act(() => {
      increment(2)
      decrement(2)
      reset()
    })

    expect(result.current.counter).toBe(10)
  })
})
