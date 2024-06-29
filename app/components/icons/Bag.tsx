const Bag = ({ ...props }) => {
  return (
    // <svg
    //   width="20"
    //   height="22"
    //   viewBox="0 0 20 22"
    //   fill="none"
    //   stroke="currentColor"
    //   {...props}
    // >
    //   <path
    //     d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M1 5H19"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
    <svg
      width="20"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.153 4L6.01 15.146a.993.993 0 0 0 .327.603.997.997 0 0 0 .679.251H18a1 1 0 0 0 .949-.684l3-9A1 1 0 0 0 21 5H6.347L5.99 2.85a.993.993 0 0 0-.357-.625A.998.998 0 0 0 4.984 2H3a1 1 0 0 0 0 2h1.153zm3.694 10L6.68 7h12.933l-2.334 7H7.847zM10 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
        fill="#0D0D0D"
      />
    </svg>
  );
};

export default Bag;
