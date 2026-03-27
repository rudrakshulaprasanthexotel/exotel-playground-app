/** Row shape returned by the users table API */
export type TableUserRow = {
  id: number
  userName: string
  email: string
  role: string
  team: string
}

/** Paginated chunk response (same shape a REST API might return) */
export type UsersPageResponse = {
  total: number
  page: number
  pageSize: number
  rows: TableUserRow[]
}
