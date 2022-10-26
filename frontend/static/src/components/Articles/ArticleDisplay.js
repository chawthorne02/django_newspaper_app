function ArticleDisplay({ activeArticle }) {
    return (
      <article className="highlight-article">
          <img className="highlight-img" src={activeArticle.image} alt="news article image" />
        <h2 className="highlight-title">{activeArticle.title}</h2>
        <p className="highlight-body">{activeArticle.body}</p>
       
      </article>
    );
  }
  
  export default ArticleDisplay;