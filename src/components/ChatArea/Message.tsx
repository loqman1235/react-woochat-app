// import { MdFlag, MdThumbUp } from "react-icons/md";
import Avatar from "../shared/Avatar";

const Message = () => {
  return (
    <div className="flex w-full items-start gap-2 bg-transparent px-5 py-2 odd:bg-muted">
      <Avatar
        src="https://i.pravatar.cc/300"
        gender="male"
        isBordered
        size="md"
      />

      <div className="flex-[1]">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-bold text-text-foreground">Username</h5>
          <div className="flex items-center gap-2 text-xs">
            {/* <button className="text-text-muted transition duration-300 hover:text-text-foreground">
              <MdThumbUp />
            </button>
            <button className="text-text-muted transition duration-300 hover:text-text-foreground">
              <MdFlag />
            </button> */}
            <span className=" text-text-muted">15/04 7:45</span>
          </div>
        </div>
        {/* MESSAGE */}
        <div className="w-full">
          <p className="text-sm text-text-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus molestiae quasi consequuntur quod cupiditate eius
            corporis adipisci porro, blanditiis delectus fuga voluptatem beatae
            explicabo qui, sed, quis dolor architecto dignissimos. explicabo
            qui, sed, quis dolor architecto dignissimos. explicabo qui, sed,
            quis dolor architecto dignissimos. explicabo qui, sed, quis dolor
            architecto dignissimos. explicabo qui, sed, quis dolor architecto
            dignissimos. explicabo qui, sed, quis dolor architecto dignissimos.
            explicabo qui, sed, quis dolor architecto dignissimos. explicabo
            qui, sed, quis dolor architecto dignissimos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
