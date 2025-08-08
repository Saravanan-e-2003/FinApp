import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    Edit3, 
    Save, 
    X, 
    Camera,
    Bell,
    Shield,
    Eye,
    EyeOff,
    Trash2,
    Download,
    Upload,
    ArrowLeft
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        joinDate: 'January 2024',
        bio: 'Financial enthusiast focused on smart budgeting and saving goals.'
    });

    const [editData, setEditData] = useState({ ...profileData });

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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#1f1a14] mb-2">
                                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                                Email Address
                            </label>
                            {!isEditing ? (
                                <p className="text-sm md:text-base text-[#1f1a14] bg-[#1f1a14]/5 border border-[#1f1a14] rounded-lg px-3 py-2 break-all">
                                    {profileData.email}
                                </p>
                            ) : (
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full text-sm md:text-base text-[#1f1a14] bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                                />
                            )}
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

                        {/* Location */}
                        <div>
                            <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#1f1a14] mb-2">
                                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                                Location
                            </label>
                            {!isEditing ? (
                                <p className="text-sm md:text-base text-[#1f1a14] bg-[#1f1a14]/5 border border-[#1f1a14] rounded-lg px-3 py-2">
                                    {profileData.location}
                                </p>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="w-full text-sm md:text-base text-[#1f1a14] bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                                />
                            )}
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#1f1a14] mb-2">
                                <User className="h-3 w-3 md:h-4 md:w-4" />
                                Bio
                            </label>
                            {!isEditing ? (
                                <p className="text-sm md:text-base text-[#1f1a14] bg-[#1f1a14]/5 border border-[#1f1a14] rounded-lg px-3 py-2">
                                    {profileData.bio}
                                </p>
                            ) : (
                                <textarea
                                    value={editData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows="3"
                                    className="w-full text-sm md:text-base text-[#1f1a14] bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 resize-none"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings and Preferences */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                {/* Privacy Settings */}
                {/* <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 md:p-6'>
                    <h3 className="text-base md:text-lg font-bold text-[#1f1a14] mb-3 md:mb-4 flex items-center">
                        <Shield className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Privacy Settings
                    </h3>
                    
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {showBalance ? <Eye className="h-3 w-3 md:h-4 md:w-4 text-[#1f1a14]/60" /> : <EyeOff className="h-3 w-3 md:h-4 md:w-4 text-[#1f1a14]/60" />}
                                <span className="text-xs md:text-base text-[#1f1a14]">Show Balance Information</span>
                            </div>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                                    showBalance ? 'bg-[#1f1a14]' : 'bg-[#1f1a14]/20'
                                }`}
                            >
                                <span
                                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-[#fff7e4] transition-transform ${
                                        showBalance ? 'translate-x-5 md:translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bell className="h-3 w-3 md:h-4 md:w-4 text-[#1f1a14]/60" />
                                <span className="text-xs md:text-base text-[#1f1a14]">Push Notifications</span>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`relative inline-flex h-5 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                                    notifications ? 'bg-[#1f1a14]' : 'bg-[#1f1a14]/20'
                                }`}
                            >
                                <span
                                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-[#fff7e4] transition-transform ${
                                        notifications ? 'translate-x-5 md:translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Actions */}
                {/* <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 md:p-6'>
                    <h3 className="text-base md:text-lg font-bold text-[#1f1a14] mb-3 md:mb-4">Account Actions</h3>
                    
                    <div className="space-y-2 md:space-y-3">
                        <button className="w-full flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors font-medium text-xs md:text-base">
                            <Download className="h-3 w-3 md:h-4 md:w-4" />
                            Export Data
                        </button>
                        
                        <button className="w-full flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors font-medium text-xs md:text-base">
                            <Upload className="h-3 w-3 md:h-4 md:w-4" />
                            Import Data
                        </button>
                        
                        <button className="w-full flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-red-600 text-white border-2 border-red-600 rounded-lg hover:bg-red-700 hover:border-red-700 transition-colors font-medium text-xs md:text-base">
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div> */}
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