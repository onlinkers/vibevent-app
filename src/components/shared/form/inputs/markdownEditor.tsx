import React, { useEffect } from "react";
import * as EasyMDE from "easymde";

interface MarkdownEditorProps {
    label?: string;
    onChange?: (value: string) => void | any;
    value?: string;
    options?: EasyMDE.Options;
    className?: string;
};

const MarkdownEditor: React.FunctionComponent<MarkdownEditorProps> = (props) => {

  const {
    label = "",
    onChange = () => {},
    value,
    options = {},
    ...restProps
  } = props;

  useEffect(() => {

    const MdeCreator = require("easymde");

    const mdeOptions = {
      autoDownloadFontAwesome: true,
      element: document.getElementById("markdown-editor"),
      initialValue: value || "",
      spellChecker: false,
      hideIcons: ["side-by-side", "fullscreen"],
      ...options,
    };

    const mde = new MdeCreator(mdeOptions);
    mde.codemirror.on("change", () => {

      const newValue = mde.value();
      //   setTextValue(newValue);
      onChange(newValue);

    });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div {...restProps}>
      {label && <label>{label}</label>}
      <textarea id="markdown-editor"/>
    </div>
  );
};

export default MarkdownEditor;
