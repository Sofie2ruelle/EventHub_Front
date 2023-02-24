import React from 'react'

export const UserDetail = () => {
  const user=JSON.parse(localStorage.getItem("user"))
  console.log(user);
  return (
    <div>UserDetail</div>
  )
}
