import {
  request
} from './settings'
// import PubSub from 'pubsub-js'
export default {
  getPark (id) {
    return request({
      params: {
        call: 'Park/GetPark',
        request: {
          ParkId: id
        }
      }
    })
  },
  getActivePlayers (park, params) {
    if (!params) {
      params = {}
    }
    params.ParkId = park.ParkId
    params.KingdomId = park.KingdomId
    return request({
      params: {
        call: 'Reports/GetActivePlayers',
        request: params
      }
    })
  },
  deleteAttendance (token, entryId) {
    return request({
      params: {
        call: 'Attendence/RemoveAttendance',
        request: {
          Token: token,
          AttendanceId: entryId
        }
      }
    })
  },
  addAttendance (token, date, classId, park, kingdom, credits) {
    return request({
      params: {
        call: 'Attendance/AddAttendance',
        request: {
          Token: token,
          Date: date,
          ClassId: classId,
          ParkId: park,
          KingdomId: kingdom,
          Credits: credits
        }
      }
    })
  },
  getParks (kingdom) {
    let params = {
      call: 'Park/GetParks',
      request: {}
    }
    if (kingdom) {
      params.request.KingdomId = kingdom
    }
    return request(params)
  }
}
