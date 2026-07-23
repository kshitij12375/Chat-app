import { useChatStore } from "../../store/useChatStore";
import { useThemeStore} from "../../store/useThemeStore"; 

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { theme } = useThemeStore(); 

  return (

    <div className="h-screen bg-base-200" data-theme={theme}>
      <div className="flex items-center justify-center pt-20 px-4">

        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;