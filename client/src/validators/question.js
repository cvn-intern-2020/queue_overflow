const CreateNewValidator = (title, content, category) => {
  const errors = {};
  if (!title) errors.title = 'Title is required.';
  else if (title.length <= 10 || title.length > 200)
    errors.title = 'Title is between 10 and 200 character.';
  if (!content) errors.content = 'Content is required.';
  else if (content.length <= 20 || content.length > 10000)
    errors.content = 'Content is between 20 and 10000 character.';
  if (!category) errors.category = 'Category is required.';
  return errors;
};

export default CreateNewValidator;
