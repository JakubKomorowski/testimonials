export default function Star({
  size = 18, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path d="M12.049 1.927c.3-.922 1.603-.922 1.902 0l1.968 6.055a1 1 0 0 0 .951.691h6.367c.97 0 1.372 1.24.588 1.81l-5.151 3.743a1 1 0 0 0-.363 1.118l1.967 6.056c.3.92-.755 1.687-1.539 1.117l-5.151-3.742a1 1 0 0 0-1.176 0l-5.151 3.742c-.784.57-1.838-.196-1.54-1.117l1.968-6.056a1 1 0 0 0-.363-1.118l-5.151-3.743c-.784-.57-.381-1.81.588-1.81H9.13a1 1 0 0 0 .951-.69l1.968-6.056Z" />
    </svg>
  );
}
