import { CollaboratorService } from "core/api/collaborator/collaboratorService";
import { Order } from "core/models/table";

export const fecthCollaborator = async (
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
) => {
    return await CollaboratorService.getFiltedCollaborator({
        page: page,
        size: rowsPerPage,
        sort: orderBy + "," + order,
        name: name,
        cep: cep,
        address: address,
        city: city,
        neighborhood: neighborhood,
        uf: uf,
    });
};