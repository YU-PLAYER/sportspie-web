import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/ko';

export default function DateCalendarReferenceDate() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DemoContainer components={['DateCalendar']}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DateCalendar
          views={['year', 'month', 'day']}
          defaultValue={dayjs()}
          minDate={dayjs()}
        />
      </DemoContainer>
      <DemoContainer components={['TimePicker']}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <TimePicker label="시간 선택" sx={{bgcolor: 'white'}}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}