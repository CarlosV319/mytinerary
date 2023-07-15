import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import check from "../assets/check.png";
import pencil from "../assets/pencil.png";
import trash from "../assets/trash.png";
import Swal from "sweetalert2";

const Comment = (props) => {
  const [modifyComment, setModifyComment] = useState(false);
  const inputHandler = useRef();

  useEffect(() => {
    setModifyComment(false);
  }, [props.updateComment]);

  const confirmDeletion = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.delete(props.itineraryId, props.newComment._id, props.token);
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      }
    });
  };

  const img=props.newComment.userId._id ?props.newComment.userId.urlImage:props.dataComment.urlImage
  const user = props.userId==props._id ||props.newComment.userId._id === props._id
  const name=props.newComment.userId._id ?props.newComment.userId.name:props.dataComment.name
  const comment = (
    <div className="textArea">
      <div>
        {!modifyComment ? (
          <p>{props.newComment.comment}</p>
        ) : (
          <>
            <input type="text"defaultValue={props.newComment.comment} ref={inputHandler}/>
            <img  className="img-comen"src={check}alt="send"onClick={() =>props.edit(props.newComment._id,inputHandler.current.value,props.token)}/>
          </>
        )}
      </div>
      <div>
      <img src={pencil}alt="pencil"onClick={() => setModifyComment(!modifyComment)}/>
      <img src={trash} alt="trash" onClick={confirmDeletion} />
      </div>
    </div>
  );
  const renderComment = user ? comment : <p>{props.newComment.comment}</p>;

  return (
    <>
      <div className="textArea">
      
        <div className=" padin">
          <img  src={img}/>
          <h6>{name}</h6>
          {renderComment}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    _id: state.authReducer._id,
  };
};

export default connect(mapStateToProps)(Comment);
