import { Button } from "@/components/ui/button";

type LogoutModalType = {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
};
const LogoutModal = (props: LogoutModalType) => {
  if (!props.isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] m-[32px]">
          <div className="flex flex-col bg-white p-[16px] rounded-[8px]">
            <h1 className="text-[18px] font-bold">Logout</h1>
            <p className="text-[15px]">are you sure you want to logout?</p>
            <div className="flex gap-[10px] mt-[16px]">
              <Button
                className="bg-gray-500 rounded-[0]"
                onClick={() => {
                  props.onClose();
                }}
              >
                Close
              </Button>
              <Button
                className="bg-red-500 rounded-[0]"
                onClick={() => {
                  props.onLogout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default LogoutModal;
