import { TProductBody, TProductPageable, TProductRegister, TProductUpdate } from "core/models/product"
import { IPage, IResponseBody } from "core/models/utils"
import { axiosInstance } from "../axios/axiosInstance"
import { PRODUCT_LIST, PRODUCT_SAVE, PRODUCT_UPDATE } from "core/utils/constants"
import { Notification } from "app/components/toastNotification/toastNotification"
import { isAxiosError } from "axios"

const getFiltedProduct = async (
    productPageable: TProductPageable
): Promise<IPage<TProductBody | undefined>> => {
    const response = await axiosInstance.get<IResponseBody<IPage<TProductBody>>>(
        PRODUCT_LIST,
        {
            params: {
                page: productPageable.page,
                size: productPageable.size,
                sort: "name,desc",
                name: productPageable?.name,
                amount: productPageable?.amount,
                sku: productPageable?.sku,
                active: productPageable?.active,
                qrCode: productPageable?.qrCode,
                codManual: productPageable?.codManual,
            },
        }
    )
    return response.data.data
}

const updateProduct = async (updatedProduct: TProductUpdate, idProduct: string): Promise<any> => {
    return await axiosInstance
        .put(`${PRODUCT_UPDATE}${idProduct}`, updatedProduct)
        .then((resp) => {
            Notification(resp.data.data, 'success')
            return resp
        }).catch((error) => {
            return error
        })
}

const createProduct = async (
    newProduct: TProductRegister
): Promise<any> => {
    return await axiosInstance
        .post(`${PRODUCT_SAVE}`, newProduct)
        .then((response) => {
            if (response instanceof isAxiosError) {
                return response;
            }
            Notification(response.data.data, 'success')
            return response;
        });
};

export const ProductService = {
    getFiltedProduct,
    updateProduct,
    createProduct
}