// app/chat/page.tsx
"use client";
import React from "react";
import { FormComponent } from "./_components/FormComponent";
import Component from "./_components/AiSdk";

export default function ChatPage() {
  return (
    <div className="container relative min-h-screen flex flex-col justify-start mx-auto px-4 py-10">
      <FormComponent />
      {/* <Component /> */}
    </div>
  );
}
