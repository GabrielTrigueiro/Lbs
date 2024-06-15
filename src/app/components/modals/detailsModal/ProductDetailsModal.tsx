import { TClientBody } from "core/models/clientLBS";
import DefaultModal from "../defaultModal/defaultModal";
import { Container, InfoValue } from "./styles";
import { InfoCard, InfoCardContainer, InfoCardTitle, InfoKey, InfoRow, InfosSection, Title } from "app/components/styles";
import { formatCEP, formatCurrencyBR, formatDateBr, formatDocument, formatPhoneNumber, formatRG, formatarCEP, removeNonNumeric } from "core/utils/globalFunctions";
import { Box } from "@mui/material";
import { TProductBody } from "core/models/product";

interface TProductDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    product: TProductBody;
}

const ProductDetailsModal = (props: TProductDetailsProps) => {
    const { isOpen, onClose, onOpen, product } = props;

    return (
        <>
            <DefaultModal
                title="Detalhes do produto"
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                children={
                    <Container>
                        <InfosSection>
                            <InfoCardContainer>
                                <InfoCardTitle sx={{ width: "25%" }}>Informações do produto</InfoCardTitle>
                                <InfoCard>
                                    <InfoRow>
                                        <InfoKey>Preço de custo</InfoKey>
                                        <InfoValue>{formatCurrencyBR(product.priceCost)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Preço de etiqueta:</InfoKey>
                                        <InfoValue>{formatCurrencyBR(product.priceTag)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Preço de revenda:</InfoKey>
                                        <InfoValue>{formatCurrencyBR(product.resalePrice)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Última atualização:</InfoKey>
                                        <InfoValue>{formatDateBr(product.updatedAt)}</InfoValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoKey>Criado em:</InfoKey>
                                        <InfoValue>{formatDateBr(product.createdAt)}</InfoValue>
                                    </InfoRow>
                                </InfoCard>
                            </InfoCardContainer>
                        </InfosSection>

                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <InfosSection sx={{ flex: 1 }}>
                                <InfoCardContainer >
                                    <InfoCardTitle sx={{ width: "100%" }}>Informações da coleção</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>Nome:</InfoKey>
                                            <InfoValue>{product.collection.name}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Descrição:</InfoKey>
                                            <InfoValue>{product.collection.description}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>
                                </InfoCardContainer>
                            </InfosSection>
                            <InfosSection sx={{ flex: 1 }}>
                                <InfoCardContainer>
                                    <InfoCardTitle sx={{ width: "100%" }}>Informações da categoria</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>Nome:</InfoKey>
                                            <InfoValue>{product.category.name}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Descrição:</InfoKey>
                                            <InfoValue>{product.category.description}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>

                                </InfoCardContainer>
                            </InfosSection>
                            <InfosSection sx={{ flex: 1 }}>
                                <InfoCardContainer>
                                    <InfoCardTitle sx={{ width: "100%" }}>Informações da marca</InfoCardTitle>
                                    <InfoCard>
                                        <InfoRow>
                                            <InfoKey>Nome:</InfoKey>
                                            <InfoValue>{product.brand.name}</InfoValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoKey>Descrição:</InfoKey>
                                            <InfoValue>{product.brand.description}</InfoValue>
                                        </InfoRow>
                                    </InfoCard>
                                </InfoCardContainer>
                            </InfosSection>
                        </Box>
                    </Container>}
            />
        </>
    )
}

export default ProductDetailsModal