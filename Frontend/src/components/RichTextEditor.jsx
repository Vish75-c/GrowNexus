import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@/lib/tiptap-font-size";
import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Palette,
  Type,
  Smile,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ChevronDown,
} from "lucide-react";

const COLORS = [
  "#ffffff","#94a3b8","#60a5fa","#34d399","#fbbf24",
  "#f87171","#a78bfa","#fb923c","#f472b6","#2dd4bf",
];

const HIGHLIGHTS = [
  "transparent","#1e3a5f","#1a3d2e","#3d2e0a","#3d1a1a",
  "#2d1a3d","#3d2a0a","#3d1a2a","#0a2d3d",
];

const FONT_SIZES = ["12px","14px","16px","18px","20px","24px","28px","32px"];

const FONTS = [
  { label: "Default", value: "Inter, sans-serif" },
  { label: "Mono", value: "ui-monospace, monospace" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Cursive", value: "cursive" },
];

const EMOJIS = [
  "😀","😂","🥲","😍","🤩","🥳","😎","🤔","🙄","😤",
  "🔥","💯","❤️","👍","👏","🎉","💡","⚡","🚀","✨",
  "🎯","💻","📝","🧠","👀","🤝","💪","🌟","🏆","📌",
];

const ToolbarButton = ({ active, onClick, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-lg transition-all ${
      active
        ? "bg-blue-600/30 text-blue-400"
        : "text-slate-500 hover:text-slate-300 hover:bg-[#1f202a]"
    }`}
  >
    {children}
  </button>
);

const Dropdown = ({ trigger, children, open, setOpen }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-[#1f202a] transition-all flex items-center gap-0.5"
      >
        {trigger}
        <ChevronDown size={10} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-[#292b36] border border-slate-700 rounded-xl p-2 shadow-xl min-w-35">
          {children}
        </div>
      )}
    </div>
  );
};

const RichTextEditor = ({ content, onChange }) => {
  const [showColor, setShowColor] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder: "Tell your story..." }),
      FontFamily,
      FontSize,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "outline-none min-h-[300px] text-slate-300 text-lg leading-relaxed prose-headings:text-white prose-strong:text-white prose-em:text-slate-200",
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 pb-3 mb-3 border-b border-slate-700/50">

        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolbarButton>

        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolbarButton>

        <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={15} />
        </ToolbarButton>

        <ToolbarButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={15} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        {/* Color */}
        <Dropdown open={showColor} setOpen={setShowColor} trigger={<Palette size={15} />}>
          <div className="grid grid-cols-5 gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  editor.chain().focus().setColor(c).run();
                  setShowColor(false);
                }}
                className="w-6 h-6 rounded-md border border-slate-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </Dropdown>

        {/* Highlight */}
        <Dropdown open={showHighlight} setOpen={setShowHighlight} trigger={<Highlighter size={15} />}>
          <div className="grid grid-cols-4 gap-1.5">
            {HIGHLIGHTS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  if (c === "transparent") editor.chain().focus().unsetHighlight().run();
                  else editor.chain().focus().toggleHighlight({ color: c }).run();
                  setShowHighlight(false);
                }}
                className="w-6 h-6 rounded-md border border-slate-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: c === "transparent" ? "#1f202a" : c }}
              />
            ))}
          </div>
        </Dropdown>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        {/* Font size */}
        <Dropdown open={showSize} setOpen={setShowSize} trigger={<Type size={15} />}>
          <div className="flex flex-col gap-0.5">
            {FONT_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  editor.chain().focus().setFontSize(s).run();
                  setShowSize(false);
                }}
                className="text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-[#1f202a] rounded-lg"
              >
                {s}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Font family */}
        <Dropdown open={showFont} setOpen={setShowFont} trigger={<span className="text-[11px] font-bold">Aa</span>}>
          <div className="flex flex-col gap-0.5">
            {FONTS.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  editor.chain().focus().setFontFamily(f.value).run();
                  setShowFont(false);
                }}
                className="text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-[#1f202a] rounded-lg"
                style={{ fontFamily: f.value }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Dropdown>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </ToolbarButton>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        {/* Emoji */}
        <Dropdown open={showEmoji} setOpen={setShowEmoji} trigger={<Smile size={15} />}>
          <div className="grid grid-cols-6 gap-1 min-w-45">
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => {
                  editor.chain().focus().insertContent(e).run();
                  setShowEmoji(false);
                }}
                className="text-lg hover:scale-125 transition-transform p-1 rounded hover:bg-[#1f202a]"
              >
                {e}
              </button>
            ))}
          </div>
        </Dropdown>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={15} />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={15} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
