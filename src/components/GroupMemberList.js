import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function GroupMemberList({ groupid }) {

    const [members, setMembers] = useState([])
    console.log(groupid)

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/groupMember/membersbygroup', {params: {groupId: groupid}});
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [groupid]);

    console.log(members)

    return (
        <>
            <ul>
                {
                    members.map(member => (
                        <li id='member-list' key={member.userId}>{member.userName} - {member.role}</li>
                    ))
                }
            </ul>
        </>
    )
}
