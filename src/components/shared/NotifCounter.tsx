interface NotifCounterProps {
  count: number;
}

const NotifCounter = ({ count }: NotifCounterProps) => {
  return (
    <div className="absolute -right-1 -top-1 flex items-center justify-center rounded-full border-2 border-foreground bg-danger px-1 py-0.5 text-[9px] font-bold leading-none text-white">
      {count}
    </div>
  );
};

export default NotifCounter;
