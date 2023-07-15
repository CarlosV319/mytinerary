import { useState, useRef } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import itineraryActions from "../redux/actions/itineraryActions";
import Send from "../assets/send.png";
const Swal = require("sweetalert2");


const Comments = (props) => {
  const [allComments, setAllComments] = useState(props.comments);
  const [update, setUpdate] = useState(false);
  const inputHandler = useRef();

  const addNewComment = (e) => {
    let textValue = inputHandler.current.value;
    if(textValue==""){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title:"cannot send an empty comment",
            showConfirmButton: true,
            timer: 1500
          })
        }else{

            props
              .addComment(props.itineraryId, textValue, props.token,props.urlImage,props.name)
              .then((res) => {
                setAllComments(res.response);
                inputHandler.current.value = "";
              })
              .catch((error) => console.log(error));
          };
        }



  const deleteComment = (itineraryId, commentId, token) => {
    props
      .deleteComment(itineraryId, commentId, token)
      .then((res) => {
        if (res.success) {
          setAllComments(
            allComments.filter((comment) => comment._id !== commentId)
          );
        } else {
          throw new Error();
        }
      })
      .catch((error) => console.log(error));
  };

  const editComment = (commentId, comment, token) => {
    props
      .editComment(commentId, comment, token)
      .then((res) => {
        if (res.success) {
          allComments.forEach((updatedComment) => {
            if (updatedComment._id === commentId) {
              updatedComment.comment = comment;
            }
          });
          setAllComments(allComments);
          setUpdate(!update);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="coment">
        <h2 className="titulo-altivity-coments">Comments</h2>

        <div className="containercity">
          {allComments.map((comment) => (
            <Comment
              key={comment._id}
              dataComment={comment}
              userId={comment.userId}
              newComment={comment}
              delete={deleteComment}
              tokenId={props.itineraryId}
              edit={editComment}
              updateComment={update}
            />
          ))}
        </div>
        <div className="commentInputContainer">
          <input
            type="text"
            className="commentsInputs"
            autoComplete="nope"
            ref={inputHandler}
            name="comment"
            disabled={props.token ? false : true}
            placeholder={
              props.token ? "Leave a coment!" : "You have to log in to comment"
            }
          />

          <button
            className="sendComment"
            onClick={addNewComment}
            disabled={props.token ? false : true}
          >
           <img src={Send}/> 
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    urlImage: state.authReducer.urlImage,
    name: state.authReducer.name,
  };
};

const mapDispatchToProps = {
  addComment: itineraryActions.addComment,
  editComment: itineraryActions.editComment,
  deleteComment: itineraryActions.deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
