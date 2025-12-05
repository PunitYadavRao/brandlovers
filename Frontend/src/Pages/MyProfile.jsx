import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import Button from '../Components/ui/Button'
import Input from '../Components/ui/Input'
import Modal from '../Components/ui/Modal'
import Loading from '../Components/ui/Loading'

const MyProfile = () => {
  const { user, token, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
        // Update user context if needed
        window.location.reload()
      } else {
        toast.error(data.message || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('Error updating profile')
      console.error('Update profile error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Password changed successfully!')
        setShowPasswordModal(false)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        toast.error(data.message || 'Failed to change password')
      }
    } catch (error) {
      toast.error('Error changing password')
      console.error('Change password error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProfile = async () => {
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Profile deleted successfully!')
        logout()
      } else {
        toast.error(data.message || 'Failed to delete profile')
      }
    } catch (error) {
      toast.error('Error deleting profile')
      console.error('Delete profile error:', error)
    } finally {
      setLoading(false)
      setShowDeleteModal(false)
    }
  }

  if (!user) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setProfileData({
                    name: user.name || '',
                    email: user.email || ''
                  })
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md capitalize">{user.role?.toLowerCase()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowPasswordModal(true)}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Change Password
            </Button>
            <Button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
            minLength={6}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
            minLength={6}
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowPasswordModal(false)
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data including orders and cart items.
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDeleteProfile}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Deleting...' : 'Yes, Delete Account'}
            </Button>
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MyProfile