import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBody from "../components/ChatBody";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full popin border h-screen overflow-hidden">
      {user && <SideDrawer />}
      <div className="p-1 md:p-3 w-full md:w-3/3">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-3">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBody fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

/* <main className="bg-gray-100 min-h-screen">
  <Header />
  <TopCards />
  <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
    <BarChart />
    <RecentOrders />
  </div>
</main>; */

export default Chatpage;
