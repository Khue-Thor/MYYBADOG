"use client";
import React, { useState } from "react";
import Image from "next/image";
const msgs = [
  {
    sender: "Ethlon",
    content:
      "What is up? Long time no see I want to talk about lots of things with you with neverending text lik AI",
  },
  {
    sender: "You",
    content: "nm! Long time no see I want to talk about lots of things too!",
  },
];
const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState(msgs);
  //     <{ content: string; sender: string }[]
  //   >([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([...messages, { content: input, sender: "User" }]);
    setInput("");
  };

  return (
    <div className="flex inherit w-screen mt-2">
      <ul className="list-none mx-2 ">
        {messages.map((message, index) => (
          <li key={index} className="mb-2 flex  hover:opacity-80">
            <div className="h-100 flex ">
              <Image
                className="justify-center align-middle rounded-full"
                height={50}
                width={50}
                src="https://placehold.co/50"
                alt="avatar"
              />
            </div>

            <div className="text-left m-2 text-sm grow p-1 ">
              <div>
                {" "}
                <p className="inline text-md">{message.sender}</p> - 4:44pm
              </div>
              <div className="border-x-blue bg-purple-100 shadow-lg rounded p-1">
                <p>{message.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full bottom-16 absolute flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="Type message here"
          className="inherit w-screen  border border-gray-300 shadow-sm mx-2 rounded h-8 justify-center text-gray-500"
        />
      </div>
    </div>
  );
};

export default ChatUI;
