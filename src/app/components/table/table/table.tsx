import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    styled, IconButton,
} from "@mui/material";
import { IPropsDataTable, ITableHeadCell } from "../../../../core/models/table";
import StyledTableHead from "../tableHead/tableHead";
import {
    formatCurrency,
    formatDateBr,
    formatDocument,
    formatRG,
    formatarCEP,
} from "core/utils/globalFunctions";
import { FiberManualRecord } from "@mui/icons-material";

interface ITableRowProps {
    row: Record<string, any>;
    head: ITableHeadCell[];
    menu?: JSX.Element;
    accessRowById?: (id: string) => void;
}

export const StyledCircle = styled(FiberManualRecord)<{ isActive: boolean }>(
    ({ isActive }) => ({
        color: isActive ? "#83e509" : "#ff000080",
        fontSize: 30,
    })
);

function returnCellContent(item: any, row: Record<string, any>, menu?: JSX.Element, accessRowById?: (id: string) => void) {
    switch (item.name) {
        case "cpforcnpj":
            return formatDocument(row[item.name]);
        case "createdAt":
            return formatDateBr(row[item.name]);
        case "updatedAt":
            return formatDateBr(row[item.name]);
        case "created_at":
            return formatDateBr(row[item.name]);
        case "birthDate":
            return formatDateBr(row[item.name]);
        case "rg":
            return formatRG(row[item.name]);
        case "value":
            return `R$ ${formatCurrency(row[item.name])}`;
        case "isactive":
            return <StyledCircle isActive={row[item.name]} />;
        case "active":
            return <StyledCircle isActive={row[item.name]} />;
        case "neighborhood":
            return row.address?.neighborhood;
        case "uf":
            return row.address?.uf;
        case "city":
            return row.address?.city;
        case "cep":
            return formatarCEP(row.address?.zipCode);
        case "action":
            return menu && <>{menu}</>;
        case "qtd":
            return accessRowById && <IconButton sx={{ width: 30, height: 30 }} onClick={() => accessRowById(row.id)}><Typography>{row.qtd}</Typography></IconButton>;
        case "actions2":
            return menu && accessRowById && (
                <IconButton sx={{ width: 30, height: 30 }} onClick={() => accessRowById(row.id)}>
                    {menu}
                </IconButton>
            );
        default:
            return row[item.name];
    }

}

const DynamicTableRow: React.FC<ITableRowProps> = ({ row, head, menu, accessRowById }) => (
    <TableRow key={row.id}>
        {head.map((item) => (
            <TableCell key={item.name} align={item.align || "left"}>
                {returnCellContent(item, row, menu, accessRowById)}
            </TableCell>
        ))}
    </TableRow>
);

export default function DataTable(props: IPropsDataTable) {
    const rows = props.data;

    useEffect(() => {
    }, [rows]);

    function handleSort(value: string) {
        if (value !== undefined) {
            if (props.orderBy === value) {
                props.order === "asc" ? props.setOrder("desc") : props.setOrder("asc");
            } else {
                props.setOrder("asc");
                props.setOrderBy(value);
            }
        }
    }

    return (
        <Table stickyHeader>
            <StyledTableHead
                head={props.head}
                orderBy={props.orderBy}
                order={props.order}
                onRequestSort={handleSort}
            />
            <TableBody>
                {rows ? (
                    rows.map((row) => (
                        <DynamicTableRow
                            key={row.id}
                            row={row}
                            head={props.head}
                            menu={props.menu}
                            accessRowById={props.accessRowById}
                        />
                    ))
                ) : (
                    <Typography m="auto">Nenhum resultado encontrado</Typography>
                )}
            </TableBody>
        </Table>
    );
}
