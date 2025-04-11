"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import image from "../../../public/images/kamay.jpg";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const handleSumbit = async () => {
    if (index === 0) {
      console.log("login");
      console.log("luding");
      // setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data.user) {
        router.replace("/");
      }
      if (error) {
        setError(error?.message ?? "test");
      }
    } else if (index === 1) {
      console.log("login");
      console.log("luding");
      // setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (data.user) {
        await supabase
          .from("users")
          .insert({
            id: data.user.id,
            email: email,
            username: username,
          })
          .then(() => {
            router.replace("/");
          });
      }
      if (error) {
        setError(error?.message ?? "test");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="flex m-4 bg-white">
        <div className="flex flex-col justify-center gap-[16px] max-w-[600px] max-h-[800px] py-[24px] px-[32px]">
          <p className="text-4xl font-bold text-center"></p>
          <div className="mt-10 ">
            <h2 className="text-2xl font-bold text-center ">
              &apos;UR REST STOP
            </h2>
            <p className="text-[14px] text-center font-light text-gray-600 mb-4">
              Welcome Back!
            </p>
            <div className="flex justify-around text-center bg-gray-200 rounded-md py-1 px-1 mb-5">
              <div
                className={`${
                  index === 0 ? "bg-white" : ""
                } hover:text-black w-[100%] h-[100%] rounded-md  cursor-pointer ease-in-out duration-300 text-gray-500`}
                onClick={() => {
                  setIndex(0);
                }}
              >
                Sign in
              </div>
              <div
                className={`${
                  index === 1 ? "bg-white" : ""
                } w-[100%] h-[100%] text-gray-500 hover:bg-white rounded-md  cursor-pointer ease-in-out duration-300`}
                onClick={() => {
                  setIndex(1);
                }}
              >
                Sign up
              </div>
            </div>
            {index === 1 ? (
              <>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="border-2 mb-[16px] py-[6px] px-[12px] rounded-[8px] text-[15px] w-[100%]"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </>
            ) : null}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border-2 mb-[16px] py-[6px] px-[12px] rounded-[8px] text-[15px] w-[100%]"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border-2 mb-[16px] py-[6px] px-[12px] rounded-[8px] text-[15px] w-[100%]"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? (
              <p className="text-red-500 text-[14px] mb-[8px]">{error}</p>
            ) : null}
            <Button
              className="w-[100%]"
              onClick={() => {
                handleSumbit();
              }}
            >
              {index === 0 ? "Login" : "Sign Up"}
            </Button>
            {/* <div className="relative flex py-3 items-center mb-2">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className="flex gap-6 justify-center">
                <div className="rounded-full p-2 text--500 border-2">
                  <Mail />
                </div>
                <div className="rounded-full p-2  text--500 border-2">
                  <Apple />
                </div>
                <div className="rounded-full p-2  text--500 border-2">
                  <Facebook />
                </div>
              </div> */}
          </div>
        </div>
        <div className="hidden md:block max-w-[500px] max-h-[800px]">
          <Image
            src={image}
            objectFit="cover"
            alt="Cookiega"
            className="mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
