import { useState, useCallback, useEffect } from "react";
import AdminArticleDisplay from "./AdminArticleDisplay";
import Button from "react-bootstrap/Button";

function AdminArticleList() {
  const [adminArticles, setAdminArticles] = useState([]);
  const [filter, setFilter] = useState("Published");

  const handleError = (err) => {
    console.warn(err);
  };

  const getAdminArticles = useCallback(async () => {
    const response = await fetch("/api/v1/articles/admin/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setAdminArticles(data);
    }
  }, []);

  useEffect(() => {
    getAdminArticles();
  }, [getAdminArticles]);

  const articleList = adminArticles
    .filter((article) => (filter ? article.status === filter : article))
    .map((article) => <AdminArticleDisplay key={article.id} article={article} />);

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="display">
        <section className="sort-buttons">
          <Button
            className="sort-button"
            variant="primary"
            value="Published"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Published
          </Button>
          <Button
            className="sort-button"
            variant="primary"
            value="Submitted"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Submitted
          </Button>
          <Button
            className="sort-button"
            variant="primary"
            value="Archived"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Archived
          </Button>
        </section>
        <section className="author-article-list margin-section">
          <ul className="list-container">{articleList}</ul>
        </section>
      </div>
    </>
  );
}

export default AdminArticleList;