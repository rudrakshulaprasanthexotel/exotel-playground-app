import { useCallback, useEffect, useMemo, useState } from 'react'
import type { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid-pro'
import {
  Box,
  DataGrid,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
  type GridColDef,
  type ToolbarFilterConfig,
} from '@exotel-npm-dev/signal-design-system'
import { fetchUsersQuery } from '../api/usersApi'
import type { TableUserRow } from '../data/tableUser'
import type { FilterRecords } from '../types/filterRecords'

const roleOptions = [
  { value: 'all', label: 'All' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Member', label: 'Member' },
]

const teamOptions = [
  { value: 'all', label: 'All' },
  { value: 'Design', label: 'Design' },
  { value: 'Engineer', label: 'Engineer' },
]

const filterChipOptions = [
  { value: 'all', label: 'All' },
  { value: 'option_a', label: 'Option A' },
  { value: 'option_b', label: 'Option B' },
]

/** Must match toolbar `initialValue`s and stay in sync with `buildToolbarFilters` */
const INITIAL_TOOLBAR_FILTERS: FilterRecords = {
  role: 'all',
  team: 'all',
  filterChip1: 'option_a',
  filterChip2: 'option_b',
}

function buildToolbarFilters(): ToolbarFilterConfig[] {
  return [
    {
      id: 'role',
      type: 'select',
      label: 'Role',
      options: roleOptions,
      initialValue: INITIAL_TOOLBAR_FILTERS.role,
    },
    {
      id: 'team',
      type: 'select',
      label: 'Team',
      options: teamOptions,
      initialValue: INITIAL_TOOLBAR_FILTERS.team,
    },
    {
      id: 'filterChip1',
      type: 'select',
      label: 'Filter Chip 1',
      options: filterChipOptions,
      initialValue: INITIAL_TOOLBAR_FILTERS.filterChip1,
    },
    {
      id: 'filterChip2',
      type: 'select',
      label: 'Filter Chip 2',
      options: filterChipOptions,
      initialValue: INITIAL_TOOLBAR_FILTERS.filterChip2,
    },
  ]
}

export function ExampleTablePage() {
  const [rows, setRows] = useState<TableUserRow[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [filterRecords, setFilterRecords] = useState<FilterRecords>(() => ({ ...INITIAL_TOOLBAR_FILTERS }))

  const loadPage = useCallback(
    async (page: number, pageSize: number, sort: GridSortModel, filters: FilterRecords) => {
      setLoading(true)
      setLoadError(null)
      try {
        const { rows: nextRows, rowCount: total } = await fetchUsersQuery({
          page,
          pageSize,
          sortModel: sort,
          filters,
        })
        setRows(nextRows)
        setRowCount(total)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load users'
        setLoadError(message)
        setRows([])
        setRowCount(0)
      } finally {
        setLoading(false)
      }
    }, [])

  useEffect(() => {
    void loadPage(paginationModel.page, paginationModel.pageSize, sortModel, filterRecords)
  }, [paginationModel.page, paginationModel.pageSize, sortModel, filterRecords, loadPage])

  const toolbarFilters = useMemo(() => buildToolbarFilters(), [])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'userName',
        headerName: 'User Name',
        flex: 1,
        minWidth: 200,
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1.2,
        minWidth: 240,
        sortable: true,
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 120,
        sortable: true,
      },
      {
        field: 'team',
        headerName: 'Team',
        width: 130,
        sortable: true,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 72,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <IconButton
            size="small"
            aria-label="More actions"
            onClick={(e) => {
              e.stopPropagation()
              window.alert(`Row actions (id: ${String(params.id)})`)
            }}
          >
            <Icon name="dots-three-vertical" size="sm" />
          </IconButton>
        ),
      },
    ],
    [],
  )

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        p: 2,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={1.5} sx={{ flex: 1, height: '100%' }}>
        {loadError && (
          <Typography color="error" variant="body2">
            {loadError}
          </Typography>
        )}
        <Box sx={{ flex: 1, height: '100%', minHeight: 480 }}>
          <DataGrid
            title="Example - Table Page"
            rows={rows}
            columns={columns}
            loading={loading}
            checkboxSelection
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={(model) => {
              setSortModel(model)
              setPaginationModel((p) => ({ ...p, page: 0 }))
            }}
            paginationMode="server"
            rowCount={rowCount}
            disableRowSelectionOnClick
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            customToolbarFilters={toolbarFilters}
            onToolbarFiltersChange={(filters) => {
              setFilterRecords(filters)
              setPaginationModel((p) => ({ ...p, page: 0 }))
            }}
            showAppliedFilters
            maxVisibleAppliedFilters={4}
            onRefresh={() =>
              void loadPage(paginationModel.page, paginationModel.pageSize, sortModel, filterRecords)
            }
          />
        </Box>
      </Stack>
    </Paper>
  )
}
