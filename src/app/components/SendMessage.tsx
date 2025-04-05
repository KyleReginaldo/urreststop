import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SendMessage = () => {
  return (
    <div className="flex flex-col items-center mb-[60px] mx-[16px] md:mx-0">
      <h1 className="font-bold text-[24px] mb-[8px]">CONTACT US</h1>
      <p className="text-[20px] mb-[16px]">Drop us a line!</p>
      <Input
        type="text"
        placeholder="Name"
        className="max-w-[500px] mb-[16px]"
      />
      <Input
        type="email"
        placeholder="Email"
        className="max-w-[500px] mb-[16px]"
      />
      <Textarea
        placeholder="Type your message here."
        className="max-w-[500px] mb-[16px]"
      />
      <Button>Send</Button>
    </div>
  );
};

export default SendMessage;
