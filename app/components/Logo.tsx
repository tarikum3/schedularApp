const Logo = ({ className = "", ...props }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="100%" height="100%" rx="16" fill="var(--primary-900)" />
    <path
      fillRule="evenodd"
      d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-16a1 1 0 0 1 1 1v5.586l3.293 3.293a1 1 0 0 1-1.414 1.414L23 24.414V18a1 1 0 0 1 1-1zm-6 14a.75.75 0 0 1 0 1.5.75.75 0 0 1 0-1.5zm12 0a.75.75 0 0 1 0 1.5.75.75 0 0 1 0-1.5z"
      fill="var(--primary-100)"
    />
  </svg>
);

export default Logo;
