import type { DateRangeValue } from '@exotel-npm-dev/signal-design-system'

/** Mirrors design-system `FilterRecords` (not re-exported from the package root). */
export type FilterRecords = Record<string, string | DateRangeValue | string[] | undefined>
