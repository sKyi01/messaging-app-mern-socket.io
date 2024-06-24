import React from 'react'
import { Modal,ModalContent, useDisclosure, ModalOverlay, ModalHeader, ModalBody, ModalFooter,ModalCloseButton,Button} from '@chakra-ui/react'
import { useRef } from 'react'
const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)


    return (
        <>
          <span onClick={onOpen}>{children}</span>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
