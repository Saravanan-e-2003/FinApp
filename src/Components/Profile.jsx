import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../CardinalStorage';
import { 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    Edit3, 
    Save, 
    X, 
    Camera,
    Key,
    LogOut,
    ArrowLeft
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    
    // Get user data from storage
    const currentUser = getCurrentUser();
    const [profileData, setProfileData] = useState({
        name: currentUser?.name || 'User',
        email: currentUser?.email || 'user@example.com',
        phone: '+1 (555) 123-4567',
        joinDate: 'January 2024'
    });

    const [editData, setEditData] = useState({ ...profileData });
    
    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({});

    const handleSave = () => {
        setProfileData({ ...editData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (passwordErrors[field]) {
            setPasswordErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            logoutUser();
            navigate('/');
            // Refresh the page to update authentication state
            window.location.reload();
        }
    };

    const validatePassword = () => {
        const errors = {};
        
        if (!passwordData.currentPassword) {
            errors.currentPassword = 'Current password is required';
        }
        
        if (!passwordData.newPassword) {
            errors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 6) {
            errors.newPassword = 'Password must be at least 6 characters';
        }
        
        if (!passwordData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        
        if (!validatePassword()) return;
        
        // TODO: Implement password change API call
        alert('Password change functionality will be implemented with backend API');
        
        // Reset form and close modal
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordErrors({});
        setShowChangePassword(false);
    };

    const handleClose = () => {
        navigate('/');
    };

    const isModal = window.innerWidth >= 768; // Check if desktop for modal behavior

    const ProfileContent = () => (
        <div className={`${isModal ? 'max-h-[90vh] overflow-y-auto' : 'min-h-full'} flex flex-col ${isModal ? 'p-6' : 'p-4'} space-y-4 md:space-y-6`}>
            {/* Header Section */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] p-4 md:p-6'>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center w-full md:w-auto">
                        {/* Mobile Back Button */}
                        <button 
                            onClick={handleClose}
                            className="md:hidden mr-3 p-2 bg-[#1f1a14] text-[#fff7e4] rounded-lg hover:bg-[#fff7e4] hover:text-[#1f1a14] border-2 border-[#1f1a14] transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        
                        <div className="bg-[#1f1a14] p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                            <User className="h-5 w-5 md:h-6 md:w-6 text-[#fff7e4]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#1f1a14]">Profile Settings</h1>
                            <p className="text-xs md:text-base text-[#1f1a14]/70">Manage your account information and preferences</p>
                        </div>
                        
                        {/* Desktop Close Button */}
                        <button 
                            onClick={handleClose}
                            className="hidden md:block ml-4 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 border-2 border-red-600 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    
                    {!isEditing ? (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-medium text-sm md:text-base w-full md:w-auto justify-center"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full md:w-auto">
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-green-600 text-white border-2 border-green-600 rounded-lg shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-medium text-sm md:text-base flex-1 md:flex-none justify-center"
                            >
                                <Save className="h-4 w-4" />
                                Save
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-red-600 text-white border-2 border-red-600 rounded-lg shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-medium text-sm md:text-base flex-1 md:flex-none justify-center"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Information */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
                {/* Left Column - Avatar and Basic Info */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 md:p-6'>
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#1f1a14] rounded-full flex items-center justify-center">
                                <User className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-[#fff7e4]" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-[#1f1a14] text-[#fff7e4] p-1.5 md:p-2 rounded-full border-2 border-[#fff7e4] hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors">
                                <Camera className="h-3 w-3 md:h-4 md:w-4" />
                            </button>
                        </div>
                        
                        <div className="mt-3 md:mt-4">
                            {!isEditing ? (
                                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1f1a14]">{profileData.name}</h2>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="text-lg md:text-xl lg:text-2xl font-bold text-[#1f1a14] bg-transparent border-2 border-[#1f1a14] rounded-lg px-3 py-1 text-center w-full"
                                />
                            )}
                            <div className="flex items-center justify-center gap-2 mt-2 text-[#1f1a14]/60">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="text-xs md:text-sm">Joined {profileData.joinDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Contact Information */}
                <div className='lg:col-span-2 bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 md:p-6'>
                    <h3 className="text-base md:text-lg font-bold text-[#1f1a14] mb-3 md:mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#1f1a14] mb-2">
                                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                                Email Address
                            </label>
                            <p className="text-sm md:text-base text-[#1f1a14] bg-[#1f1a14]/5 border border-[#1f1a14] rounded-lg px-3 py-2 break-all">
                                {profileData.email}
                            </p>
                            <p className="text-xs text-[#1f1a14]/60 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#1f1a14] mb-2">
                                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                                Phone Number
                            </label>
                            {!isEditing ? (
                                <p className="text-sm md:text-base text-[#1f1a14] bg-[#1f1a14]/5 border border-[#1f1a14] rounded-lg px-3 py-2">
                                    {profileData.phone}
                                </p>
                            ) : (
                                <input
                                    type="tel"
                                    value={editData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full text-sm md:text-base text-[#1f1a14] bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 md:p-6'>
                <h3 className="text-base md:text-lg font-bold text-[#1f1a14] mb-3 md:mb-4">Account Actions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button 
                        onClick={() => setShowChangePassword(true)}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors font-medium text-xs md:text-base shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <Key className="h-3 w-3 md:h-4 md:w-4" />
                        Change Password
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-red-600 text-white border-2 border-red-600 rounded-lg hover:bg-red-700 hover:border-red-700 transition-colors font-medium text-xs md:text-base shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Change Password Modal */}
            {showChangePassword && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-[#1f1a14]">Change Password</h3>
                                <button
                                    onClick={() => setShowChangePassword(false)}
                                    className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#1f1a14] mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                        className={`w-full px-3 py-2 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                            passwordErrors.currentPassword ? 'border-red-500' : 'border-[#1f1a14]'
                                        }`}
                                        placeholder="Enter current password"
                                    />
                                    {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1f1a14] mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                        className={`w-full px-3 py-2 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                            passwordErrors.newPassword ? 'border-red-500' : 'border-[#1f1a14]'
                                        }`}
                                        placeholder="Enter new password"
                                    />
                                    {passwordErrors.newPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1f1a14] mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                        className={`w-full px-3 py-2 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                            passwordErrors.confirmPassword ? 'border-red-500' : 'border-[#1f1a14]'
                                        }`}
                                        placeholder="Confirm new password"
                                    />
                                    {passwordErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>}
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowChangePassword(false)}
                                        className="flex-1 px-4 py-2 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-medium hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-medium hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Mobile: Full page layout
    if (!isModal) {
        return <ProfileContent />;
    }

    // Desktop: Modal layout
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#a9d2b8] rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
                <ProfileContent />
            </div>
        </div>
    );
};

export default Profile; 