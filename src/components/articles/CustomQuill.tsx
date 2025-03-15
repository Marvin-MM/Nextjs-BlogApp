// components/CustomQuill.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface CustomQuillProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomQuill = ({ value, onChange }: CustomQuillProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomQuill;