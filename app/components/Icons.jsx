// Flame Icon
export const FlameIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" fill="url(#flameGradient1)" />
        <path d="M12 14C12 14 9 16 9 18.5C9 20.43 10.57 22 12.5 22C14.43 22 16 20.43 16 18.5C16 16 12 14 12 14Z" fill="url(#flameGradient2)" />
        <defs>
            <linearGradient id="flameGradient1" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#FF6B35" />
            </linearGradient>
            <linearGradient id="flameGradient2" x1="12.5" y1="14" x2="12.5" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B35" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Lock Icon
export const LockIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="5" y="11" width="14" height="11" rx="2" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="2" fill="#FFFFFF" />
    </svg>
)

// Mail/Email Icon
export const MailIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="url(#mailGradient)" strokeWidth="2" />
        <path d="M3 7L12 13L21 7" stroke="url(#mailGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="mailGradient" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Package/Box Icon
export const PackageIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="url(#packageGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12L21 7" stroke="url(#packageGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12V22" stroke="url(#packageGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12L3 7" stroke="url(#packageGradient)" strokeWidth="2" strokeLinejoin="round" />
        <defs>
            <linearGradient id="packageGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Chat/Message Icon
export const ChatIcon = ({ size = 24, className = "", color = "url(#chatGradient)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 11.5C21 16.75 16.97 21 12 21C10.39 21 8.88 20.59 7.58 19.87L3 21L4.13 16.42C3.41 15.12 3 13.61 3 12C3 6.75 7.03 2.5 12 2.5C16.97 2.5 21 6.75 21 11.5Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <defs>
            <linearGradient id="chatGradient" x1="12" y1="2.5" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Star Icon
export const StarIcon = ({ size = 24, className = "", filled = true }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={filled ? "url(#starGradient)" : "none"}
            stroke="url(#starGradient)"
            strokeWidth={filled ? "0" : "2"}
            strokeLinejoin="round" />
        <defs>
            <linearGradient id="starGradient" x1="12" y1="2" x2="12" y2="21.02" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Check/Checkmark Icon
export const CheckIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="url(#checkGradient)" />
        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="checkGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Plus/Add Icon
export const PlusIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke="url(#plusGradient)" strokeWidth="2" />
        <path d="M12 8V16M8 12H16" stroke="url(#plusGradient)" strokeWidth="2" strokeLinecap="round" />
        <defs>
            <linearGradient id="plusGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Edit/Pencil Icon
export const EditIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="url(#editGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="url(#editGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="editGradient" x1="12" y1="1.87869" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Delete/Trash Icon
export const TrashIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 6H5H21" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11V17" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11V17" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Logout/Door Icon
export const LogoutIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Clock/Time Icon
export const ClockIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke="url(#clockGradient)" strokeWidth="2" />
        <path d="M12 6V12L16 14" stroke="url(#clockGradient)" strokeWidth="2" strokeLinecap="round" />
        <defs>
            <linearGradient id="clockGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// User/Person Icon
export const UserIcon = ({ size = 24, className = "", color = "url(#userGradient)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
        <path d="M6 21C6 17.134 8.68629 14 12 14C15.3137 14 18 17.134 18 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <defs>
            <linearGradient id="userGradient" x1="12" y1="4" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Shopping Bag Icon
export const ShoppingBagIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="url(#bagGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M3 6H21" stroke="url(#bagGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="url(#bagGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="bagGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Arrow Right Icon
export const ArrowRightIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Lightning/Bolt Icon
export const BoltIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#boltGradient)" stroke="url(#boltGradient)" strokeWidth="1.5" strokeLinejoin="round" />
        <defs>
            <linearGradient id="boltGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Shield/Safety Icon
export const ShieldIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L4 6V12C4 16.55 7.16 20.74 12 22C16.84 20.74 20 16.55 20 12V6L12 2Z" stroke="url(#shieldGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="url(#shieldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="shieldGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)

// Strong/Muscle Icon
export const StrongIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 2V8M6 8C4.89543 8 4 8.89543 4 10V14C4 15.1046 4.89543 16 6 16M6 8C7.10457 8 8 8.89543 8 10V14C8 15.1046 7.10457 16 6 16M6 16V22" stroke="url(#strongGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 2V8M18 8C16.8954 8 16 8.89543 16 10V14C16 15.1046 16.8954 16 18 16M18 8C19.1046 8 20 8.89543 20 10V14C20 15.1046 19.1046 16 18 16M18 16V22" stroke="url(#strongGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 12H16" stroke="url(#strongGradient)" strokeWidth="2" strokeLinecap="round" />
        <defs>
            <linearGradient id="strongGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF8C42" />
                <stop offset="1" stopColor="#E85D04" />
            </linearGradient>
        </defs>
    </svg>
)
