import { Button, Card, Input, Tooltip } from '@heroui/react'
import {
  IconLayoutColumns,
  IconLayoutRows,
  IconSearch,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

type FiltersPropsType = Readonly<{
  onViewChange: (type: 'flex' | 'grid') => void
  viewType?: 'flex' | 'grid'
  onSearch?: (query: string) => void
}>

const Filters = ({
  onViewChange,
  viewType = 'flex',
  onSearch,
}: FiltersPropsType) => {
  const { t } = useTranslation('events')

  return (
    <Card
      className={
        'flex flex-row items-center sm:gap-2 md:gap-4 lg:gap-6 py-2 px-6'
      }
    >
      <Input
        placeholder={t('list.filters.search_placeholder')}
        startContent={<IconSearch className={'text-content4-foreground'} />}
        color={'primary'}
        size={'sm'}
        variant={'underlined'}
        onValueChange={onSearch}
      />
      <div className={'flex gap-2 items-center'}>
        <Tooltip content={t('list.filters.flex_view')}>
          <Button
            isIconOnly
            variant={viewType === 'flex' ? 'solid' : 'ghost'}
            color={'primary'}
            size={'sm'}
            className={'border-small border-primary/20'}
            onPress={() => onViewChange('flex')}
          >
            <IconLayoutRows size={16} />
          </Button>
        </Tooltip>
        <Tooltip content={t('list.filters.grid_view')}>
          <Button
            isIconOnly
            variant={viewType === 'grid' ? 'solid' : 'ghost'}
            color={'primary'}
            size={'sm'}
            className={'border-small border-primary/20'}
            onPress={() => onViewChange('grid')}
          >
            <IconLayoutColumns size={16} />
          </Button>
        </Tooltip>
      </div>
    </Card>
  )
}

export { Filters }
