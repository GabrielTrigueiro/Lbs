import { TBrandBody } from "../brand";
import { TCategoryBody } from "../category";
import { TCollectionBody } from "../collection";
import { IPageable } from "../utils";


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

export type TProductUpdate = {
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
    collection: TCollectionBody;
    category: TCategoryBody;
    brand: TBrandBody;
};

export type TProductFilterRequest = {
    name: string | undefined;
    sku: string | undefined;
    amount: number | undefined;
    active: boolean | undefined;
    qrCode: string | undefined;
    codManual: string | undefined;
};

export type TProductPageable = TProductFilterRequest & IPageable;