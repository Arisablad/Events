import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Filters } from './Filters'

describe('Filters Component', () => {
  it('calls on search when input changes', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(
      <Filters
        onViewChange={() => {}}
        viewType="grid"
        onSearch={onSearch}
        selectedType={null}
        onTypeChange={() => {}}
      />,
    )

    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'test search')

    expect(onSearch).toHaveBeenCalledWith('test search')
  })

  it('flex view button changes view type', async () => {
    const user = userEvent.setup()
    const onViewChange = vi.fn()

    render(
      <Filters
        onViewChange={onViewChange}
        viewType="grid"
        onSearch={() => {}}
        selectedType={null}
        onTypeChange={() => {}}
      />,
    )

    const flexButton = screen.getByTestId('flex-view-button')
    await user.click(flexButton)

    expect(onViewChange).toHaveBeenCalledWith('flex')
  })

  it('grid view button changes view type', async () => {
    const user = userEvent.setup()
    const onViewChange = vi.fn()

    render(
      <Filters
        onViewChange={onViewChange}
        viewType="flex"
        onSearch={() => {}}
        selectedType={null}
        onTypeChange={() => {}}
      />,
    )

    const gridButton = screen.getByTestId('grid-view-button')
    await user.click(gridButton)

    expect(onViewChange).toHaveBeenCalledWith('grid')
  })
})
