import React, { useState } from 'react'
import MainScreenComponent from './MainScreenComponent'
import { Button, Form } from 'react-bootstrap'

const MyProfileComponent = () => {
    const userData = localStorage.getItem('userInfo')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')


    const changePassword = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmNewPassword) {
          alert('New passwords do not match');
          return;
        }
    
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
        if (userInfo && userInfo.token) {
          const response = await fetch('/api/users/change-password', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
          });
    
          if (response.ok) {
            alert('Password changed successfully');
          } else {
            console.error('Error changing password: ', await response.text());
          }
        }
      };



    
if(userData){
  return (
    <MainScreenComponent title='My Profile'>
        <h2>Change Password</h2>
        <Form onSubmit={changePassword}>
        <Form.Group className="mb-3" controlId="oldPassword">
        <Form.Label>Old Password</Form.Label>
        <Form.Control type="text" placeholder="Enter Old Password" onChange={(e)=>setOldPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>New PasswordPassword</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password" onChange={(e)=>setNewPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmNewPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm New Password" onChange={(e)=>setConfirmNewPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </MainScreenComponent>
  )}
  else{
    return(
        <MainScreenComponent title='My Profile'>
            <h2>Please log in to view your profile</h2>
        </MainScreenComponent>
    )
  }
}

export default MyProfileComponent