import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value = "",
  placeholder = "",
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    const IconRegistry = Quill.import("ui/icons") as Record<string, any>;
    IconRegistry.bold = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66602 2H7.66602C8.19645 2 8.70516 2.21071 9.08023 2.58579C9.4553 2.96086 9.66602 3.46957 9.66602 4C9.66602 4.53043 9.4553 5.03914 9.08023 5.41421C8.70516 5.78929 8.19645 6 7.66602 6H3.66602V2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.66602 6H8.16602C8.69645 6 9.20516 6.21071 9.58023 6.58579C9.9553 6.96086 10.166 7.46957 10.166 8C10.166 8.53043 9.9553 9.03914 9.58023 9.41421C9.20516 9.78929 8.69645 10 8.16602 10H3.66602V6Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    IconRegistry.italic = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.49805 2H4.99805" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 10H2.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 2L4.5 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    IconRegistry.underline = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33203 1.5V5C3.33203 5.79565 3.6481 6.55871 4.21071 7.12132C4.77332 7.68393 5.53638 8 6.33203 8C7.12768 8 7.89074 7.68393 8.45335 7.12132C9.01596 6.55871 9.33203 5.79565 9.33203 5V1.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.33008 10.5H10.3301" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    IconRegistry["list"][
      "bullet"
    ] = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66406 3H11.1641" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66406 6H11.1641" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66406 9H11.1641" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.16602 3H2.17102" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.16602 6H2.17102" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.16602 9H2.17102" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


`;

    IconRegistry["list"][
      "ordered"
    ] = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 3H10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 6H10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 9H10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.950684 4.92822C1.10303 4.92822 1.20068 4.90771 1.24365 4.8667C1.28662 4.82471 1.30811 4.74561 1.30811 4.62939V3.47363C1.30811 3.39941 1.29932 3.34668 1.28174 3.31543C1.26514 3.28418 1.23389 3.26855 1.18799 3.26855C1.16357 3.26855 1.12598 3.27686 1.0752 3.29346C1.04297 3.30322 0.999023 3.31885 0.943359 3.34033V3.26416L1.70068 2.9375H1.75342V4.64697C1.75342 4.75635 1.771 4.83057 1.80615 4.86963C1.84131 4.90869 1.93115 4.92822 2.07568 4.92822V5H0.950684V4.92822Z" fill="currentColor"/>
<path d="M0.80127 8.43115C1.12061 8.08545 1.32861 7.84473 1.42529 7.70898C1.57373 7.50391 1.64795 7.32227 1.64795 7.16406C1.64795 7.07031 1.61914 6.98291 1.56152 6.90186C1.50488 6.81982 1.4165 6.77881 1.29639 6.77881C1.19092 6.77881 1.10205 6.81543 1.02979 6.88867C0.990723 6.92871 0.956055 6.98242 0.925781 7.0498H0.84375C0.910156 6.8418 1.00195 6.68799 1.11914 6.58838C1.23633 6.48779 1.36816 6.4375 1.51465 6.4375C1.65332 6.4375 1.7793 6.48584 1.89258 6.58252C2.00586 6.67822 2.0625 6.81934 2.0625 7.00586C2.0625 7.10352 2.03564 7.20361 1.98193 7.30615C1.9292 7.40869 1.83984 7.52002 1.71387 7.64014L1.25684 8.07666V8.10156H1.68311C1.83154 8.10156 1.92822 8.08936 1.97314 8.06494C2.01904 8.04053 2.06494 7.9751 2.11084 7.86865H2.18262L2.04785 8.5H0.80127V8.43115Z" fill="currentColor"/>
</svg>
`;
  }, []);
  // Initialize Quill editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const modulesConfig = readOnly
        ? { toolbar: false }
        : { toolbar: { container: "#toolbar" } };

      quillRef.current = new Quill(editorRef.current, {
        modules: modulesConfig,
        theme: "snow",
        placeholder,
        readOnly,
      });

      // Set initial HTML content
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      // Emit changes
      quillRef.current.on("text-change", () => {
        onChange && onChange(quillRef.current!.root.innerHTML);
      });

      // Handle selection changes to update toolbar state
      quillRef.current.on("selection-change", (range) => {
        if (range) {
          // Force toolbar to update its state
          const toolbar: any = quillRef.current?.getModule("toolbar");
          if (toolbar && typeof toolbar.update === "function") {
            toolbar.update(range);
          }
        }
      });

      // Add event listeners to toolbar buttons to prevent default behavior
      const toolbarButtons = document.querySelectorAll("#toolbar button");
      toolbarButtons.forEach((button) => {
        button.addEventListener("mousedown", (e) => {
          e.preventDefault(); // Prevent button from gaining focus
        });
      });
    }

    // Cleanup function
    return () => {
      if (quillRef.current) {
        const toolbarButtons = document.querySelectorAll("#toolbar button");
        toolbarButtons.forEach((button) => {
          button.removeEventListener("mousedown", (e) => {
            e.preventDefault();
          });
        });
      }
    };
  }, [placeholder]);

  // Sync external value updates
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const currentSelection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value;

      // Restore selection if it existed
      if (currentSelection) {
        quillRef.current.setSelection(currentSelection);
      }
    }
  }, [value]);

  return (
    <>
      {!readOnly && (
        <div className="flex justify-between items-center form-control ">
          <label htmlFor="quill-editor" className="m-0">
            {label}
          </label>

          {/* Custom Toolbar */}
          <div id="toolbar" className="!border-none !p-0 space-x-2">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-list" value="ordered" title="Ordered List" />
            <button className="ql-list" value="bullet" title="Bullet List" />
          </div>
        </div>
      )}

      {/* Editor Container */}
      <div
        id="quill-editor"
        ref={editorRef}
        className="w-full border-0 custom-scrollbar"
      />
    </>
  );
};

export default RichTextEditor;
