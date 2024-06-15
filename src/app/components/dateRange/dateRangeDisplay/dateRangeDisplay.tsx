import React, { Dispatch, SetStateAction, useState } from "react";
import { Display } from "./styles";
import { Tooltip } from "@mui/material";
import { formatDateBr } from "core/utils/globalFunctions";
import DataPicker from "app/components/dataPicker/datePicker";
import { Dayjs } from "dayjs";

interface IDisplayProps {
  initialDate: Dayjs | null | undefined;
  endDate?: Dayjs | null | undefined;
  setInitialDate: Dispatch<SetStateAction<Dayjs | null | undefined>>;
  setFinalDate: Dispatch<SetStateAction<Dayjs | null | undefined>>;
  typeOfDatePicker: string;
}

export default function DateRangeDisplay(props: Readonly<IDisplayProps>) {
  const { initialDate, endDate, setFinalDate, setInitialDate, typeOfDatePicker } = props;
  const [datePickerState, setdatePickerState] = useState<boolean>(false);
  return (
    <>
      <Tooltip
        onClick={() => setdatePickerState(true)}
        title="Alterar data"
        followCursor
      >
        <Display>
          Período: {initialDate?.format("DD-MM-YYYY")}
          {endDate ? ` - ${endDate?.format("DD-MM-YYYY")}` : ""}
        </Display>
      </Tooltip>
      <DataPicker
        typeOfDatePicker={typeOfDatePicker}
        title="Filtrar data"
        isOpen={datePickerState}
        onOpen={() => setdatePickerState(true)}
        onClose={() => setdatePickerState(false)}
        initialDate={initialDate}
        endDate={endDate}
        setFinalDate={setFinalDate}
        setInitialDate={setInitialDate}
      />
    </>
  );
}
