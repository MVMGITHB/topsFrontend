const fallbackIcons = {
  headerimage: "/images/top5header.png",
};

export default function Header() {
  return (
    <div className="w-full">
      <img
        src={fallbackIcons.headerimage}
        alt="Top 5 Header"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}