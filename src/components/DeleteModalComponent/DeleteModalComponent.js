import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteModalComponent({show,onClose, title, onDelete}) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete selected {title.toLowerCase()}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete {title}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
