import { ClientLbsService } from "core/api/client/clientService";
import { Order } from "core/models/table";
import { removeNonNumeric } from "core/utils/globalFunctions";


export const fecthClients = async (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: Order,
    name?: string,
    cep?: string,
    address?: string,
    city?: string,
    neighborhood?: string,
    uf?: string,
    createDate?: string,
    cpforCnpj?: string,
) => {
    return await ClientLbsService.getFiltedClient({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name,
        cep: cep,
        address: address,
        city: city,
        neighborhood: neighborhood,
        uf: uf,
        createDate: createDate,
        cpforCnpj: cpforCnpj === "" ? undefined : removeNonNumeric(cpforCnpj),
    });
};