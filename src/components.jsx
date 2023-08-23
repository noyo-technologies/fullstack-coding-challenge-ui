import React from 'react'
import { connect } from 'react-redux'

import { fetchAddresses, fetchEvents } from './thunks'
import { eventGuid, canSelectEvents } from './selectors'
import { actions } from './redux-store'


//--> User select form
const submitHandler = (dispatch, userId) => (e) => {
  e.preventDefault()

  dispatch({
    type: actions.CHANGE_SELECTED_USER_ID,
    payload: userId
  })
}

const changeHandler = (dispatch) => (e) => {
  const val = e.target.value

  dispatch({
    type: actions.CHANGE_SELECTED_USER_ID,
    payload: val
  })
  dispatch(fetchAddresses(val))
}

let UserSelectForm = ({ dispatch, users, selectedUserId }) => {
  return <form action="{API_BASE}/users/{selectedUserId}/addresses" method="GET" onSubmit={submitHandler(dispatch, selectedUserId)}>
    <h2>Select User</h2>
    <select onChange={changeHandler(dispatch)} value={selectedUserId || ''}>
      <option>Select User ID</option>
      {users.map((user) => {
        console.log(user)
        return <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.id}`}</option>
      })}
    </select>
  </form>
}
UserSelectForm = connect(state => state)(UserSelectForm)



//--> Events list
const handleEventToggle = (dispatch, guid) => (e) => {
  dispatch({
    type: actions.TOGGLE_EVENT_SELECTION,
    payload: guid
  })
}
let Event = ({ dispatch, event, guid, isSelected, isEnabled }) => {
  return <li>
    <h5 htmlFor={guid}>
      {event.event_type} | {event.created}
    </h5>
  </li>
}
Event = connect((state, ownProps) => {
  const isSelected = !!state.selectedEvents[ownProps.guid]
  return {
    isSelected : isSelected,
    isEnabled : isSelected || canSelectEvents(state.selectedEvents)
  }
})(Event)


let EventList = ({dispatch, canCompare, events}) => {
  return <>
    <ul>
      {events.map((event) => {
        return <Event event={event} key={eventGuid(event)} guid={eventGuid(event)} />
      })}
    </ul>
  </>
}
EventList = connect(state => {
  return { canCompare : Object.keys(state.selectedEvents).length > 1 }
})(EventList)



//--> Addresses list
const handleAddressClick = (dispatch, id) => (e) => {
  e.preventDefault()

  dispatch({
    type: actions.REQUEST_ADDRESS_DETAILS,
    payload: id
  })
  dispatch(fetchEvents(id))
}


let Address = ({ dispatch, addressJson, isSelected }) => {
  return <li onClick={handleAddressClick(dispatch, addressJson.id)} className={isSelected ? 'selected' : ''}>
    <pre>{JSON.stringify(addressJson, undefined, 2)}</pre>
  </li>
}
Address = connect((state, ownProps) => {
  return { isSelected : state.selectedAddressId === ownProps.addressJson.id }
})(Address)



//--> App wrapper
let App = ({ addresses, events, users, selectedUserId, selectedAddressId, comparingEvents, error} ) => {
  return <>
    {error ? <p className="error">{error}</p> : ''}
    {users && users.length ?
      <UserSelectForm users={users} selectedUserId={selectedUserId} />
    : <h2>No users found</h2>}
    <div className="addresses">
      <h2>Address Information</h2>
      {addresses && addresses.length
        ? <ul>
            {addresses.map((address) => {
              return <Address key={address.id} addressJson={address} />
            })}
          </ul>
        : <p>{selectedUserId ? 'No addresses found.' : 'Choose a user ID from the dropdown above.'}</p>
      }
    </div>
    <div className="events">
      <h2>Events</h2>
      { events && events.length
        ? <EventList events={events} />
        : <p>{selectedAddressId ? 'No events found.' : 'Select an address to see events'}</p>
      }
    </div>
  </>
}
App = connect(state => {
  return {
    ...state
  }
})(App)


export { App }
