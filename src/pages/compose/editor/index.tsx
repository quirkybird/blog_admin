import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

const DRAFT_KEY = "editor_draft_content";

const App = () => {
  const [vd, setVd] = useState<Vditor>();

  // 保存草稿函数
  const saveDraft = (content: string) => {
    localStorage.setItem(DRAFT_KEY, content);
  };

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      minHeight: 500,
      after: () => {
        // 读取已保存的草稿
        const savedContent = localStorage.getItem(DRAFT_KEY);
        vditor.setValue(savedContent || "`Vditor` 最小代码示例");
        setVd(vditor);
      },
      input: (value) => {
        // 当输入内容变化时自动保存
        saveDraft(value);
      },
    });

    return () => {
      // 组件卸载前保存最后的内容
      if (vd) {
        saveDraft(vd.getValue());
      }
      vd?.destroy();
      setVd(undefined);
    };
  }, [vd]);

  return <div id="vditor" className="vditor" />;
};

export default App;
