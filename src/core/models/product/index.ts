import { TBrandBody } from "../brand";
import { TCategoryBody } from "../category";
import { IPageable } from "../utils";
import {TCollection} from "../collection";


export type TCharacteristicsDTO = {
    name: string;
    description: string;
    cor: string;
    size: string;
};

export type TProductCharacteristicsDTO = {
    amount: number;
};

export type TProductRegister = {
    name: string;
    sku: string;
    priceCost: number;
    priceTag: number;
    resalePrice: number;
    brandId: number;
    categoryId: number;
    collectionId: number;
    characteristicsDTO: TCharacteristicsDTO;
    productCharacteristicsDTO: TProductCharacteristicsDTO;
};

export type TUpdateProduct = {
    name: string;
    sku: string;
    amount: number;
    active: boolean;
    qrCode: string;
    codManual: string;
};

export type TProductBody = {
    id: number;
    name: string;
    sku: string;
    priceCost: number;
    priceTag: number;
    resalePrice: number;
    amount: number;
    active: boolean;
    amountStock: number;
    barcode: string;
    qrCode: string;
    codManual: string;
    createdAt: string;
    updatedAt: string;
    collection: TCollection;
    category: TCategoryBody;
    brand: TBrandBody;
};

export type TProductFilterRequest = {
    name: string;
    sku: string;
    amount: number;
    active: boolean;
    qrCode: string;
    codManual: string;
};

export type TProductPageable = TProductFilterRequest & IPageable;