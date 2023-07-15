const Activity = (props) => {
    let activitiesInfo = props.Activities;

    return (
      <div className="container-activity">
          <div className="activity-imagename">
        <h5 className="titulo-altivity">{activitiesInfo.activityName}</h5>
        <img src={activitiesInfo.activityImage} width="30%" alt="img"/>
        </div>
      </div>
    );
  };
  
  export default Activity;