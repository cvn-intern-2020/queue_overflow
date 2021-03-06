/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MarkDownEditer from './components/MarkdownEditer';

import './index.css';

import CategoryBox from './components/CategoryBox';
import TagInput from './components/TagInput';
import QuestionService from '../../services/questionService';
import CreateNewValidator from '../../validators/question';

class AddQuestionPage extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      errors: {},
    };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleNewTag = (newtag) => {
    const { tags } = this.state;
    const Tags = [...tags, newtag];
    // remove duplicate
    const newTags = [...new Set(Tags)];
    this.setState({
      tags: newTags,
    });
  };

  handleRemoveTag = (removeTag) => {
    const { tags } = this.state;
    const newTags = tags.filter((tag) => tag !== removeTag);
    this.setState({
      tags: newTags,
    });
  };

  handleSubmit = () => {
    const { title, category, tags, content } = this.state;
    const error = CreateNewValidator(title, content, category);
    this.setState({ errors: error });
    if (Object.keys(error).length > 0) return;
    QuestionService.createNewQuestion(title, category, content, tags)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          const { history } = this.props;
          toast.success(data.message);
          // eslint-disable-next-line no-underscore-dangle
          history.push(`/question/${data.data._id}`);
        }
      })
      .catch((err) => {
        toast.warn(err);
      });
  };

  render() {
    const { tags, errors } = this.state;
    return (
      <>
        <h2>Create new question</h2>
        <div className="form-group">
          <label htmlFor="title">
            <h5>Title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter your question's title"
            onChange={(e) => {
              this.handleChange(e.target.name, e.target.value);
            }}
          />
          {errors && errors.title && (
            <span style={{ color: 'red' }}> {errors.title} </span>
          )}
        </div>
        <CategoryBox handleChange={this.handleChange} errors={errors} />
        <div className="form-group">
          <label htmlFor="content">
            <h5>Content</h5>
          </label>
          <MarkDownEditer handleChange={this.handleChange} errors={errors} />
        </div>
        <TagInput
          handleNewTag={this.handleNewTag}
          tags={tags}
          handleRemoveTag={this.handleRemoveTag}
        />
        <div className="col col-btn">
          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={this.handleSubmit}
          >
            Post
          </button>
          <Link to="/">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
        </div>
      </>
    );
  }
}
AddQuestionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(AddQuestionPage);
