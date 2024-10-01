import { useEffect, useRef } from "react";

export default function TextArea({value, setValue, onSubmit, className, placeholder}: Readonly<{value: string, setValue: (value: string) => void, onSubmit: () => void, className?: string, placeholder?: string}>) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the default newline behavior
      onSubmit();
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  return (
      <textarea
        className={className}
        rows={1}
        value={value}
        ref={textAreaRef}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          resizeTextArea();
        }}
      ></textarea>
  );
}