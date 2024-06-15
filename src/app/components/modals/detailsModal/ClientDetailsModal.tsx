import { TClientBody } from "core/models/clientLBS";
import DefaultModal from "../defaultModal/defaultModal";
import { Container, InfoValue } from "./styles";
import { InfoCard, InfoCardContainer, InfoCardTitle, InfoKey, InfoRow, InfosSection, Title } from "app/components/styles";
import { formatCEP, formatDateBr, formatDocument, formatPhoneNumber, formatRG, formatarCEP, removeNonNumeric } from "core/utils/globalFunctions";
import { Box } from "@mui/material";

interface IClientDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  client: TClientBody;
}

const ClientDetailsModal = (props: IClientDetailsProps) => {
  const { isOpen, onClose, onOpen, client } = props;

  return (
    <>
      <DefaultModal
        title="Detalhes do cliente"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        children={
          <Container>
            <InfosSection>
              <InfoCardContainer>
                <InfoCardTitle sx={{ width: "23%" }}>Informações gerais</InfoCardTitle>
                <InfoCard>
                  <InfoRow>
                    <InfoKey>Nome:</InfoKey>
                    <InfoValue>{client.name}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>RG: </InfoKey>
                    <InfoValue>{formatRG(client.rg)}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>CPF / CNPJ </InfoKey>
                    <InfoValue>{formatDocument(client.cpforcnpj)}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Data de nascimento:</InfoKey>
                    <InfoValue>{formatDateBr(client.birthdate)}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoKey>Criado em:</InfoKey>
                    <InfoValue>{formatDateBr(client.createdAt)}</InfoValue>
                  </InfoRow>
                </InfoCard>
              </InfoCardContainer>
            </InfosSection>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <InfosSection sx={{ flex: 1 }}>
                <InfoCardContainer >
                  <InfoCardTitle sx={{ width: "65%" }}>Informações de endereço</InfoCardTitle>
                  <InfoCard>
                    <InfoRow>
                      <InfoKey>CEP:</InfoKey>
                      <InfoValue>{formatarCEP(client.address.zipCode)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>UF:</InfoKey>
                      <InfoValue>{client.address.uf}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Cidade:</InfoKey>
                      <InfoValue>{client.address.city}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Bairro:</InfoKey>
                      <InfoValue>{client.address.neighborhood}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Rua:</InfoKey>
                      <InfoValue>{client.address.road}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Número:</InfoKey>
                      <InfoValue>{client.address.number}</InfoValue>
                    </InfoRow>
                  </InfoCard>

                </InfoCardContainer>
              </InfosSection>
              <InfosSection sx={{ flex: 1 }}>
                <InfoCardContainer>
                  <InfoCardTitle sx={{ width: "65%" }}>Informações de contatos</InfoCardTitle>
                  <InfoCard>
                    <InfoRow>
                      <InfoKey>Celular 1:</InfoKey>
                      <InfoValue>{formatPhoneNumber(client.contacts.cell_phone1)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Celular 2:</InfoKey>
                      <InfoValue>{formatPhoneNumber(client.contacts.cell_phone2) ?? "--"}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Telefone</InfoKey>
                      <InfoValue>{formatPhoneNumber(client.contacts.telephone) ?? "--"}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoKey>Email:</InfoKey>
                      <InfoValue>{client.contacts.email}</InfoValue>
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

export default ClientDetailsModal