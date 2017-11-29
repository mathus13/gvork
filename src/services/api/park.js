import {
  request
} from './settings'
// import PubSub from 'pubsub-js'
export default {
  getPark (id) {
    console.log(`calling ${id}`)
    return request({
      params: {
        call: 'Park/GetParkShortInfo',
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
    params.ParkId = park
    console.log(params)
    return request({
      params: {
        call: 'Report/GetActivePlayers',
        request: params
      }
    })
  },
  getPlayers (park, token) {
    return request({
      params: {
        call: 'Report/GetPlayerRoster',
        request: {
          Type: 'Park',
          Id: park.ParkId,
          Banned: 0
        }
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
      method: 'post',
      params: {
        call: 'Attendance/AddAttendance'
      },
      data: {
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
  getAttendance (park, date) {
    return request({
      params: {
        call: 'Report/AttendanceForDate',
        request: {
          'Date': date,
          ParkId: park.ParkId
        }
      }
    })
  },
  getParks (kingdom) {
    let params = {
      call: 'Kingdom/GetParks',
      request: {}
    }
    if (kingdom) {
      params.request.KingdomId = kingdom
    }
    return request({params: params})
  },
  getClasses () {
    return request({
      params: {
        call: 'Attendance/GetClasses',
        request: {
          'Active': 1
        }
      }
    })
  }
}
