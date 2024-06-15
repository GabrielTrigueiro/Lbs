import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer, InfoCardTitle } from 'app/components/styles';
import GenericTextField from 'app/components/genericTextField/GenericTextField';
import { Validations } from 'core/utils/validations';
import { ProductService } from 'core/api/product/productService';
import { string } from 'yup';
import { TProductRegister } from 'core/models/product';
import AsyncAutoComplete from 'app/components/assyncronusAutoComplete/AssyncAutoComplete';
import { BRAND_LIST, CATEGORY_LIST, COLLECTION_LIST } from 'core/utils/constants';
import { TCategoryBody } from 'core/models/category';
import { TCollectionBody } from 'core/models/collection';
import { TBrandBody } from 'core/models/brand';
import PriceTextField from 'app/components/InputPrice/PriceTextField';

const RegisterProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);
  const [priceCost, setPriceCost] = useState<number | undefined>();
  const [priceTag, setPriceTag] = useState<number | undefined>();
  const [resalePrice, setResalePrice] = useState<number | undefined>();

  const initialValues: TProductRegister = {
    name: "",
    priceCost: 0,
    priceTag: 0,
    resalePrice: 0,
    sku: "",
    categoryId: 0,
    collectionId: 0,
    brandId: 0,
    characteristicsDTO: {
      cor: "",
      name: "",
      description: "",
      size: "",
    },
    productCharacteristicsDTO: {
      amount: 0,
    }
  };

  const handleSelectCategory = (selected: TCategoryBody) => {
    formik.setFieldValue("categoryId", selected.id)
    console.log("Selecionado: ", selected);
  };

  const handleSelectBrand = (selected: TBrandBody) => {
    formik.setFieldValue("collectionId", selected.id)
    console.log("Selecionado: ", selected);
  };

  const handleSelectCollection = (selected: TCollectionBody) => {
    formik.setFieldValue("brandId", selected.id)
    console.log("Selecionado: ", selected);
  };

  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateProduct = async (newProduct: TProductRegister) => {
    setIsLoading(true)
    let cleanedProduct: TProductRegister = {
      name: newProduct.name,
      priceCost: newProduct.priceCost,
      priceTag: newProduct.priceTag,
      resalePrice: newProduct.resalePrice,
      sku: newProduct.sku,
      categoryId: newProduct.categoryId,
      collectionId: newProduct.collectionId,
      brandId: newProduct.brandId,
      characteristicsDTO: {
        cor: newProduct.characteristicsDTO.cor,
        name: newProduct.characteristicsDTO.name,
        description: newProduct.characteristicsDTO.description,
        size: newProduct.characteristicsDTO.size,
      },
      productCharacteristicsDTO: {
        amount: newProduct.productCharacteristicsDTO.amount,
      }

    };
    ProductService.createProduct(cleanedProduct)
      .then((resp) => {
        handleResetStates();
        navigate(-1)
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    // validationSchema: Validations.CollectionRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(priceCost);
      console.log(priceTag);
      console.log(resalePrice);

      // setIsLoading(true);
      // await callCreateProduct(values);
      // setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar Produto</RegisterPageHeader>
      <RegisterPageContent>
        <Box
          sx={{
            gap: " 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações do produto
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                small
                name={"name"}
                label={"Nome"}
                value={formik.values.name}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.sku}
                helperText={formik.errors.sku}
                small
                name={"sku"}
                label={"Sku"}
                value={formik.values.sku}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <AsyncAutoComplete
                label="Procurar categorira"
                handleOnSelect={handleSelectCategory}
                urlToSearch={CATEGORY_LIST}
              />
              <AsyncAutoComplete
                label="Procurar coleção"
                handleOnSelect={handleSelectCollection}
                urlToSearch={COLLECTION_LIST}
              />
              <AsyncAutoComplete
                label="Procurar marca"
                handleOnSelect={handleSelectBrand}
                urlToSearch={BRAND_LIST}
              />
            </InfoCard>
          </InfoCardContainer>
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações de preço
            </InfoCardTitle>
            <InfoCard>
              <PriceTextField
                name="priceCost"
                label="Preço de custo"
                value={formik.values.priceCost.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  formik.handleChange(event);
                }}
                error={!!formik.errors.priceCost}
                helperText={formik.errors.priceCost}
                priceNumber={priceCost}
                setPriceNumber={setPriceCost}
              />
              <PriceTextField
                name="priceTag"
                label="Preço de etiqueta"
                value={formik.values.priceTag.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  formik.handleChange(event);
                }}
                error={!!formik.errors.priceCost}
                helperText={formik.errors.priceCost}
                priceNumber={priceTag}
                setPriceNumber={setPriceTag}
              />
              <PriceTextField
                name="resalePrice"
                label="Preço de revenda"
                value={formik.values.resalePrice.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  formik.handleChange(event);
                }}
                error={!!formik.errors.resalePrice}
                helperText={formik.errors.resalePrice}
                priceNumber={resalePrice}
                setPriceNumber={setResalePrice}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/produtos")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage >
  )
}

export default RegisterProduct