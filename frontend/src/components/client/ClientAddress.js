import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%; 
  max-width: 400px; 
  position: relative; 
`;

const CloseButton = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px; 
  font-size: 1.5em;
  line-height: 1; 
`;

const AddressContent = styled.span`
  color: blue;     
  font-weight: bold; 
`;

function ClientAddress(props){
    return(
      <Modal onClose={props.closeModal}>
        <h4>{`Address of ${props.selectedClient.firstName} ${props.selectedClient.surName}`}</h4>
        <p>Address: <AddressContent>{props.selectedClient.homeAddress.addressLine1} 
        &nbsp; {props.selectedClient.homeAddress.addressLine2}</AddressContent></p>
        <p>Town: <AddressContent>{props.selectedClient.homeAddress.town}</AddressContent></p>
        <p>County: <AddressContent>{props.selectedClient.homeAddress.countyCity}</AddressContent></p>
        <p>Eircode: <AddressContent>{props.selectedClient.homeAddress.eircode}</AddressContent></p>
      </Modal>
    )
}

function Modal({ onClose, children }) {
    return (
      <StyledModal>
        <ModalContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {children}
        </ModalContent>
      </StyledModal>
    );
  }

export default ClientAddress;