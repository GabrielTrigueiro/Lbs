import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { axiosInstance } from "core/api/axios/axiosInstance";
import { IPage, IResponseBody } from "core/models/utils";

interface IAsyncProps<T> {
  handleOnSelect: (selected: T) => void;
  urlToSearch: string;
  label: string;
}

export default function AsyncAutoComplete<T extends { name: string }>({
  handleOnSelect,
  urlToSearch,
  label
}: IAsyncProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await axiosInstance.get<IResponseBody<IPage<T>>>(
          urlToSearch,
          {
            params: {
              page,
              size: rowsPerPage,
              sort: "name,desc",
            },
          }
        );
        if (active) {
          setOptions(response.data.data.content);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, urlToSearch]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event: any, value: T | null) => {
        if (value) {
          handleOnSelect(value);
        }
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      loadingText={"Procurando..."}
      renderInput={(params) => (
        <TextField
          {...params}
          size={"small"}
          fullWidth
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
