import React from 'react';
import styled from 'styled-components';

// Styled components
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

const AddtionalContent = styled.span`
  color: blue;     
  font-weight: bold; 
`;

function ClientAdditionalList(props){

    function parseDate(dateString){
        // 使用Date对象解析日期字符串
        const date = new Date(dateString);
        // 将日期转换为ISO字符串，然后分割并取第一个部分
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate
    }
    
    return(
      <Modal onClose={props.closeModal}>
        <h4>{`Additional Information of ${props.selectedClient.firstName} ${props.selectedClient.surName}`}</h4>
        <p>Date of Birth: <AddtionalContent>{parseDate(props.selectedClient.dateOfBirth)}</AddtionalContent></p>
        <p>Parent Guardian Name: <AddtionalContent>{props.selectedClient.parentGuardianName}</AddtionalContent></p>
        <p>Permission To Leave Message: <AddtionalContent>{props.selectedClient.permissionToLeaveMessage}</AddtionalContent></p>
        <p>Gender: <AddtionalContent>{props.selectedClient.gender}</AddtionalContent></p>
        <p>Martial Status: <AddtionalContent>{props.selectedClient.maritalStatus}</AddtionalContent></p>
        <p>Referrer: <AddtionalContent>{props.selectedClient.referrer}</AddtionalContent></p>
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

export default ClientAdditionalList;