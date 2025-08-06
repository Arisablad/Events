import { EventTypeEnum } from '@/features/events'
import type { Nullable } from '@/types/global'
import { Button, Card, Input, Select, SelectItem, Tooltip } from '@heroui/react'
import {
  IconLayoutColumns,
  IconLayoutRows,
  IconSearch,
} from '@tabler/icons-react'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

type FiltersPropsType = Readonly<{
  onViewChange: (type: 'flex' | 'grid') => void
  viewType?: 'flex' | 'grid'
  onSearch?: (query: string) => void
  selectedType?: Nullable<EventTypeEnum>
  onTypeChange: (key: ChangeEvent<HTMLSelectElement>) => void
}>

const Filters = ({
  onViewChange,
  viewType = 'flex',
  onSearch,
  selectedType,
  onTypeChange,
}: FiltersPropsType) => {
  const { t } = useTranslation(['events', 'form', 'common'])

  return (
    <Card
      className={
        'flex flex-col items-center sm:flex-row gap-4 sm:gap-2 md:gap-4 lg:gap-6 py-2 px-6'
      }
    >
      <div className={'flex-1 flex flex-col sm:flex-row items-center gap-4'}>
        <Input
          placeholder={t('list.filters.search_placeholder')}
          startContent={<IconSearch className={'text-content4-foreground'} />}
          color={'primary'}
          size={'sm'}
          variant={'underlined'}
          onValueChange={onSearch}
        />
        <Select
          placeholder={t('form:placeholders.event_type')}
          label={t('form:labels.event_type')}
          isRequired
          onChange={onTypeChange}
          selectedKeys={selectedType ? [selectedType] : ['all']}
        >
          <SelectItem key="all" textValue={t('common:event_types.all_types')}>
            {t('common:event_types.all_types')}
          </SelectItem>
          <Fragment>
            {Object.values(EventTypeEnum).map((item) => (
              <SelectItem key={item} textValue={t(`event_types:${item}`)}>
                {t(`event_types:${item}`)}
              </SelectItem>
            ))}
          </Fragment>
        </Select>
      </div>
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
