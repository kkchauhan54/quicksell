import React, { useState, useEffect,useRef } from 'react'
import './Homepage.css'
import Header from '../Components/Header';
import Card from '../Components/Card';

const Homepage = () => {
 const [grouping, setGrouping] = useState(
   localStorage.getItem('grouping') || 'status'
 )
 const [ordering, setOrdering] = useState(
   localStorage.getItem('ordering') || 'priority'
 ) 
 const [isDropdownOpen, setIsDropdownOpen] = useState(false)
 const dropdownRef = useRef(null)
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', closeDropdown)

      return () => {
        document.removeEventListener('mousedown', closeDropdown)
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('grouping', grouping)
    }, [grouping])

    useEffect(() => {
      localStorage.setItem('ordering', ordering)
    }, [ordering])

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets)
        setUsers(data.users)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value)
  }
  const handleOrderingChange = (event) => {
      setOrdering(event.target.value)
  }
  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen)
  }

    const sortTickets = (tickets) => {
      return tickets.sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority
        } else if (ordering === 'title') {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
    }

    const getGroupedTickets = () => {
    let groupedTickets = { col1: [], col2: [], col3: [], col4: [], col5: [] };

    if (grouping === 'status') {
      groupedTickets.col1 = sortTickets(tickets.filter(ticket => ticket.status === 'Backlog'));
      groupedTickets.col2 = sortTickets(tickets.filter(ticket => ticket.status === 'Todo'));
      groupedTickets.col3 = sortTickets(tickets.filter(ticket => ticket.status === 'In progress'));
      groupedTickets.col4 = sortTickets(tickets.filter(ticket => ticket.status === 'Done'));
      groupedTickets.col5 = sortTickets(tickets.filter(ticket => ticket.status === 'Cancelled'));
    } else if (grouping === 'user') {
      groupedTickets.col1 = sortTickets(tickets.filter(ticket => ticket.userId === 'usr-1'));
      groupedTickets.col2 = sortTickets(tickets.filter(ticket => ticket.userId === 'usr-2'));
      groupedTickets.col3 = sortTickets(tickets.filter(ticket => ticket.userId === 'usr-3'));
      groupedTickets.col4 = sortTickets(tickets.filter(ticket => ticket.userId === 'usr-4'));
      groupedTickets.col5 = sortTickets(tickets.filter(ticket => ticket.userId === 'usr-5'));
    } else if (grouping === 'priority') {
      groupedTickets.col1 = sortTickets(tickets.filter(ticket => ticket.priority === 0));
      groupedTickets.col2 = sortTickets(tickets.filter(ticket => ticket.priority === 4));
      groupedTickets.col3 = sortTickets(tickets.filter(ticket => ticket.priority === 3));
      groupedTickets.col4 = sortTickets(tickets.filter(ticket => ticket.priority === 2));
      groupedTickets.col5 = sortTickets(tickets.filter(ticket => ticket.priority === 1));
    }

    return groupedTickets;
  };

  const groupedTickets = getGroupedTickets();

  const getUserNameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="homepage">
      <div className="selectors" ref={dropdownRef}>
        <div className="display-button" onClick={toggleDropdown}>
          <img
            src="/images/icons/Display.svg"
            alt="logo"
            className="button-icon"
          />
          <span>Display</span>
          <img
            src="/images/icons/down.svg"
            alt="dropdown"
            className="button-icon"
          />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="selector">
              <label>Grouping </label>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="selector">
              <label>Ordering </label>
              <select value={ordering} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="ticket-lists">
        <div className="ticket-column">
          {grouping === 'status' ? (
            <Header
              imagePath="/images/icons/Backlog.svg"
              title="Backlog"
              length={groupedTickets.col1.length}
            />
          ) : grouping === 'user' ? (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority grey.svg"
              title={getUserNameById('usr-1')}
              length={groupedTickets.col1.length}
            />
          ) : (
            <Header
              imagePath="/images/icons/No-Priority.svg"
              title="No Priority"
              length={groupedTickets.col1.length}
            />
          )}
          {groupedTickets.col1.map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag[0]}
            />
          ))}
        </div>
        <div className="ticket-column">
          {grouping === 'status' ? (
            <Header
              imagePath="/images/icons/To-do.svg"
              title="Todo"
              length={groupedTickets.col2.length}
            />
          ) : grouping === 'user' ? (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority grey.svg"
              title={getUserNameById('usr-2')}
              length={groupedTickets.col2.length}
            />
          ) : (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority colour.svg"
              title="Urgent"
              length={groupedTickets.col2.length}
            />
          )}
          {groupedTickets.col2.map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag[0]}
            />
          ))}
        </div>
        <div className="ticket-column">
          {grouping === 'status' ? (
            <Header
              imagePath="/images/icons/in-progress.svg"
              title="In Progress"
              length={groupedTickets.col3.length}
            />
          ) : grouping === 'user' ? (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority grey.svg"
              title={getUserNameById('usr-3')}
              length={groupedTickets.col3.length}
            />
          ) : (
            <Header
              imagePath="/images/icons/Img - High Priority.svg"
              title="High"
              length={groupedTickets.col3.length}
            />
          )}
          {groupedTickets.col3.map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag[0]}
            />
          ))}
        </div>
        <div className="ticket-column">
          {grouping === 'status' ? (
            <Header
              imagePath="/images/icons/Done.svg"
              title="Done"
              length={groupedTickets.col4.length}
            />
          ) : grouping === 'user' ? (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority grey.svg"
              title={getUserNameById('usr-4')}
              length={groupedTickets.col4.length}
            />
          ) : (
            <Header
              imagePath="/images/icons/Img - Medium Priority.svg"
              title="Medium"
              length={groupedTickets.col4.length}
            />
          )}
          {groupedTickets.col4.map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag[0]}
            />
          ))}
        </div>
        <div className="ticket-column">
          {grouping === 'status' ? (
            <Header
              imagePath="/images/icons/Cancelled.svg"
              title="Cancelled"
              length={groupedTickets.col5.length}
            />
          ) : grouping === 'user' ? (
            <Header
              imagePath="/images/icons/SVG - Urgent Priority grey.svg"
              title={getUserNameById('usr-5')}
              length={groupedTickets.col5.length}
            />
          ) : (
            <Header
              imagePath="/images/icons/Img - Low Priority.svg"
              title="Low"
              length={groupedTickets.col5.length}
            />
          )}
          {groupedTickets.col5.map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag[0]}
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default Homepage;