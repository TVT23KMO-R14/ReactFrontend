import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function DeleteGroupButton({ group }) {
    const groupId = group
    console.log(groupId)


    const handleGroupDelete = async () => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + 'group/remove', {
                params: {
                    groupId: groupId
                }
            })
            alert('Group: ' + groupId + ' deleted successfully')
        } catch (error) {
            console.error(error)
            alert('Failed to delete group')
        }
    }

  return (
    <>
        <Button variant="danger" onClick={handleGroupDelete}>
            Delete group
        </Button>

    </>
  )
}
