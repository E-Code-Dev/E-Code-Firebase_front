import styled from '@emotion/styled'

export const OverlayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalCard = styled.div`
  background-color: white;
  width: 552px;
  padding: 32px;
  border-radius: 4px;
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`
