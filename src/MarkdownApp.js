import React from 'react';
// import ReactMarkdown from 'react-markdown';
import marked from 'marked';
import './MarkdownApp.css';
// import sample from './sample.md';

class MarkdownApp extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {rawMarkdown: '# H1 Header\n\n## H2 Header\n\n1. [Learn React](https://reactjs.org/docs/getting-started.html)\n2. ``npm start``\n3.  **hope for the best**\n\n\n    <html>\n      <head>\n      </head>\n      <body>\n      </body>\n    </html>\n\n>There sure are lot of dependencies here.\n\n![React logo]("logo512.png")\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'};

    this.textEdit = this.textEdit.bind(this);
  }
  
  textEdit(text)
  {
    this.setState({rawMarkdown: text});
  }

  render()
  {
    return (
        <div className="markdownApp" id="markdownAppContainer">
        <MarkdownPreviewer rawMarkdown={this.state.rawMarkdown} />
        <MarkdownEditor rawMarkdown={this.state.rawMarkdown} textEdit={this.textEdit}/>
        </div>
    );
  }
}

class MarkdownEditor extends React.Component
{
  constructor(props)
  {
    super(props);

    this.textEdit = this.textEdit.bind(this);
  }
  
  textEdit(event)
  {
    this.props.textEdit(event.target.value);
  }

  render()
  {
    return (
        <div className="markdownEditor" id="markdownEditorContainer">
        <div className="markdownEditor" id="markdownEditorTitleContainer">
        <h1>Markdown Editor</h1>
        </div>
        <div className="markdownEditor" id="markdownEditorFormContainer">
        <form id='markdownEditorForm'>
        </form>
        <textarea id='editor' form='markdownEditorForm' value={this.props.rawMarkdown} onChange={this.textEdit}>
        </textarea>
        </div>
        </div>
    );
  }
}

class MarkdownPreviewer extends React.Component
{
  getMarkdown()
  {
    return {__html:  marked(this.props.rawMarkdown, {breaks: true, sanitize: true})};
  }
  
  render()
  {
    return (
        <div className="markdownPreviewer" id='preview' dangerouslySetInnerHTML={this.getMarkdown()} />
    );
  }
}

export default MarkdownApp;
