import { Box } from "@mui/material";
import SaleSearch from "app/components/saleSearch/SaleSearch";
import theme from "core/theme/theme";
import { SaleList } from "../../components/saleList/SaleList";
import { SaleInfos } from "../../components/saleInfos/SaleInfos";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Produto = {
  code: string;
  name: string;
  description: string;
  value: number;
};

export type ItemNaLista = {
  qtd: number;
  totalValue: number;
} & Produto;

export type ListaDeCompra = ItemNaLista[];

export const Sale = () => {
  const navigate = useNavigate();

  // lista de produtos
  const [list, setList] = useState<ListaDeCompra>([]);

  // limpar lista
  const resetList = () => {
    setList([]);
  };

  // adicionar produto na lista
  const handlePushTocart = useCallback(
    (newProduct: ItemNaLista) => {
      let newList: ListaDeCompra = list;
      newList.push(newProduct);
      setList(newList);
    },
    [list]
  );

  // altera a quantidade na mão

  // remover produto da lista
  const handleRemoveFromListByCode = useCallback(
    (productCode: string) => {
      let newList: ListaDeCompra = list;
      // devolve todos os produtos que não possuem o código específicado
      newList = newList.filter((item) => item.code !== productCode);
      setList(newList);
    },
    [list]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: theme.COLORS.GRAY6,
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
      }}
    >
      {/* listagem de produtos */}
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          minWidth: 800,
        }}
      >
        {/* search */}
        <SaleSearch handlePushToCart={handlePushTocart} />
        {/* lista */}
        <SaleList resetList={resetList} />
      </Box>
      {/* informações da venda */}
      <SaleInfos />
    </Box>
  );
};
