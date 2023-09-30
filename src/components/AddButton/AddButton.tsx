import { AddIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { AddProductForm } from '../AddProductForm/AddProductForm'

export const AddButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <ButtonGroup
        size='md'
        mb={5}
        isAttached
        variant='outline'
        onClick={onOpen}
      >
        <Button>Add product</Button>
        <IconButton aria-label='Add to friends' icon={<AddIcon />} />
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProductForm onCloseModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
