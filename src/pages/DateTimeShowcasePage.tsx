import { useState } from 'react'
import {
  Box,
  Card,
  DateCalendar,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  DigitalClock,
  Grid,
  LocalizationProvider,
  PageHeader,
  Paper,
  Stack,
  StaticDatePicker,
  StaticTimePicker,
  TimeClock,
  TimePicker,
  Typography,
  type DateRange,
} from '@exotel-npm-dev/signal-design-system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Card>
  )
}

export function DateTimeShowcasePage() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null)
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null)
  const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(null)
  const [calendarValue, setCalendarValue] = useState<Dayjs | null>(null)
  const [clockValue, setClockValue] = useState<Dayjs | null>(null)
  const [digitalClockValue, setDigitalClockValue] = useState<Dayjs | null>(null)
  const [dateRangeValue, setDateRangeValue] = useState<DateRange<Dayjs>>([null, null])
  const [staticDateValue, setStaticDateValue] = useState<Dayjs | null>(null)
  const [staticTimeValue, setStaticTimeValue] = useState<Dayjs | null>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          p: 3,
          minHeight: '100%',
          backgroundColor: 'surface.elevation1',
        }}
      >
        <Stack spacing={3}>
          <PageHeader
            title="Example - Date & Time Components"
            subtitle="Interactive date and time widgets from Signal Design System"
          />

          {/* Picker inputs */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Picker Inputs
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Date Picker">
                <DatePicker
                  label="Select date"
                  value={dateValue}
                  onChange={setDateValue}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
                <Typography variant="caption" color="text.secondary">
                  Selected: {dateValue ? dateValue.format('MMM D, YYYY') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Time Picker">
                <TimePicker
                  label="Select time"
                  value={timeValue}
                  onChange={setTimeValue}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
                <Typography variant="caption" color="text.secondary">
                  Selected: {timeValue ? timeValue.format('hh:mm A') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Date Time Picker">
                <DateTimePicker
                  label="Select date & time"
                  value={dateTimeValue}
                  onChange={setDateTimeValue}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
                <Typography variant="caption" color="text.secondary">
                  Selected: {dateTimeValue ? dateTimeValue.format('MMM D, YYYY hh:mm A') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
          </Grid>

          {/* Range picker */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Range Picker
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard title="Date Range Picker">
                <DateRangePicker
                  value={dateRangeValue}
                  onChange={setDateRangeValue}
                  localeText={{ start: 'Start date', end: 'End date' }}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
                <Typography variant="caption" color="text.secondary">
                  Range: {dateRangeValue[0]?.format('MMM D') ?? '—'} to {dateRangeValue[1]?.format('MMM D, YYYY') ?? '—'}
                </Typography>
              </SectionCard>
            </Grid>
          </Grid>

          {/* Static / inline widgets */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Inline Widgets
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Date Calendar">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DateCalendar value={calendarValue} onChange={setCalendarValue} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected: {calendarValue ? calendarValue.format('MMM D, YYYY') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Time Clock">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TimeClock value={clockValue} onChange={setClockValue} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected: {clockValue ? clockValue.format('hh:mm A') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <SectionCard title="Digital Clock">
                <Box sx={{ maxHeight: 280, overflow: 'auto' }}>
                  <DigitalClock value={digitalClockValue} onChange={setDigitalClockValue} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected: {digitalClockValue ? digitalClockValue.format('hh:mm A') : 'None'}
                </Typography>
              </SectionCard>
            </Grid>
          </Grid>

          {/* Static pickers */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Static Pickers
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <SectionCard title="Static Date Picker">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StaticDatePicker
                    value={staticDateValue}
                    onChange={setStaticDateValue}
                  />
                </Box>
              </SectionCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <SectionCard title="Static Time Picker">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StaticTimePicker
                    value={staticTimeValue}
                    onChange={setStaticTimeValue}
                  />
                </Box>
              </SectionCard>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </LocalizationProvider>
  )
}
