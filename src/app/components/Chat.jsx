import Image from "next/image";
import User from "../../../public/user.png";
import Water from "../../../public/water-icon.png";


const Chat = ({isUser, userPrompt='', message='',loading=false}) => {

      const createMarkup = (htmlString) => {
        return { __html: htmlString };
      };
    return(
        <>
        {isUser ? (
            <div  className="flex justify-start items-center gap-5 pt-5 text-slate-100 font-roboto">
            
            <Image
                src={User}
                className="m-4"
                alt="user-profile-image"
                width={35}
                height={35}
            />
            <span className="">
                {userPrompt}
            </span>
            </div>
        ) : (
            <div
            
            className="flex items-center justify-start gap-5 font-roboto mt-5 font-medium tracking-[0.04rem]"
            >
                <Image src={Water} alt="logo" className="m-4" width={35} height={35}/>
                <div
                    className="flex flex-col items-start"
                    dangerouslySetInnerHTML={createMarkup(message)}
                ></div>
            </div>
        )}
        </>
    )
}

export default Chat;