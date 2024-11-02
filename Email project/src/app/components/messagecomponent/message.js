"use client";
import style from "./message.module.css";
import { useRouter } from "next/navigation";
export function MessageList({ messages }) {
  const router = useRouter();
  function handleonclick(id) {
    router.push(`/${id}`);
  }
  return (
    <div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={style.each}
          onClick={() => handleonclick(message.msgid)}
        >
          <div className={style.heading}>
            {message.sender.split("<")[0].trim()}
          </div>
          <div className={style.o}>
            {message.snippet.length > 10
              ? `${message.snippet.substring(0, 50)}...`
              : message.snippet}
          </div>
          <div className={style.o}>{message.time}</div>
        </div>
      ))}
    </div>
  );
}
