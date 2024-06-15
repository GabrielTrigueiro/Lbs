import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "../../../core/theme/theme";
import { ITableHeadCell, Order } from "../../../core/models/table";
import DataTable from "../table/table/table";
import Button from "../Button/button";
import DefaultDialog from "../defaultDialog/defaultDialog";

interface ISaleListProps {
    resetList: () => void;
}

function createData(
  id: string,
  name: string,
  calories: number,
  qtd: number,
  carbs: number,
  protein: number
) {
  return { id, name, calories, qtd, carbs, protein };
}

const rows = [
  createData(uuidv4(), "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(uuidv4(), "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(uuidv4(), "Eclair", 262, 16.0, 24, 6.0),
  createData(uuidv4(), "Cupcake", 305, 3.7, 67, 4.3),
  createData(uuidv4(), "Gingerbread", 356, 16.0, 49, 3.9),
  createData(uuidv4(), "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(uuidv4(), "Eclair", 262, 16.0, 24, 6.0),
  createData(uuidv4(), "Cupcake", 305, 3.7, 67, 4.3),
  createData(uuidv4(), "Gingerbread", 356, 16.0, 49, 3.9),
  createData(uuidv4(), "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(uuidv4(), "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(uuidv4(), "Eclair", 262, 16.0, 24, 6.0),
  createData(uuidv4(), "Cupcake", 305, 3.7, 67, 4.3),
  createData(uuidv4(), "Gingerbread", 356, 16.0, 49, 3.9),
  createData(uuidv4(), "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(uuidv4(), "Eclair", 262, 16.0, 24, 6.0),
  createData(uuidv4(), "Cupcake", 305, 3.7, 67, 4.3),
  createData(uuidv4(), "Gingerbread", 356, 16.0, 49, 3.9),
];
const head: ITableHeadCell[] = [
  { name: "calories", label: "Calorias", align: "left" },
  { name: "qtd", label: "Gorduras", align: "left" },
  { name: "carbs", label: "Carboidratos", align: "left" },
  { name: "protein", label: "Proteinas", align: "left" },
  { name: "action", label: "Remover", align: "right" },
];

export const SaleList = ({resetList}: ISaleListProps) => {
  // dialog
  const [confirmClear, setConfirmClear] = useState(false);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name");

  return (
    <Box
      sx={{
        flex: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: theme.COLORS.WHITE,
        border: `2px solid ${theme.COLORS.GRAY5}`,
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flex: 10, overflowY: "scroll" }}>
        <DataTable
          head={head}
          data={rows}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          accessRowById={(id) => console.log(id)}
          menu={
            <IconButton>
              <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
            </IconButton>
          }
        />
      </Box>
      <Divider></Divider>
      <Divider></Divider>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Button
          sx={{ width: 120, height: 50 }}
          title={"Limpar"}
          isLoading={false}
          disabled={false}
          onClick={() => setConfirmClear(true)}
          sizeSpinner={20}
        />
        <Typography>Total: valor-aqui</Typography>
      </Box>
      <DefaultDialog
        title="Limpar a lista?"
        confirmAction={() => {
            resetList();
            setConfirmClear(false);
        }}
        isOpen={confirmClear}
        onCloseAction={() => setConfirmClear(false)}
      />
    </Box>
  );
};
