import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { IEditButtonProps } from './editButton.interface'
import { EditForm } from '../EditForm/EditForm'

export const EditButton: FC<IEditButtonProps> = (product) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button variant='solid' colorScheme='teal' onClick={onOpen}>
        Change
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={24} color={'teal.900'}>
            Change Product Info
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditForm onCloseModal={onClose} {...product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
