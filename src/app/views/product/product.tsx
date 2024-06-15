import { Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import DefaultFilter, { ISelectItem } from "app/components/filter/defaultFilter";
import DefaultMenu, { IMenuItemProps } from "app/components/menu/DefaultMenu";
import Search from "app/components/search/Search";
import Spinner from "app/components/spinner/spinner";
import { PageContentContainer } from "app/components/styles";
import DataTable from "app/components/table/table/table";
import TableHeader from "app/components/table/tableHeader/TableHeader";
import { ContentBody } from "app/styles";
import { ITableHeadCell, Order } from "core/models/table";
import { fecthProduct } from "core/querryes/product/productQuerry";
import theme from "core/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import DataTablePagination from "app/components/table/pagination/pagination";
import { TProductFilterRequest } from "core/models/product";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsModal from "app/components/modals/detailsModal/ProductDetailsModal";

const head: ITableHeadCell[] = [
    { name: "name", label: "Nome", align: "left" },
    { name: "amount", label: "Quantidade", align: "left" },
    { name: "amountStock", label: "Quantidade em estoque", align: "left" },
    { name: "sku", label: "Sku", align: "center" },
    { name: "qrCode", label: "QrCode", align: "left" },
    { name: "codManual", label: "Código do manual", align: "left" },
    { name: "active", label: "Ativo", align: "left" },
    { name: "actions2", label: "Opções", align: "left" },
];

const filterItems: ISelectItem[] = [
    { name: "Nome", value: "name", type: "texto" },
    { name: "Quantidade", value: "amount", type: "texto" },
    { name: "Sku", value: "sku", type: "texto" },
    { name: "Ativos", value: "active", type: "texto" },
    { name: "QrCode", value: "qrCode", type: "texto" },
    { name: "Código do Manual", value: "codManual", type: "texto" },
];


function Collection() {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [filterModal, setFilterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [details, setDetails] = useState(false);
    const [idProduct, setIdProduct] = useState<string | undefined>();
    const [productFilters, setProductFilters] = useState<TProductFilterRequest>({
        name: undefined,
        sku: undefined,
        amount: undefined,
        active: undefined,
        qrCode: undefined,
        codManual: undefined

    });

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAccessRowById = (id: string) => {
        setIdProduct(id);
    }



    const menuItems: IMenuItemProps[] = [
        {
            function: () => {
                handleAccessRowById(idProduct || "");
                navigate("/editarProduto", { state: { product: selectedProduct } });
                handleCloseMenu();
            },
            label: "Editar produto",
        },
        {
            function: () => {
                setDetails(true)
                handleAccessRowById(idProduct || "");
                handleCloseMenu();
            },
            label: "Detalhes do produto",
        },
    ];



    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["product", page, rowsPerPage, orderBy, order, productFilters],
        queryFn: () =>
            fecthProduct(
                page,
                rowsPerPage,
                orderBy,
                order,
                productFilters.name,
                productFilters.amount,
                productFilters.sku,
                productFilters.active,
                productFilters.qrCode,
                productFilters.codManual,
            ),
        staleTime: Infinity,
    })


    useEffect(() => {
        if (isSuccess && data) {
            setCount(data.totalElements);
        }
    }, [isSuccess, data]);


    const removeFilter = (attribute: string) => {
        setProductFilters((prevState) => ({
            ...prevState,
            [attribute]: undefined,
        }));
    };

    const selectedProduct = data?.content.find((collection: any) => collection.id === idProduct);
    return (
        <PageContentContainer>
            <TableHeader
                filterBtn
                filterBtnAction={() => setFilterModal(true)}
                filter={productFilters}
                remove={removeFilter}
                mainActionFunction={() => navigate("/registrarProduto")}
                mainActionLabel="Cadastrar Produto"
                mainIcon={<Add sx={{ color: theme.COLORS.YELLOW2 }} />}
                extraComponents={
                    <Search
                        searchPlaceHolder="Nome da produto..."
                        querrySearching={isLoading}
                        cpf={productFilters.name}
                        onChange={(e: string | undefined) => setProductFilters((prevState) => ({
                            ...prevState,
                            name: e,
                        }))}
                    />
                }
            />
            <ContentBody>
                {isLoading ? (
                    <Box sx={{ position: "relative", height: 500 }}>
                        <Spinner
                            state={isLoading}
                            size={10}
                            css={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                            }}
                        />
                    </Box>
                ) : (
                    <DataTable
                        head={head}
                        data={data?.content}
                        order={order}
                        orderBy={orderBy}
                        setOrder={setOrder}
                        setOrderBy={setOrderBy}
                        accessRowById={handleAccessRowById}
                        menu={
                            <Tooltip title="Opções">
                                <IconButton onClick={handleClickMenu}>
                                    <MoreHorizRounded />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                )}
                <DefaultMenu
                    anchor={anchorEl}
                    menuItems={menuItems}
                    onClose={handleCloseMenu}
                    status={open}
                />
                {selectedProduct && details && (
                    <ProductDetailsModal
                        product={selectedProduct}
                        isOpen={details}
                        onClose={() => setDetails(false)}
                        onOpen={() => setDetails(true)}
                    />
                )}
                <DataTablePagination
                    setPage={setPage}
                    page={page}
                    setRowsPerPage={setRowsPerPage}
                    rowsPerPage={rowsPerPage}
                    count={count}
                />
                <DefaultFilter
                    isOpen={filterModal}
                    items={filterItems}
                    onChangeFilter={setProductFilters}
                    onClose={() => setFilterModal(false)}
                    onOpen={() => setFilterModal(true)}
                    title="Filtrar coleção"
                    changePage={setPage}
                />
            </ContentBody>
        </PageContentContainer>
    );
};

export default Collection