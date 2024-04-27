import React, { useState } from 'react'
import axios from 'axios'
import './CreateGroup.css'

export default function CreateGroup() {
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [groupLogo, setGroupLogo] = useState('')
    const groupLogos = ['./img/baseball.jpg',
        './img/moon.png',
        './img/rocket.png',
        './img/apple.png',
        './img/calculator.png'];

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!groupLogo) {
            alert('Please select a logo.');
            return;
        }

        try {
            const user_idUser= JSON.parse(sessionStorage.getItem('id'));
            console.log(user_idUser);

            const response = await axios.post('http://localhost:3000/group/add', { groupName: groupName, groupDescription: groupDescription, groupLogo: groupLogo });
            console.log(response.data);

            const group_idGroup = response.data.result.idGroup;
            console.log(group_idGroup);

            await axios.post('http://localhost:3000/groupmember/add', { userId: user_idUser, groupId: group_idGroup, role: 'admin'})
            
        } catch (error) {
            console.error('Error adding group', error);
            console.log(groupName)
            console.log(groupDescription)
            console.log(groupLogo)
        }
    };

    return (
        <div class="container-sm">
            <p>Group Logo</p>
            <div className='group-logo'>
                {groupLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Group Logo ${index + 1}`}
                        onClick={() => setGroupLogo(logo)}
                        className={groupLogo === logo ? 'selected' : ''}

                    />
                ))}
            </div>
            <div className='input-data'>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="formGroupExampleInput" class="form-label">Group Name</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" value={groupName} onChange={(e) => setGroupName(e.target.value)} required></input>
                    </div>
                    <div className="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Group Description</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} required></input>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        </div>
    )
}
