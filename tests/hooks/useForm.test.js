import { act, renderHook } from '@testing-library/react'
import { useForm } from '../../src/hooks/useForm'
describe('test useForm', () => {
  const initialForm = {
    name: 'fernando',
    email: 'fernando@gmail.com'
  }
  test('test hook with initial form', () => {
    const { result } = renderHook(() => useForm(initialForm))

    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function)
    })
  })

  test('test onInputChange', () => {
    const newName = 'Neo Yeo'
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange } = result.current
    act(() => {
      onInputChange({ target: { name: 'name', value: newName } })
    })
    expect(result.current.name).toBe(newName)
  })

  test('test reset fn', () => {
    const newName = 'Neo Yeo'
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange, onResetForm } = result.current
    act(() => {
      onInputChange({ target: { name: 'name', value: newName } })
      onResetForm()
    })
    expect(result.current.name).toBe('fernando')
  })
})
