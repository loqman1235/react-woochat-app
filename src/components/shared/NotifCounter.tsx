import { motion } from "framer-motion";

interface NotifCounterProps {
  count: number;
}

const NotifCounter = ({ count }: NotifCounterProps) => {
  const animation = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      className="absolute -right-1 -top-1 flex items-center justify-center rounded-full border-2 border-foreground bg-danger px-1 py-0.5 text-[9px] font-bold leading-none text-white"
      variants={animation}
      initial="hidden"
      animate={count > 0 ? "show" : "hidden"}
    >
      {count > 9 ? "9+" : count}
    </motion.div>
  );
};

export default NotifCounter;
