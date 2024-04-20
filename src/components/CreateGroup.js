import React, { useState } from 'react'
import axios from 'axios'
import './CreateGroup.css'

export default function CreateGroup() {
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/group/add', { groupName: groupName, groupDescription: groupDescription });
          console.log(response.data);
        } catch (error) {
          console.error('Error adding group', error);
        }
      };

    return (
        <div class="container-sm">
            <div className='input-data'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="formGroupExampleInput" class="form-label">Group Name</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Group Description</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)}></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
