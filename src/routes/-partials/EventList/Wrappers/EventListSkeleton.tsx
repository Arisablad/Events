type EventListSkeletonProps = Readonly<{
  viewType: 'flex' | 'grid'
}>

const EventListSkeletonItem = () => {
  return (
    <div
      className={'flex flex-col gap-2 p-4 bg-content1 shadow-md rounded-2xl'}
    >
      <div className={'animate-pulse h-48 bg-content2 rounded-2xl'} />
      <div className={'h-6 bg-content2 rounded w-full'} />
      <div className={'h-4 bg-content2 rounded w-1/2'} />
      <div className={'h-4 bg-content2 rounded w-1/3'} />
      <div className={'h-4 bg-content2 rounded w-1/3'} />
    </div>
  )
}

const EventListSkeleton = ({ viewType }: EventListSkeletonProps) => {
  if (viewType === 'flex') {
    return (
      <div className={'flex flex-col gap-4'}>
        {Array.from({ length: 6 }).map((_, index) => (
          <EventListSkeletonItem key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <EventListSkeletonItem key={index} />
      ))}
    </div>
  )
}

export { EventListSkeleton }
