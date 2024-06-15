import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import theme from "core/theme/theme";
import AsyncAutoComplete from "../assyncronusAutoComplete/AssyncAutoComplete";
import { ItemNaLista } from "app/views/sale/sale";
import { removeNonNumeric } from "core/utils/globalFunctions";
import { CLIENT_LIST } from "core/utils/constants";
import { useNavigate } from "react-router-dom";
import DefaultDialog from "../defaultDialog/defaultDialog";

const styles = {
  height: 40,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "transparent", // ou qualquer cor de fundo desejada
    boxShadow: "none",
    color: theme.COLORS.BLACK,
  },
};

interface ISaleSearchProps {
  handlePushToCart: (newProduct: ItemNaLista) => void;
}

const initialProduct: ItemNaLista = {
  code: "",
  name: "",
  description: "",
  value: 0,
  qtd: 0,
  totalValue: 0,
};

function SaleSearch({ handlePushToCart }: ISaleSearchProps) {
  const navigate = useNavigate();

  // item da lista temporário
  const [tempProduct, setTempProduct] = useState<ItemNaLista>(initialProduct);

  //dialog
  const [confirmExit, setConfirmExit] = useState(false);

  // selecionar produto da lista de search
  const handleSelect = (selected: { name: string }) => {
    // altera para o produto selecionado quando tiver o back pronto
    console.log("Selecionado: ", selected);
  };

  // adicionar produto na lista
  const handlePushItem = useCallback(
    (newProduct: ItemNaLista | null) => {
      if (newProduct) {
        handlePushToCart(newProduct);
        setTempProduct(initialProduct);
      }
    },
    [handlePushToCart]
  );

  // mudar a quantidade do produto antes de enviar
  const handleChangeQtd = useCallback(
    (newValue: string) => {
      let parsedToNumber =
        newValue === "" ? 0 : Number(removeNonNumeric(newValue));
      setTempProduct((prev) => prev && { ...prev, qtd: parsedToNumber });
    },
    [tempProduct]
  );

  // mudar a quantidade do produto em 1
  const handleChangeByOneQtd = useCallback(
    (type: "add" | "minus") => {
      setTempProduct(
        (prev) =>
          prev && {
            ...prev,
            qtd: prev.qtd + (type === "add" ? 1 : prev.qtd === 0 ? 0 : -1),
          }
      );
    },
    [tempProduct]
  );

  // zerar quantidade
  const handleResetQtd = useCallback(() => {
    setTempProduct((prev) => prev && { ...prev, qtd: 0 });
  }, [tempProduct]);

  useEffect(() => {
    console.log(tempProduct);
  }, [tempProduct]);

  return (
    // container
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: "0.5rem",
      }}
    >
      {/* alterar quantidade */}
      <Button sx={styles} onClick={() => setConfirmExit(true)}>
        <ArrowBackIcon />
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <TextField
          label="Qtd"
          type="number"
          value={tempProduct?.qtd === 0 ? "" : tempProduct?.qtd}
          onChange={(event) => handleChangeQtd(event.target.value)}
          variant="outlined"
          size={"small"}
          sx={{ width: 70 }}
        />
        <ButtonGroup disableElevation variant="outlined">
          <Button sx={styles} onClick={() => handleChangeByOneQtd("add")}>
            <AddIcon />
          </Button>
          <Button sx={styles} onClick={() => handleChangeByOneQtd("minus")}>
            <RemoveIcon />
          </Button>
          <Button sx={styles} onClick={() => handleResetQtd()}>
            Zerar
          </Button>
        </ButtonGroup>
      </Box>
      {/* search */}
      <AsyncAutoComplete<{ name: string }>
        label="Procurar produto"
        handleOnSelect={handleSelect}
        urlToSearch={CLIENT_LIST}
      />
      {/* botao de adicionar */}
      <Button onClick={() => handlePushItem(tempProduct)} size={"small"}>
        Adicionar
      </Button>
      <DefaultDialog title="Voltar cancelará a venda" confirmAction={() => navigate(-1)} isOpen={confirmExit} onCloseAction={() => setConfirmExit(false)} />
    </Box>
  );
}

export default SaleSearch;
