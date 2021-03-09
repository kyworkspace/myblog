import React from 'react'
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {withStyles,withStylesPropTypes,css} from '../views/ui/withStyles';

class EditableTagGroup extends React.Component {
    
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    //태그값 부모로 전달
    this.props.onInputed(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };
  componentDidMount(){
      this.setState({
        tags : this.props.list,
      })
  }

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    const {styles} = this.props;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                {...css(styles.tagInput)}
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              {...css(styles.editTag)}
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                      this.editInput.focus();
                    });
                    e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            {...css(styles.tagInput)}
            ref={this.saveInputRef}
            type="text"
            size="small"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag {...css(styles.siteTagPlus)} className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  }
}

EditableTagGroup.propTypes={
    ...withStylesPropTypes
}

export default  withStyles(({color,unit})=>({
    editTag :{
        userSelect: 'none'
    },
    tagInput :{
        width: '78px',
        marginRight: '8px',
        verticalAlign: 'top'
    },
    siteTagPlus:{
        background: color.white,
        borderStyle: 'dashed'
    }
}))(EditableTagGroup);