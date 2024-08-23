import React from "react";
import { FormComponent } from "./_components/FormComponent";
import { PasswordGate } from "./_components/PasswordGate";

export default function ChatPage() {
  return (
    <div className="container relative min-h-screen flex flex-col justify-start mx-auto px-4 py-10">
      <PasswordGate password="frodo">
        <FormComponent />
      </PasswordGate>
    </div>
  );
}
