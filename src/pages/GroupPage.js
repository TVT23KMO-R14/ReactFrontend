import React, { useState, useEffect } from 'react'
import './GroupPage.css'
import GroupMemberList from '../components/GroupMemberList'
import { useLocation } from 'react-router-dom'
import { useUser } from '../context/useUser'
import axios from 'axios'
import JoinGroupButton from '../components/JoinGroupButton'
import LeaveGroupButton from '../components/LeaveGroupButton'
import DeleteGroupButton from '../components/DeleteGroupButton'

export default function GroupPage() {
    const location = useLocation();
    const groupid = location.state.idGroup;
    console.log(groupid);
    const [group, setGroup] = useState(null)
    const { user } = useUser()
    const [isMember, setIsMember] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersResponse = await axios.get(process.env.REACT_APP_SERVER_URL + 'groupMember/membersbygroup', { params: { groupId: groupid } });

                if (membersResponse.data.some(member => member.user_idUser === user.id)) {
                    setIsMember(true);
                    const currentUser = membersResponse.data.find(member => member.user_idUser === user.id);
                    setUserRole(currentUser.role);
                }
                console.log(userRole)
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [groupid]);


    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_SERVER_URL + 'group/one/', { params: { groupId: groupid } });
                setGroup(response.data);
                console.log(response.data);
                const membersResponse = await axios.get(process.env.REACT_APP_SERVER_URL + 'groupMember/membersbygroup', { params: { groupId: groupid } });

                console.log(membersResponse.data);
                if (membersResponse.data.some(member => member.user_idUser === user.id)) {
                    setIsMember(true);
                }
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };

        fetchGroup();
    }, [groupid])

    return (
        <div className="group-page-container">
            <div className='group-page-header'>
                {isMember && userRole === 'admin' && <DeleteGroupButton group={groupid} />}
                {!isMember && <JoinGroupButton group={groupid} />}
                {isMember && <LeaveGroupButton group={groupid} />}
                <div className='members-slider'>
                    <span className="material-symbols-outlined" id='member-button' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Group</span>
                </div>
            </div>

            <div className='container-lg'>
                <div className='group-content'>
                    <div className='group-content-header'>
                        <img src={group?.groupLogo}></img>
                        <h1>{group?.groupName}</h1>
                    </div>
                    <div className='group-content-body'>
                        <p>{group?.groupDescription}</p>
                    </div>
                    <div className='group-buttons'>
                        <button type="button" className="btn-movies">Movies</button>
                        <button type="button" className="btn-series">Series</button>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Group Members</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <GroupMemberList groupid={groupid} />
                </div>
            </div>
        </div>
    )
}
