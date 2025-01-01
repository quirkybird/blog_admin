import { fetchPostList } from "@/services/post";
import styles from "./CardList.module.less";
import { useEffect, useState } from "react";

const { VITE_APP_ENV } = import.meta.env;

export default function Upload() {
  const [postId, setPostId] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const path = window.location.pathname;
  let resPath = "";
  if (path == "/compose/index") resPath = "createNewPost";
  if (path == "/compose/edit") resPath = `editPost/${postId}`;

  useEffect(() => {
    fetchPostList().then(({ data }) => {
      setData(data);
    });
  }, []);

  const onEdit = (id: string) => {
    setPostId(id);
    setVisible(false);
  };
  return (
    <div>
      {((postId && path == "/compose/edit") || path == "/compose/index") && (
        <iframe
          src={`http://localhost:3000/${resPath}`}
          width="100%"
          height="500px"
          title=""
          style={{ border: 0, zIndex: 1 }}
        />
      )}

      {path == "/compose/edit" && visible && (
        <CardList articles={data} onEdit={onEdit} />
      )}
    </div>
  );
}

type CardListProps = {
  articles: Array<any>;
  onEdit: (id: string) => void;
};

const CardList = ({ articles, onEdit }: CardListProps) => {
  return (
    <div className={styles.cardList}>
      {articles.map((article) => (
        <div className={styles.card} key={article.id}>
          <h3 className={styles.title}>{article.title}</h3>
          <div className={styles.cover}>
            <img
              src={`${VITE_APP_ENV}/image/${article.image}`}
              alt={article.title}
            />
          </div>
          <p className={styles.description}>{article.descr}</p>
          <div className={styles.overlay}>
            <button
              className={styles.editButton}
              onClick={() => onEdit(article.id)}
            >
              编辑文章
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
