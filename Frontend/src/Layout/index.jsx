import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import MiniNav from "./MiniNav";
import MiniFooter from "./MiniFooter";
import LeftSidebar from "./LeftSidebar";
import MessageBar from "@/pages/Chat/MessageContainer/MessageBar";
const Layout = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { selectedChatType } = useAppStore();
  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    // Fixed height for the whole viewport, hidden overflow to prevent double scrollbars
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r border-gray-800`}
      >
        <div ref={sidebarRef} className="w-64 h-full">
          <LeftSidebar setIsOpen={setIsOpen} />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-col flex-1 min-w-0 h-full">
        {/* Navbar: Static height */}
        <header className="shrink-0 z-30">
          <MiniNav setIsOpen={setIsOpen} isOpen={isOpen} />
        </header>

        {/* Scrollable Zone: Outlet + Footer */}
        {/* flex-1 here tells this div to take all remaining vertical space */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#1f202a]">
          {/* Page Content */}
          <section className="flex-1 p-6 lg:p-9 bg-[#1f202a]">
            <Outlet />
          </section>

          {/* Footer: Sticks to the bottom of the scrollable content */}

          <footer className="shrink-0">
            {(!selectedChatType || location.pathname !== "/main/message") && (
              <div>
                <MiniFooter />
              </div>
            )}
          </footer>
          {selectedChatType && location.pathname === "/main/message" && (
            <div>
              <MessageBar />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
