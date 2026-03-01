import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react";

type BaseProps = {
  className: string;
  value: string;
  onCommit: (nextValue: string) => void;
  onHeightChange?: () => void;
};

type InputProps = BaseProps & {
  kind: "input";
};

type TextareaProps = BaseProps & {
  kind: "textarea";
  rows?: number;
};

type Props = InputProps | TextareaProps;

export default function DeferredTextField(props: Props) {
  const { className, value, onCommit, onHeightChange } = props;
  const [draft, setDraft] = useState<string>(value);
  const isFocusedRef = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const resizeTextareaToContent = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (!isFocusedRef.current) {
      setDraft(value);
    }
  }, [value]);

  useEffect(() => {
    if (props.kind !== "textarea" || !textareaRef.current) {
      return;
    }
    resizeTextareaToContent(textareaRef.current);
    onHeightChange?.();
  }, [draft, onHeightChange, props.kind]);

  const commitIfChanged = () => {
    if (draft !== value) {
      onCommit(draft);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDraft(event.target.value);
    if (event.target instanceof HTMLTextAreaElement) {
      resizeTextareaToContent(event.target);
      onHeightChange?.();
    }
  };

  const handleClick = (event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.stopPropagation();
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    commitIfChanged();
    onHeightChange?.();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  if (props.kind === "textarea") {
    return (
      <textarea
        ref={textareaRef}
        className={className}
        rows={props.rows ?? 1}
        value={draft}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onInput={(event) => {
          resizeTextareaToContent(event.currentTarget);
          onHeightChange?.();
        }}
        onMouseUp={(event) => {
          resizeTextareaToContent(event.currentTarget);
          onHeightChange?.();
        }}
      />
    );
  }

  return (
    <input
      type="text"
      className={className}
      value={draft}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleInputKeyDown}
    />
  );
}
