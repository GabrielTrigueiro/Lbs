import { Box, Skeleton, TextField, Typography } from "@mui/material";
import theme from "../../../core/theme/theme";
import Button from "../Button/button";
import AsyncAutoComplete from "../assyncronusAutoComplete/AssyncAutoComplete";
import PriceTextField from "../InputPrice/PriceTextField";
import { CLIENT_LIST, COLLABORATOR_LIST } from "core/utils/constants";

export const SaleInfos = () => {

  // selecionar produto da lista de search
  const handleSelectClient = (selected: { name: string }) => {
    // altera para o produto selecionado quando tiver o back pronto
    console.log("Selecionado: ", selected);
  };
  // selecionar produto da lista de search
  const handleSelectCollaborator = (selected: { name: string }) => {
    // altera para o produto selecionado quando tiver o back pronto
    console.log("Selecionado: ", selected);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        minWidth: 300,
        gap: "0.5rem",
      }}
    >
      {/*  infos do ultimo produto  */}
      <Box
        sx={{
          flex: 1,
          background: theme.COLORS.WHITE,
          borderRadius: "0.5rem",
          padding: "0.5rem",
          border: `2px solid ${theme.COLORS.GRAY5}`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Skeleton variant="rounded" width={200} height={"100%"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={"70%"} height={40} />
          <Skeleton variant="text" width={"70%"} height={40} />
          <Skeleton variant="text" width={"70%"} height={40} />
        </Box>
      </Box>
      {/*  entidades da compra  */}
      <Box
        sx={{
          background: theme.COLORS.WHITE,
          borderRadius: "0.5rem",
          padding: "0.5rem",
          border: `2px solid ${theme.COLORS.GRAY5}`,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <AsyncAutoComplete
          label="Procurar cliente"
          handleOnSelect={handleSelectClient}
          urlToSearch={CLIENT_LIST}
        />
        <AsyncAutoComplete
          label="Procurar vendedor"
          handleOnSelect={handleSelectCollaborator}
          urlToSearch={COLLABORATOR_LIST}
        />
      </Box>
      {/*  infos de pagamento  */}
      <Box
        sx={{
          flex: 3,
          background: theme.COLORS.WHITE,
          borderRadius: "0.5rem",
          padding: "0.5rem",
          border: `2px solid ${theme.COLORS.GRAY5}`,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <TextField 
            name="Método de pagamento"
            label="Método de pagamento"
            variant="outlined"
            size="small"
            fullWidth
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
          {/* <PriceTextField
            small={true}
            name={"desconto"}
            label={"Desconto R$"}
            value={0}
            onChange={(event) => {}}
          />
          <PriceTextField
            small={true}
            name={"desconto"}
            label={"Desconto %"}
            value={0}
            onChange={(event) => {}}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={"bold"}>Valor com desconto</Typography>
          <Typography>Valor aqui</Typography>
        </Box>
      </Box>

      {/*  botão  */}
      <Button
        title={"Finalizar compra"}
        isLoading={false}
        disabled={false}
        onClick={() => {}}
        sizeSpinner={0}
      />
    </Box>
  );
};
