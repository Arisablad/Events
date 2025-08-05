export const RTK_TAGS = {
  EVENT: 'Event',
} as const

export type RtkTagTypes = (typeof RTK_TAGS)[keyof typeof RTK_TAGS]
