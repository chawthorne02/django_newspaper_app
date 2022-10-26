import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function EditArticle({ state }) {
  const [isEdit, setIsEdit] = useState(false);
  const [article, setArticle] = useState({
    image: state.image,
    title: state.title,
    body: state.body,
    category: state.category,
    status: state.status,
  });

  const navigate = useNavigate();

  const handleError = (err) => {
    console.warn(err);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setArticle({
      ...state,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (article.image instanceof File) {
      formData.append("image", article.image);
    }

    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("category", article.category);
    formData.append("status", e.target.value);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/articles/${state.id}/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      navigate("/articles/user/*");
    }
  };

  const nonEditHTML = (
    <>
      <img className="edit-img" src={state.image} alt="" />
      <h2 className="edit-title">{state.title}</h2>
      <p className="edit-body">{state.body}</p>
      {state.status === "Draft" && (
        <>
          <Button
            className="edit-buttons"
            variant="primary"
            type="submit"
            value="Submitted"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button
            className="edit-buttons"
            variant="primary"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        </>
      )}
    </>
  );

  const editHTML = (
    <div className="main-display-area">
      <Form className="form">
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Article Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImage}
          />
        </Form.Group>
        {/* <input type="file" className="form-control-file" name="image" onChange={handleImage} /> */}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={article.title}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Article Body</Form.Label>
          <textarea
            rows="3"
            className="form-control"
            placeholder="Body..."
            name="body"
            value={article.body}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Choose Category</Form.Label>
          <Form.Select name="category" value={article.category} onChange={handleInput}> 
                <option value="Football">Football</option>
                <option value="Hockey">Hockey</option>
                <option value="Baseball">Baseball</option>
                <option value="Basketball">Basketball</option>
          </Form.Select>
        </Form.Group>
        <div className="edit-footer">
          <Button
            className="edit-button"
            variant="primary"
            type="submit"
            value="Submitted"
            onClick={(e) => handleSubmit(e)}
          >
            Save & Submit
          </Button>
          <Button
            className="edit-button"
            variant="primary"
            type="submit"
            value="Draft"
            onClick={(e) => handleSubmit(e)}
          >
            Save Draft
          </Button>
        </div>
      </Form>
    </div>
  );

  return <div className="article-view">{isEdit ? editHTML : nonEditHTML}</div>;
}

export default EditArticle;