import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import { createComment } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import "./CommentModal.css";

const CommentModal = ({
  isOpen,
  onClose,
  onOpen,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
  numberOfLikes,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token"); /*yahan change*/
  const { post, comments } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  const [recentComment, setRecentComment] = useState("");
  const [newCommentAdded, setNewCommentAdded] = useState(false);
  // console.log("comments :",comments)

  useEffect(() => {
    dispatch(
      findPostByIdAction({
        jwt /*yahan change*/,
        postId: postData.id,
      })
    );
  }, [postId, comments?.createdComment]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId: postData.id,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
      setRecentComment(commentContent);
      setNewCommentAdded(true);
      setCommentContent("");
    } else return;
  };

  const handleClose = () => {
    onClose();
    console.log(postData);
  };
  return (
    <div>
      <Modal size={"4xl"} onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[77vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full max-w-full"
                  src={postData.image}
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="reqUser flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="w-9 h-9 rounded-full object-cover"
                        src={
                          postData.user.userImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-sm">
                        {postData.user.username}
                      </p>
                      <p className="text-xs">{postData.user.email}</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />

                <div className="comments px-5 bg-[#befffb] -space-y-4">
                  {postData.comments?.length > 0 &&
                    postData.comments.map((item,index) => (
                      <CommentCard comment={item} key={index} />
                    ))}
                </div>

                <div className=" absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full mt-5">
                    <div className="flex items-center space-x-2 ">
                      {isPostLiked ? (
                        <AiFillHeart
                          onClick={handleUnLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={handleLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer "
                        />
                      )}

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={() => handleUnSavePost(post.singlePost?.id)}
                          className="text-xl"
                        />
                      ) : (
                        <BsBookmark
                          onClick={() => handleSavePost(post.singlePost?.id)}
                          className="text-xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {numberOfLikes > 0 && (
                    <p className="text-sm font-semibold py-2">
                      {numberOfLikes} likes{" "}
                    </p>
                  )}
                  <p className="opacity-70 pb-2">
                    {timeDifference(postData.createdAt)}
                  </p>
                  <div className=" flex items-center ">
                    <BsEmojiSmile className="mr-3 text-xl" />
                    <input
                      onKeyPress={handleOnEnterPress}
                      onChange={handleCommnetInputChange}
                      className="commentInput"
                      type="text"
                      placeholder="Add a comment..."
                      value={commentContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
