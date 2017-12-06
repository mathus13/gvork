import {
  request
} from './settings'
// import PubSub from 'pubsub-js'
export default {
  getParkShort (id) {
    return request({
      params: {
        call: 'Park/GetParkShortInfo',
        request: {
          ParkId: id
        }
      }
    })
  },
  getPark (id) {
    return request({
      params: {
        call: 'Park/GetParkDetails',
        request: {
          ParkId: id
        }
      }
    })
  },
  getOfficers (park) {
    return request({
      params: {
        call: 'Park/GetOfficers',
        request: {
          ParkId: park.ParkId
        }
      }
    })
  },
  getActivePlayers (park, params) {
    if (!params) {
      params = {}
    }
    params.ParkId = park
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
  addAttendance (token, date, classId, park, kingdom, credits, player) {
    let data = new FormData()
    data.append('call', 'Attendance/AddAttendance')
    data.append('request[Token]', token)
    data.append('request[Date]', date)
    data.append('request[ClassId]', classId)
    data.append('request[ParkId]', park)
    data.append('request[KingdomId]', kingdom)
    data.append('request[Credits]', credits)
    data.append('request[MundaneId]', player)
    return request({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
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
    return request({
      params: params
    })
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
