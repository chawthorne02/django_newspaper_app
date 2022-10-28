import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Cookies from 'js-cookie'

function CreateArticle() {
    const [state, setState] = useState({
        image: null,
        title: '', 
        body: '',
        category: '',
    });

    const handleError = (err) => {
        console.warn(err);
      };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0]
        setState({
            ...state,
            image: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image', state.image);
        formData.append('title', state.title);
        formData.append('body', state.body);
        formData.append('category', state.category);
        formData.append('phase', e.target.value);
        formData.append('author', 1)

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        };

        const response = await fetch('/api/v1/articles/user/', options).catch(handleError);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        } else {
            const data = await response.json();
            console.log(data)
            setState({
                image: null,
                title: '', 
                body: '',
                category: '',
            });
        }
    };

    return (
        <div className="create-display">
          <Form className="form">
            <h1 className="form-title">Create New Article</h1>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Article Image</Form.Label>
              <Form.Control
                type="file"
                className="form-control-file"
                name="image"
                onChange={handleImage}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Article Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={state.title}
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
                value={state.body}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Choose Category</Form.Label>
              <Form.Select name="category" value={state.category} onChange={handleInput}>
                <option value="Sports">Sports</option>
                <option value="Gaming">Gaming</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
              </Form.Select>
            </Form.Group>
            <div className="form-footer">
              <Button
                className="create-buttons"
                variant="primary"
                type="submit"
                value="Drafts"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                className="create-buttons"
                variant="primary"
                type="submit"
                value="Submitted"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      );
    }

export default CreateArticle;