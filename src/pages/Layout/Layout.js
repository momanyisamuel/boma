import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";

const Layout = ({ ...props }) => {
  return (
    <div className="flex text-sm bg-white">
      <SideBar />
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <TopBar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
