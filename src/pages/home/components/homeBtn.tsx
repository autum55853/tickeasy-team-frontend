interface HomeBtnProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function HomeBtn({ onClick, children }: HomeBtnProps) {
  return (
    <button className="w-20 rounded-md border-2 border-gray-300 p-2" onClick={onClick}>
      {children}
    </button>
  );
}
