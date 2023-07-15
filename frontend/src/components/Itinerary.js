import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import itineraryActions from "../redux/actions/itineraryActions";
import { Accordion } from "react-bootstrap";
import Comments from "./Comments";
import HeartEmpty from "../assets/like.png";
import Heart from "../assets/heart.png";
import activityActions from "../redux/actions/activityActions";
import Activity from "./Activity";
const Swal = require("sweetalert2");

const Itinerary = (props) => {
  const [like, setLike] = useState(true);
  const [itinerariesLikes, setItinerariesLikes] = useState(
    props.itineraries.likes
    );
    const [collapse, setCollapse] = useState(true)
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    props.getActivitiesByItinerary(props.itineraries._id).then((res) => {
      setActivities(res);
      
    });
  }, []);
  const toggleInfo = () => {
    setCollapse(!collapse)
}
  const likeItinerary = async () => {
    setLike(false);
    if (!props.token) {
      Swal.fire({
        icon: "error",
        title: "You must be logged to like this post!",
      });
    } else {
      let response = await props.likeDislike(
        props.itineraries._id,
        props.token
      );
      setItinerariesLikes(response.data.response);
    }
    setLike(true);
  };
  let heart = itinerariesLikes.includes(props.userId) ? Heart : HeartEmpty;

  return (
    <div className="caja_itinerarios">
      <div className="caja_itinerary">
        <div className="img-itinerary">
          <img src={props.itineraries.personImage} />
        </div>
        <h2 className="textoitinerari">{props.itineraries.name} {props.itineraries.lastName}</h2>
        

        <div>
          <div >
           
              <p className="co-iti"> Price:{"💵".repeat(props.itineraries.price)}</p>
              
            
            <p className="co-iti">
              Duration:{"🕒".repeat(props.itineraries.duration)}
            </p>
          <div className="likes-cont co-iti">
            <img src={heart} width={25} onClick={likeItinerary} />
            <p className="likes">{itinerariesLikes.length}</p>
          </div>
            <div className="hastag">{props.itineraries.hashtags}</div>
          </div>
          

        </div>
      </div>
          <Accordion className="container-coments">
            <Accordion.Item>
              <Accordion.Header onClick={toggleInfo}><p>{collapse ? "View Less" : "View More"}</p></Accordion.Header>
              <Accordion.Body className="cuerpo-activity">
                <h2 className="titulo-altivity-coments">Activity</h2>
              <div className="activities">
                      {activities.map((activities) => (
                        <Activity
                          Activities={activities}
                          key={activities._id}
                        />
                      ))}
                    </div>
                    <div>
                <Comments
                  itineraryId={props.itineraries._id}
                  comments={props.itineraries.comments}
                /></div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer._id,
    token: state.authReducer.token,
  };
};

const mapDispatchToProps = {
  likeDislike: itineraryActions.likeDislike,
  getActivitiesByItinerary: activityActions.getActivitiesByItinerary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
