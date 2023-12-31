import axios from "axios"

const activitiesActions = {
    getActivitiesByItinerary: (itineraryId) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get(`https://mytinerary-chi.vercel.app/api/activities/${itineraryId}`)
                let data = response.data.response
                return data
            } catch (error){
                return {
                    success: false, response: error
                }
            }
        }
   
    }
}

export default activitiesActions